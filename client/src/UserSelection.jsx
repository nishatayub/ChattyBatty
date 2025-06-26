import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSelection() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sentRequests, setSentRequests] = useState(new Set());
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem('chattieUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setCurrentUser(userData);
      } catch {
        // Handle legacy string format
        const userObject = {
          username: storedUser.toLowerCase().replace(/\s+/g, '_'),
          displayName: storedUser,
          avatar: storedUser.charAt(0).toUpperCase(),
          status: 'online',
          userId: `user_${Date.now()}`
        };
        setCurrentUser(userObject);
        // Update localStorage with new format
        localStorage.setItem('chattieUser', JSON.stringify(userObject));
      }
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

  // Filter users based on search term and online status filter
  useEffect(() => {
    let filtered = onlineUsers;
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(user =>
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply online status filter
    if (showOnlineOnly) {
      filtered = filtered.filter(user => user.status === 'online');
    }
    
    setFilteredUsers(filtered);
  }, [onlineUsers, searchTerm, showOnlineOnly]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewRequests = () => {
    navigate('/requests');
  };

  const handleCreateGroup = () => {
    navigate('/groups');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleSendFriendRequest = (user) => {
    // Add user to sent requests
    setSentRequests(prev => new Set([...prev, user.id]));
    
    // Here you would typically send this to your backend
    console.log(`Friend request sent to ${user.displayName}`);
    
    // You could also show a toast notification here
    alert(`Friend request sent to ${user.displayName}!`);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5e6ea] via-[#e8d5e3] to-[#d4c5d8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <span className="text-white text-2xl">⏳</span>
          </div>
          <p className="text-[#6b4c57] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ea] via-[#e8d5e3] to-[#d4c5d8] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#e8a7b8]/20 to-[#d4a5c4]/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#c4a1a8]/25 to-[#9b7ba3]/35 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-[#f0c1d4]/15 to-[#e8a7b8]/25 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button 
                  onClick={handleBackToHome}
                  className="text-xl sm:text-2xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-2 rounded-xl transition-colors"
                >
                  ←
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#9b7ba3] to-[#c4a1a8] rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-base sm:text-lg">C</span>
                  </div>
                  <div>
                    <h1 className="text-[#6b4c57] font-bold text-xl sm:text-2xl">Find People</h1>
                    <p className="text-[#9b7ba3] text-xs sm:text-sm">Welcome, {currentUser.displayName}!</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="text-left sm:text-right">
                  <p className="text-[#6b4c57] text-sm font-medium">{filteredUsers.filter(u => u.status === 'online').length} users online</p>
                  <p className="text-[#9b7ba3] text-xs">Find someone to connect with</p>
                </div>
                <button 
                  onClick={handleViewRequests}
                  className="bg-gradient-to-r from-[#c4a1a8] to-[#9b7ba3] text-white px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium hover:from-[#b891a0] hover:to-[#8b6b8a] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  📨 Requests
                </button>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base sm:text-lg">{currentUser.avatar}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20">
                <h2 className="text-[#6b4c57] font-bold text-base sm:text-lg mb-3 sm:mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                  <button className="w-full bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white p-3 rounded-xl sm:rounded-2xl font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base">
                    🔍 Find Friends
                  </button>
                  <button 
                    onClick={handleCreateGroup}
                    className="w-full bg-white/80 text-[#6b4c57] p-3 rounded-xl sm:rounded-2xl font-medium hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-[#e8c4d8] text-sm sm:text-base"
                  >
                    👥 Create Group
                  </button>
                  <button 
                    onClick={handleSettings}
                    className="w-full bg-white/80 text-[#6b4c57] p-3 rounded-xl sm:rounded-2xl font-medium hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-[#e8c4d8] text-sm sm:text-base"
                  >
                    ⚙️ Settings
                  </button>
                </div>

                {/* Status */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#e8c4d8]/50">
                  <h3 className="text-[#6b4c57] font-medium text-sm mb-3">Your Status</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#e8a7b8] rounded-full animate-pulse"></div>
                    <span className="text-[#8b6b78] text-sm">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User List */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20">
                
                {/* Search Section */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                    <h2 className="text-[#6b4c57] font-bold text-xl sm:text-2xl">Connect with People</h2>
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <button 
                        onClick={() => setShowOnlineOnly(true)}
                        className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-colors font-medium ${
                          showOnlineOnly 
                            ? 'bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white' 
                            : 'bg-gradient-to-r from-[#e8a7b8]/50 to-[#d4a5c4]/50 text-[#6b4c57] hover:from-[#e8a7b8]/70 hover:to-[#d4a5c4]/70'
                        }`}
                      >
                        Online Only
                      </button>
                      <button 
                        onClick={() => setShowOnlineOnly(false)}
                        className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-colors font-medium border ${
                          !showOnlineOnly 
                            ? 'bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white border-transparent' 
                            : 'bg-white/80 text-[#6b4c57] border-[#e8c4d8] hover:bg-white'
                        }`}
                      >
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
                      className="w-full p-3 sm:p-4 pl-10 sm:pl-12 border-2 border-[#e8c4d8] rounded-xl sm:rounded-2xl text-sm sm:text-base outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 backdrop-blur-sm focus:bg-white/80"
                    />
                    <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#9b7ba3] text-lg sm:text-xl">🔍</span>
                  </div>
                  
                  {searchTerm && (
                    <p className="text-[#8b6b78] text-sm mt-2">
                      {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                  )}
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto custom-scrollbar">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-white/40"
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                        <div className="relative">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm sm:text-lg">{user.avatar}</span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${
                            user.status === 'online' ? 'bg-[#e8a7b8]' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[#6b4c57] font-bold text-xs sm:text-sm truncate">{user.displayName}</h3>
                          <p className="text-[#9b7ba3] text-xs truncate">@{user.username}</p>
                          <p className="text-[#8b6b78] text-xs">{user.lastSeen}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={`inline-block w-2 h-2 rounded-full ${
                            user.status === 'online' ? 'bg-[#e8a7b8] animate-pulse' : 'bg-gray-400'
                          }`}></span>
                        </div>
                      </div>
                      <p className="text-[#8b6b78] text-xs leading-relaxed mb-2 sm:mb-3 line-clamp-2">{user.bio}</p>
                      <p className="text-[#9b7ba3] text-xs mb-2 sm:mb-3 truncate">ID: {user.userId}</p>
                      
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
                          👥 Send Friend Request
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
                    <p className="text-[#8b6b78] mb-4">Try searching with a different term or adjust your filters.</p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white px-6 py-3 rounded-2xl font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Clear Search
                    </button>
                  </div>
                )}

                {filteredUsers.length === 0 && !searchTerm && showOnlineOnly && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white text-3xl">😴</span>
                    </div>
                    <h3 className="text-[#6b4c57] font-bold text-xl mb-2">No Online Users</h3>
                    <p className="text-[#8b6b78] mb-4">Nobody is currently online. Try checking back later or view all users.</p>
                    <button 
                      onClick={() => setShowOnlineOnly(false)}
                      className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white px-6 py-3 rounded-2xl font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Show All Users
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
