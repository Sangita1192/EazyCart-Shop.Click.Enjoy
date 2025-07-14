import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";


const PrivateRoute = () => {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);

  if (loading) return <LoadingSpinner />;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
