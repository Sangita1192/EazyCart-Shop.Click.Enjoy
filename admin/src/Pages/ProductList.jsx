import { Button } from '@mui/material'
import React from 'react'
import { FaEdit, FaInfo, FaRegStar, FaStar } from 'react-icons/fa';
import { IoMdSearch } from "react-icons/io";
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import product from "/Images/profile.jpg"
import { Link } from 'react-router-dom';

const ProductList = () => {
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Product List</h1>
                <Link to="/products/add">
                    <Button className='!bg-blue-600 !text-white hover:!bg-blue-800'>
                        + Add Product
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
                    <div className='relative lg:w-[400px] md:w-[350px]'>
                        <input
                            type="text"
                            className="w-full bg-[#f1f1f1] px-[25px] py-[10px] rounded-md border-transparent focus:outline-none focus:border-gray-600 border" placeholder="search here.." />
                        <IoMdSearch className='absolute top-1/2 left-[5px] font-[16px] transform -translate-y-1/2' />
                    </div>

                </div>
                <div className="overflow-x-auto overflow-y-auto ">
                    <table className="min-w-full text-left text-sm text-gray-700 shadow-md rounded-[10px]">
                        <thead className="bg-blue-300 text-xs uppercase text-gray-600 sticky top-0 z-10 ">
                            <tr>
                                <th className="px-4 py-3">Product</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Sub-Category</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Rating</th>
                                <th className="px-4 py-3">Action</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img src={product} alt="" className="w-[50px] h-[50px] rounded object-cover" />
                                    <div>
                                        <h2 className="font-bold">Product Name</h2>
                                        <p className="text-[14px] text-gray-600">
                                            {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae iusto amet ab pariatur nulla natus ipsa harum ratione consectetur saepe quasi, sunt rerum laboriosam veritatis odit voluptates architecto illum earum?`.slice(0, 50)}...
                                        </p>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">Fashion</td>
                                <td className="px-4 py-3 align-top">Women Jeans</td>
                                <td className="px-4 py-3 align-top">$250</td>
                                <td className="px-4 py-3 align-top">
                                    <div className="flex items-start gap-[2px] text-yellow-500">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar className="text-gray-400" />
                                    </div>
                                </td>

                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <Link to={`/products/detail/1234`}>
                                            <div className="bg-green-600 p-2 rounded-full hover:bg-green-700 cursor-pointer">
                                                <FaInfo />
                                            </div>
                                        </Link>
                                        <Link to={`/products/edit/1234`}>
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
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img src={product} alt="" className="w-[50px] h-[50px] rounded object-cover" />
                                    <div>
                                        <h2 className="font-bold">Product Name</h2>
                                        <p className="text-[14px] text-gray-600">
                                            {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae iusto amet ab pariatur nulla natus ipsa harum ratione consectetur saepe quasi, sunt rerum laboriosam veritatis odit voluptates architecto illum earum?`.slice(0, 50)}...
                                        </p>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">Fashion</td>
                                <td className="px-4 py-3 align-top">Women Jeans</td>
                                <td className="px-4 py-3 align-top">$250</td>
                                <td className="px-4 py-3 align-top">
                                    <div className="flex items-start gap-[2px] text-yellow-500">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar className="text-gray-400" />
                                    </div>
                                </td>

                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <Link to={`/products/detail/1234`}>
                                            <div className="bg-green-600 p-2 rounded-full hover:bg-green-700 cursor-pointer">
                                                <FaInfo />
                                            </div>
                                        </Link>
                                        <Link to={`/products/edit/1234`}>
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
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img src={product} alt="" className="w-[50px] h-[50px] rounded object-cover" />
                                    <div>
                                        <h2 className="font-bold">Product Name</h2>
                                        <p className="text-[14px] text-gray-600">
                                            {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae iusto amet ab pariatur nulla natus ipsa harum ratione consectetur saepe quasi, sunt rerum laboriosam veritatis odit voluptates architecto illum earum?`.slice(0, 50)}...
                                        </p>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">Fashion</td>
                                <td className="px-4 py-3 align-top">Women Jeans</td>
                                <td className="px-4 py-3 align-top">$250</td>
                                <td className="px-4 py-3 align-top">
                                    <div className="flex items-start gap-[2px] text-yellow-500">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar className="text-gray-400" />
                                    </div>
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
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img src={product} alt="" className="w-[50px] h-[50px] rounded object-cover" />
                                    <div>
                                        <h2 className="font-bold">Product Name</h2>
                                        <p className="text-[14px] text-gray-600">
                                            {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae iusto amet ab pariatur nulla natus ipsa harum ratione consectetur saepe quasi, sunt rerum laboriosam veritatis odit voluptates architecto illum earum?`.slice(0, 50)}...
                                        </p>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">Fashion</td>
                                <td className="px-4 py-3 align-top">Women Jeans</td>
                                <td className="px-4 py-3 align-top">$250</td>
                                <td className="px-4 py-3 align-top">
                                    <div className="flex items-start gap-[2px] text-yellow-500">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar className="text-gray-400" />
                                    </div>
                                </td>

                                <td className="px-4 py-3 whitespace-nowrap align-top">
                                    <div className="flex items-center gap-2 text-white">
                                        <Link to={`/products/detail/1234`}>
                                            <div className="bg-green-600 p-2 rounded-full hover:bg-green-700 cursor-pointer">
                                                <FaInfo />
                                            </div>
                                        </Link>
                                        <Link to={`/products/edit/1234`}>
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

export default ProductList