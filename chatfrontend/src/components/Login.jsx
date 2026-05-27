import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // State for our form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only used for registering
  
  // State to toggle between Login and Register modes
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a user object. If they are logging in, we just default the name to "User" for now.
    const userData = {
      email: email,
      name: isRegistering ? name : "User", 
    };

    // Save the user data to the browser's local storage as a string
    localStorage.setItem("currentUser", JSON.stringify(userData));

    console.log(isRegistering ? "Registered new user:" : "Logged in:", userData);
    
    // Send them to the chat app
    navigate("/app"); 
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#313338' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#2b2d31', padding: '40px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '15px', width: '350px' }}>
        
        <h2 style={{ textAlign: 'center', color: 'white' }}>
          {isRegistering ? "Create an Account" : "Welcome Back"}
        </h2>
        
        {/* Only show the Name input if they are creating a new account */}
        {isRegistering && (
          <input 
            type="text" 
            placeholder="Username" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
          />
        )}
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {isRegistering ? "Sign Up" : "Log In"}
        </button>

        {/* Toggle between modes */}
        <p style={{ color: 'gray', fontSize: '0.8rem', textAlign: 'center', marginTop: '10px' }}>
          {isRegistering ? "Already have an account? " : "Need an account? "}
          <span 
            style={{ color: '#00a8fc', cursor: 'pointer' }} 
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Log in here" : "Register"}
          </span>
        </p>

      </form>
    </div>
  );
}