import { Button } from '@mui/material'
import React from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MenuBar = ({ setIsSidebarOpen }) => {

    const { categories, loading, error } = useSelector((state) => state.category);

    return (
        <>
            <div className="lg:w-[90%] w-[95%] flex xl:gap-[50px] lg:gap-[40px] gap-[30px] m-auto py-[8px] ">
                <div className='hidden lg:block'>
                    <Button className='!flex !gap-[15px] !items-center' onClick={() => setIsSidebarOpen(true)}>
                        <FaBarsStaggered />
                        <p>Shop By Category</p>
                        <MdOutlineKeyboardArrowDown />
                    </Button>
                </div>
                <div className="flex-1 overflow-x-auto scrollbar-hide whitespace-nowrap px-2">
                    <div className="w-max gap-4 flex">
                        {loading && <span className="px-2">Loading...</span>}
                        {error && <span className="text-red-500 px-2">{error}</span>}
                        {!loading && !error && categories.length > 0 &&
                            categories.map((cat) => (
                                <Button
                                    key={cat._id}
                                    className="!font-bold !px-2 !capitalize !text-[black]"
                                    component={Link}
                                    to={`/category/${cat.slug || cat._id}`}
                                >
                                    {cat.name}
                                </Button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuBar