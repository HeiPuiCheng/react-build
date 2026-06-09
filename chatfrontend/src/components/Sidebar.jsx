import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeRoom, setActiveRoom }) {
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
          
          {rooms.map((room) => {
            const roomId = room._id || room.id;
            return (
              <li 
                key={roomId}
                onClick={() => setActiveRoom(room)} // Set the room when clicked
                style={{ 
                  backgroundColor: activeRoom && (activeRoom._id === roomId || activeRoom.id === roomId) ? '#404249' : 'transparent',
                  padding: '10px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                # {room.name}
              </li>
            )
          })}
        </ul>
      </div>
      {/* ... Keep your settings profile button ... */}
    </div>
  );
}