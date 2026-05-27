import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

export default function ChatLayout() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <ChatWindow />
        <MessageInput />
      </div>
    </div>
  );
}