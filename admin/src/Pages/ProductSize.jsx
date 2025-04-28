import { Button } from '@mui/material'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoMdCloudUpload } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

const ProductSize = () => {
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Product Size</h1>
            </div>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 lg:w-[70%] md:w-[80%] w-[100%]">
                <div className="my-[25px] flex flex-col gap-[5px] relative">
                    <label htmlFor="size" className="mb-2 font-semibold">Add Product Size</label>
                    <input type="text" className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Product Size" />
                </div>
                <div className='lg:w-[30%] md:w-[40%] sm:w-[60%] w-[70%]'>
                    <Button className='
                            !bg-blue-600 
                            hover:!bg-blue-700 
                            !text-white 
                            !capitalize 
                            !w-full 
                            !flex 
                            !justify-center 
                            !items-center 
                            gap-x-2
                            '
                    >
                        <IoMdCloudUpload className='text-xl' />
                        Publish & View
                    </Button>
                </div>
            </div>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 lg:w-[70%] md:w-[80%] w-[100%]">
                <h1 className="text-xl font-semibold mb-5">Product Sizes</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-blue-600 text-white text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">Size</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3">Small</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <div className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-400 cursor-pointer transition">
                                            <FaEdit size={16} />
                                        </div>
                                        <div className="bg-red-500 text-white p-2 rounded-full hover:bg-red-400 cursor-pointer transition">
                                            <MdDelete size={16} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-gray-50 border-b border-gray-200 hover:bg-gray-100">
                                <td className="px-4 py-3">Medium</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <div className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-400 cursor-pointer transition">
                                            <FaEdit size={16} />
                                        </div>
                                        <div className="bg-red-500 text-white p-2 rounded-full hover:bg-red-400 cursor-pointer transition">
                                            <MdDelete size={16} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>

    )
}

export default ProductSize