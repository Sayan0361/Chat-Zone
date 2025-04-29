import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.warning("Please fill all the fields");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/user/login",
        { email, password },
        config
      );
      toast.success("Login Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900" style={{ fontFamily: "'Orbitron', sans-serif" }}>
      <div className="max-w-md w-full space-y-8 relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-cyan-500 opacity-5 blur-xl rounded-2xl"></div>
        
        <div className="relative bg-gray-900 p-8 rounded-2xl border border-cyan-500/30 shadow-2xl backdrop-blur-sm">
          {/* Header with decorative element */}
          <div className="text-center mb-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    className="block w-full pl-10 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 text-white"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-300">Password</label>
                  <div className="text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer transition duration-200">
                    Forgot password?
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="block w-full pl-10 pr-10 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 text-white"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-cyan-400 transition duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ userSelect: "none" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button with loading state */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white font-medium ${
                  loading
                    ? "bg-cyan-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/20"
                } transition duration-300`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            <div className="px-4 text-xs text-gray-500">OR</div>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-700 via-gray-700 to-transparent"></div>
          </div>

          {/* Social Login Buttons */}
          {/* <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="py-2 px-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="py-2 px-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                />
              </svg>
              GitHub
            </button>
          </div> */}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-cyan-400 hover:text-cyan-300 transition duration-200">
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      </div>
    </div>
  );
};

export default SignIn;