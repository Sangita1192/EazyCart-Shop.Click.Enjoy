import { Button } from '@mui/material'
import React from 'react'
import product from "/Images/profile.jpg"
import { Link } from 'react-router-dom'
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'

const BannerList = () => {
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Banners</h1>
                <Link to="/banners/add">
                    <Button className='!bg-blue-600 !text-white hover:!bg-blue-800'>
                        + Add Banner
                    </Button>
                </Link>
            </div>
            <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white p-5">
                <div className="flex justify-between items-center my-[15px] mb-[25px]">
                    <div>
                        <label htmlFor="type" className='font-semibold italic'>Category by: </label>
                        <select name="type" id="" className='bg-[#f1f1f1] px-[15px] py-[10px] rounded-md !text-[14px]'>
                            <option value="all">All</option>
                            <option value="homepage">HomePage</option>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>

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
                        <thead className="bg-blue-600 text-xs uppercase text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Start Date</th>
                                <th className="px-4 py-3">End Date</th>
                                <th className="px-4 py-3">isActive</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">
                                    <img src={product} alt="" className="w-[150px] h-[80px] rounded object-cover" />
                                </td>
                                <td className="px-4 py-3 align-top"> Banner Title</td>
                                <td className='px-4 py-3 align-top'> 
                                {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae iusto amet ab pariatur nulla natus ipsa harum ratione consectetur saepe quasi, sunt rerum laboriosam veritatis odit voluptates architecto illum earum?`.slice(0, 50)}...
                                </td>
                                <td className="px-4 py-3 align-top">15th,jan,2025</td>
                                <td className="px-4 py-3 align-top">30th,Jan,2025</td>
                                <td className="px-4 py-3 align-top">
                                    <Button className='!bg-green-600 !text-white !capitalize'>
                                            Active
                                    </Button>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <Link to={`/banners/edit/1234`}>
                                            <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                                <FaEdit />
                                            </div>
                                        </Link>
                                        <div className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer">
                                            <MdDelete />
                                        </div>
                                    </div>
                                </td>

                            </tr>

                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">
                                    <img src={product} alt="" className="w-[150px] h-[80px] rounded object-cover" />
                                </td>
                                <td className="px-4 py-3 align-top"> Banner Title</td>
                                <td className='px-4 py-3 align-top'> 
                                {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae iusto amet ab pariatur nulla natus ipsa harum ratione consectetur saepe quasi, sunt rerum laboriosam veritatis odit voluptates architecto illum earum?`.slice(0, 50)}...
                                </td>
                                <td className="px-4 py-3 align-top">15th jan 2025</td>
                                <td className="px-4 py-3 align-top">30th Jan 2025</td>
                                <td className="px-4 py-3 align-top">
                                    <Button className='!bg-green-600 !text-white'>
                                            Active
                                    </Button>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <Link to={`/banners/edit/1234`}>
                                            <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                                <FaEdit />
                                            </div>
                                        </Link>
                                        <div className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer">
                                            <MdDelete />
                                        </div>
                                    </div>
                                </td>

                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">
                                    <img src={product} alt="" className="w-[150px] h-[80px] rounded object-cover" />
                                </td>
                                <td className="px-4 py-3 align-top"> Banner Title</td>
                                <td className='px-4 py-3 align-top'> 
                                {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae iusto amet ab pariatur nulla natus ipsa harum ratione consectetur saepe quasi, sunt rerum laboriosam veritatis odit voluptates architecto illum earum?`.slice(0, 50)}...
                                </td>
                                <td className="px-4 py-3 align-top">15th jan 2025</td>
                                <td className="px-4 py-3 align-top">30th Jan 2025</td>
                                <td className="px-4 py-3 align-top">
                                    <Button className='!bg-green-600 !text-white'>
                                            Active
                                    </Button>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <Link to={`/banners/edit/1234`}>
                                            <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                                <FaEdit />
                                            </div>
                                        </Link>
                                        <div className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer">
                                            <MdDelete />
                                        </div>
                                    </div>
                                </td>

                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">
                                    <img src={product} alt="" className="w-[150px] h-[80px] rounded object-cover" />
                                </td>
                                <td className="px-4 py-3 align-top"> Banner Title</td>
                                <td className='px-4 py-3 align-top'> 
                                {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae iusto amet ab pariatur nulla natus ipsa harum ratione consectetur saepe quasi, sunt rerum laboriosam veritatis odit voluptates architecto illum earum?`.slice(0, 50)}...
                                </td>
                                <td className="px-4 py-3 align-top">15th jan 2025</td>
                                <td className="px-4 py-3 align-top">30th Jan 2025</td>
                                <td className="px-4 py-3 align-top">
                                    <Button className='!bg-red-600 !text-white'>
                                            InActive
                                    </Button>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <Link to={`/banners/edit/1234`}>
                                            <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                                <FaEdit />
                                            </div>
                                        </Link>
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
                        {/* <Button
                            size="small"
                            variant="outlined"
                        // onClick={handlePrev}
                        // disabled={currentPage === 1}
                        >
                            <MdKeyboardArrowLeft />
                        </Button> */}
                        {/* <Button
                            size="small"
                            variant="outlined"
                        // onClick={handleNext}
                        // disabled={currentPage === totalPages}
                        >
                            Next
                        </Button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BannerList