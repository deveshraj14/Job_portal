import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Detailsforjob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/findbyids/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Failed to fetch job details", error);
      }
    };

    fetchJobDetails();
  }, [id]); 

  if (!job) {
    return <p className="text-center mt-10 text-gray-500">Loading job details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl mt-10">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-2">{job.Title}</h2>
          <p className="text-lg text-gray-700 font-semibold">Company Name :{job.Companyname}</p>
        </div>

        {job.Logo && (
          <img
            src={`data:image/png;base64,${job.Logo}`}
            alt="Company Logo"
            className="w-16 h-16 object-cover rounded-full border"
          />
        )}
      </div>

      <div className="mt-6 space-y-3 text-gray-800">
      <p><span className="font-semibold">Title:</span> {job.job_title}</p>
        <p><span className="font-semibold">Description:</span> {job.Description}</p>
        <p><span className="font-semibold">Location:</span> {job.Location}</p>
        <p><span className="font-semibold">Requirements:</span> {job.Requirements}</p>
        <p><span className="font-semibold">Experience:</span> {job.experience}</p>
        <p><span className="font-semibold">No. of Positions:</span> {job.No_Of_Positions}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200"
          onClick={() => navigate("/applyjob")}
        >
          Apply Now
        </button>

        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg transition duration-200"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Detailsforjob;
