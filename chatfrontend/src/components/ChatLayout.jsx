import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

export default function ChatLayout() {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Used to instantly refresh chat when you send a message

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) navigate("/");
  }, [navigate]);

  return (
    <div className="app-container">
      {/* Pass state down to Sidebar so it can change the active room */}
      <Sidebar activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
      
      <div className="main-content">
        {/* Only show the chat interface if a room is actually selected */}
        {activeRoom ? (
          <>
            <ChatWindow activeRoom={activeRoom} refreshTrigger={refreshTrigger} />
            <MessageInput activeRoom={activeRoom} onMessageSent={() => setRefreshTrigger(prev => prev + 1)} />
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'gray' }}>
            <h2>Select a server on the left to start chatting</h2>
          </div>
        )}
      </div>
    </div>
  );
}