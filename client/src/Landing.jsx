import React, { useState } from 'react';
import Chat from './Chat';

function Landing() {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <Chat />;
  }

  return (
    <div className="min-h-screen bg-[#f4e4e8] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-coral-200/40 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-pink-300/20 rounded-full blur-xl"></div>
      </div>

      {/* Header */}
      <header className="z-10 bg-white/80 backdrop-blur-md border-b border-pink-100/50 sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <span className="text-[#6b5b73] font-bold text-2xl">Chattie</span>
                <div className="text-xs text-[#8b7a8a] font-medium">Connect Everyone</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-[#6b5b73] hover:text-purple-600 font-medium transition-colors duration-300 relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#testimonials" className="text-[#6b5b73] hover:text-purple-600 font-medium transition-colors duration-300 relative group">
                Reviews
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#faq" className="text-[#6b5b73] hover:text-purple-600 font-medium transition-colors duration-300 relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#developer" className="text-[#6b5b73] hover:text-purple-600 font-medium transition-colors duration-300 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowChat(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <span className="text-lg">🚀</span>
              </button>
              
              {/* Mobile menu button */}
              <button className="md:hidden w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#6b5b73] hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#6b5b73] leading-tight">
                Connect with
                <span className="block text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                  Everyone
                </span>
                <span className="block">Instantly!</span>
              </h1>
              <p className="text-lg text-[#8b7a8a] leading-relaxed max-w-md">
                A world without communication is meaningless. Join millions of people 
                connecting and sharing moments through Chattie.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowChat(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Messaging
              </button>
              <button className="border-2 border-pink-300 text-[#6b5b73] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-pink-50 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6b5b73]">10K+</div>
                <div className="text-sm text-[#8b7a8a]">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6b5b73]">1M+</div>
                <div className="text-sm text-[#8b7a8a]">Messages Sent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6b5b73]">24/7</div>
                <div className="text-sm text-[#8b7a8a]">Online Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockups */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              
              {/* Main Phone */}
              <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-b from-[#6b5b73] to-[#8b7a8a] rounded-[2rem] p-6 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Chattie</h3>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Chat illustration */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-end">
                      <div className="bg-pink-500 rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                        <p className="text-sm">Hey! How are you doing? 😊</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white/20 rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                        <p className="text-sm">Great! Just finished work 🎉</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-pink-500 rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                        <p className="text-sm">Awesome! Let's catch up soon!</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-4">Real-time messaging made simple</p>
                    <div className="bg-pink-500 rounded-xl py-3 px-6 font-semibold hover:bg-pink-600 transition-colors cursor-pointer">
                      Start Chatting
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl animate-bounce">
                💬
              </div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-lg animate-pulse">
                ❤️
              </div>
              <div className="absolute top-20 -right-12 w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl animate-ping">
                ✨
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mt-24 text-center">
          <h2 className="text-4xl font-bold text-[#6b5b73] mb-12">Why Choose Chattie?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/80 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
                🚀
              </div>
              <h3 className="text-xl font-bold text-[#6b5b73] mb-4">Lightning Fast</h3>
              <p className="text-[#8b7a8a]">Messages delivered instantly with our advanced real-time technology.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/80 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
                🔒
              </div>
              <h3 className="text-xl font-bold text-[#6b5b73] mb-4">Secure & Private</h3>
              <p className="text-[#8b7a8a]">Your conversations are encrypted and your privacy is our top priority.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/80 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
                🌍
              </div>
              <h3 className="text-xl font-bold text-[#6b5b73] mb-4">Global Reach</h3>
              <p className="text-[#8b7a8a]">Connect with people from around the world, anytime, anywhere.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#6b5b73] mb-4">What Our Users Say</h2>
            <p className="text-lg text-[#8b7a8a] max-w-2xl mx-auto">
              Join thousands of happy users who've made Chattie their go-to messaging platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-[#6b5b73]">Sarah Johnson</h4>
                  <p className="text-sm text-[#8b7a8a]">Marketing Manager</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <p className="text-[#8b7a8a] italic">
                "Chattie has revolutionized how our team communicates. The interface is so intuitive and the real-time messaging is lightning fast!"
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-[#6b5b73]">Mike Chen</h4>
                  <p className="text-sm text-[#8b7a8a]">Software Developer</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <p className="text-[#8b7a8a] italic">
                "As a developer, I appreciate the clean code and smooth performance. Chattie never lags, even with hundreds of messages!"
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/90 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  E
                </div>
                <div>
                  <h4 className="font-semibold text-[#6b5b73]">Emma Davis</h4>
                  <p className="text-sm text-[#8b7a8a]">Student</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <p className="text-[#8b7a8a] italic">
                "Perfect for staying connected with friends! The design is beautiful and it's so easy to use. Love the emoji reactions! 💕"
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#6b5b73] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[#8b7a8a] max-w-2xl mx-auto">
              Got questions? We've got answers! Here are some common questions about Chattie.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 transition-all duration-300">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-xl font-semibold text-[#6b5b73]">Is Chattie free to use?</h3>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  +
                </div>
              </div>
              <p className="text-[#8b7a8a] mt-4 leading-relaxed">
                Yes! Chattie is completely free to use. We believe communication should be accessible to everyone. 
                Premium features may be added in the future, but core messaging will always remain free.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 transition-all duration-300">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-xl font-semibold text-[#6b5b73]">How secure are my messages?</h3>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  +
                </div>
              </div>
              <p className="text-[#8b7a8a] mt-4 leading-relaxed">
                Your privacy is our top priority. All messages are encrypted and stored securely. 
                We never share your personal information with third parties.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 transition-all duration-300">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-xl font-semibold text-[#6b5b73]">Can I use Chattie on mobile?</h3>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  +
                </div>
              </div>
              <p className="text-[#8b7a8a] mt-4 leading-relaxed">
                Absolutely! Chattie is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile. 
                Mobile apps are coming soon!
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 transition-all duration-300">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-xl font-semibold text-[#6b5b73]">How many people can join a chat?</h3>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  +
                </div>
              </div>
              <p className="text-[#8b7a8a] mt-4 leading-relaxed">
                Currently, Chattie supports group conversations with unlimited participants. 
                Whether it's a small team or a large community, everyone can join the conversation!
              </p>
            </div>
          </div>
        </section>

        {/* About Developer Section */}
        <section id="developer" className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#6b5b73] mb-4">Meet the Developer 👋</h2>
            <p className="text-lg text-[#8b7a8a]">
              The creative mind behind your new favorite chat app!
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-white/90 to-pink-50/80 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border-2 border-pink-100/50">
              <div className="flex flex-col md:flex-row items-center gap-8">
                
                {/* Avatar & Basic Info */}
                <div className="text-center md:text-left">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold hover:scale-110 transition-transform duration-300 mx-auto md:mx-0">
                      N
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-lg animate-pulse">
                      ✨
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#6b5b73] mt-4 mb-2">Nishat Ayub</h3>
                  <p className="text-lg text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text font-semibold mb-4">
                    Full Stack Developer 🚀
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center md:justify-start space-x-3">
                    <a href="#" className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg hover:scale-110 transition-transform duration-300">
                      🐙
                    </a>
                    <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-lg hover:scale-110 transition-transform duration-300">
                      💼
                    </a>
                    <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-lg hover:scale-110 transition-transform duration-300">
                      🐦
                    </a>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="flex-1 space-y-4">
                  <div className="bg-gradient-to-r from-pink-100/70 to-purple-100/70 rounded-2xl p-4 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">💡</span>
                      <h4 className="font-bold text-[#6b5b73]">The Vision</h4>
                    </div>
                    <p className="text-[#8b7a8a] text-sm leading-relaxed">
                      "Making communication beautiful, simple, and accessible to everyone!"
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-100/70 to-green-100/70 rounded-2xl p-4 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🎯</span>
                      <h4 className="font-bold text-[#6b5b73]">The Mission</h4>
                    </div>
                    <p className="text-[#8b7a8a] text-sm leading-relaxed">
                      "3+ years crafting user experiences that bring people closer together."
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-100/70 to-orange-100/70 rounded-2xl p-4 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🎸</span>
                      <h4 className="font-bold text-[#6b5b73]">Fun Side</h4>
                    </div>
                    <p className="text-[#8b7a8a] text-sm leading-relaxed">
                      "Coffee addict ☕, guitar player 🎸, and always dreaming up the next big idea!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6 pt-6 border-t border-pink-200/50">
                <p className="text-center text-[#8b7a8a] text-sm mb-3">Built with love using:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">React ⚛️</span>
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">Node.js 🟢</span>
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium">MongoDB 🍃</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">Socket.IO ⚡</span>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">Tailwind 🎨</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-24 bg-gradient-to-r from-[#6b5b73] to-[#8b7a8a] text-white">
        <div className="container mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <span className="text-white font-bold text-2xl">Chattie</span>
                  <div className="text-sm text-pink-200 font-medium">Connect Everyone</div>
                </div>
              </div>
              <p className="text-pink-100 leading-relaxed max-w-md mb-6">
                Making the world more connected, one message at a time. Join millions of users 
                who trust Chattie for their daily conversations.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <span className="text-lg">🐙</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <span className="text-lg">💼</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <span className="text-lg">🐦</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <span className="text-lg">📱</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-pink-200">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-pink-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Features</a></li>
                <li><a href="#testimonials" className="text-pink-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Testimonials</a></li>
                <li><a href="#faq" className="text-pink-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">FAQ</a></li>
                <li><a href="#developer" className="text-pink-100 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">About Developer</a></li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-pink-200">Get in Touch</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="text-pink-300">📧</span>
                  <span className="text-pink-100 text-sm">hello@chattie.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-pink-300">💬</span>
                  <span className="text-pink-100 text-sm">Live Support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-pink-300">📱</span>
                  <span className="text-pink-100 text-sm">Mobile Apps Soon</span>
                </li>
                <li>
                  <button 
                    onClick={() => setShowChat(true)}
                    className="mt-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                  >
                    Try Chattie Now 🚀
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-white/20 pt-8 mb-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-pink-200 mb-1">10K+</div>
                <div className="text-sm text-pink-100">Happy Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-200 mb-1">1M+</div>
                <div className="text-sm text-pink-100">Messages Sent</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-200 mb-1">99.9%</div>
                <div className="text-sm text-pink-100">Uptime</div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-pink-100 text-sm">
              © 2025 Chattie. Made with ❤️ by Nishat Ayub. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-pink-100 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-pink-100 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-pink-100 hover:text-white transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
