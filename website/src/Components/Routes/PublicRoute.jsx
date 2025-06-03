import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";


const PublicRoute = () => {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);

  if (loading) return <LoadingSpinner />;

  return isLoggedIn ? <Navigate to="/my-account" replace /> : <Outlet />;
};

export default PublicRoute;
