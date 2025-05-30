import React, { createContext, useMemo, useState } from 'react'
import { getActiveCategories } from '../api/categoryApi';

const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
    const [activeCategories, setActiveCategories] = useState([])

    const fetchActiveCategories = async () => {
        try {
            const res = await getActiveCategories();
            setActiveCategories(res.data.categories || []);
        } catch (err) {
            console.error('Error fetching active categories:', err);
        }
    }

    return (
        <GlobalContext.Provider value={{ activeCategories, fetchActiveCategories }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }