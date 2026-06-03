import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  // Start with an empty array instead of hardcoded strings
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("authToken");
        
        // Adjust this URL to match your backend's rooms endpoint
        const response = await fetch("http://localhost:3000/rooms", {
          headers: {
            "Authorization": `Bearer ${token}` // Send the token for security
          }
        });

        if (response.ok) {
          const data = await response.json();
          setRooms(data); // Populate the sidebar with real database data
        } else {
          console.error("Failed to fetch rooms.");
        }
      } catch (error) {
        console.error("Error connecting to API:", error);
      }
    };

    fetchRooms();
  }, []); // Empty dependency array ensures this only runs once on load

  return (
    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      <div style={{ flex: 1 }}>
        <h2>Servers</h2>
        <ul>
          {rooms.length === 0 ? <li style={{color: 'gray'}}>Loading...</li> : null}
          
          {/* Map over the fetched data. Adjust 'room.id' and 'room.name' based on your API response schema */}
          {rooms.map((room) => (
            <li key={room.id || room._id}># {room.name || room}</li>
          ))}
        </ul>
      </div>

      <div 
        onClick={() => navigate('/profile')}
        style={{ marginTop: 'auto', padding: '15px 10px', backgroundColor: '#232428', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <div style={{ width: '30px', height: '30px', backgroundColor: '#5865f2', borderRadius: '50%' }}></div>
        <span style={{ fontWeight: 'bold' }}>Settings ⚙️</span>
      </div>
      
    </div>
  );
}