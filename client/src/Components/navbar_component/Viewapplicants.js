import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Viewapplicants() {
  const { Companyname } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/viewapplicants/${Companyname}`);
      setApplicants(response.data);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleChange();
  }, []);

  const handleAccept = (applicantId) => {
    
    alert(`Accepted applicant with ID: ${applicantId}`);
  };

  const handleDelete = async (applicantId) => {
    if (window.confirm("Are you sure you want to delete this applicant?")) {
      try {
        await axios.delete(`http://localhost:5000/api/deleteuserjobform/${applicantId}`);
        setApplicants(prev => prev.filter(a => a._id !== applicantId));
      } catch (err) {
        console.error("Error deleting applicant:", err);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Applicants for {Companyname}</h1>
      <h2>Total Applicants: {applicants.length} </h2>
      <button 
        onClick={handleChange} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? "Loading..." : "Refresh Applicants"}
      </button>

      {applicants.length > 0 ? (
        <ul className="space-y-3">
          {applicants.map((applicant, idx) => (
            <li key={idx} className="border p-4 rounded shadow-sm">
              <p><strong>Name:</strong> {applicant.fullname}</p>
              <p><strong>Email:</strong> {applicant.email}</p>
              <p><strong>Phone:</strong> {applicant.phone}</p>
              <p><strong>Position:</strong> {applicant.position}</p>

              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => handleAccept(applicant._id)} 
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleDelete(applicant._id)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No applicants found.</p>
      )}
    </div>
  );
}

export default Viewapplicants;
