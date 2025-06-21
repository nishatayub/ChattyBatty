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
      <div className="min-h-screen bg-[#f5e6ea] relative overflow-hidden flex items-center justify-center p-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-16 w-24 h-24 bg-[#9b7ba3]/20 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-96 right-24 w-32 h-32 bg-[#c4a1a8]/15 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute bottom-40 left-32 w-20 h-20 bg-[#d4b5c4]/25 rounded-full blur-lg animate-float"></div>
          <div className="absolute bottom-24 right-16 w-28 h-28 bg-[#a8869c]/20 rounded-full blur-xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-3xl p-10 max-w-md w-full text-center shadow-2xl border border-white/20">
          {/* Logo Section */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#9b7ba3] to-[#c4a1a8] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <div>
              <h1 className="text-[#6b4c57] font-bold text-3xl">Chattie</h1>
              <p className="text-[#9b7ba3] text-sm font-medium">Connect Everyone</p>
            </div>
          </div>
          
          {/* Animated Illustration */}
          <div className="relative h-32 mb-8">
            <div className="absolute top-2 left-1/4 w-12 h-12 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg animate-float-slow">
              <span className="text-white text-xl">💬</span>
            </div>
            <div className="absolute top-4 right-1/4 w-12 h-12 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center shadow-lg animate-float-delayed">
              <span className="text-white text-xl">💭</span>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#9b7ba3] to-[#8b6b78] rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
              <span className="text-white text-2xl">👤</span>
            </div>
          </div>
          
          <p className="text-[#8b6b78] leading-relaxed mb-8 text-lg">
            Enter your name to join the conversation and experience 
            <span className="text-transparent bg-gradient-to-r from-[#c4a1a8] to-[#9b7ba3] bg-clip-text font-semibold"> real-time messaging</span>!
          </p>
          
          <form onSubmit={handleNameSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Enter your name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-4 border-2 border-[#e8c4d8] rounded-2xl text-base outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 backdrop-blur-sm focus:bg-white/80"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white p-4 rounded-2xl font-bold text-lg hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              Start Messaging ✨
            </button>
          </form>
        </div>

        {/* Custom animations */}
        <style jsx>{`
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
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
          .animate-float-delayed { animation: float-delayed 3.5s ease-in-out infinite 0.5s; }
          .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }
          .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5e6ea] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-24 h-24 bg-[#9b7ba3]/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-96 right-24 w-32 h-32 bg-[#c4a1a8]/15 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-[#d4b5c4]/25 rounded-full blur-lg animate-float"></div>
        <div className="absolute bottom-24 right-16 w-28 h-28 bg-[#a8869c]/20 rounded-full blur-xl animate-pulse-slow"></div>
      </div>
      
      <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-3xl max-w-md w-full h-[700px] flex flex-col overflow-hidden shadow-2xl border border-white/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#9b7ba3] to-[#8b6b78] text-white p-4 flex items-center space-x-4">
          <button 
            onClick={() => setShowChat(false)}
            className="text-xl hover:bg-white/20 p-2 rounded-xl transition-colors"
          >
            ←
          </button>
          
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center text-lg shadow-lg">
              <span className="text-white font-bold">{user.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">{user}</span>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-sm opacity-90">{isConnected ? 'Online' : 'Connecting...'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="text-xl hover:bg-white/20 p-2 rounded-xl transition-colors">📹</button>
            <button className="text-xl hover:bg-white/20 p-2 rounded-xl transition-colors">📞</button>
            <button className="text-xl hover:bg-white/20 p-2 rounded-xl transition-colors">⚙️</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 bg-gradient-to-b from-[#f5e6ea]/50 to-white/30 overflow-y-auto">
          <div className="text-center text-[#8b6b78] text-sm bg-white/60 backdrop-blur-sm rounded-2xl py-2 px-4 mb-6 inline-block w-full border border-white/40">
            <span className="font-medium">Today, {new Date().toLocaleDateString()}</span>
          </div>
          
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl">💬</span>
              </div>
              <p className="text-[#8b6b78] font-medium">Start a conversation!</p>
              <p className="text-[#9b7ba3] text-sm mt-1">Send your first message to get started</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-4 flex ${msg.user === user ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                msg.user === user 
                  ? 'bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white rounded-br-md' 
                  : 'bg-white/90 backdrop-blur-sm text-[#6b4c57] rounded-bl-md border border-white/40'
              }`}>
                {msg.user !== user && (
                  <div className="text-xs font-bold text-[#9b7ba3] mb-1">{msg.user}</div>
                )}
                <div className="leading-relaxed mb-1 font-medium">{msg.text}</div>
                <div className={`text-xs opacity-75 text-right ${
                  msg.user === user ? 'text-white/80' : 'text-[#8b6b78]'
                }`}>
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-white/40">
          <form onSubmit={handleMessageSubmit} className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-4 pr-12 border-2 border-[#e8c4d8] rounded-2xl outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 backdrop-blur-sm focus:bg-white/80 text-[#6b4c57] placeholder-[#9b7ba3]/60"
                required
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9b7ba3] hover:text-[#8b6b78] transition-colors"
              >
                😊
              </button>
            </div>
            <button 
              type="submit" 
              className="w-12 h-12 bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white rounded-2xl flex items-center justify-center hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              <span className="text-lg">✈️</span>
            </button>
          </form>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
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
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 3.5s ease-in-out infinite 0.5s; }
        .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default Chat;
