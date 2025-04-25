import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]); 
  const [filteredJobs, setFilteredJobs] = useState([]); 

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/api/getalljobforms")
      .then(response => {
        setJobs(response.data); // Store job data
        setFilteredJobs(response.data); 
      })
      .catch(error => console.error("Error fetching jobs:", error));
  }, []);

  
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredJobs(jobs); 
    } else {
      setFilteredJobs(
        jobs.filter(job =>
          job.Title.toLowerCase().includes(query.toLowerCase()) || 
          job.Description.toLowerCase().includes(query.toLowerCase()) ||
          job.Requirements.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, jobs]); 

  return (
    <>
      <div className="main flex flex-col items-center justify-center h-[400px] mt-0 w-full">
        <div className="main2">
          <h4 className='text-red-700 font-bold p-1 rounded-xl bg-slate-100 w-60'>No1. Job Hunt Website</h4>
          <div className="Heading">
            <h1 className='font-bold text-4xl'>Search Apply &</h1>
            <div className="Middleheading">
              <h1 className='font-bold text-4xl text-purple-900'>Get Your Dream Job</h1>
              <div className="lastheading">
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search mt-4">
          <input
            className='p-2 rounded-xl w-[500px] border-black'
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            placeholder='Search for jobs...'
          />
        </div>
      </div>

      {/* Job Type Filters */}
      <div className="jobs flex space-x-4 items-center justify-center">
        <button className='bg-slate-300 p-2 rounded-xl' onClick={() => setQuery("frontend")}>Frontend Developer</button>
        <button className='bg-slate-300 p-2 rounded-xl' onClick={() => setQuery("backend")}>Backend Developer</button>
        <button className='bg-slate-300 p-2 rounded-xl' onClick={() => setQuery("software")}>Software Developer</button>
      </div>

    
      <div className="secondcontainer flex flex-col items-center justify-center mt-6">
        <h1 className="font-bold text-4xl">
          <span className="text-black">Latest</span> and 
          <span className="text-purple-900"> Topmost Jobs</span>
        </h1>

        {/* Display Filtered Jobs */}
        <div className="job-list mt-6 px-10 w-full max-w-5xl">
          {filteredJobs.length > 0 && query ? (
            filteredJobs.map((job) => (
              <div key={job._id} className="border p-4 shadow-md rounded-lg mb-4 bg-white w-full">
                <h1 className="font-bold text-xl">{job.Companyname}</h1>
                <p className="text-gray-700">{job.Title}</p>
                <p className="text-sm text-blue-600">{job.Description}</p>
                <br />
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
            <p className="text-center text-gray-500">No jobs found. Try a different search!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
