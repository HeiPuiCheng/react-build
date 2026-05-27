import { useState } from 'react';

export default function MessageInput() {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent page refresh if inside a form
    
    // Stop the user from sending empty messages
    if (messageText.trim() === "") return;

    console.log("Ready to send message to API:", messageText);
    
    // Clear the input box after sending
    setMessageText(""); 
  };

  return (
    // We wrap this in a form so hitting "Enter" automatically triggers the submit
    <form className="message-input" onSubmit={handleSendMessage}>
      <input 
        type="text" 
        placeholder="Message #General" 
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}