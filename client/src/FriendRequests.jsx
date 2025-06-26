import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('chattieUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    setCurrentUser(JSON.parse(userData));
    
    // Mock friend requests - in real app, fetch from backend
    const mockRequests = [
      {
        id: 1,
        from: {
          username: 'alex_dev',
          displayName: 'Alex Johnson',
          avatar: 'A',
          status: 'online'
        },
        message: 'Hey! Would love to connect and chat about React development!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 mins ago
      },
      {
        id: 2,
        from: {
          username: 'sarah_ui',
          displayName: 'Sarah Davis',
          avatar: 'S',
          status: 'online'
        },
        message: 'Hi! I saw your profile and think we could be great chat buddies!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
      }
    ];
    
    setRequests(mockRequests);
  }, [navigate]);

  const handleAcceptRequest = (requestId) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      // Store the user as a friend and navigate to chat
      localStorage.setItem('chattieTargetUser', JSON.stringify(request.from));
      navigate(`/chat/${request.from.username}`);
    }
  };

  const handleDeclineRequest = (requestId) => {
    setRequests(requests.filter(r => r.id !== requestId));
  };

  const handleBackToUsers = () => {
    navigate('/users');
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5e6ea] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-4 md:left-16 w-16 h-16 md:w-24 md:h-24 bg-[#9b7ba3]/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-96 right-4 md:right-24 w-20 h-20 md:w-32 md:h-32 bg-[#c4a1a8]/15 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-40 left-4 md:left-32 w-16 h-16 md:w-20 md:h-20 bg-[#d4b5c4]/25 rounded-full blur-lg animate-float"></div>
        <div className="absolute bottom-24 right-4 md:right-16 w-20 h-20 md:w-28 md:h-28 bg-[#a8869c]/20 rounded-full blur-xl animate-pulse-slow"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-3 md:p-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-6 mb-4 md:mb-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
                <button 
                  onClick={handleBackToUsers}
                  className="text-xl md:text-2xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-1.5 md:p-2 rounded-xl transition-colors flex-shrink-0"
                  title="Back to Users"
                >
                  ←
                </button>
                
                <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#9b7ba3] to-[#c4a1a8] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white font-bold text-base md:text-lg">📨</span>
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-[#6b4c57] font-bold text-lg md:text-2xl truncate">Friend Requests</h1>
                    <p className="text-[#9b7ba3] text-xs md:text-sm truncate">Hi, {currentUser.displayName}!</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-[#6b4c57] text-xs md:text-sm font-medium">{requests.length} pending requests</p>
                  <p className="text-[#9b7ba3] text-xs">Manage your connections</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm md:text-lg">{currentUser.avatar}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Friend Requests */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border border-white/20">
            {requests.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl md:text-3xl">📭</span>
                </div>
                <h3 className="text-[#6b4c57] font-bold text-lg md:text-xl mb-2">No Friend Requests</h3>
                <p className="text-[#8b6b78] mb-4 text-sm md:text-base px-4">You're all caught up! No pending requests.</p>
                <button 
                  onClick={handleBackToUsers}
                  className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-medium text-sm md:text-base hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Find People to Connect
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-[#6b4c57] font-bold text-lg md:text-xl">Pending Requests</h2>
                  <span className="bg-gradient-to-r from-[#e8a7b8]/20 to-[#d4a5c4]/20 text-[#6b4c57] px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                    {requests.length} new
                  </span>
                </div>

                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-base md:text-lg">{request.from.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white ${
                          request.from.status === 'online' ? 'bg-[#e8a7b8]' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[#6b4c57] font-bold text-base md:text-lg truncate">{request.from.displayName}</h3>
                            <p className="text-[#9b7ba3] text-xs md:text-sm truncate">@{request.from.username}</p>
                          </div>
                          <span className="text-[#8b6b78] text-xs flex-shrink-0 ml-2">{formatTimeAgo(request.timestamp)}</span>
                        </div>
                        
                        <p className="text-[#6b4c57] text-sm mb-3 md:mb-4 leading-relaxed">
                          {request.message}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                          <button 
                            onClick={() => handleAcceptRequest(request.id)}
                            className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                          >
                            ✓ Accept & Chat
                          </button>
                          <button 
                            onClick={() => handleDeclineRequest(request.id)}
                            className="bg-white/80 text-[#6b4c57] px-4 py-2 rounded-xl text-sm font-medium hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-[#e8c4d8]"
                          >
                            ✗ Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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

export default FriendRequests;
