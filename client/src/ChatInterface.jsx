import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io("http://localhost:8080");

function ChatInterface() {
  const [currentUser, setCurrentUser] = useState('');
  const [targetUser, setTargetUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get users from localStorage
    const storedUser = localStorage.getItem('chattieUser');
    const storedTargetUser = localStorage.getItem('chattieTargetUser');
    
    if (!storedUser || !storedTargetUser) {
      navigate('/chat');
      return;
    }
    
    setCurrentUser(storedUser);
    setTargetUser(JSON.parse(storedTargetUser));

    // Socket event listeners
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("previousMessages", (previousMessages) => {
      setMessages(previousMessages);
    });

    socket.on("receiveMessage", (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    // Join chat room
    socket.emit("joinChat", { 
      currentUser: storedUser.username, 
      targetUser: JSON.parse(storedTargetUser).username 
    });

    return () => {
      socket.off("connect");
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, [navigate]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && currentUser && targetUser) {
      try {
        socket.emit("sendMessage", { 
          user: currentUser.username, 
          text: message.trim(), 
          targetUser: targetUser.username,
          timestamp: new Date().toISOString()
        });
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleBack = () => {
    navigate('/users');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!currentUser || !targetUser) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-[#f5e6ea] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-24 h-24 bg-[#9b7ba3]/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-96 right-24 w-32 h-32 bg-[#c4a1a8]/15 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-[#d4b5c4]/25 rounded-full blur-lg animate-float"></div>
      </div>

      {/* Desktop Chat Interface */}
      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-6xl mx-auto h-[calc(100vh-3rem)] flex flex-col">
          
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mb-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleBack}
                  className="text-2xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-2 rounded-xl transition-colors"
                >
                  ←
                </button>
                <button 
                  onClick={handleBackToHome}
                  className="text-sm text-[#6b4c57] hover:bg-[#e8c4d8]/30 px-3 py-1 rounded-xl transition-colors"
                >
                  🏠 Home
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{targetUser.avatar}</span>
                  </div>
                  <div>
                    <h1 className="text-[#6b4c57] font-bold text-xl">{targetUser.displayName}</h1>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${targetUser.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span className="text-[#9b7ba3] text-sm">{targetUser.lastSeen}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <button className="text-xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-2 rounded-xl transition-colors">📹</button>
                  <button className="text-xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-2 rounded-xl transition-colors">📞</button>
                  <button className="text-xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-2 rounded-xl transition-colors">⚙️</button>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">{currentUser.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 flex flex-col overflow-hidden">
            
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-3xl">💬</span>
                  </div>
                  <h3 className="text-[#6b4c57] font-bold text-xl mb-2">Start Your Conversation</h3>
                  <p className="text-[#8b6b78] mb-2">You're now chatting with {targetUser.displayName}</p>
                  <p className="text-[#9b7ba3] text-sm">{targetUser.bio}</p>
                </div>
              )}
              
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-6 flex ${msg.user === currentUser.username ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md px-6 py-4 rounded-2xl shadow-lg ${
                    msg.user === currentUser.username 
                      ? 'bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white rounded-br-md' 
                      : 'bg-white/90 backdrop-blur-sm text-[#6b4c57] rounded-bl-md border border-white/40'
                  }`}>
                    {msg.user !== currentUser.username && (
                      <div className="text-xs font-bold text-[#9b7ba3] mb-2">{msg.user}</div>
                    )}
                    <div className="leading-relaxed mb-2 font-medium text-base">{msg.text}</div>
                    <div className={`text-xs opacity-75 text-right ${
                      msg.user === currentUser.username ? 'text-white/80' : 'text-[#8b6b78]'
                    }`}>
                      {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Connection Status */}
            {!isConnected && (
              <div className="px-6 py-2 bg-orange-100 border-l-4 border-orange-500 text-orange-700">
                <p className="text-sm">⚠️ Reconnecting to chat...</p>
              </div>
            )}

            {/* Message Input */}
            <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-white/40">
              <form onSubmit={handleMessageSubmit} className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Message ${targetUser.displayName}...`}
                    className="w-full p-4 pr-12 border-2 border-[#e8c4d8] rounded-2xl outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 backdrop-blur-sm focus:bg-white/80 text-[#6b4c57] placeholder-[#9b7ba3]/60 text-base"
                    required
                    disabled={!isConnected}
                  />
                  <button 
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9b7ba3] hover:text-[#8b6b78] transition-colors text-lg"
                  >
                    😊
                  </button>
                </div>
                <button 
                  type="submit" 
                  disabled={!isConnected}
                  className="w-14 h-14 bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white rounded-2xl flex items-center justify-center hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  <span className="text-xl">✈️</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f5e6ea;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #e8a7b8, #d4a5c4);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e595aa, #c993b8);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 3.5s ease-in-out infinite 0.5s; }
      `}</style>
    </div>
  );
}

export default ChatInterface;
