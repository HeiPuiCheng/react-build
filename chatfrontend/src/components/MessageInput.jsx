import { useState } from 'react';

export default function MessageInput({ activeRoom, onMessageSent }) {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault(); 
    if (messageText.trim() === "" || !activeRoom) return;

    try {
      const token = localStorage.getItem("authToken");
      const roomId = activeRoom._id || activeRoom.id;

      const response = await fetch(`http://localhost:3000/rooms/${roomId}/messages`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text: messageText })
      });

      if (response.ok) {
        setMessageText(""); // Clear the input box
        onMessageSent(); // Tell ChatLayout to refresh the messages immediately
      }
    } catch (err) {
      console.error("Failed to send message");
    }
  };

  return (
    <form className="message-input" onSubmit={handleSendMessage}>
      <input 
        type="text" 
        placeholder={`Message #${activeRoom.name}`} 
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}