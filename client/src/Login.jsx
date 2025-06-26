import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    email: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic
      if (formData.username.trim()) {
        const userData = {
          username: formData.username.trim(),
          displayName: formData.displayName.trim() || formData.username.trim(),
          email: formData.email.trim(),
          userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          status: 'online',
          avatar: formData.displayName.charAt(0).toUpperCase() || formData.username.charAt(0).toUpperCase(),
          joinedAt: new Date().toISOString()
        };
        
        localStorage.setItem('chattieUser', JSON.stringify(userData));
        navigate('/users');
      }
    } else {
      // Registration logic (same for now, but can be expanded)
      if (formData.username.trim() && formData.displayName.trim()) {
        const userData = {
          username: formData.username.trim(),
          displayName: formData.displayName.trim(),
          email: formData.email.trim(),
          userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          status: 'online',
          avatar: formData.displayName.charAt(0).toUpperCase(),
          joinedAt: new Date().toISOString()
        };
        
        localStorage.setItem('chattieUser', JSON.stringify(userData));
        navigate('/users');
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f5e6ea] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 sm:top-32 left-8 sm:left-16 w-16 h-16 sm:w-24 sm:h-24 bg-[#9b7ba3]/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-64 sm:top-96 right-12 sm:right-24 w-20 h-20 sm:w-32 sm:h-32 bg-[#c4a1a8]/15 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-32 sm:bottom-40 left-16 sm:left-32 w-16 h-16 sm:w-20 sm:h-20 bg-[#d4b5c4]/25 rounded-full blur-lg animate-float"></div>
        <div className="absolute bottom-12 sm:bottom-24 right-8 sm:right-16 w-20 h-20 sm:w-28 sm:h-28 bg-[#a8869c]/20 rounded-full blur-xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 max-w-sm sm:max-w-md w-full text-center shadow-2xl border border-white/20">
        {/* Header with Back Arrow */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button 
            onClick={handleBackToHome}
            className="text-xl sm:text-2xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-2 rounded-xl transition-colors"
            title="Back to Home"
          >
            ←
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#9b7ba3] to-[#c4a1a8] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base sm:text-lg">C</span>
            </div>
            <div>
              <h1 className="text-[#6b4c57] font-bold text-xl sm:text-2xl">Chattie</h1>
            </div>
          </div>
          <div className="w-8 sm:w-10"></div> {/* Spacer */}
        </div>
        
        {/* Login/Register Toggle */}
        <div className="flex bg-[#e8c4d8]/30 rounded-xl sm:rounded-2xl p-1 mb-6 sm:mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
              isLogin 
                ? 'bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white shadow-lg' 
                : 'text-[#6b4c57] hover:bg-white/50'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
              !isLogin 
                ? 'bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white shadow-lg' 
                : 'text-[#6b4c57] hover:bg-white/50'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Animated Illustration */}
        <div className="relative h-16 sm:h-20 mb-4 sm:mb-6">
          <div className="absolute top-0 left-1/4 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg animate-float-slow">
            <span className="text-white text-sm sm:text-lg">👤</span>
          </div>
          <div className="absolute top-2 right-1/4 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center shadow-lg animate-float-delayed">
            <span className="text-white text-sm sm:text-lg">🔐</span>
          </div>
        </div>
        
        <p className="text-[#8b6b78] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
          {isLogin ? 'Welcome back! Sign in to continue chatting.' : 'Join our community and start connecting!'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username (e.g., john_doe)"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-3 sm:p-4 border-2 border-[#e8c4d8] rounded-xl sm:rounded-2xl text-sm sm:text-base outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 backdrop-blur-sm focus:bg-white/80"
            required
          />
          
          {!isLogin && (
            <input
              type="text"
              name="displayName"
              placeholder="Display Name (e.g., John Doe)"
              value={formData.displayName}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-[#e8c4d8] rounded-2xl text-base outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 backdrop-blur-sm focus:bg-white/80"
              required
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-4 border-2 border-[#e8c4d8] rounded-2xl text-base outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 backdrop-blur-sm focus:bg-white/80"
          />
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white p-4 rounded-2xl font-bold text-lg hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
          >
            {isLogin ? 'Sign In & Find People 🚀' : 'Create Account & Join 🎉'}
          </button>
        </form>
        
        <p className="text-[#9b7ba3] text-sm mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#6b4c57] font-medium hover:text-[#9b7ba3] transition-colors"
          >
            {isLogin ? 'Sign up here' : 'Login here'}
          </button>
        </p>
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 3.5s ease-in-out infinite 0.5s; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default Login;
