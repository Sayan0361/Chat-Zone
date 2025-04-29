import Home from "./pages/Home";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  const isChatPage = location.pathname === "/chats";
  
  return (
    <div className="bg-zinc-950 h-screen" style={{ fontFamily: "'Orbitron', sans-serif" }}>
      {!isChatPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {!isChatPage && <Footer />}
    </div>
  );
};

export default App;