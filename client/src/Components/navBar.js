import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {jwtDecode} from 'jwt-decode'; 

import { useState } from 'react';
function NavBar() {
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("");
  const [showMenu, setShowmenu] = useState(false);
  const [Roles, setRoles] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          // console.log(decoded.role);
          setRoles(decoded.role || 'user');
          setUserName(decoded.name || "User");
          setProfilePic(decoded.profilepic || "");
        } catch (err) {
          console.error("Failed to decode token", err);
        }
      }
    }, []);
    const goToBrowse = () => {
        navigate('/Browse');
    }
    const gotohome=()=>{
        // navigate('/');
        if(Roles==="recruiter"){
            navigate('/Admin_panel');
        }else{
            navigate('/homepage');
        }
    }
    const Togglemenu=()=>{
        setShowmenu(!showMenu);
    }
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
    };
    
    
  return (
    <div className="p-6 m-2 rounded-xl bg-slate-300">
      <div className="flex justify-between">
        <div className="logo flex flex-column">
        <h1 className="font-bold text-2xl text-black cursor-pointer"onClick={gotohome}>job</h1>
        <h1 className="font-bold text-2xl text-red-600 cursor-pointer"onClick={gotohome}>hunt</h1>
        </div>
        
        <div className="items">
          <ul className="flex justify-end space-x-2 mr-10 font-semibold"> 
           
            {Roles === "user" && (
    <>
      <Link to="/homepage">Home</Link>
      {/* <li>Jobs</li> */}
      <li className="cursor-pointer" onClick={goToBrowse}>Browse_job</li>
    </>
  )}
  
  <li className='flex '>
    <li className='cursor-pointer pt-2 pr-3'>
    {Roles === "recruiter" && (
      <Link to="/Admin_panel">Home</Link>
    )}
    </li>
  <div className="flex items-center space-x-2 cursor-pointer" onClick={Togglemenu}>
   
  
    {Roles === "recruiter" && (
      
      <h1 className="text-sm font-bold text-blue-600"> {userName}</h1>
    )}
    <img
      src={profilePic ? `data:image/jpeg;base64,${profilePic}` : ""}
      alt="Profile"
      className="w-10 h-10 rounded-full object-cover border border-gray-400"
    />
  </div>
</li>


{showMenu && (
    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
      <ul className="py-2 text-sm text-gray-700">
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate("/details")}
        >
          My Profile
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  )}

           
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
