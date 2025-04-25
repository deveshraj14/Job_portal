import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 

function Privatecomponent({ children, allowedroles }) {
  const token = localStorage.getItem("token");

  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (allowedroles.includes(userRole)) {
      return children;
    } else {
      return <Navigate to="/homepage" replace />;
    }
  } catch (err) {
    console.error("Token decode failed:", err);
    return <Navigate to="/" replace />;
  }
}

export default Privatecomponent;
