import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminProfile } from "../api/allApi";
import Loader from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { admin, loading, error } = useAdminProfile();
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (loading) {
    return <Loader />;
  }

  if (error || !admin || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
