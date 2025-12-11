import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useContext(AuthContext);

    if (loading) return <LoadingSpinner />;

    if (!isLoggedIn) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;
