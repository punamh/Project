import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (password.length < 6) {
      alert("Password should be at least 6 characters!");
      return;
    }
    
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <img 
            src="https://dcassetcdn.com/design_img/10150/25224/25224_294121_10150_image.jpg" 
            alt="Recipe App Logo" 
            className="w-16 h-16 rounded-full mx-auto mb-4 shadow-lg"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Recipe App</h2>
          <p className="text-gray-600">Create your account to start cooking</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="animate-slide-down">
            <input 
              type="email" 
              placeholder="Email Address"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div className="animate-slide-down">
            <input 
              type="password" 
              placeholder="Password (min 6 characters)"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              required
              minLength="6"
            />
          </div>
          
          <div className="animate-slide-down">
            <input 
              type="password" 
              placeholder="Confirm Password"
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center animate-fade-in-up">
          <p className="text-gray-600">
            Already have an account? 
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-semibold ml-1 hover:underline transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
