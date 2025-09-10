import React, { createContext, useMemo, useState } from 'react'
import { getActiveCategories } from '../api/categoryApi';
import { getColors, getProductSizes } from '../api/productApi';

const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
    const [activeCategories, setActiveCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors]= useState([]);

    const fetchColors = async() =>{
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


    return (
        <GlobalContext.Provider value={{ activeCategories, fetchActiveCategories, sizes, fetchSizes, colors, fetchColors}}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }