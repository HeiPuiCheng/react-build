import Message from './Message';

export default function ChatWindow() {
 
  const mockMessages = [
    { id: 1, user: "Alice", text: "Hey everyone! Is the server up?", time: "10:00 AM" },
    { id: 2, user: "Bob", text: "Yeah, I'm logging in now.", time: "10:05 AM" },
    { id: 3, user: "Chad", text: "Let me grab a drink and I'll join.", time: "10:12 AM" }
  ];

  return (
    <div className="chat-window">
      {mockMessages.map((msg) => (
        <Message 
          key={msg.id} 
          user={msg.user} 
          text={msg.text} 
          time={msg.time} 
        />
      ))}
    </div>
  );
}