import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for API errors

  // Note: Adjust this URL to match your actual backend routing
  const API_URL = "http://localhost:3000"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    
    const endpoint = isRegistering ? `${API_URL}/register` : `${API_URL}/login`;
    const payload = isRegistering ? { name, email, password } : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // The API should return a secure token upon successful login
        localStorage.setItem("authToken", data.token);
        
        // Save the user data so the Profile page can still read it
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        
        navigate("/app"); 
      } else {
        // Display the error message returned from your backend
        setErrorMessage(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("API Connection Error:", error);
      setErrorMessage("Could not connect to the server.");
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#313338' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#2b2d31', padding: '40px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '15px', width: '350px' }}>
        
        <h2 style={{ textAlign: 'center', color: 'white' }}>
          {isRegistering ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Display errors if the API rejects the login */}
        {errorMessage && (
          <div style={{ color: '#fa777c', textAlign: 'center', fontSize: '0.9rem', backgroundColor: '#3f2e30', padding: '10px', borderRadius: '4px' }}>
            {errorMessage}
          </div>
        )}
        
        {isRegistering && (
          <input 
            type="text" placeholder="Username" value={name}
            onChange={(e) => setName(e.target.value)} required
            style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
          />
        )}
        
        <input 
          type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        
        <input 
          type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {isRegistering ? "Sign Up" : "Log In"}
        </button>

        <p style={{ color: 'gray', fontSize: '0.8rem', textAlign: 'center', marginTop: '10px' }}>
          {isRegistering ? "Already have an account? " : "Need an account? "}
          <span style={{ color: '#00a8fc', cursor: 'pointer' }} onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Log in here" : "Register"}
          </span>
        </p>

      </form>
    </div>
  );
}