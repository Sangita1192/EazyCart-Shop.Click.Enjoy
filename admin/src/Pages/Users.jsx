import { Button } from '@mui/material'
import React from 'react'
import { IoMdSearch } from 'react-icons/io'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import user from "/Images/profile.jpg"
import { BiCalendar, BiPhoneCall } from 'react-icons/bi'

const Users = () => {
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>All Users</h1>
            </div>
            <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white p-5">
                <div className="flex justify-between items-center my-[15px] mb-[25px]">
                    <div className='relative ml-auto md:w-[400px] w-[250px]'>
                        <input
                            type="text"
                            className="w-full bg-[#f1f1f1] px-[25px] py-[10px] rounded-md border-transparent focus:outline-none focus:border-gray-600 border" placeholder="search here by email.." />
                        <IoMdSearch className='absolute top-1/2 left-[5px] font-[16px] transform -translate-y-1/2' />
                    </div>
                </div>
                <div className="overflow-x-auto overflow-y-auto ">
                    <table className="min-w-full text-left text-sm text-gray-700 shadow-md rounded-[10px]">
                        <thead className="bg-blue-600 text-xs uppercase text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3">
                                    <input type="checkbox" name="" id="" />
                                </th>
                                <th className="px-4 py-3">Id</th>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Created </th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top break-words">
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="px-4 py-3 align-top break-words"> 64131</td>
                                <td className='px-4 py-3 align-top break-words'>
                                    <div className='flex gap-[5px] items-center flex-wrap'>
                                        <img src={user} alt="profile image" className='w-[50px] h-[50px] object-contain' />
                                        <div>
                                            <p>Sangeeta Panwar</p>
                                            <p>sangita@home.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top break-words">
                                    <div className='flex gap-[5px]  items-center'>
                                        <BiPhoneCall />
                                        <span>123456379</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top break-words">
                                    <div className='flex gap-[5px] items-center'>
                                        <BiCalendar />
                                        <span>15th Jan, 2025</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top break-words">
                                    <Button className='!bg-green-600 !text-white !capitalize'>
                                        Active
                                    </Button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="px-4 py-3 align-top"> 64131</td>
                                <td className='px-4 py-3 align-top'>
                                    <div className='flex gap-[5px] flex-wrap  items-center'>
                                        <img src={user} alt="profile image" className='w-[50px] h-[50px] object-contain' />
                                        <div>
                                            <p>Sangeeta Panwar</p>
                                            <p>sangita@home.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <div className='flex gap-[5px]  items-center'>
                                        <BiPhoneCall />
                                        <span>123456379</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <div className='flex gap-[5px] items-center'>
                                        <BiCalendar />
                                        <span>15th Jan, 2025</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <Button className='!bg-green-600 !text-white !capitalize'>
                                        Active
                                    </Button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="px-4 py-3 align-top"> 64131</td>
                                <td className='px-4 py-3 align-top break-words'>
                                    <div className='flex gap-[5px]  items-center'>
                                        <img src={user} alt="profile image" className='w-[50px] h-[50px] object-contain' />
                                        <div>
                                            <p>Sangeeta Panwar</p>
                                            <p>sangita@home.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <div className='flex gap-[5px]  items-center'>
                                        <BiPhoneCall />
                                        <span>123456379</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <div className='flex gap-[5px] items-center'>
                                        <BiCalendar />
                                        <span>15th Jan, 2025</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <Button className='!bg-green-600 !text-white !capitalize'>
                                        Active
                                    </Button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 align-top">
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="px-4 py-3 align-top"> 64131</td>
                                <td className='px-4 py-3 align-top'>
                                    <div className='flex gap-[5px]  items-center'>
                                        <img src={user} alt="profile image" className='w-[50px] h-[50px] object-contain' />
                                        <div>
                                            <p>Sangeeta Panwar</p>
                                            <p>sangita@home.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <div className='flex gap-[5px]  items-center'>
                                        <BiPhoneCall />
                                        <span>123456379</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <div className='flex gap-[5px] items-center'>
                                        <BiCalendar />
                                        <span>15th Jan, 2025</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <Button className='!bg-red-600 !text-white !capitalize'>
                                        In-Active
                                    </Button>
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

export default Users