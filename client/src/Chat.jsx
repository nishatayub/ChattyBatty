import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:8080");

function Chat() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("previousMessages", (previousMessages) => {
      setMessages(previousMessages);
    });

    socket.on("receiveMessage", (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socket.off("connect");
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const trimmedUser = user.trim();
    if (trimmedUser) {
      setUser(trimmedUser);
      setShowChat(true);
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && user) {
      try {
        socket.emit("sendMessage", { user, text: message.trim() });
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  if (!showChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
          <h1 className="text-4xl font-bold text-purple-700 mb-8">Chattie</h1>
          
          <div className="relative h-32 mb-8">
            <div className="absolute top-2 left-1/4 bg-pink-500 text-white text-2xl p-3 rounded-full">💬</div>
            <div className="absolute top-4 right-1/4 bg-pink-500 text-white text-2xl p-3 rounded-full">💭</div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-4xl p-4 rounded-full">👤</div>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-8 text-sm">
            A world without communication is meaningless. So, you have to 
            message everyone now!
          </p>
          
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-pink-500 transition-colors"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-pink-500 text-white p-4 rounded-xl font-semibold hover:bg-pink-600 transition-colors"
            >
              Start Messaging
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full h-[600px] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-purple-700 text-white p-4 flex items-center space-x-4">
          <button 
            onClick={() => setShowChat(false)}
            className="text-xl hover:bg-purple-600 p-1 rounded"
          >
            ←
          </button>
          
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-lg">
              👤
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">{user}</span>
              <span className="text-xs opacity-80">Online</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="text-lg hover:bg-purple-600 p-1 rounded">📹</button>
            <button className="text-lg hover:bg-purple-600 p-1 rounded">📞</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <div className="text-center text-gray-500 text-xs bg-white/80 rounded-lg py-2 px-4 mb-5 inline-block w-full">
            Today, {new Date().toLocaleDateString()}
          </div>
          
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-4 flex ${msg.user === user ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                msg.user === user 
                  ? 'bg-pink-500 text-white rounded-br-sm' 
                  : 'bg-white text-gray-800 rounded-bl-sm shadow-md'
              }`}>
                {msg.user !== user && (
                  <div className="text-xs font-semibold text-gray-600 mb-1">{msg.user}</div>
                )}
                <div className="leading-5 mb-1">{msg.text}</div>
                <div className={`text-xs opacity-70 text-right ${
                  msg.user === user ? 'text-pink-100' : 'text-gray-500'
                }`}>
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleMessageSubmit} className="flex items-center space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-200 rounded-full outline-none focus:border-pink-500 transition-colors"
              required
            />
            <button 
              type="submit" 
              className="w-11 h-11 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
            >
              ✈️
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
