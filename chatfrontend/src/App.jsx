import { useState } from 'react'
//Week 2: Import components
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import MessageInput from './components/MessageInput';
import './App.css'

function App() {
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

export default App
