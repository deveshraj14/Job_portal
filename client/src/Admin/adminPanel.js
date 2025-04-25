import React, { useState } from 'react';

import {useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function AdminPanel() {
 
  const [showForm, setShowForm] = useState(false);
  const [formdetails, setformdetails] = useState({
    name: "",
    location: ""
  });
  const [companies, setcompanies] = useState([]);

  const navigate=useNavigate();
  const handleShowForm = () => {
    setShowForm(true);
    navigate('/createjobform');
  };
 const deletejobform=(id)=>{
  try{

  const deleteform=axios.delete(`http://localhost:5000/api/deleteapplicationjobform/${id}`);
  const newcompanies=companies.filter((company) => company._id !== id);
  setcompanies(newcompanies);
  }
  catch(err)
  {
    console.log(err);
  }
  
 }
  const handleinputchange = (e) => {
    const { name, value } = e.target;
    setformdetails({ ...formdetails, [name]: value });
  };
const handleviewapplication=(Companyname)=>{
  navigate(`/viewapplicants/${encodeURIComponent(Companyname)}`);
}
  const HandleSubmit = (e) => {
    e.preventDefault();
    setcompanies([...companies, formdetails]);
    setShowForm(false);
    setformdetails({ name: "", location: "" });
  };
  useEffect(() => {
   getalljobforms();
  }, []);
  const getalljobforms= async ()=>{
    try{
   const item=  await axios.get('http://localhost:5000/api/getAllJobForms')
   setcompanies(item.data);
    
    }
    catch(err)
    {
      console.log(err);
    }
  }

  return (
    <>

    
       
      <div className='flex justify-end pr-2 pb-2'>     
         <button
        className="bg-slate-300 p-2 rounded-xl cursor-pointer hover:bg-slate-400 "
        onClick={handleShowForm}
      >
       Add New Company
      </button>
      </div>


      {showForm ? (
        <div className="mt-4 p-4 bg-gray-100 rounded-xl shadow-lg">
          <h3>Add New Company</h3>
          <form onSubmit={HandleSubmit}>
            <div className="mb-4 ">
              <label className="block text-gray-700 font-bold mb-2 ">
                Company Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter company name"
                name="name"
                value={formdetails.name}
                onChange={handleinputchange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Company Location
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter company location"
                name="location"
                value={formdetails.location}
                onChange={handleinputchange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
        
        
      ) : (
        <div>
            <div className="w-full border-t border-gray-400 pt-3 pb-3 pr-2 flex justify-between">
  <span className="font-bold text-2xl text-black">Logo</span>
  <span className="font-bold text-2xl text-black">Company Name</span>
  <span className="font-bold text-2xl text-black pr-9">Designation</span> 
  <span className='font-bold text-2xl text-black pr-4'>Action</span>
</div>

          
         
<ul>
  {companies.map((item, index) => {
    // console.log("Company Logo:", item); 
    return (
      <li key={index} className="pl-2 pr-2 flex justify-between items-center mb-4">
       <img
  src={`data:image/png;base64,${item.Logo}`}
  alt="Company Logo"
  className="w-16 h-16 object-contain"
/>

        <span>{item.Companyname}</span>
        <span className='pl-9'>{item.Title}</span>
        <span>
          <button
            onClick={() => deletejobform(item._id)}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
          >
            Delete
          </button>
          <button className='bg-blue-500 text-white px-2 py-1 rounded-md'
          onClick={()=>handleviewapplication(item.Companyname)}>View Applicants</button>
        </span>
        
      </li>
    );
  })}
</ul>


        </div>
      )}
    </>
  );
}

export default AdminPanel;
