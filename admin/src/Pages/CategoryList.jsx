import React from 'react';
import product from "/Images/profile.jpg"
import { FaEdit, FaInfo } from 'react-icons/fa';
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoMdSearch } from 'react-icons/io';

const CategoryList = () => {
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Category List</h1>
                <Link to="/category/add">
                    <Button className='!bg-blue-600 !text-white hover:!bg-blue-800'>
                        + Add Category
                    </Button>
                </Link>
            </div>
            <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white p-5">
                <div className="flex justify-between items-center my-[15px] mb-[25px]">
                    <div>
                        <label htmlFor="category" className='font-semibold italic'>Category by: </label>
                        <select name="category" id="" className='bg-[#f1f1f1] px-[5px] py-[10px] rounded-md'>
                            <option value="all">All</option>
                            <option value="">Fashion</option>
                        </select>
                    </div>
                    <div className='relative'>
                        <input
                            type="text"
                            className="bg-[#f1f1f1] px-[25px] py-[10px] rounded-md border-transparent focus:outline-none focus:border-gray-600 border" placeholder="search here.." />
                        <IoMdSearch className='absolute top-1/2 left-[5px] font-[16px] transform -translate-y-1/2' />
                    </div>

                </div>
                <div className="overflow-x-auto overflow-y-auto ">
                    <table className="min-w-full text-left text-sm text-gray-700 shadow-md rounded-[10px]">
                        <thead className="bg-blue-300 text-xs uppercase text-gray-600 sticky top-0 z-10 ">
                            <tr>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Images</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">Category Name</td>
                                <td className="px-4 py-3 align-top">Description</td>
                                <td className="px-4 py-3 align-top">
                                    <img src={product} alt="category phoshot" className='w-[30px] h-[30px]' />
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <div className="bg-green-600 p-2 rounded-full hover:bg-green-700 cursor-pointer">
                                            <FaInfo />
                                        </div>
                                        <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                            <FaEdit />
                                        </div>
                                        <div className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer">
                                            <MdDelete />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">Category Name</td>
                                <td className="px-4 py-3 align-top">Description</td>
                                <td className="px-4 py-3 align-top">
                                    <img src={product} alt="category phoshot" className='w-[30px] h-[30px]' />
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <div className="bg-green-600 p-2 rounded-full hover:bg-green-700 cursor-pointer">
                                            <FaInfo />
                                        </div>
                                        <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                            <FaEdit />
                                        </div>
                                        <div className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer">
                                            <MdDelete />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">Category Name</td>
                                <td className="px-4 py-3 align-top">Description</td>
                                <td className="px-4 py-3 align-top">
                                    <img src={product} alt="category phoshot" className='w-[30px] h-[30px]' />
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <div className="bg-green-600 p-2 rounded-full hover:bg-green-700 cursor-pointer">
                                            <FaInfo />
                                        </div>
                                        <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                            <FaEdit />
                                        </div>
                                        <div className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer">
                                            <MdDelete />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">Category Name</td>
                                <td className="px-4 py-3 align-top">Description</td>
                                <td className="px-4 py-3 align-top">
                                    <img src={product} alt="category phoshot" className='w-[30px] h-[30px]' />
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <div className="bg-green-600 p-2 rounded-full hover:bg-green-700 cursor-pointer">
                                            <FaInfo />
                                        </div>
                                        <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                            <FaEdit />
                                        </div>
                                        <div className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer">
                                            <MdDelete />
                                        </div>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="md:flex justify-between items-center mt-4 text-center">
                    <div className="flex gap-2 items-center justify-content-center">
                        <span className="">Row per page </span>
                        <select name="pageNumber" id="" className="bg-[#f1f1f1] px-[5px] py-[10px]">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>

                        </select>
                    </div>
                    <div className="space-x-2 flex  items-center">
                        <MdKeyboardArrowLeft />
                        <span className="text-sm text-gray-600">
                            Page 1 of 20
                        </span>

                        <MdKeyboardArrowRight />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryList