import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeRoom, setActiveRoom }) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("authToken");
        
        const response = await fetch("http://localhost:3000/rooms", {
          headers: {
            "Authorization": `Bearer ${token}` 
          }
        });

        if (response.ok) {
          const data = await response.json();
          setRooms(data); 
        } else {
          console.error("Failed to fetch rooms.");
        }
      } catch (error) {
        console.error("Error connecting to API:", error);
      }
    };

    fetchRooms();
  }, []); 

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
                onClick={() => setActiveRoom(room)} 
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

      {/* The restored Settings / Logout profile button! */}
      <div 
        onClick={() => navigate('/profile')}
        style={{ 
          marginTop: 'auto', 
          padding: '15px 10px', 
          backgroundColor: '#232428', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px' 
        }}
      >
        <div style={{ width: '30px', height: '30px', backgroundColor: '#5865f2', borderRadius: '50%' }}></div>
        <span style={{ fontWeight: 'bold' }}>Settings ⚙️</span>
      </div>
      
    </div>
  );
}