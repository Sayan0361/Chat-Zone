import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-cyan-500/30 shadow-md"
          : "bg-black/50 backdrop-blur border-b border-cyan-500/20"
      } px-4 py-3 flex justify-between items-center`}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 mr-2 rounded-full bg-cyan-500 flex items-center justify-center">
          <span className="text-black font-bold">CZ</span>
        </div>
        <span className="text-cyan-500 font-bold text-lg sm:text-xl">
          CHAT:ZONE
        </span>
      </div>

      <div className="flex gap-2 flex-col sm:flex-row">
        <Link to="/signin">
          <button className="px-4 py-1 rounded border border-cyan-500 text-cyan-400 hover:bg-cyan-900/30 transition text-sm font-bold">
            Sign In
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-1 rounded bg-cyan-500 text-black hover:bg-cyan-400 transition text-sm font-bold">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
