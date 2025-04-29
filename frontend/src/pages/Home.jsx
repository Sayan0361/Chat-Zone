import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAstronaut, FaRobot, FaShieldAlt, FaVideo, FaUsers } from "react-icons/fa";

const Home = () => {
  const [glitchText, setGlitchText] = useState(false);
  const [animateHero, setAnimateHero] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate]);

  useEffect(() => {
    // Initial hero animation
    setAnimateHero(true);

    // Glitch effect interval
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 5000);

    return () => {
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
      {/* <Background /> */}

      {/* Hero Section */}
      <div className="relative z-20 flex flex-col justify-center items-center min-h-screen text-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className={`relative transition-all duration-1000 transform ${animateHero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Decorative lines */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-transparent to-cyan-500"></div>
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-t from-transparent to-cyan-500"></div>
          
          {/* Main title with glitch effect */}
          <div className={`relative ${glitchText ? 'opacity-70' : ''}`}>
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${glitchText ? 'blur-sm' : ''}`}
              style={{
                textShadow: "0px 0px 20px #00fdd5, 0px 0px 30px rgba(0, 253, 213, 0.5)",
                letterSpacing: "4px"
              }}
            >
              CHAT<span className="text-cyan-400">ZONE</span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl mt-1 font-bold text-gray-300">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">3D</span>
            </p>
            
            {glitchText && (
              <h1 className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl font-bold text-red-500 opacity-30"
                style={{
                  transform: "translate(5px, -5px)",
                  textShadow: "0px 0px 10px red"
                }}
              >
                CHAT<span className="text-cyan-400">ZONE</span>
              </h1>
            )}
          </div>

          <p className="text-base sm:text-lg lg:text-xl mt-6 text-cyan-200 opacity-80 max-w-md mx-auto"
            style={{
              textShadow: "0px 0px 10px #00fdd5"
            }}
          >
            Step into your next-gen social metaverse with immersive chat experiences
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300">
              Get Started
            </Link>
            <Link to="/signin" className="px-8 py-3 bg-gray-800/80 border border-cyan-500/30 text-cyan-400 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-1 transition-all duration-300">
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-12">
            <span className="relative">
              Future of Communication
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></span>
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {/* Feature Card 1 */}
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transform transition-all duration-300">
                  <FaUserAstronaut className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-cyan-300 mb-3">3D Avatars</h3>
                <p className="text-gray-300">Create and customize your own 3D avatar for a truly immersive social experience.</p>
              </div>
              <div className="px-6 pb-6">
                <Link to="/" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
                  Learn more →
                </Link>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transform transition-all duration-300">
                  <FaRobot className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-cyan-300 mb-3">AI Assistants</h3>
                <p className="text-gray-300">Get support from AI assistants to enhance your communication and productivity.</p>
              </div>
              <div className="px-6 pb-6">
                <Link to="/" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
                  Learn more →
                </Link>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transform transition-all duration-300">
                  <FaShieldAlt className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-cyan-300 mb-3">Secure Encryption</h3>
                <p className="text-gray-300">End-to-end encryption ensures your conversations remain private and secure.</p>
              </div>
              <div className="px-6 pb-6">
                <Link to="/" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-12">
            <span className="relative">
              What Users Say
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></span>
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {/* Testimonial 1 */}
            <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <span className="font-bold">A</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-bold text-white">Alex Chen</h4>
                  <p className="text-xs text-gray-400">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                "ChatZone 3D has transformed how my remote team collaborates. The virtual spaces make us feel like we're in the same room."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <span className="font-bold">J</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-bold text-white">Jamie Wong</h4>
                  <p className="text-xs text-gray-400">Digital Artist</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                "The 3D avatars and customizable spaces have given me a new way to express my creativity and connect with other artists."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <span className="font-bold">M</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-bold text-white">Mike Rivera</h4>
                  <p className="text-xs text-gray-400">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                "The security features give me peace of mind when discussing sensitive projects. Best communication platform I've used."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 w-full max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-2xl px-8 py-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Enter the Future?</h2>
            <p className="text-cyan-100 mb-8 max-w-lg mx-auto">
              Join thousands of users already experiencing the next generation of social communication
            </p>
            <Link to="/signup" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300">
              Create Your Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;