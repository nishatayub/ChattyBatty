import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatInterface() {
  const [currentUser, setCurrentUser] = useState('');
  const [targetUser, setTargetUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Predefined responses for the target user
  const autoResponses = [
    "That's interesting! Tell me more 😊",
    "I totally agree with you!",
    "Haha, that's funny! 😄",
    "What do you think about that?",
    "I'm doing great, thanks for asking!",
    "That sounds like a great idea!",
    "I've been thinking about that too",
    "You're absolutely right!",
    "That's a good point 🤔",
    "I'd love to hear more about this",
    "Thanks for sharing that with me!",
    "That's really cool! 🎉",
    "I appreciate you telling me that",
    "What's your plan for that?",
    "That reminds me of something similar"
  ];

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Get users from localStorage
    const storedUser = localStorage.getItem('chattieUser');
    const storedTargetUser = localStorage.getItem('chattieTargetUser');
    
    if (!storedUser || !storedTargetUser) {
      navigate('/chat');
      return;
    }
    
    try {
      const currentUserData = typeof storedUser === 'string' ? JSON.parse(storedUser) : storedUser;
      const targetUserData = typeof storedTargetUser === 'string' ? JSON.parse(storedTargetUser) : storedTargetUser;
      
      setCurrentUser(currentUserData);
      setTargetUser(targetUserData);

      // Load existing messages from localStorage if any
      const chatKey = `chat_${currentUserData.userId}_${targetUserData.userId}`;
      const storedMessages = localStorage.getItem(chatKey);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        // Add welcome message
        const welcomeMessage = {
          id: Date.now(),
          senderId: targetUserData.userId,
          senderName: targetUserData.displayName,
          text: `Hey ${currentUserData.displayName}! 👋 How are you doing?`,
          timestamp: new Date().toISOString(),
          type: 'received'
        };
        setMessages([welcomeMessage]);
        localStorage.setItem(chatKey, JSON.stringify([welcomeMessage]));
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/chat');
    }
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate target user typing and auto-response
  const simulateResponse = (userMessage) => {
    // Show typing indicator
    setIsTyping(true);

    // Simulate typing delay (1-3 seconds)
    const typingDelay = Math.random() * 2000 + 1000;

    setTimeout(() => {
      setIsTyping(false);
      
      // Generate response based on user message or use random response
      let responseText;
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        responseText = `Hello ${currentUser.displayName}! Great to hear from you! 😊`;
      } else if (lowerMessage.includes('how are you') || lowerMessage.includes('how\'s it going')) {
        responseText = "I'm doing fantastic! Thanks for asking. How about you?";
      } else if (lowerMessage.includes('thank')) {
        responseText = "You're very welcome! Happy to help anytime! 😄";
      } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
        responseText = "Take care! It was great chatting with you! 👋";
      } else if (lowerMessage.includes('?')) {
        responseText = "That's a great question! Let me think about that... 🤔";
      } else {
        // Use random response
        responseText = autoResponses[Math.floor(Math.random() * autoResponses.length)];
      }

      const response = {
        id: Date.now(),
        senderId: targetUser.userId,
        senderName: targetUser.displayName,
        text: responseText,
        timestamp: new Date().toISOString(),
        type: 'received'
      };

      setMessages(prev => {
        const newMessages = [...prev, response];
        // Save to localStorage
        const chatKey = `chat_${currentUser.userId}_${targetUser.userId}`;
        localStorage.setItem(chatKey, JSON.stringify(newMessages));
        return newMessages;
      });
    }, typingDelay);
  };

  const sendMessage = () => {
    if (message.trim() && currentUser && targetUser) {
      const newMessage = {
        id: Date.now(),
        senderId: currentUser.userId,
        senderName: currentUser.displayName,
        text: message.trim(),
        timestamp: new Date().toISOString(),
        type: 'sent'
      };

      setMessages(prev => {
        const newMessages = [...prev, newMessage];
        // Save to localStorage
        const chatKey = `chat_${currentUser.userId}_${targetUser.userId}`;
        localStorage.setItem(chatKey, JSON.stringify(newMessages));
        return newMessages;
      });

      // Simulate auto-response from target user
      simulateResponse(message.trim());
      
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
    navigate('/users');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentUser || !targetUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5e6ea] via-[#e8d5e3] to-[#d4c5d8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <span className="text-white text-2xl">⏳</span>
          </div>
          <p className="text-[#6b4c57] font-medium">Loading chat...</p>
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
                    {targetUser.avatar || targetUser.displayName?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-[#6b4c57] font-bold text-lg md:text-xl truncate">
                    {targetUser.displayName}
                  </h1>
                  <p className="text-[#9b7ba3] text-sm truncate">
                    @{targetUser.username} • Online
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
              <div className="flex space-x-1 md:space-x-2">
                <button className="text-base md:text-xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-1.5 md:p-2 rounded-xl transition-colors">📹</button>
                <button className="text-base md:text-xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-1.5 md:p-2 rounded-xl transition-colors">📞</button>
                <button className="hidden sm:block text-base md:text-xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-1.5 md:p-2 rounded-xl transition-colors">⚙️</button>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm md:text-base">
                  {currentUser && typeof currentUser === 'object' 
                    ? (currentUser.avatar || currentUser.displayName?.charAt(0) || currentUser.username?.charAt(0) || 'U').toUpperCase()
                    : (currentUser?.charAt(0) || 'U').toUpperCase()
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                    <span className="text-xs text-[#9b7ba3]">{targetUser.displayName} is typing...</span>
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
                  placeholder={`Message ${targetUser.displayName}...`}
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

export default ChatInterface;
