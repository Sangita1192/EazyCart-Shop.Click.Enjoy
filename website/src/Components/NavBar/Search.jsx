import React from 'react';
import { MdSearch } from "react-icons/md";
import Button from '@mui/material/Button';

const Search = () => {
  return (
    <>
        <div className="searchBox w-full h-[45px] bg-[#e5e5e5] p-2 rounded-[8px] relative ">           
            <input type="text" placeholder='Search for product..' className="w-full focus:outline-none bg-inherit h-[25px] p-[10px]"/>
            <Button  className="!absolute !right-[5px] !top-[5px] !w-[35px] !min-w-[35px] !h-[35px] !rounded-full"> 
                <MdSearch size={24} className='text-black'/>
            </Button>          
        </div>
    </>
  )
}

export default Search