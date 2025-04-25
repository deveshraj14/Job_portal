import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useNavigate, useParams } from 'react-router-dom';
function JobApplicationForm() {
  const [formData, setFormData] = useState({
   
    fullname: '',
    email: '',
    companyName: '',
    phone: '',
    position: '',
    linkedin: '',
    portfolio: '',
    coverletter: '',
    
  });


  const navigate = useNavigate();
  const{Companyname}=useParams();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    setFormData(prev => ({
      ...prev,
      fullname: decoded.name,
      email: decoded.email
    }));
  }
  handlecompanyname();
}, []);

 
  const handlecompanyname = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getAllJobformscompanyname/${Companyname}`);
      const data = response.data;
  console.log(response);
      if (data.length > 0) {
        const firstCompanyName = data[0].Companyname;
  
        setFormData(prev => ({
          ...prev,
          companyName: firstCompanyName, 
        }));
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 404) {
        console.log("error");
      }
    }
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post('http://localhost:5000/api/applyjobs', formData);
        console.log(response.data);
      if (response) {
        alert('Application submitted successfully!');
        setFormData({
          // companyname: '',
          fullname: '',
          email: '',
          companyName: '',
          phone: '',
          position: '',
          linkedin: '',
          portfolio: '',
          coverletter: '',
          
        });
        navigate('/browse');
      } else {
      console.error('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Job Application Form</h2>
      <form onSubmit={handleSubmit}  className="space-y-4">
      <div>
  <label className="block mb-1 font-medium">Company Name</label>
  <input
    type="text"
    name="companyName"
    value={formData.companyName}
    readOnly
    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
  />
</div>

        <div>
          <label className="block mb-1 font-medium">Full Name *</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2  bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Position Applying For *</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Resume Link *</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Portfolio/Website</label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Cover Letter</label>
          <textarea
            name="coverletter"
            rows="4"
            value={formData.coverletter}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Write your cover letter..."
          ></textarea>
        </div>

       

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default JobApplicationForm;
