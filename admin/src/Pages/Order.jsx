import React from 'react';
import product from "/Images/profile.jpg"
import { FaEdit, FaInfo } from 'react-icons/fa';
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoMdSearch } from 'react-icons/io';

const OrderList = () => {
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Order List</h1>
            </div>
            <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white p-5">
                <div className="flex justify-end items-center my-[15px] mb-[25px]">
                    <div className='relative lg:w-[400px] md:w-[350px] w-[220px]'>
                        <input
                            type="text"
                            className="w-full bg-[#f1f1f1] px-[25px] py-[10px] rounded-md border-transparent focus:outline-none focus:border-gray-600 border" placeholder="search here.." />
                        <IoMdSearch className='absolute top-1/2 left-[5px] font-[16px] transform -translate-y-1/2' />
                    </div>

                </div>
                <div className="overflow-x-auto overflow-y-auto ">
                    <table className="min-w-full text-left text-sm text-gray-700 shadow-md rounded-[10px]">
                        <thead className="bg-blue-600 text-xs uppercase text-white sticky top-0 z-10 ">
                            <tr>
                                <th className="px-4 py-3 break-words">Order Id</th>
                                <th className="px-4 py-3 break-words">Payment Id</th>
                                <th className="px-4 py-3 break-words">Products</th>
                                <th className="px-4 py-3 break-words">Customer Name</th>
                                <th className="px-4 py-3 break-words">Email</th>
                                <th className="px-4 py-3 break-words">Phone Number</th>
                                <th className="px-4 py-3 break-words">Address</th> 
                                <th className="px-4 py-3 break-words">PinCode</th>                            
                                <th className="px-4 py-3 break-words">Order Status</th>
                                <th className="px-4 py-3 break-words">Total Amount</th>
                                <th className="px-4 py-3 break-words">Order Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top break-words">ohalfjelkj</td>
                                <td className="px-4 py-3 align-top break-words">lkdjfakfjekj</td>
                                <td className="px-4 py-3 align-top break-words">
                                    <img src={product} alt="category phoshot" className='w-[30px] h-[30px]' />
                                    Click here to see Details
                                </td>
                                <td className="px-4 py-3 align-top break-words">Sangeeta Panwar</td>
                                <td className="px-4 py-3 align-top break-words">sangita@gmail.com</td>
                                <td className="px-4 py-3 align-top break-words">9465116541</td>
                                <td className="px-4 py-3 align-top break-words">123st surrey BC</td>
                                <td className="px-4 py-3 align-top break-words">V3W-1M6</td>
                                <td className="px-4 py-3 align-top break-words">Pending</td>
                                <td className="px-4 py-3 align-top break-words">$1500</td>
                                <td className="px-4 py-3 align-top break-words">15th Jan 2025</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top break-words">ohalfjelkj</td>
                                <td className="px-4 py-3 align-top">lkdjfakfjekj</td>
                                <td className="px-4 py-3 align-top">
                                    <img src={product} alt="category phoshot" className='w-[30px] h-[30px]' />
                                    Click here to see Details
                                </td>
                                <td className="px-4 py-3 align-top">Sangeeta Panwar</td>
                                <td className="px-4 py-3 align-top">sangita@gmail.com</td>
                                <td className="px-4 py-3 align-top">9465116541</td>
                                <td className="px-4 py-3 align-top">123st surrey BC</td>
                                <td className="px-4 py-3 align-top">V3W-1M6</td>
                                <td className="px-4 py-3 align-top">Pending</td>
                                <td className="px-4 py-3 align-top">$1500</td>
                                <td className="px-4 py-3 align-top">15th Jan 2025</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">ohalfjelkj</td>
                                <td className="px-4 py-3 align-top">lkdjfakfjekj</td>
                                <td className="px-4 py-3 align-top">
                                    <img src={product} alt="category phoshot" className='w-[30px] h-[30px]' />
                                    Click here to see Details
                                </td>
                                <td className="px-4 py-3 align-top">Sangeeta Panwar</td>
                                <td className="px-4 py-3 align-top">sangita@gmail.com</td>
                                <td className="px-4 py-3 align-top">9465116541</td>
                                <td className="px-4 py-3 align-top">123st surrey BC</td>
                                <td className="px-4 py-3 align-top">V3W-1M6</td>
                                <td className="px-4 py-3 align-top">Pending</td>
                                <td className="px-4 py-3 align-top">$1500</td>
                                <td className="px-4 py-3 align-top">15th Jan 2025</td>
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

export default OrderList