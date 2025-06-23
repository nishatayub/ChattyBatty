import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const trimmedUser = user.trim();
    if (trimmedUser) {
      // Store user in localStorage or context and navigate to user selection
      localStorage.setItem('chattieUser', trimmedUser);
      navigate('/users');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Show name entry form (initial screen)
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
        {/* Header with Back Arrow */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={handleBackToHome}
            className="text-2xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-2 rounded-xl transition-colors"
            title="Back to Home"
          >
            ←
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-[#9b7ba3] to-[#c4a1a8] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <div>
              <h1 className="text-[#6b4c57] font-bold text-3xl">Chattie</h1>
              <p className="text-[#9b7ba3] text-sm font-medium">Connect Everyone</p>
            </div>
          </div>
          <div className="w-10"></div> {/* Spacer for balance */}
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
          Enter your name to discover amazing people and start 
          <span className="text-transparent bg-gradient-to-r from-[#c4a1a8] to-[#9b7ba3] bg-clip-text font-semibold"> connecting with them</span>!
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
            Find People to Chat With ✨
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

export default Chat;
