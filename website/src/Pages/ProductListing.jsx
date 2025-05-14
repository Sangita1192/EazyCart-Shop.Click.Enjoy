import React, { useEffect, useState } from 'react'
import ProductSideBar from '../Components/ProductSideBar'
import { Button } from '@mui/material'
import ProductsGrid from '../Components/ProductListing/ProductsGrid';

const ProductListing = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);


    useEffect(() => {
        document.body.style.overflow = isFilterOpen ? 'hidden' : '';
    }, [isFilterOpen]);
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
                    <ProductSideBar isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
                    <div className='w-full lg:w-[80%] p-3'>
                        <ProductsGrid/>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ProductListing