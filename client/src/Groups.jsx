import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Groups() {
  const [currentUser, setCurrentUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('chattieUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    setCurrentUser(JSON.parse(userData));
    
    // Mock groups data
    const mockGroups = [
      {
        id: 1,
        name: 'React Developers',
        description: 'A group for React enthusiasts to share tips and tricks',
        members: 12,
        lastActivity: '2 hours ago',
        avatar: 'R',
        isOwner: true
      },
      {
        id: 2,
        name: 'UI/UX Designers',
        description: 'Design inspiration and feedback community',
        members: 8,
        lastActivity: '1 day ago',
        avatar: 'U',
        isOwner: false
      }
    ];
    
    setGroups(mockGroups);
  }, [navigate]);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (newGroupName.trim()) {
      const newGroup = {
        id: Date.now(),
        name: newGroupName.trim(),
        description: 'New group created by ' + currentUser.displayName,
        members: 1,
        lastActivity: 'Just now',
        avatar: newGroupName.charAt(0).toUpperCase(),
        isOwner: true
      };
      setGroups([newGroup, ...groups]);
      setNewGroupName('');
      setShowCreateForm(false);
    }
  };

  const handleOpenChat = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  const handleManageGroup = (groupId) => {
    navigate(`/group/${groupId}?tab=settings`);
  };

  const handleBackToUsers = () => {
    navigate('/users');
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
        <div className="max-w-6xl mx-auto">
          
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
                    <span className="text-white font-bold text-base md:text-lg">👥</span>
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-[#6b4c57] font-bold text-lg md:text-2xl truncate">Groups</h1>
                    <p className="text-[#9b7ba3] text-xs md:text-sm truncate">Manage your groups, {currentUser.displayName}!</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white px-3 md:px-4 py-2 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="hidden sm:inline">➕ Create Group</span>
                  <span className="sm:hidden">➕</span>
                </button>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm md:text-lg">{currentUser.avatar}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Create Group Form */}
          {showCreateForm && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-6 mb-4 md:mb-6 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#6b4c57] font-bold text-lg md:text-xl">Create New Group</h2>
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-1.5 md:p-2 rounded-xl transition-colors"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleCreateGroup} className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <input
                  type="text"
                  placeholder="Enter group name..."
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="flex-1 p-3 border-2 border-[#e8c4d8] rounded-xl md:rounded-2xl outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 backdrop-blur-sm focus:bg-white/80"
                  required
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white px-4 md:px-6 py-3 rounded-xl md:rounded-2xl font-medium text-sm md:text-base hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Create
                </button>
              </form>
            </div>
          )}

          {/* Groups List */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border border-white/20">
            {groups.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl md:text-3xl">👥</span>
                </div>
                <h3 className="text-[#6b4c57] font-bold text-lg md:text-xl mb-2">No Groups Yet</h3>
                <p className="text-[#8b6b78] mb-4 text-sm md:text-base px-4">Create your first group to start connecting with multiple people!</p>
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-medium text-sm md:text-base hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Create Your First Group
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-[#6b4c57] font-bold text-lg md:text-xl">Your Groups</h2>
                  <span className="bg-gradient-to-r from-[#e8a7b8]/20 to-[#d4a5c4]/20 text-[#6b4c57] px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                    {groups.length} group{groups.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/40 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                          <span className="text-white font-bold text-base md:text-lg">{group.avatar}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[#6b4c57] font-bold text-base md:text-lg truncate flex-1">{group.name}</h3>
                            {group.isOwner && (
                              <span className="bg-gradient-to-r from-[#e8a7b8]/20 to-[#d4a5c4]/20 text-[#6b4c57] px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0">
                                Owner
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[#8b6b78] text-sm mb-3 leading-relaxed line-clamp-2">
                            {group.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-[#9b7ba3] mb-3">
                            <span>{group.members} member{group.members !== 1 ? 's' : ''}</span>
                            <span>{group.lastActivity}</span>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <button 
                              onClick={() => handleOpenChat(group.id)}
                              className="bg-gradient-to-r from-[#e8a7b8]/80 to-[#d4a5c4]/80 text-white px-3 py-1 rounded-xl text-xs font-medium hover:from-[#e8a7b8] hover:to-[#d4a5c4] transition-all duration-300"
                            >
                              💬 Open Chat
                            </button>
                            {group.isOwner && (
                              <button 
                                onClick={() => handleManageGroup(group.id)}
                                className="bg-white/80 text-[#6b4c57] px-3 py-1 rounded-xl text-xs font-medium hover:bg-white transition-all duration-300 border border-[#e8c4d8]"
                              >
                                ⚙️ Manage
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

export default Groups;
