
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    setError("");
    
    // console.log("Logging in with", { email, password });

    try{
      const response=await axios.post("http://localhost:5000/api/login", { email, password });
      // console.log("Login successful:", response.data);
      const { loginuser } = response.data;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("loginuser", JSON.stringify(loginuser));
      if (loginuser.role === "recruiter") {
        navigate("/Admin_panel");
      } else {
        navigate("/homepage");
      }
      // navigate("/");
    }
    catch(err){
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  

  return (
    <div className="flex justify-center items-center h-screen mt-[-100px] bg-gray-10">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="/signup" className="text-cyan-600 cursor-pointer">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
