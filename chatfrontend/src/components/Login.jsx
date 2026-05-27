import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // 1. Declare state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 2. Initialize the navigation hook to redirect users later
  const navigate = useNavigate();

  // 3. Handle the form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    console.log("Logging in with:", email, password);
    
    // In Week 4, send this data to REST API!
    navigate("/app"); 
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#313338' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: '#2b2d31', padding: '40px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        <h2 style={{ textAlign: 'center', color: 'white' }}>Welcome Back</h2>
        
        {/* Controlled Input: Value is tied to state, onChange updates state */}
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
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Log In
        </button>
      </form>
    </div>
  );
}