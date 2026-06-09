const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// 1. Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Allow React to connect

// 2. Database Connection (Using Docker service name 'db')
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/discordclone';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 3. Database Models
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

const RoomSchema = new mongoose.Schema({ name: String });
const Room = mongoose.model('Room', RoomSchema);

const MessageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  user: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// Seed some initial rooms if the database is empty
Room.countDocuments().then(count => {
  if (count === 0) {
    Room.insertMany([{ name: 'General' }, { name: 'Gaming' }, { name: 'Homework-Help' }]);
    console.log('🌱 Seeded initial chat rooms');
  }
});

const JWT_SECRET = "super_secret_key_change_in_production";

// --- ROUTES ---

// Register
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use." });

    // Hash the password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token, user: { name: newUser.name, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error during registration." });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password." });

    // Compare the plain text password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password." });

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error during login." });
  }
});

// Middleware to protect routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Access denied. No token provided." });

  const token = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Get Rooms (Protected)
app.get('/rooms', verifyToken, async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rooms." });
  }
});

// Get Messages for a specific room
app.get('/rooms/:roomId/messages', verifyToken, async (req, res) => {
  try {
    // Find all messages that belong to this room, sorted by oldest first
    const messages = await Message.find({ roomId: req.params.roomId }).sort('createdAt');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

// Post a new message to a specific room
app.post('/rooms/:roomId/messages', verifyToken, async (req, res) => {
  try {
    // Find the user in the database using the ID from their token to get their name
    const user = await User.findById(req.user.id);
    
    const newMessage = new Message({
      roomId: req.params.roomId,
      user: user.name,
      text: req.body.text
    });
    
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message." });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));