import React, { useEffect, useState } from 'react'
import ProductSideBar from '../Components/ProductSideBar'
import { Button } from '@mui/material'
import ProductsGrid from '../Components/ProductListing/ProductsGrid';
import { fetchAllProductColors, fetchAllProductSizes } from '../Api/api';
import { useLocation } from 'react-router-dom';

const ProductListing = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let catId = queryParams.get('category');

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);


    useEffect(() => {
        document.body.style.overflow = isFilterOpen ? 'hidden' : '';
    }, [isFilterOpen]);

    useEffect(() => {
        getAllProductColors();
        getAllProductSizes();
    }, [])

    const getAllProductSizes = async () => {
        try {
            const res = await fetchAllProductSizes();
            setSizes(res.data.productSizes);
        }
        catch (e) {
            console.log(e.mesage);
        }
    }

    const getAllProductColors = async () => {
        try {
            const res = await fetchAllProductColors();
            setColors(res.data.productColors);
        }
        catch (e) {
            console.log(e.mesage);
        }
    }
    return (
        <>
            <div className='w-full bg-white py-8 '>
                <div className="px-4 mb-4 lg:hidden flex justify-center">
                    <Button
                        onClick={() => setIsFilterOpen(true)}
                        className="!w-[80%] !px-4 !py-2 !bg-amber-500 hover:!bg-amber-600 !text-white rounded"
                    >
                        Filter & Sort
                    </Button>
                </div>

                <div className='flex'>
                    <ProductSideBar isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} sizes={sizes} colors={colors} />
                    <div className='w-full lg:w-[80%] p-3'>
                        <ProductsGrid categoryId={catId}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductListing