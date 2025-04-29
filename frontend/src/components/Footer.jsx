import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gradient-to-t from-black/80 to-black/50 backdrop-blur-md border-t border-cyan-500/30 text-cyan-200 px-6 py-8 mt-16 font-orbitron relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute -bottom-8 left-1/4 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 right-1/3 w-10 h-10 bg-cyan-600/10 rounded-full blur-lg"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Top section with logo and nav */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 mb-6 border-b border-cyan-900/30">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-black font-bold text-sm">CZ</span>
            </div>
            <span className="text-cyan-400 font-bold text-xl tracking-wider">ChatZone</span>
          </div>
          
          {/* Nav links
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <a href="#" className="text-cyan-300 hover:text-cyan-100 transition-colors">Features</a>
            <a href="#" className="text-cyan-300 hover:text-cyan-100 transition-colors">Pricing</a>
            <a href="#" className="text-cyan-300 hover:text-cyan-100 transition-colors">Documentation</a>
            <a href="#" className="text-cyan-300 hover:text-cyan-100 transition-colors">Contact</a>
          </nav> */}
        </div>
        
        {/* Bottom section with credits and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              Made with <span className="inline-block animate-pulse text-cyan-400">💙</span> by{" "}
              <a href="#" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">Sayan Sen</a>
            </span>
          </div>
          
          <div className="text-xs text-gray-500">
            &copy; {currentYear} ChatZone. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;