import { Button } from '@mui/material'
import React from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const MenuBar = ({setIsSidebarOpen}) => {
    return (
        <>
            <div className="lg:w-[90%] w-[95%] flex xl:gap-[50px] lg:gap-[40px] gap-[30px] m-auto py-[8px] ">
                <div className='hidden lg:block'>
                    <Button className='!flex !gap-[15px] !items-center' onClick={()=>setIsSidebarOpen(true)}>
                        <FaBarsStaggered />
                        <p>Shop By Category</p>
                        <MdOutlineKeyboardArrowDown />
                    </Button>
                </div>
                <div className="flex-1 overflow-x-auto scrollbar-hide whitespace-nowrap px-2">
                    <div className="w-max gap-4 flex">
                        <Button className="!font-bold !px-2">Home</Button>
                        <Button className="!font-bold !px-2">Fashion</Button>
                        <Button className="!font-bold !px-2">Electronics</Button>
                        <Button className="!font-bold !px-2">Bags</Button>
                        <Button className="!font-bold !px-2">Footwear</Button>
                        <Button className="!font-bold !px-2">Jewellery</Button>
                        <Button className="!font-bold !px-2">Beauty</Button>
                        <Button className="!font-bold !px-2">Wellness</Button>
                    </div>
                </div>


            </div>
        </>
    )
}

export default MenuBar