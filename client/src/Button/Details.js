import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Details() {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newPic, setNewPic] = useState(null);
  const [jobForms, setJobForms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded);
    }
  }, []);

  useEffect(() => {
    if (userData.email) {
      seeuserjobform(); 
    }
  }, [userData.email]);

  const seeuserjobform = async () => {
    try {
      const encodedEmail = encodeURIComponent(userData.email);
      const response = await axios.get(`http://localhost:5000/api/getuserjobform/${encodedEmail}`);
      setJobForms(response.data);
    } catch (error) {
      console.error("Error fetching job forms", error);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePicChange = (e) => {
    setNewPic(e.target.files[0]);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", userData.name);
    if (newPic) {
      formData.append("profilepic", newPic);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put("http://localhost:5000/api/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedToken = response.data.token;
      localStorage.setItem("token", updatedToken);
      const updatedUser = jwtDecode(updatedToken);
      setUserData(updatedUser);
      setNewPic(null);
      setEditMode(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const hnadledeleteform = async (userid) => {
    alert("Are you sure you want to delete this application?");
  

    try {
      await axios.delete(`http://localhost:5000/api/deleteuserjobform/${userid}`);
      setJobForms((prevForms) => prevForms.filter((job) => job._id !== userid));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={
            newPic
              ? URL.createObjectURL(newPic)
              : `data:image/jpeg;base64,${userData.profilepic}`
          }
          alt="Profile"
          className="w-24 h-24 rounded-full border object-cover"
        />
        {editMode && (
          <input type="file" accept="image/*" onChange={handlePicChange} />
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          {editMode ? (
            <input
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p>{userData.name}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Email:</label>
          <p>{userData.email}</p>
        </div>

        <div>
          <label className="block font-semibold">Role:</label>
          <p>{userData.role}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {editMode ? (
          <>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </div>

    
      {userData.role === "user" && (
  <div className="mt-10">
    <h3 className="text-xl font-bold mb-4 text-center">My Job Applications</h3>
    {jobForms.length === 0 ? (
      <p className="text-center text-gray-500">No job applications submitted yet.</p>
    ) : (
      <div className="space-y-4">
        {jobForms.map((form) => (
          <div
            key={form._id}
            className="p-4 border rounded-lg shadow-sm bg-gray-50 relative"
          >
            <h4 className="text-lg font-semibold">{form.companyName}</h4>
            <h4 className="text-lg font-semibold">{form.position}</h4>
            <p><span className="font-medium">Phone:</span> {form.phone}</p>
            <p>
              <span className="font-medium">Resume Link:</span>{" "}
              <a href={form.linkedin} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                {form.linkedin}
              </a>
            </p>
            <p>
              <span className="font-medium">Portfolio:</span>{" "}
              <a href={form.portfolio} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                {form.portfolio}
              </a>
            </p>
            

            <button
              onClick={() => hnadledeleteform(form._id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Withdraw
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)}

    </div>
  );
}

export default Details;
