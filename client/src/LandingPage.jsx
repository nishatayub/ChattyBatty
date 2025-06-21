import React, { useState } from 'react';
import Chat from './Chat';

function Landing() {
  const [showChat, setShowChat] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  if (showChat) {
    return <Chat />;
  }

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f5e6ea] relative overflow-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#e8c4d8]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9b7ba3] to-[#c4a1a8] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-[#6b4c57] font-bold text-xl">Chattie</h1>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`font-medium transition-colors ${activeSection === 'home' ? 'text-[#9b7ba3]' : 'text-[#6b4c57] hover:text-[#9b7ba3]'}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className={`font-medium transition-colors ${activeSection === 'features' ? 'text-[#9b7ba3]' : 'text-[#6b4c57] hover:text-[#9b7ba3]'}`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className={`font-medium transition-colors ${activeSection === 'testimonials' ? 'text-[#9b7ba3]' : 'text-[#6b4c57] hover:text-[#9b7ba3]'}`}
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className={`font-medium transition-colors ${activeSection === 'faq' ? 'text-[#9b7ba3]' : 'text-[#6b4c57] hover:text-[#9b7ba3]'}`}
              >
                FAQ
              </button>
              <button 
                onClick={() => setShowChat(true)}
                className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white px-6 py-2 rounded-2xl font-medium hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-24 h-24 bg-[#9b7ba3]/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-96 right-24 w-32 h-32 bg-[#c4a1a8]/15 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-[800px] left-32 w-20 h-20 bg-[#d4b5c4]/25 rounded-full blur-lg animate-float"></div>
        <div className="absolute top-[1200px] right-16 w-28 h-28 bg-[#a8869c]/20 rounded-full blur-xl animate-pulse-slow"></div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content - Hero Section */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-bold text-[#6b4c57] leading-tight">
                  A world without
                  <span className="block text-transparent bg-gradient-to-r from-[#c4a1a8] to-[#9b7ba3] bg-clip-text">
                    communication
                  </span>
                  <span className="block">is meaningless.</span>
                </h2>
                <p className="text-lg text-[#8b6b78] leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Connect with friends, family, and colleagues through beautiful, real-time conversations. 
                  Experience messaging like never before with our modern, intuitive platform.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setShowChat(true)}
                  className="bg-gradient-to-r from-[#e8a7b8] to-[#d4a5c4] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-[#e595aa] hover:to-[#c993b8] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                >
                  Start Messaging
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="bg-white/80 text-[#6b4c57] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Illustration */}
          <div className="relative flex items-center justify-center">
            
            {/* Central Illustration Circle */}
            <div className="relative w-80 h-80 bg-gradient-to-br from-[#9b7ba3] to-[#8b6b78] rounded-full flex items-center justify-center shadow-2xl">
              
              {/* Inner Content */}
              <div className="relative w-64 h-64 bg-gradient-to-br from-[#c4a1a8]/30 to-[#e8c4d8]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                
                {/* Chat Illustration */}
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">💬</div>
                  <div className="text-white font-bold text-xl">Real-time</div>
                  <div className="text-[#f5e6ea] text-lg">messaging made simple</div>
                </div>

                {/* Floating Chat Bubbles */}
                <div className="absolute -top-8 -left-8 w-16 h-10 bg-[#e8a7b8] rounded-2xl rounded-bl-none flex items-center justify-center shadow-lg animate-float-slow">
                  <span className="text-white text-sm font-medium">Hi! 👋</span>
                </div>
                
                <div className="absolute -bottom-6 -right-10 w-20 h-10 bg-white/90 rounded-2xl rounded-br-none flex items-center justify-center shadow-lg animate-float-delayed">
                  <span className="text-[#6b4c57] text-sm font-medium">Hello! 😊</span>
                </div>

                <div className="absolute top-12 -right-12 w-18 h-10 bg-[#d4a5c4] rounded-2xl rounded-tr-none flex items-center justify-center shadow-lg animate-float">
                  <span className="text-white text-sm font-medium">Great! ✨</span>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">📱</span>
                </div>
                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">💕</span>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#d4a5c4] to-[#a8869c] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🌟</span>
                </div>
                <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-[#9b7ba3] to-[#8b6b78] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">⚡</span>
                </div>
              </div>
            </div>

            {/* Floating Side Elements */}
            <div className="absolute -top-8 -left-16 w-20 h-20 bg-gradient-to-br from-[#f0d4e8] to-[#e8c4d8] rounded-3xl flex items-center justify-center shadow-xl animate-bounce-slow">
              <span className="text-[#6b4c57] text-2xl">🎨</span>
            </div>
            
            <div className="absolute -bottom-12 -right-20 w-16 h-16 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-2xl flex items-center justify-center shadow-xl animate-pulse-slow">
              <span className="text-white text-xl">🚀</span>
            </div>

            <div className="absolute top-20 -right-24 w-14 h-14 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center shadow-xl animate-ping-slow">
              <span className="text-white text-lg">✨</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-[#6b4c57]">10K+</div>
                <div className="text-[#8b6b78] font-medium">Happy Users</div>
                <div className="text-sm text-[#9b7ba3]">Connecting daily</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-[#6b4c57]">1M+</div>
                <div className="text-[#8b6b78] font-medium">Messages Sent</div>
                <div className="text-sm text-[#9b7ba3]">Every day</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-[#6b4c57]">99.9%</div>
                <div className="text-[#8b6b78] font-medium">Uptime</div>
                <div className="text-sm text-[#9b7ba3]">Always available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#6b4c57] mb-6">
              Why Choose <span className="text-transparent bg-gradient-to-r from-[#c4a1a8] to-[#9b7ba3] bg-clip-text">Chattie</span>?
            </h2>
            <p className="text-lg text-[#8b6b78] max-w-2xl mx-auto">
              Experience the next generation of messaging with features designed for modern communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-[#6b4c57] mb-3">Lightning Fast</h3>
              <p className="text-[#8b6b78] leading-relaxed">
                Real-time messaging with instant delivery. Your messages arrive faster than ever before.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-[#6b4c57] mb-3">Secure & Private</h3>
              <p className="text-[#8b6b78] leading-relaxed">
                End-to-end encryption ensures your conversations remain private and secure.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4a5c4] to-[#a8869c] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-[#6b4c57] mb-3">Beautiful Design</h3>
              <p className="text-[#8b6b78] leading-relaxed">
                Modern, clean interface that makes messaging a delightful experience.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9b7ba3] to-[#8b6b78] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-[#6b4c57] mb-3">Cross Platform</h3>
              <p className="text-[#8b6b78] leading-relaxed">
                Works seamlessly across all your devices - phone, tablet, and desktop.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e8c4d8] to-[#d4b5c4] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-[#6b4c57] mb-3">Global Reach</h3>
              <p className="text-[#8b6b78] leading-relaxed">
                Connect with anyone, anywhere in the world with reliable global infrastructure.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f0d4e8] to-[#e8a7b8] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-[#6b4c57] mb-3">Smart Features</h3>
              <p className="text-[#8b6b78] leading-relaxed">
                AI-powered suggestions, smart replies, and intuitive features that enhance your chats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-20 px-6 bg-gradient-to-br from-[#f5e6ea] to-[#e8c4d8]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#6b4c57] mb-6">
              What People <span className="text-transparent bg-gradient-to-r from-[#c4a1a8] to-[#9b7ba3] bg-clip-text">Say</span>
            </h2>
            <p className="text-lg text-[#8b6b78] max-w-2xl mx-auto">
              Join thousands of happy users who've transformed their communication experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#6b4c57]">Alex Johnson</h4>
                  <p className="text-sm text-[#9b7ba3]">Software Developer</p>
                </div>
              </div>
              <p className="text-[#8b6b78] italic">
                "Chattie has completely changed how I communicate with my team. The interface is beautiful and so intuitive!"
              </p>
              <div className="flex text-[#e8a7b8] text-xl mt-4">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#c4a1a8] to-[#9b7ba3] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#6b4c57]">Sarah Davis</h4>
                  <p className="text-sm text-[#9b7ba3]">Marketing Manager</p>
                </div>
              </div>
              <p className="text-[#8b6b78] italic">
                "I love the modern design and how smooth everything works. It's like having a conversation in person!"
              </p>
              <div className="flex text-[#e8a7b8] text-xl mt-4">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#d4a5c4] to-[#a8869c] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#6b4c57]">Mike Chen</h4>
                  <p className="text-sm text-[#9b7ba3]">Freelancer</p>
                </div>
              </div>
              <p className="text-[#8b6b78] italic">
                "Finally, a messaging app that's both powerful and beautiful. The real-time features are incredible!"
              </p>
              <div className="flex text-[#e8a7b8] text-xl mt-4">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#6b4c57] mb-6">
              Frequently Asked <span className="text-transparent bg-gradient-to-r from-[#c4a1a8] to-[#9b7ba3] bg-clip-text">Questions</span>
            </h2>
            <p className="text-lg text-[#8b6b78]">
              Everything you need to know about Chattie
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#6b4c57] mb-3">Is Chattie free to use?</h3>
              <p className="text-[#8b6b78]">
                Yes! Chattie is completely free to use with all core messaging features included. No hidden fees or premium tiers.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#6b4c57] mb-3">How secure are my messages?</h3>
              <p className="text-[#8b6b78]">
                All messages are protected with end-to-end encryption. Only you and the recipient can read your conversations.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#6b4c57] mb-3">Can I use Chattie on multiple devices?</h3>
              <p className="text-[#8b6b78]">
                Absolutely! Chattie works on all devices and syncs your conversations seamlessly across platforms.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#6b4c57] mb-3">Do I need to create an account?</h3>
              <p className="text-[#8b6b78]">
                No account needed! Just enter your name and start chatting immediately. It's that simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 bg-gradient-to-br from-[#6b4c57] to-[#8b6b78]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e8a7b8] to-[#d4a5c4] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl">Chattie</h3>
                </div>
              </div>
              <p className="text-[#f5e6ea] leading-relaxed mb-6">
                Connect with everyone, everywhere. Experience the future of messaging with our beautiful, 
                fast, and secure platform designed for modern communication.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-white">📧</span>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-white">🐦</span>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-white">📱</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-[#f5e6ea] hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('features')} className="text-[#f5e6ea] hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="text-[#f5e6ea] hover:text-white transition-colors">Reviews</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="text-[#f5e6ea] hover:text-white transition-colors">FAQ</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#f5e6ea] hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-[#f5e6ea] hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-[#f5e6ea] hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-[#f5e6ea] hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-[#f5e6ea]">
              © 2025 Chattie. Made with 💕 for better communication.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.2); opacity: 0; }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 3.5s ease-in-out infinite 0.5s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
}

export default Landing;
