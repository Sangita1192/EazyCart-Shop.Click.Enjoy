import { Button } from '@mui/material'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoMdCloudUpload } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import product from "/Images/profile.jpg"

const SubCategory = () => {
    const [subcategory, setSubcategory] = useState(['women', 'men', 'kids']);
    const removeSubcategory = (index) => {
        alert(index);
        const updatedSubCat = subcategory.filter((subCat,i)=> i !== index);
        setSubcategory(updatedSubCat);
      };
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Product Sub Category</h1>
            </div>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 lg:w-[70%] md:w-[80%] w-[100%]">
                <div className="my-[25px] flex flex-col gap-[5px] relative">
                    <label htmlFor="parentcategory" className="mb-2 font-semibold">Parent Category</label>
                    <select
                        name="parentcategory"
                        id="parentcategory"
                        className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                    >
                        <option value="default">---select category---</option>
                        <option value="fashion">Fashion</option>
                        <option value="electronics">Electronics</option>
                        <option value="electronics">Accessories</option>
                    </select>
                </div>
                <div className="my-[25px] flex flex-col gap-[5px] relative">
                    <label htmlFor="size" className="mb-2 font-semibold">Sub Category</label>
                    <input type="text" className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Sub-Category" />
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
                        Publish & View Sub-Category
                    </Button>
                </div>
            </div>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 lg:w-[70%] md:w-[80%] w-[100%]">
                <h1 className="text-xl font-semibold mb-5">Sub Category List</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-blue-600 text-white text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">Category Image</th>
                                <th className="px-4 py-3 text-left">Parent Category</th>
                                <th className="px-4 py-3 text-left">Sub-Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <img src={product} alt="" className="w-[50px] h-[50px] rounded object-cover" />
                                </td>
                                <td className="px-4 py-3">Fashion</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2 flex-wrap">
                                        {subcategory.map((sub,i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1 text-sm"
                                            >
                                                {sub}
                                                <button
                                                    onClick={() => removeSubcategory(i)}
                                                    className="text-red-400 hover:text-red-800 font-bold cursor-pointer"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>

                            {/* Add more rows similarly */}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default SubCategory