import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaTimes, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import imageCompression from "browser-image-compression";

// Default profile picture URL
const DEFAULT_PROFILE_PIC = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState("");
  const [picUploading, setPicUploading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [step, setStep] = useState(1); // New state for multi-step form

  const validateForm = () => {
    let isValid = true;
    
    // Reset previous errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setNameError("");

    // Name validation
    if (!name.trim()) {
      setNameError("Username is required");
      isValid = false;
    } else if (name.length < 3) {
      setNameError("Username must be at least 3 characters");
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    // Confirm password validation
    if (!confirmpassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmpassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/check-email`, {
        params: { email }
      });
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (picUploading) {
      toast.info("Please wait for the image to finish uploading");
      return;
    }

    // Check if email exists before proceeding
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setEmailError("This email is already registered");
      return;
    }

    try {
      setRegistering(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      
      // Use the uploaded pic or default pic if not provided
      const profilePic = pic || DEFAULT_PROFILE_PIC;
      
      const { data } = await axios.post(
        "http://localhost:4000/api/user",
        { name, email, password, pic: profilePic },
        config
      );
      
      toast.success("Registration Successful! Redirecting to sign in...", { autoClose: 2000 });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      // Log the full error for debugging
      console.error("Registration error:", error);
      const backendMsg = error.response?.data?.message || "Error occurred during registration";
      let feedbackGiven = false;
      if (error.response?.data?.error) {
        // Handle other backend validation errors
        const backendError = error.response.data.error;
        if (backendError.toLowerCase().includes("email")) {
          setEmailError(backendError);
          toast.error(backendError);
          feedbackGiven = true;
        } else if (backendError.toLowerCase().includes("password")) {
          setPasswordError(backendError);
          feedbackGiven = true;
        } else if (backendError.toLowerCase().includes("name")) {
          setNameError(backendError);
          feedbackGiven = true;
        } else {
          toast.error(backendError);
          feedbackGiven = true;
        }
      } else if (
        backendMsg.toLowerCase().includes("email") &&
        backendMsg.toLowerCase().includes("exist")
      ) {
        setEmailError("This email is already registered");
        toast.error("This email is already registered. Please use a different one.");
        feedbackGiven = true;
      }
      // Fallback: always show a generic error if nothing else was shown
      if (!feedbackGiven) {
        setEmailError("Registration failed. Please check your details or try another email.");
        toast.error(backendMsg);
      }
    } finally {
      setRegistering(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type === "image/jpeg" || file.type === "image/png") {
      uploadImageToCloudinary(file);
    } else {
      toast.warning("Please select a JPEG or PNG image");
    }
  };

  const uploadImageToCloudinary = async (file) => {
    setPicUploading(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const data = new FormData();
      data.append("file", compressedFile);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "sayan0361");
      
      const res = await fetch("https://api.cloudinary.com/v1_1/sayan0361/image/upload", {
        method: "POST",
        body: data,
      });
      
      const result = await res.json();
      if (result.url) {
        setPic(result.url);
        toast.success("Profile picture uploaded");
      } else {
        toast.error("Image upload failed");
      }
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setPicUploading(false);
    }
  };

  // Function to handle next step in multi-step form
  const goToNextStep = () => {
    if (step === 1) {
      // Validate first step fields
      if (!name.trim() || name.length < 3) {
        setNameError(name.trim() ? "Username must be at least 3 characters" : "Username is required");
        return;
      }
      if (!email.trim()) {
        setEmailError("Email is required");
        return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }
    }
    
    setStep(step + 1);
  };

  const goToPrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <div className="max-w-md w-full space-y-8 relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-cyan-500 opacity-5 blur-xl rounded-2xl"></div>
        
        <div className="relative bg-gray-900 p-8 rounded-2xl border border-cyan-500/30 shadow-2xl backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              {step === 1 ? "Create Account" : step === 2 ? "Secure Your Account" : "Complete Profile"}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {step === 1 ? "Begin your journey" : step === 2 ? "Set up your password" : "Add a profile picture"}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`w-3 h-3 rounded-full ${
                    s === step 
                      ? "bg-cyan-500" 
                      : s < step 
                        ? "bg-cyan-800" 
                        : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Display email exists error */}
          {emailError && emailError.includes("already") && (
            <div className="mb-6 p-3 bg-orange-900/50 text-orange-300 text-sm rounded-lg border border-orange-500/50 shadow-inner">
              <p>{emailError}</p>
              <Link to="/signin" className="block mt-2 text-cyan-400 hover:text-cyan-300 font-medium text-center">
                Sign in instead
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <>
                {/* Username */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      className={`block w-full pl-10 py-3 bg-gray-800/70 border ${
                        nameError ? "border-red-500" : "border-gray-700"
                      } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (nameError) setNameError("");
                      }}
                      placeholder="Enter your username"
                      disabled={registering}
                    />
                  </div>
                  {nameError && (
                    <div className="mt-1 text-red-400 text-xs">{nameError}</div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      @
                    </div>
                    <input
                      type="email"
                      className={`block w-full pl-10 py-3 bg-gray-800/70 border ${
                        emailError ? "border-red-500" : "border-gray-700"
                      } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      placeholder="you@example.com"
                      disabled={registering}
                    />
                  </div>
                  {emailError && (
                    <div className="mt-1 text-red-400 text-xs">{emailError}</div>
                  )}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-cyan-500/20 transition duration-300"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <>
                {/* Password */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`block w-full pr-10 py-3 bg-gray-800/70 border ${
                        passwordError ? "border-red-500" : "border-gray-700"
                      } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError("");
                      }}
                      placeholder="Create password"
                      disabled={registering}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-cyan-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  {passwordError && (
                    <div className="mt-1 text-red-400 text-xs">{passwordError}</div>
                  )}
                  <div className="mt-2 text-xs text-gray-500">Password must be at least 6 characters</div>
                </div>

                {/* Confirm Password */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`block w-full pr-10 py-3 bg-gray-800/70 border ${
                        confirmPasswordError ? "border-red-500" : "border-gray-700"
                      } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200`}
                      value={confirmpassword}
                      onChange={(e) => {
                        setConfirmpassword(e.target.value);
                        if (confirmPasswordError) setConfirmPasswordError("");
                      }}
                      placeholder="Confirm password"
                      disabled={registering}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-cyan-400"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  {confirmPasswordError && (
                    <div className="mt-1 text-red-400 text-xs">{confirmPasswordError}</div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="px-4 py-2 text-gray-300 font-medium rounded-lg hover:text-white transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-cyan-500/20 transition duration-300"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Profile Picture */}
            {step === 3 && (
              <>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 mb-6 group">
                    <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-30 blur-md group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative w-32 h-32">
                      {pic ? (
                        <>
                          <img
                            src={pic}
                            alt="Profile"
                            className="rounded-full w-32 h-32 object-cover border-2 border-cyan-500 shadow-lg shadow-cyan-500/30"
                          />
                          <button
                            type="button"
                            onClick={() => setPic("")}
                            className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg focus:outline-none transition duration-200"
                            disabled={picUploading}
                            aria-label="Remove image"
                          >
                            <FaTimes size={14} />
                          </button>
                        </>
                      ) : (
                        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-800 border-2 border-dashed border-gray-600 text-gray-400">
                          <FaUser size={40} />
                        </div>
                      )}
                    </div>
                  </div>

                  <label className="inline-flex items-center px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg cursor-pointer transition duration-300 shadow-lg shadow-cyan-900/30">
                    {pic ? "Change Photo" : "Upload Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={picUploading}
                    />
                  </label>
                  
                  {picUploading && (
                    <div className="mt-3 text-cyan-400 text-sm flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
                      Uploading image...
                    </div>
                  )}
                  
                  <p className="mt-4 text-sm text-gray-400 text-center">
                    Profile picture is optional. You can skip this step.
                  </p>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="px-4 py-2 text-gray-300 font-medium rounded-lg hover:text-white transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={registering || picUploading}
                    className={`px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-lg transition duration-300 ${
                      registering || picUploading 
                        ? "opacity-60 cursor-not-allowed" 
                        : "hover:shadow-cyan-500/20"
                    }`}
                  >
                    {registering ? (
                      <span className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                        Creating Account...
                      </span>
                    ) : (
                      "Complete Sign Up"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/signin" className="font-medium text-cyan-400 hover:text-cyan-300 transition duration-200">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;