import { Button } from '@mui/material';
import React, { useState } from 'react'
import { IoMdCloudUpload } from 'react-icons/io';

const BannerCreate = () => {
    const [selectedImage, setSelectedImage] = useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setSelectedImage({ file, url: fileUrl });
        }
    };

    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Add Banner</h1>
            </div>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5">
                <div className="my-[25px] flex flex-col gap-[5px] relative">
                    <label htmlFor="title" className="mb-2 font-semibold">Banner Title</label>
                    <input type="text" className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Banner Title" />
                </div>
                <div className="my-[25px] flex flex-col gap-[5px]">
                    <label htmlFor="description" className="mb-2 font-semibold">Description</label>
                    <textarea className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Banner Description" />
                </div>
                <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="start date" className="mb-2 font-semibold">Start Date</label>
                        <input
                            name="start_date"
                            id="start_date"
                            type='date'
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                        </input>
                    </div>
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="end date" className="mb-2 font-semibold">End Date</label>
                        <input
                            name="end_date"
                            id="end_date"
                            type='date'
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                        </input>
                    </div>
                </div>
                <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="isActive" className="mb-2 font-semibold">isActive</label>
                        <select
                            name="isActive"
                            id="isActive"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    {/* Banner Type */}
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="bannerType" className="mb-2 font-semibold">Banner Type</label>
                        <select
                            name="banner_type"
                            id="banner_type"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                            <option value="default">---select type---</option>
                            <option value="top">Top</option>
                            <option value="homepage">HomePage</option>
                            <option value="bottom">Bottom</option>
                        </select>
                    </div>
                </div>
                <div className="my-[25px] flex flex-col w-full lg:w-1/2">
                    <label htmlFor="image" className="mb-2 font-semibold">Banner Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] text-sm focus:outline-blue-600 cursor-pointer"
                    />
                    {/* Preview */}
                    {selectedImage.url && (
                        <div className="mt-4 flex justify-center">
                            <div className="relative w-[200px] h-[200px] rounded-md border border-gray-300">
                                {/* Image */}
                                <img
                                    src={selectedImage.url}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}
                </div>


                <div className='lg:w-[30%] md:w-[40%] sm:w-[60%] w-[70%]' >
                    <Button className='!bg-blue-600 hover:!bg-blue-700 !text-white !capitalize !w-full                        !flex 
                                !justify-center !items-center gap-x-2'
                    >
                        <IoMdCloudUpload className='text-xl' />
                        Add & View Banner
                    </Button>
                </div>

            </div>
        </>
    )
}

export default BannerCreate