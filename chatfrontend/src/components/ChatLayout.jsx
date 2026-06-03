import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

export default function ChatLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has a valid session token
    const token = localStorage.getItem("authToken");
    
    // If no token is found, redirect them to the login page immediately
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

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