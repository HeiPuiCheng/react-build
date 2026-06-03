import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  // Initialize state as empty strings first
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect runs once when the component first loads
  useEffect(() => {
    // Look for the saved user in the browser's memory
    const savedUser = localStorage.getItem("currentUser");
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Update our React state with the real data!
      setName(parsedUser.name);
      setEmail(parsedUser.email);
    }
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    // Save the newly edited data back into Local Storage so it's not lost
    const updatedData = { name, email };
    localStorage.setItem("currentUser", JSON.stringify(updatedData));
    
    alert("Profile updated successfully!"); 
    setPassword(""); 
  };

  const handleLogout = () => {
    // Clear ALL session data to properly log the user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken"); 
    
    console.log("User logged out securely");
    navigate("/"); 
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#313338', color: 'white' }}>
      {/* ... KEEP THE REST OF YOUR RETURN STATEMENT EXACTLY THE SAME ... */}
      <div style={{ backgroundColor: '#2b2d31', padding: '40px', borderRadius: '8px', width: '350px', position: 'relative' }}>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/app')} 
          style={{ position: 'absolute', top: '15px', left: '15px', background: 'none', border: 'none', color: 'gray', cursor: 'pointer' }}
        >
          ← Back to Chat
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '10px' }}>User Settings</h2>
        
        <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <label style={{ fontSize: '0.9rem', color: '#b5bac1', fontWeight: 'bold' }}>USERNAME</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#1e1f22', color: 'white' }}
          />

          <label style={{ fontSize: '0.9rem', color: '#b5bac1', fontWeight: 'bold' }}>EMAIL</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#1e1f22', color: 'white' }}
          />
          
          <label style={{ fontSize: '0.9rem', color: '#b5bac1', fontWeight: 'bold' }}>NEW PASSWORD</label>
          <input 
            type="password" 
            placeholder="Enter new password to change..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#1e1f22', color: 'white' }}
          />
          
          <button type="submit" style={{ padding: '10px', backgroundColor: '#23a559', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
            Save Changes
          </button>
        </form>

        <hr style={{ borderColor: '#1e1f22', margin: '20px 0' }} />

        {/* Logout Button */}
        <button onClick={handleLogout} style={{ width: '100%', padding: '10px', backgroundColor: '#da373c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Log Out
        </button>

      </div>
    </div>
  );
}