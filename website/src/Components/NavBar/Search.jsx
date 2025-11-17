import React, { useState } from 'react';
import { MdSearch } from "react-icons/md";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState("");
  const nav = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    nav(`/products?search=${encodeURIComponent(query.trim())}`);
  }
  return (
    <>
      <div className="searchBox w-full h-[45px] bg-[#e5e5e5] p-2 rounded-[8px] relative ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder='Search for product..'
          className="w-full focus:outline-none bg-inherit h-[25px] p-[10px]"
        />

        <Button
          className="!absolute !right-[5px] !top-[5px] !w-[35px] !min-w-[35px] !h-[35px] !rounded-full"
          onClick={handleSearch}
        >
          <MdSearch size={24} className='text-black' />
        </Button>
      </div>
    </>
  )
}

export default Search