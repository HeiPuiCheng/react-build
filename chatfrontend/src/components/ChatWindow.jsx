import { useState, useEffect } from 'react';
import Message from './Message';

export default function ChatWindow({ activeRoom, refreshTrigger }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeRoom) return;
      try {
        const token = localStorage.getItem("authToken");
        const roomId = activeRoom._id || activeRoom.id;
        
        const response = await fetch(`http://localhost:3000/rooms/${roomId}/messages`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (err) {
        console.error("Failed to fetch messages");
      }
    };

    fetchMessages(); // Fetch immediately on load/change
    
    // Simple polling: check for new messages every 3 seconds
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval); // Cleanup on unmount

  }, [activeRoom, refreshTrigger]);

  return (
    <div className="chat-window">
      {messages.length === 0 && <p style={{color: 'gray'}}>No messages yet. Be the first to say hi!</p>}
      
      {messages.map((msg) => {
        // Convert MongoDB timestamp to a readable time (e.g., "8:05 PM")
        const timeString = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return (
          <Message 
            key={msg._id} 
            user={msg.user} 
            text={msg.text} 
            time={timeString} 
          />
        );
      })}
    </div>
  );
}