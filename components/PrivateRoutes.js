import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ permittedRoles, children }) => {
  const { user } = useAuth();
  
  if (!user) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }
  
  if (!permittedRoles.includes(user.role)) {
    // If user does not have the required role, redirect to unauthorized page
    return <Navigate to="/unauthorized" />;
  }

 

  return children;
};

export default PrivateRoutes;
