import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { IoMdCloudUpload } from 'react-icons/io';
import { showError } from '../services/toastService';
import { addBanner } from '../api/bannerApi';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../../utils/successAlert';

const BannerCreate = () => {
    const nav = useNavigate();
    const [selectedImage, setSelectedImage] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '/',
        startDate: '',
        endDate: '',
        bannerType: 'slider',
        order: 1,
        isActive: true,

    });
    const [submitting, setSubmitting] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setSelectedImage({ file, url: fileUrl });
        }
    };

    const handleCreateBanner = async () => {
        try {
            setSubmitting(true);
            setErrors({});
            const payload = new FormData();
            payload.append("title", formData.title.trim());
            payload.append("description", formData.description.trim());
            payload.append("link", formData.link.trim());
            payload.append("isActive", formData.isActive);
            payload.append("bannerType", formData.bannerType);
            payload.append("order", formData.order);
            payload.append("startDate", formData.startDate);
            payload.append("endDate", formData.endDate);
            if (selectedImage?.file) {
                payload.append("image", selectedImage.file);
            }

            const response = await addBanner(payload);
            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Failed to create banner");
            }
            setFormData({
                title: "",
                description: "",
                link: "/",
                startDate: "",
                endDate: "",
                bannerType: "slider",
                order: 1,
                isActive: true,
            });
            setSelectedImage([]);
            await showSuccessAlert("Banner was successfully created.");
            nav("/");
        } catch (error) {
            const apiErrors = error?.response?.data?.errors;
            const errMsg = error?.response?.data?.message || "Something went wrong.";
            if (apiErrors) {
                setErrors(apiErrors);
            } else {
                showError(errMsg);
            }
        } finally {
            setSubmitting(false);
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
                    <input type="text"
                        name='title'
                        className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Banner Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>
                <div className="my-[25px] flex flex-col gap-[5px]">
                    <label htmlFor="description" className="mb-2 font-semibold">Description</label>
                    <textarea name='description' className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Banner Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>
                <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="start date" className="mb-2 font-semibold">Start Date</label>
                        <input
                            name="startDate"
                            id="start_date"
                            type='date'
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        >
                        </input>
                        {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate}</p>}
                    </div>
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="end date" className="mb-2 font-semibold">End Date</label>
                        <input
                            name="endDate"
                            id="end_date"
                            type='date'
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        >
                        </input>
                        {errors.endDate && <p className="text-red-600 text-sm mt-1">{errors.endDate}</p>}
                    </div>
                </div>
                <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="isActive" className="mb-2 font-semibold">isActive</label>
                        <select
                            name="isActive"
                            id="isActive"
                            value={formData.isActive}
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                            onChange={(e)=>setFormData({...formData,isActive:e.target.value})}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    {/* Banner Type */}
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="bannerType" className="mb-2 font-semibold">Banner Type</label>
                        <select
                            name="bannerType"
                            id="banner_type"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                            <option value="slider">slider</option>
                            <option value="middle">middle</option>
                            <option value="card">card</option>
                        </select>
                    </div>
                </div>
                <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="image" className="mb-2 font-semibold">Banner Image</label>
                        <input
                            type="file"
                            id="image"
                            name='image'
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
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="image link" className="mb-2 font-semibold">Link</label>
                        <input
                            type="text"
                            id="link"
                            name='link'
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] text-sm focus:outline-blue-600 cursor-pointer"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        />
                    </div>
                </div>

                <div className='lg:w-[30%] md:w-[40%] sm:w-[60%] w-[70%]' >
                    <Button
                        onClick={handleCreateBanner}
                        disabled={submitting}
                        className="!bg-[#F66C2B] hover:!bg-[#E55B1C] !text-white !capitalize !w-full"
                    >
                        {submitting ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            <>
                                Publish & View <IoMdCloudUpload className="inline-block ml-2" />
                            </>
                        )}

                    </Button>
                </div>

            </div>
        </>
    )
}

export default BannerCreate