import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSelection() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sentRequests, setSentRequests] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem('chattieUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      // If no user found, redirect to login
      navigate('/login');
      return;
    }

    // Mock users data with unique IDs and usernames
    const mockUsers = [
      { id: 1, username: 'alex_dev', displayName: 'Alex Johnson', status: 'online', avatar: 'A', lastSeen: 'Active now', bio: 'Software Developer passionate about React', userId: 'user_001' },
      { id: 2, username: 'sarah_ui', displayName: 'Sarah Davis', status: 'online', avatar: 'S', lastSeen: 'Active now', bio: 'UI/UX Designer creating beautiful experiences', userId: 'user_002' },
      { id: 3, username: 'mike_nomad', displayName: 'Mike Chen', status: 'away', avatar: 'M', lastSeen: '2 minutes ago', bio: 'Freelancer & Digital Nomad', userId: 'user_003' },
      { id: 4, username: 'emma_marketing', displayName: 'Emma Wilson', status: 'online', avatar: 'E', lastSeen: 'Active now', bio: 'Marketing Manager & Coffee Enthusiast', userId: 'user_004' },
      { id: 5, username: 'david_fullstack', displayName: 'David Rodriguez', status: 'online', avatar: 'D', lastSeen: 'Active now', bio: 'Full-stack Developer & Tech Blogger', userId: 'user_005' },
      { id: 6, username: 'lisa_pm', displayName: 'Lisa Anderson', status: 'away', avatar: 'L', lastSeen: '5 minutes ago', bio: 'Product Manager building the future', userId: 'user_006' },
      { id: 7, username: 'james_data', displayName: 'James Taylor', status: 'online', avatar: 'J', lastSeen: 'Active now', bio: 'Data Scientist & AI Researcher', userId: 'user_007' },
      { id: 8, username: 'maria_design', displayName: 'Maria Garcia', status: 'online', avatar: 'M', lastSeen: 'Active now', bio: 'Graphic Designer & Creative Director', userId: 'user_008' },
      { id: 9, username: 'robert_devops', displayName: 'Robert Kim', status: 'away', avatar: 'R', lastSeen: '1 hour ago', bio: 'DevOps Engineer & Cloud Architect', userId: 'user_009' },
      { id: 10, username: 'jen_react', displayName: 'Jennifer Lee', status: 'online', avatar: 'J', lastSeen: 'Active now', bio: 'Frontend Developer & React Enthusiast', userId: 'user_010' },
      { id: 11, username: 'tom_backend', displayName: 'Thomas Brown', status: 'online', avatar: 'T', lastSeen: 'Active now', bio: 'Backend Developer & Database Expert', userId: 'user_011' },
      { id: 12, username: 'amy_content', displayName: 'Amy White', status: 'away', avatar: 'A', lastSeen: '15 minutes ago', bio: 'Content Creator & Social Media Strategist', userId: 'user_012' }
    ];
    
    setOnlineUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, [navigate]);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(onlineUsers);
    } else {
      const filtered = onlineUsers.filter(user =>
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, onlineUsers]);

  const handleSendFriendRequest = (user) => {
    // Add user to sent requests
    setSentRequests(prev => new Set([...prev, user.id]));
    
    // In a real app, you would send this to your backend
    console.log(`Friend request sent to ${user.displayName} (${user.username})`);
    
    // Show success message (you could use a toast library)
    alert(`Friend request sent to ${user.displayName}!`);
  };

  const handleBack = () => {
    navigate('/login');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewRequests = () => {
    navigate('/requests');
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5e6ea] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-24 h-24 bg-[#9b7ba3]/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-96 right-24 w-32 h-32 bg-[#c4a1a8]/15 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-[#d4b5c4]/25 rounded-full blur-lg animate-float"></div>
        <div className="absolute bottom-24 right-16 w-28 h-28 bg-[#a8869c]/20 rounded-full blur-xl animate-pulse-slow"></div>
      </div>

      {/* Desktop-style interface */}
      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          
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
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9b7ba3] to-[#c4a1a8] rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                  <div>
                    <h1 className="text-[#6b4c57] font-bold text-2xl">Find People</h1>
                    <p className="text-[#9b7ba3] text-sm">Welcome, {currentUser.displayName}!</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-[#6b4c57] text-sm font-medium">{filteredUsers.filter(u => u.status === 'online').length} users online</p>
                  <p className="text-[#9b7ba3] text-xs">Find someone to connect with</p>
                </div>
                <button 
                  onClick={handleViewRequests}
                  className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white px-4 py-2 rounded-2xl text-sm font-medium hover:from-[#d97706] hover:to-[#b45309] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  📨 Requests
                </button>
                <div className="w-12 h-12 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{currentUser.avatar}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                <h2 className="text-[#6b4c57] font-bold text-lg mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white p-3 rounded-2xl font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    🔍 Find Friends
                  </button>
                  <button className="w-full bg-white/80 text-[#6b4c57] p-3 rounded-2xl font-medium hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-[#e8c4d8]">
                    👥 Create Group
                  </button>
                  <button className="w-full bg-white/80 text-[#6b4c57] p-3 rounded-2xl font-medium hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-[#e8c4d8]">
                    ⚙️ Settings
                  </button>
                </div>

                {/* Status */}
                <div className="mt-6 pt-6 border-t border-[#e8c4d8]/50">
                  <h3 className="text-[#6b4c57] font-medium text-sm mb-3">Your Status</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-[#8b6b78] text-sm">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User List */}
            <div className="lg:col-span-3">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                
                {/* Search Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[#6b4c57] font-bold text-2xl">Connect with People</h2>
                    <div className="flex items-center space-x-2">
                      <button className="bg-[#e8c4d8]/50 text-[#6b4c57] px-4 py-2 rounded-xl text-sm hover:bg-[#e8c4d8] transition-colors">
                        Online Only
                      </button>
                      <button className="bg-white/80 text-[#6b4c57] px-4 py-2 rounded-xl text-sm hover:bg-white transition-colors border border-[#e8c4d8]">
                        All Users
                      </button>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name, username, or user ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-4 pl-12 border-2 border-[#e8c4d8] rounded-2xl text-base outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 backdrop-blur-sm focus:bg-white/80"
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9b7ba3] text-xl">🔍</span>
                  </div>
                  
                  {searchTerm && (
                    <p className="text-[#8b6b78] text-sm mt-2">
                      {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                  )}
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-white/40"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">{user.avatar}</span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            user.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[#6b4c57] font-bold text-sm">{user.displayName}</h3>
                          <p className="text-[#9b7ba3] text-xs">@{user.username}</p>
                          <p className="text-[#8b6b78] text-xs">{user.lastSeen}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block w-2 h-2 rounded-full ${
                            user.status === 'online' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                          }`}></span>
                        </div>
                      </div>
                      <p className="text-[#8b6b78] text-xs leading-relaxed mb-3">{user.bio}</p>
                      <p className="text-[#9b7ba3] text-xs mb-3">ID: {user.userId}</p>
                      
                      {sentRequests.has(user.id) ? (
                        <button 
                          disabled
                          className="w-full bg-gray-300 text-gray-600 p-2 rounded-xl text-sm font-medium cursor-not-allowed"
                        >
                          ✓ Request Sent
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleSendFriendRequest(user)}
                          className="w-full bg-gradient-to-r from-[#e8a7b8]/80 to-[#d4a5c4]/80 text-white p-2 rounded-xl text-sm font-medium hover:from-[#e8a7b8] hover:to-[#d4a5c4] transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          � Send Friend Request
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {filteredUsers.length === 0 && searchTerm && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white text-3xl">🔍</span>
                    </div>
                    <h3 className="text-[#6b4c57] font-bold text-xl mb-2">No Users Found</h3>
                    <p className="text-[#8b6b78] mb-4">Try searching with a different term.</p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white px-6 py-3 rounded-2xl font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
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

export default UserSelection;
