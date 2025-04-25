import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Browse() {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

 
  const getAllJobForms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getalljobforms");
      
      setCompanies(response.data);
      // setCompanylogo(responselogo.data);
    } catch (error) {
      console.error("Error fetching job forms:", error);
    }
  };

  useEffect(() => {
    getAllJobForms();
  }, []);

  // Filter jobs based on search query
  const filteredJobs = companies.filter((job) =>
    job.Companyname.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center">Browse Available Jobs</h2>

      {/* Search Input */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search by title, description, or requirements..."
          className="w-1/2 p-2 border rounded-lg shadow-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Job Listings */}
      <div
        className="grid gap-4 p-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            
            <div
  key={job._id}
  className="border p-6 shadow-lg rounded-lg bg-white relative"
>
  
  {job.Logo && (
    <img
      src={`data:image/png;base64,${job.Logo}`}
      alt="Company Logo"
      className="absolute top-2 right-2 w-12 h-12 object-cover rounded-full border"
    />
  )}

<h4 className="text-lg font-semibold text-blue-700">Company : {job.Companyname}</h4>
              <h4 className="text-md font-semibold">{job.Title}</h4>
              <h3 className="text-gray-600">{job.name}</h3>
              <p className="text-gray-700">{job.Description}</p>
              <div className="flex flex-row gap-3 mt-2">
                <p className="border border-indigo-200 px-2 rounded-md font-semibold text-sm text-blue-700">
                  {job.Requirements} joiner
                </p>
                <p className="border border-red-200 rounded-md px-2 font-semibold text-sm text-red-400">
                  {job.experience} yr experience
                </p>
                <p className="border border-purple-200 rounded-md px-2 font-semibold text-sm text-purple-700">
                  {job.No_Of_Positions} Position
                </p>
              </div>

              <div className="flex flex-row gap-2 mt-3">
                <button
                  className="bg-white hover:bg-blue-100 text-black font-bold py-1 px-2 rounded"
                  onClick={() => navigate(`/findbyids/${job._id}`)}
                >
                  Details
                </button>
                <button className="bg-purple-600 hover:bg-purple-800 text-white font-semibold py-1 px-2 rounded" onClick={() => navigate(`/applyjob/${job.Companyname}`)}>
                  Apply
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No jobs found. Try a different search!
          </p>
        )}
      </div>
    </div>
  );
}

export default Browse;
