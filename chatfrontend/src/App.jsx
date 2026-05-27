import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ChatLayout from './components/ChatLayout';
import Profile from './components/Profile'; // 1. Import the new component
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<ChatLayout />} />
        
        {/* 2. Add the Profile route */}
        <Route path="/profile" element={<Profile />} /> 
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;