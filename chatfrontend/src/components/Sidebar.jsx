import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const rooms = ["General", "Gaming", "Homework-Help", "Random"];
  const navigate = useNavigate(); // Bring in the router navigation

  return (
    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Top section: Server list */}
      <div style={{ flex: 1 }}>
        <h2>Servers</h2>
        <ul>
          {rooms.map((room, index) => (
            <li key={index}># {room}</li>
          ))}
        </ul>
      </div>

      {/* Bottom section: User controls */}
      <div 
        onClick={() => navigate('/profile')}
        style={{ 
          marginTop: 'auto', // Pushes this section to the bottom
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
        <span style={{ fontWeight: 'bold' }}>AwesomeUser ⚙️</span>
      </div>
      
    </div>
  );
}