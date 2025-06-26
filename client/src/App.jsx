import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewLanding from './LandingPage';
import Login from './Login';
import Chat from './Chat';
import UserSelection from './UserSelection';
import ChatInterface from './ChatInterface';
import FriendRequests from './FriendRequests';
import Groups from './Groups';
import GroupChat from './GroupChat';
import Settings from './Settings';

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
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:groupId" element={<GroupChat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat/:targetUser" element={<ChatInterface />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
