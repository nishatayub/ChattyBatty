import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState({});
  const [settings, setSettings] = useState({
    notifications: true,
    soundEnabled: true,
    onlineStatus: true,
    darkMode: false,
    language: 'English',
    privacy: 'friends',
    autoSave: true,
    messagePreview: true,
    emailNotifications: false,
    typingIndicator: true,
    readReceipts: true,
    lastSeen: true
  });

  useEffect(() => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem('chattieUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
      return;
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('chattieSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [navigate]);

  const handleBackToUsers = () => {
    navigate('/users');
  };

  const handleLogout = () => {
    localStorage.removeItem('chattieUser');
    localStorage.removeItem('chattieSettings');
    navigate('/login');
  };

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('chattieSettings', JSON.stringify(newSettings));
  };

  const handleEditProfile = () => {
    setTempProfile({ ...currentUser });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setCurrentUser(tempProfile);
    localStorage.setItem('chattieUser', JSON.stringify(tempProfile));
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setTempProfile({});
    setIsEditingProfile(false);
  };

  const updateProfile = (key, value) => {
    setTempProfile(prev => ({ ...prev, [key]: value }));
  };

  const resetAllSettings = () => {
    const defaultSettings = {
      notifications: true,
      soundEnabled: true,
      onlineStatus: true,
      darkMode: false,
      language: 'English',
      privacy: 'friends',
      autoSave: true,
      messagePreview: true,
      emailNotifications: false,
      typingIndicator: true,
      readReceipts: true,
      lastSeen: true
    };
    setSettings(defaultSettings);
    localStorage.setItem('chattieSettings', JSON.stringify(defaultSettings));
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ea] via-[#e8d5e3] to-[#d4c5d8] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#e8a7b8]/20 to-[#d4a5c4]/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#c4a1a8]/25 to-[#9b7ba3]/35 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-[#f0c1d4]/15 to-[#e8a7b8]/25 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6">
        <div className="max-w-8xl mx-auto"> {/* Made wider */}
          
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20 mb-6 sm:mb-8"> {/* Responsive padding */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button 
                  onClick={handleBackToUsers}
                  className="text-xl sm:text-2xl text-[#6b4c57] hover:bg-[#e8c4d8]/30 p-2 rounded-xl transition-colors"
                >
                  ←
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#9b7ba3] to-[#c4a1a8] rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-base sm:text-lg">⚙️</span>
                  </div>
                  <div>
                    <h1 className="text-[#6b4c57] font-bold text-xl sm:text-2xl">Settings</h1>
                    <p className="text-[#9b7ba3] text-xs sm:text-sm">Customize your ChattyBatty experience</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base sm:text-lg">{currentUser.avatar}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"> {/* Responsive grid and gaps */}
            
            {/* Profile Section */}
            <div className="lg:xl:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20 mb-4 sm:mb-6 lg:mb-8"> {/* Responsive padding */}
                <h2 className="text-[#6b4c57] font-bold text-lg sm:text-xl mb-4 sm:mb-6">Profile</h2> {/* Responsive text size */}
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg mx-auto mb-4 sm:mb-6"> {/* Responsive avatar size */}
                    <span className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">{isEditingProfile ? tempProfile.avatar : currentUser.avatar}</span> {/* Responsive text size */}
                  </div>
                  
                  {isEditingProfile ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={tempProfile.displayName || ''}
                        onChange={(e) => updateProfile('displayName', e.target.value)}
                        className="w-full p-3 border-2 border-[#e8c4d8] rounded-xl text-[#6b4c57] outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/80 text-center font-bold"
                        placeholder="Display Name"
                      />
                      <input
                        type="text"
                        value={tempProfile.username || ''}
                        onChange={(e) => updateProfile('username', e.target.value)}
                        className="w-full p-3 border-2 border-[#e8c4d8] rounded-xl text-[#6b4c57] outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/80 text-center"
                        placeholder="@username"
                      />
                      <input
                        type="text"
                        value={tempProfile.avatar || ''}
                        onChange={(e) => updateProfile('avatar', e.target.value)}
                        className="w-full p-3 border-2 border-[#e8c4d8] rounded-xl text-[#6b4c57] outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/80 text-center"
                        placeholder="Avatar (single letter)"
                        maxLength="1"
                      />
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <button 
                          onClick={handleSaveProfile}
                          className="flex-1 bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white p-3 rounded-xl font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300"
                        >
                          Save
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-xl font-medium hover:bg-gray-300 transition-all duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-[#6b4c57] font-bold text-lg sm:text-xl mb-2">{currentUser.displayName}</h3> {/* Responsive text size */}
                      <p className="text-[#9b7ba3] text-sm sm:text-base mb-4">@{currentUser.username}</p> {/* Responsive text size */}
                      <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
                        <div className="w-3 h-3 bg-[#e8a7b8] rounded-full animate-pulse"></div>
                        <span className="text-[#8b6b78] text-sm sm:text-base">Online</span> {/* Responsive text size */}
                      </div>
                      <button 
                        onClick={handleEditProfile}
                        className="w-full bg-gradient-to-r from-[#e8a7b8]/50 to-[#d4a5c4]/50 text-[#6b4c57] p-3 sm:p-4 rounded-2xl font-medium hover:from-[#e8a7b8]/70 hover:to-[#d4a5c4]/70 transition-all duration-300"
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions - Will be moved to bottom row */}
            </div>

            {/* Settings Content */}
            <div className="lg:xl:col-span-4">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {/* Left Column - Notifications & Privacy */}
                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                  {/* Notifications */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20">
                    <h3 className="text-[#6b4c57] font-bold text-xl sm:text-2xl mb-4 sm:mb-6">🔔 Notifications</h3>
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 lg:p-5 bg-white/50 rounded-xl sm:rounded-2xl space-y-3 sm:space-y-0">
                        <div>
                          <h4 className="text-[#6b4c57] font-medium text-base sm:text-lg">Push Notifications</h4>
                          <p className="text-[#8b6b78] text-sm sm:text-base">Receive notifications for new messages</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input 
                            type="checkbox" 
                            checked={settings.notifications}
                            onChange={(e) => updateSetting('notifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-6 sm:w-12 sm:h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:transition-all peer-checked:bg-[#e8a7b8]"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl">
                        <div>
                          <h4 className="text-[#6b4c57] font-medium text-lg">Sound Effects</h4>
                          <p className="text-[#8b6b78] text-base">Play sounds for notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settings.soundEnabled}
                            onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#e8a7b8]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl">
                        <div>
                          <h4 className="text-[#6b4c57] font-medium text-lg">Email Notifications</h4>
                          <p className="text-[#8b6b78] text-base">Receive email alerts for important updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settings.emailNotifications}
                            onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#e8a7b8]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl">
                        <div>
                          <h4 className="text-[#6b4c57] font-medium text-lg">Message Preview</h4>
                          <p className="text-[#8b6b78] text-base">Show message content in notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settings.messagePreview}
                            onChange={(e) => updateSetting('messagePreview', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#e8a7b8]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Privacy */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                    <h3 className="text-[#6b4c57] font-bold text-2xl mb-6">🔒 Privacy</h3>
                    <div className="space-y-6">
                      <div className="p-5 bg-white/50 rounded-2xl">
                        <h4 className="text-[#6b4c57] font-medium text-lg mb-3">Online Status</h4>
                        <p className="text-[#8b6b78] text-base mb-4">Show your online status to others</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settings.onlineStatus}
                            onChange={(e) => updateSetting('onlineStatus', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#e8a7b8]"></div>
                        </label>
                      </div>
                      
                      <div className="p-5 bg-white/50 rounded-2xl">
                        <h4 className="text-[#6b4c57] font-medium text-lg mb-3">Who can send you messages</h4>
                        <p className="text-[#8b6b78] text-base mb-4">Control who can start conversations with you</p>
                        <select 
                          value={settings.privacy}
                          onChange={(e) => updateSetting('privacy', e.target.value)}
                          className="w-full p-4 border-2 border-[#e8c4d8] rounded-xl text-[#6b4c57] outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 text-base"
                        >
                          <option value="everyone">Everyone</option>
                          <option value="friends">Friends Only</option>
                          <option value="nobody">Nobody</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl">
                        <div>
                          <h4 className="text-[#6b4c57] font-medium text-lg">Last Seen</h4>
                          <p className="text-[#8b6b78] text-base">Show when you were last active</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settings.lastSeen}
                            onChange={(e) => updateSetting('lastSeen', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#e8a7b8]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl">
                        <div>
                          <h4 className="text-[#6b4c57] font-medium text-lg">Read Receipts</h4>
                          <p className="text-[#8b6b78] text-base">Let others know when you've read their messages</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settings.readReceipts}
                            onChange={(e) => updateSetting('readReceipts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#e8a7b8]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Appearance & Advanced */}
                <div className="space-y-8">
                  {/* Appearance */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                    <h3 className="text-[#6b4c57] font-bold text-2xl mb-6">🎨 Appearance</h3>
                    <div className="space-y-6">
                      <div className="p-5 bg-white/50 rounded-2xl">
                        <h4 className="text-[#6b4c57] font-medium text-lg mb-3">Theme</h4>
                        <p className="text-[#8b6b78] text-base mb-4">Choose your preferred theme</p>
                        <div className="flex space-x-4">
                          <button 
                            onClick={() => updateSetting('darkMode', false)}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 text-base ${
                              !settings.darkMode 
                                ? 'border-[#e8a7b8] bg-[#e8a7b8]/20 text-[#6b4c57]' 
                                : 'border-gray-300 bg-white text-gray-600 hover:border-[#e8c4d8]'
                            }`}
                          >
                            ☀️ Light
                          </button>
                          <button 
                            onClick={() => updateSetting('darkMode', true)}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 text-base ${
                              settings.darkMode 
                                ? 'border-[#e8a7b8] bg-[#e8a7b8]/20 text-[#6b4c57]' 
                                : 'border-gray-300 bg-white text-gray-600 hover:border-[#e8c4d8]'
                            }`}
                          >
                            🌙 Dark
                          </button>
                        </div>
                      </div>

                      <div className="p-5 bg-white/50 rounded-2xl">
                        <h4 className="text-[#6b4c57] font-medium text-lg mb-3">Interface Language</h4>
                        <p className="text-[#8b6b78] text-base mb-4">Choose your preferred language</p>
                        <select 
                          value={settings.language}
                          onChange={(e) => updateSetting('language', e.target.value)}
                          className="w-full p-4 border-2 border-[#e8c4d8] rounded-xl text-[#6b4c57] outline-none focus:border-[#9b7ba3] transition-all duration-300 bg-white/60 text-base"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Español</option>
                          <option value="French">Français</option>
                          <option value="German">Deutsch</option>
                          <option value="Japanese">日本語</option>
                          <option value="Chinese">中文</option>
                          <option value="Korean">한국어</option>
                          <option value="Italian">Italiano</option>
                          <option value="Portuguese">Português</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Chat Features */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                    <h3 className="text-[#6b4c57] font-bold text-2xl mb-6">💬 Chat Features</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl">
                        <div>
                          <h4 className="text-[#6b4c57] font-medium text-lg">Typing Indicator</h4>
                          <p className="text-[#8b6b78] text-base">Show when you're typing to others</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settings.typingIndicator}
                            onChange={(e) => updateSetting('typingIndicator', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#e8a7b8]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl">
                        <div>
                          <h4 className="text-[#6b4c57] font-medium text-lg">Auto Save Drafts</h4>
                          <p className="text-[#8b6b78] text-base">Automatically save message drafts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settings.autoSave}
                            onChange={(e) => updateSetting('autoSave', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#e8a7b8]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Bottom Row - Quick Actions and Account & Data side by side */}
            <div className="lg:xl:col-span-5 mt-4 sm:mt-6 lg:mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {/* Quick Actions */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20">
                  <h2 className="text-[#6b4c57] font-bold text-lg sm:text-xl mb-4 sm:mb-6">Quick Actions</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <button 
                      onClick={handleBackToUsers}
                      className="w-full bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white p-3 sm:p-4 rounded-2xl font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                    >
                      👥 Find People
                    </button>
                    <button 
                      onClick={() => navigate('/requests')}
                      className="w-full bg-white/80 text-[#6b4c57] p-3 sm:p-4 rounded-2xl font-medium hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-[#e8c4d8] text-sm sm:text-base"
                    >
                      📨 Friend Requests
                    </button>
                    <button 
                      onClick={() => navigate('/groups')}
                      className="w-full bg-white/80 text-[#6b4c57] p-3 sm:p-4 rounded-2xl font-medium hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-[#e8c4d8] text-sm sm:text-base"
                    >
                      👥 Groups
                    </button>
                    <button 
                      onClick={resetAllSettings}
                      className="w-full bg-yellow-100 text-yellow-700 p-3 sm:p-4 rounded-2xl font-medium hover:bg-yellow-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-yellow-200 text-sm sm:text-base"
                    >
                      🔄 Reset Settings
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-red-100 text-red-600 p-3 sm:p-4 rounded-2xl font-medium hover:bg-red-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-red-200 text-sm sm:text-base"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>

                {/* Account & Data */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20">
                  <h3 className="text-[#6b4c57] font-bold text-lg sm:text-xl mb-4 sm:mb-6">📊 Account & Data</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <button className="w-full bg-gradient-to-r from-[#e8a7b8]/50 to-[#d4a5c4]/50 text-[#6b4c57] p-3 sm:p-4 rounded-2xl font-medium hover:from-[#e8a7b8]/70 hover:to-[#d4a5c4]/70 transition-all duration-300 text-sm sm:text-base text-left">
                      📥 Export Data
                    </button>
                    <button className="w-full bg-gradient-to-r from-[#e8a7b8]/50 to-[#d4a5c4]/50 text-[#6b4c57] p-3 sm:p-4 rounded-2xl font-medium hover:from-[#e8a7b8]/70 hover:to-[#d4a5c4]/70 transition-all duration-300 text-sm sm:text-base text-left">
                      🔄 Backup Settings
                    </button>
                    <button className="w-full bg-gradient-to-r from-[#e8a7b8]/50 to-[#d4a5c4]/50 text-[#6b4c57] p-3 sm:p-4 rounded-2xl font-medium hover:from-[#e8a7b8]/70 hover:to-[#d4a5c4]/70 transition-all duration-300 text-sm sm:text-base text-left">
                      📱 Connected Devices
                    </button>
                    <button className="w-full bg-orange-100 text-orange-600 p-3 sm:p-4 rounded-2xl font-medium hover:bg-orange-200 transition-all duration-300 border border-orange-200 text-sm sm:text-base text-left">
                      ⚠️ Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 3.5s ease-in-out infinite 0.5s; }
      `}</style>
    </div>
  );
}

export default Settings;
