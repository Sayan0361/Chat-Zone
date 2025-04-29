import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FaSearch, 
  FaPlus, 
  FaUserFriends, 
  FaPaperPlane, 
  FaEllipsisV, 
  FaBars, 
  FaTimes, 
  FaChevronLeft, 
  FaImage,
  FaMicrophone,
  FaPaperclip,
  FaShieldAlt
} from "react-icons/fa";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Mock data for demonstration
  const mockChats = [
    {
      id: "1",
      name: "Cyberpunk Developers",
      isGroupChat: true,
      users: ["John Doe", "Jane Smith", "Alex Johnson"],
      latestMessage: "Meeting at 10PM in Night City",
      updatedAt: "2025-04-28T18:30:00Z",
      avatar: "https://i.pravatar.cc/150?img=1",
      unread: 3,
      online: true
    },
    {
      id: "2",
      name: "Trinity",
      isGroupChat: false,
      users: ["Trinity"],
      latestMessage: "Did you crack that encryption?",
      updatedAt: "2025-04-29T09:15:00Z",
      avatar: "https://i.pravatar.cc/150?img=5",
      unread: 1,
      online: true
    },
    {
      id: "3",
      name: "Neo",
      isGroupChat: false,
      users: ["Neo"],
      latestMessage: "The matrix has you...",
      updatedAt: "2025-04-29T08:45:00Z",
      avatar: "https://i.pravatar.cc/150?img=3",
      unread: 0,
      online: false
    },
    {
      id: "4",
      name: "Netrunners Alliance",
      isGroupChat: true,
      users: ["V", "Johnny Silverhand", "Judy Alvarez", "Panam Palmer"],
      latestMessage: "New job available. High risk, high reward.",
      updatedAt: "2025-04-27T22:10:00Z",
      avatar: "https://i.pravatar.cc/150?img=8",
      unread: 5,
      online: true
    },
    {
      id: "5",
      name: "Alt Cunningham",
      isGroupChat: false,
      users: ["Alt"],
      latestMessage: "Found a vulnerability in Arasaka's firewall",
      updatedAt: "2025-04-26T14:30:00Z",
      avatar: "https://i.pravatar.cc/150?img=9",
      unread: 0,
      online: false
    }
  ];

  // Mock messages
  const mockMessages = [
    {
      id: "1",
      sender: { name: "Trinity", avatar: "https://i.pravatar.cc/150?img=5" },
      content: "Did you crack that encryption?",
      createdAt: "2025-04-29T09:15:00Z"
    },
    {
      id: "2",
      sender: { name: "You", avatar: "https://i.pravatar.cc/150?img=7" },
      content: "Working on it. The ICE is tough.",
      createdAt: "2025-04-29T09:16:00Z"
    },
    {
      id: "3",
      sender: { name: "Trinity", avatar: "https://i.pravatar.cc/150?img=5" },
      content: "Use the backdoor we found yesterday. I think it might still be open if they haven't patched it yet.",
      createdAt: "2025-04-29T09:17:00Z"
    },
    {
      id: "4",
      sender: { name: "You", avatar: "https://i.pravatar.cc/150?img=7" },
      content: "Good idea. Let me try that approach.",
      createdAt: "2025-04-29T09:18:00Z"
    },
    {
      id: "5",
      sender: { name: "Trinity", avatar: "https://i.pravatar.cc/150?img=5" },
      content: "Let me know when you're in. The data we need should be in their secure storage server. Remember to use the quantum decryption tool I sent you yesterday.",
      createdAt: "2025-04-29T09:20:00Z"
    },
    {
      id: "6",
      sender: { name: "Trinity", avatar: "https://i.pravatar.cc/150?img=5" },
      content: "Also, watch out for their security daemons. They've upgraded their systems recently.",
      createdAt: "2025-04-29T09:21:00Z"
    }
  ];

  useEffect(() => {
    // Check if viewport is mobile size
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Only auto-hide sidebar on mobile when a chat is already selected
      if (mobile && selectedChat) {
        setShowSidebar(false);
      } else if (!mobile) {
        setShowSidebar(true);
      }
    };

    // Set initial state
    checkMobile();
    // Add resize listener
    window.addEventListener("resize", checkMobile);
    
    // In a real app, fetch chats from API here
    setChats(mockChats);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [selectedChat]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChats = async () => {
    // This would be implemented with real API in a production app
    setLoading(true);
    try {
      // API call would go here
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load chats");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setMessages(mockMessages); // In real app, would fetch messages for this chat
    
    // On mobile, hide sidebar when a chat is selected
    if (isMobile) {
      setShowSidebar(false);
    }
    
    // Show typing indicator briefly
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 3000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, would send message to API
      // For now just add to local messages array
      const newMessage = {
        id: `new-${Date.now()}`,
        sender: { name: "You", avatar: "https://i.pravatar.cc/150?img=7" },
        content: message,
        createdAt: new Date().toISOString()
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Show typing indicator briefly to simulate response
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const responseMessage = {
            id: `new-${Date.now() + 1}`,
            sender: { 
              name: selectedChat.name, 
              avatar: selectedChat.avatar 
            },
            content: "I've received your message. Let me process that...",
            createdAt: new Date().toISOString()
          };
          setMessages(prev => [...prev, responseMessage]);
          setIsTyping(false);
        }, 2000);
      }, 1000);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return formatTime(dateString);
    }
    return date.toLocaleDateString();
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    if (isMobile) {
      setShowSidebar(true);
    }
  };

  // Function to determine if we should show a date divider
  const shouldShowDate = (index, messages) => {
    if (index === 0) return true;
    
    const prevDate = new Date(messages[index - 1].createdAt).toLocaleDateString();
    const currDate = new Date(messages[index].createdAt).toLocaleDateString();
    
    return prevDate !== currDate;
  };

  return (
    <div className="h-[calc(100vh-64px)] flex bg-gradient-to-b from-black to-gray-900" style={{ fontFamily: "'Orbitron', sans-serif" }}>
      {/* Mobile menu button */}
      {isMobile && selectedChat && (
        <button 
          className="fixed top-4 left-4 z-50 text-cyan-500 p-2 rounded-full bg-gray-800/70 border border-cyan-500/30"
          onClick={handleBackToList}
        >
          <FaChevronLeft />
        </button>
      )}
      
      {/* Left Sidebar - Chat List */}
      <div 
        className={`${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 fixed md:relative z-20 md:z-10 w-full md:w-1/3 lg:w-1/4 bg-gray-900 border-r border-cyan-500/20 h-full`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* User Profile */}
          <div className="flex items-center mb-6 pb-4 border-b border-cyan-500/20">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=7" alt="Your avatar" className="w-full h-full object-cover" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-white font-medium">NeoRunner_42</h3>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-gray-400 hover:text-cyan-500 transition duration-200 p-2">
                <FaShieldAlt />
              </button>
              {isMobile && (
                <button className="text-gray-400 hover:text-cyan-500 transition duration-200 p-2 ml-1" onClick={toggleSidebar}>
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FaSearch />
            </div>
            <input
              type="text"
              className="block w-full pl-10 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 text-white"
              placeholder="Search chats..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          {/* My Chats Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              NetChats
            </h2>
            <button
              className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm transition duration-300"
            >
              <FaPlus className="mr-2" />
              <span className="hidden sm:inline">Create Group</span>
            </button>
          </div>

          {/* Chat List */}
          <div className="space-y-2 overflow-y-auto flex-1 custom-scrollbar">
            {loading ? (
              <div className="text-center py-4">
                <div className="inline-block h-6 w-6 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
              </div>
            ) : chats.length > 0 ? (
              chats
                .filter(chat => 
                  chat.name.toLowerCase().includes(search.toLowerCase()) ||
                  chat.latestMessage.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 border border-gray-800 rounded-lg cursor-pointer transition duration-200 ${
                      selectedChat && selectedChat.id === chat.id
                        ? "bg-cyan-900/20 border-cyan-500/40"
                        : "bg-gray-800/40 hover:bg-gray-800/70"
                    }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="flex items-center mb-1">
                      <div className="relative mr-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700">
                          <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                        </div>
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-white truncate">
                            {chat.name}
                          </h3>
                          <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                            {formatDate(chat.updatedAt)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400 truncate flex-1">
                            {chat.isGroupChat && (
                              <FaUserFriends className="text-cyan-500 text-xs inline mr-1" />
                            )}
                            {chat.latestMessage}
                          </p>
                          {chat.unread > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-cyan-500 text-xs font-bold rounded-full text-black">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No chats found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Chat Window */}
      <div className={`flex-1 flex flex-col w-full ${isMobile && showSidebar ? 'hidden' : 'block'}`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-gray-900 border-b border-cyan-500/20 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700">
                    <img src={selectedChat.avatar} alt={selectedChat.name} className="w-full h-full object-cover" />
                  </div>
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {selectedChat.name}
                  </h2>
                  {selectedChat.isGroupChat ? (
                    <p className="text-xs text-gray-400">
                      {selectedChat.users.length} members
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400">
                      {selectedChat.online ? 'Online' : 'Offline'}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                {!isMobile && (
                  <>
                    <button className="text-gray-400 hover:text-cyan-500 transition duration-200 p-2">
                      <FaSearch />
                    </button>
                    <button className="text-gray-400 hover:text-cyan-500 transition duration-200 p-2">
                      <FaUserFriends />
                    </button>
                  </>
                )}
                <button className="text-gray-400 hover:text-cyan-500 transition duration-200 p-2">
                  <FaEllipsisV />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-900 to-gray-800 custom-scrollbar">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <React.Fragment key={msg.id}>
                    {shouldShowDate(index, messages) && (
                      <div className="flex justify-center my-4">
                        <div className="px-3 py-1 rounded-lg bg-gray-800/80 text-gray-400 text-xs">
                          {new Date(msg.createdAt).toLocaleDateString(undefined, {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    )}
                    <div
                      className={`flex ${
                        msg.sender.name === "You" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender.name !== "You" && (
                        <div className="mr-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img 
                              src={msg.sender.avatar} 
                              alt={msg.sender.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] md:max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.sender.name === "You"
                            ? "bg-gradient-to-r from-cyan-800 to-blue-900 text-white rounded-br-none border-r border-t border-cyan-500/30"
                            : "bg-gray-800 text-gray-200 rounded-bl-none border-l border-t border-gray-600/30"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium">
                            {msg.sender.name}
                          </span>
                          <span className="text-xs opacity-70 ml-4">
                            {formatTime(msg.createdAt)}
                          </span>
                        </div>
                        <p className="break-words">{msg.content}</p>
                      </div>
                      {msg.sender.name === "You" && (
                        <div className="ml-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img 
                              src={msg.sender.avatar} 
                              alt={msg.sender.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="mr-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src={selectedChat.avatar} 
                          alt={selectedChat.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>
                    <div className="bg-gray-800 text-gray-200 rounded-lg rounded-bl-none px-4 py-2 border-l border-t border-gray-600/30">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef}></div>
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-gray-900 border-t border-cyan-500/20 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <div className="flex items-center space-x-2 mr-2">
                  <button 
                    type="button" 
                    className="p-2 text-gray-400 hover:text-cyan-500 transition"
                  >
                    <FaPaperclip />
                  </button>
                  <button 
                    type="button"
                    className="p-2 text-gray-400 hover:text-cyan-500 transition hidden sm:block"
                  >
                    <FaImage />
                  </button>
                </div>
                <input
                  type="text"
                  className="flex-1 py-3 px-4 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 text-white"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex items-center space-x-2 ml-2">
                  <button 
                    type="button"
                    className="p-2 text-gray-400 hover:text-cyan-500 transition hidden sm:block"
                  >
                    <FaMicrophone />
                  </button>
                  <button
                    type="submit"
                    className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white transition duration-300"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 border border-cyan-500/30">
              <FaPaperPlane className="text-cyan-500 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Welcome to NeoChat
            </h3>
            <p className="text-gray-400 max-w-md">
              Select a chat from the list or create a new one to start messaging
            </p>
            {isMobile && (
              <button
                className="mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                onClick={toggleSidebar}
              >
                View Chats
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile toggle button for sidebar */}
      {isMobile && !showSidebar && (
        <button 
          className="fixed bottom-4 right-4 z-20 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      )}

      {/* Add custom scrollbar and glow effects */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.7);
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(6, 182, 212, 0.5); }
          50% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.7); }
          100% { box-shadow: 0 0 5px rgba(6, 182, 212, 0.5); }
        }
      `}</style>
    </div>
  );
};

export default ChatPage;