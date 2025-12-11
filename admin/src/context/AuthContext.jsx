import React, { createContext, useState, useEffect } from "react";
import { checkAuthLogin } from "../api/adminUser";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await checkAuthLogin();
            if (res.data.user) setIsLoggedIn(true);
        } catch (err) {
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
