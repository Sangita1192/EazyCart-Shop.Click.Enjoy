import React, { createContext, useState, useEffect } from "react";
import { checkAuthLogin } from "../api/adminUser";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        try {
            const res = await checkAuthLogin();
            if (res.data.user) {
                setIsLoggedIn(true);
                setUser(res.data.user);
            }
        } catch (err) {
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            setUser(null);
            setLoading(false);
            return; 
        }
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading, user, setUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
