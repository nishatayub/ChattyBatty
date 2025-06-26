import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

function GroupChat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [group, setGroup] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [members, setMembers] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [searchParams] = useSearchParams();

  // Auto-responses for different members
  const memberResponses = {
    'alex_dev': [
      "Great point! I've been working on something similar 💻",
      "That's exactly what we need for the project!",
      "Let me check the docs and get back to you",
      "Agreed! React 19 has some amazing features"
    ],
    'sarah_ui': [
      "Love the design approach! 🎨",
      "From a UX perspective, that makes perfect sense",
      "We should consider the user journey here",
      "The accessibility implications are important too"
    ],
    'mike_nomad': [
      "Working remotely, I've seen this pattern before",
      "That would work great for our use case",
      "I'm traveling but can jump on a call later",
      "Sounds good from my experience!"
    ],
    'emma_marketing': [
      "From a marketing standpoint, this is brilliant! 📈",
      "Our users would definitely love this feature",
      "Let's think about how to promote this",
      "Great idea for improving user engagement!"
    ],
    'david_fullstack': [
      "I can handle the backend implementation for this",
      "The database structure would need some adjustments",
      "Performance-wise, this should work well",
      "Let me write some tests for this functionality"
    ]
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Mock group members data
    const mockMembers = [
      { id: 1, username: 'alex_dev', displayName: 'Alex Johnson', avatar: 'A', role: 'owner', isOnline: true },
      { id: 2, username: 'sarah_ui', displayName: 'Sarah Davis', avatar: 'S', role: 'admin', isOnline: true },
      { id: 3, username: 'mike_nomad', displayName: 'Mike Chen', avatar: 'M', role: 'member', isOnline: false },
      { id: 4, username: 'emma_marketing', displayName: 'Emma Wilson', avatar: 'E', role: 'member', isOnline: true },
      { id: 5, username: 'david_fullstack', displayName: 'David Rodriguez', avatar: 'D', role: 'member', isOnline: true }
    ];

    // Mock group data
    const mockGroups = {
      1: {
        id: 1,
        name: 'React Developers',
        description: 'A group for React enthusiasts to share tips and tricks',
        members: 12,
        avatar: 'R'
      },
      2: {
        id: 2,
        name: 'UI/UX Designers',
        description: 'Design inspiration and feedback community',
        members: 8,
        avatar: 'U'
      }
    };

    // Get current user and group data
    const userData = localStorage.getItem('chattieUser');
    if (!userData) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);
    setCurrentUser(user);
    setGroup(mockGroups[groupId]);
    setMembers(mockMembers);

    // Check if settings tab should be opened from URL parameter
    const tab = searchParams.get('tab');
    if (tab === 'settings') {
      setShowSettings(true);
    }

    // Load existing messages from localStorage
    const chatKey = `group_chat_${groupId}`;
    const storedMessages = localStorage.getItem(chatKey);
    
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      // Add initial group messages
      const initialMessages = [
        {
          id: 1,
          senderId: 'alex_dev',
          senderName: 'Alex Johnson',
          text: `Welcome to ${mockGroups[groupId]?.name}! 👋`,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          type: 'received',
          avatar: 'A'
        },
        {
          id: 2,
          senderId: 'sarah_ui',
          senderName: 'Sarah Davis',
          text: "Hey everyone! Excited to collaborate with you all! 🎨",
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          type: 'received',
          avatar: 'S'
        },
        {
          id: 3,
          senderId: 'david_fullstack',
          senderName: 'David Rodriguez',
          text: "Looking forward to building something awesome together! 💻",
          timestamp: new Date(Date.now() - 900000).toISOString(),
          type: 'received',
          avatar: 'D'
        }
      ];
      setMessages(initialMessages);
      localStorage.setItem(chatKey, JSON.stringify(initialMessages));
    }
  }, [navigate, groupId, searchParams]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate group member responses
  const simulateGroupResponse = () => {
    // Show typing indicator
    setIsTyping(true);

    // Simulate typing delay
    const typingDelay = Math.random() * 3000 + 1000;

    setTimeout(() => {
      setIsTyping(false);
      
      // Randomly select a member to respond (excluding current user)
      const availableMembers = Object.keys(memberResponses).filter(
        username => username !== currentUser?.username
      );
      const randomMember = availableMembers[Math.floor(Math.random() * availableMembers.length)];
      const memberData = members.find(m => m.username === randomMember);
      
      // Get a random response for this member
      const responses = memberResponses[randomMember];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const response = {
        id: Date.now(),
        senderId: randomMember,
        senderName: memberData?.displayName || randomMember,
        text: randomResponse,
        timestamp: new Date().toISOString(),
        type: 'received',
        avatar: memberData?.avatar || randomMember.charAt(0).toUpperCase()
      };

      setMessages(prev => {
        const newMessages = [...prev, response];
        const chatKey = `group_chat_${groupId}`;
        localStorage.setItem(chatKey, JSON.stringify(newMessages));
        return newMessages;
      });
    }, typingDelay);
  };

  const sendMessage = () => {
    if (message.trim() && currentUser && group) {
      const newMessage = {
        id: Date.now(),
        senderId: currentUser.username || currentUser.userId,
        senderName: currentUser.displayName,
        text: message.trim(),
        timestamp: new Date().toISOString(),
        type: 'sent',
        avatar: currentUser.avatar
      };

      setMessages(prev => {
        const newMessages = [...prev, newMessage];
        const chatKey = `group_chat_${groupId}`;
        localStorage.setItem(chatKey, JSON.stringify(newMessages));
        return newMessages;
      });

      // Simulate group member response
      simulateGroupResponse(message.trim());
      
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleBack = () => {
    navigate('/groups');
  };

  const handleKickMember = (memberId) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
    alert('Member has been removed from the group');
  };

  const handleLeaveGroup = () => {
    if (window.confirm('Are you sure you want to leave this group?')) {
      navigate('/groups');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentUser || !group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5e6ea] via-[#e8d5e3] to-[#d4c5d8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <span className="text-white text-2xl">⏳</span>
          </div>
          <p className="text-[#6b4c57] font-medium">Loading group chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ea] via-[#e8d5e3] to-[#d4c5d8] flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="p-2 md:p-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
              <button 
                onClick={handleBack}
                className="text-xl md:text-2xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-1.5 md:p-2 rounded-xl transition-colors flex-shrink-0"
              >
                ←
              </button>
              
              <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-white font-bold text-sm md:text-lg">
                    {group.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-[#6b4c57] font-bold text-lg md:text-xl truncate">
                    {group.name}
                  </h1>
                  <p className="text-[#9b7ba3] text-sm truncate">
                    {members.filter(m => m.isOnline).length} online • {members.length} members
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
              <div className="flex space-x-1 md:space-x-2">
                <button className="text-base md:text-xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-1.5 md:p-2 rounded-xl transition-colors">📹</button>
                <button className="text-base md:text-xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-1.5 md:p-2 rounded-xl transition-colors">📞</button>
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-base md:text-xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-1.5 md:p-2 rounded-xl transition-colors"
                >
                  ⚙️
                </button>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm md:text-base">
                  {currentUser.avatar || currentUser.displayName?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-lg">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Members Section */}
              <div className="flex-1">
                <h3 className="text-[#6b4c57] font-bold text-lg mb-4">Group Members ({members.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{member.avatar}</span>
                          </div>
                          {member.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <p className="text-[#6b4c57] font-medium text-sm">{member.displayName}</p>
                          <p className="text-[#9b7ba3] text-xs capitalize">{member.role}</p>
                        </div>
                      </div>
                      {member.role !== 'owner' && member.username !== currentUser?.username && (
                        <button 
                          onClick={() => handleKickMember(member.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Section */}
              <div className="lg:w-80">
                <h3 className="text-[#6b4c57] font-bold text-lg mb-4">Group Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white p-3 rounded-xl font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300">
                    📱 Invite Members
                  </button>
                  <button className="w-full bg-white/80 text-[#6b4c57] p-3 rounded-xl font-medium hover:bg-white transition-all duration-300 border border-[#e8c4d8]">
                    📋 Group Info
                  </button>
                  <button 
                    onClick={handleLeaveGroup}
                    className="w-full bg-red-100 text-red-600 p-3 rounded-xl font-medium hover:bg-red-200 transition-all duration-300"
                  >
                    🚪 Leave Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-2 md:p-6 space-y-3 md:space-y-4">
          <div className="max-w-7xl mx-auto space-y-3 md:space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl ${
                  msg.type === 'sent' 
                    ? 'bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white rounded-2xl rounded-br-md' 
                    : 'bg-white/80 backdrop-blur-sm text-[#6b4c57] rounded-2xl rounded-bl-md border border-white/40'
                } p-3 md:p-4 shadow-lg`}>
                  
                  {msg.type === 'received' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{msg.avatar}</span>
                      </div>
                      <span className="text-[#9b7ba3] text-xs font-medium">{msg.senderName}</span>
                    </div>
                  )}
                  
                  <p className="text-sm md:text-base leading-relaxed break-words">
                    {msg.text}
                  </p>
                  <p className={`text-xs mt-2 ${
                    msg.type === 'sent' ? 'text-white/80' : 'text-[#9b7ba3]'
                  }`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/80 backdrop-blur-sm text-[#6b4c57] rounded-2xl rounded-bl-md border border-white/40 p-3 md:p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#9b7ba3] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#9b7ba3] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#9b7ba3] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-[#9b7ba3]">Someone is typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white/80 backdrop-blur-lg border-t border-white/20 p-2 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end space-x-2 md:space-x-3">
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${group.name}...`}
                  className="w-full p-3 md:p-4 border-2 border-[#e8c4d8] rounded-xl md:rounded-2xl resize-none text-sm md:text-base outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 backdrop-blur-sm focus:bg-white/80 min-h-[44px] max-h-32"
                  rows="1"
                  style={{ lineHeight: '1.4' }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white p-3 md:p-4 rounded-xl md:rounded-2xl hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex-shrink-0"
              >
                <span className="text-lg md:text-xl">➤</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupChat;
