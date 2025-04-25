import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilepic: "",
    role: "user", //  default role
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);

    if (data.profilepic) {
      formData.append("profilepic", data.profilepic);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Signup successful:", response.data);
      // console.log("Uploaded File:", response.data.profilepic);

      setData({
        name: "",
        email: "",
        password: "",
        profilepic: "",
        role: "user",
      });
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-[-100px] bg-gray-100">
      <div className="w-full max-w-md p-8 mt-9 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full p-2 border border-gray-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full p-2 border border-gray-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full p-2 border border-gray-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setData({ ...data, profilepic: e.target.files[0] })}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Role</label>
            <select
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              className="w-full p-2 border border-gray-400 rounded-md"
            >
              <option value="user">User</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <button type="submit" className="bg-slate-500 text-white p-2 rounded-xl hover:bg-slate-600">
            Signup
          </button>
          <p className="text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-cyan-600 cursor-pointer">Login</a>
        </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
