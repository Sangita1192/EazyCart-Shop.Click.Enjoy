import React, { createContext, useContext, useState } from 'react'
import { getActiveCategories } from '../api/categoryApi';
import { getColors, getProductSizes } from '../api/productApi';
import { adminLogout } from '../api/adminUser';
import { AuthContext } from './AuthContext';

const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
    const [activeCategories, setActiveCategories] = useState([]);
    const { setIsLoggedIn, setUser} = useContext(AuthContext);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    const fetchColors = async () => {
        try {
            const res = await getColors();
            setColors(res.data.colors || []);
        }
        catch (err) {
            console.error('Error fetching product colors', err.message);
        }
    }
    const fetchSizes = async () => {
        try {
            const res = await getProductSizes();
            setSizes(res.data.sizes || []);
        }
        catch (err) {
            console.error('Error fetching product sizes', err.message);
        }
    }

    const fetchActiveCategories = async () => {
        try {
            const res = await getActiveCategories();
            setActiveCategories(res.data.categories || []);
        } catch (err) {
            console.error('Error fetching active categories:', err);
        }
    }

    const handleLogout = async () => {
        try {
            await adminLogout();
            setIsLoggedIn(false);
            setUser(null);
            localStorage.removeItem("adminToken");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };


    return (
        <GlobalContext.Provider value={{ activeCategories, fetchActiveCategories, sizes, fetchSizes, colors, fetchColors, handleLogout }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }