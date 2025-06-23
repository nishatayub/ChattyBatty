import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewLanding from './LandingPage';
import Login from './Login';
import Chat from './Chat';
import UserSelection from './UserSelection';
import ChatInterface from './ChatInterface';
import FriendRequests from './FriendRequests';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NewLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/users" element={<UserSelection />} />
          <Route path="/requests" element={<FriendRequests />} />
          <Route path="/chat/:targetUser" element={<ChatInterface />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
