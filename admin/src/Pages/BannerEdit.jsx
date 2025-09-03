import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IoMdCloudUpload } from 'react-icons/io';
import { getBanner, updateBanner } from '../api/bannerApi';
import { useNavigate, useParams } from 'react-router-dom';
import { showError, showSuccess } from '../services/toastService';
import { showSuccessAlert } from '../../utils/successAlert';

const BannerEdit = () => {
    const { id } = useParams();
    const nav = useNavigate();

    const [banner, setBanner] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (id) fetchBanner(id);
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setBanner({ ...banner, image: fileUrl });
        }
    };

    // Convert DB string to YYYY-MM-DD
    const formatDateForInput = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toISOString().split("T")[0];
    };


    const fetchBanner = async (id) => {
        try {
            const res = await getBanner(id);
            setBanner(res.data.banner);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleUpdateBanner = async (id) => {
        try {
            setSubmitting(true);
            setErrors({});

            const res = await updateBanner(id, banner);
            console.log(res);
            await showSuccessAlert("Success, The banner was updated")
            nav("/banners/view")
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
    }
    
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Update Banner</h1>
            </div>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5">
                <div className="my-[25px] flex flex-col gap-[5px] relative">
                    <label htmlFor="title" className="mb-2 font-semibold">Banner Title</label>
                    <input type="text"
                        className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600"
                        placeholder="Banner Title"
                        value={banner.title || ""}
                        onChange={(e) => setBanner({ ...banner, title: e.target.value })}
                    />
                </div>
                <div className="my-[25px] flex flex-col gap-[5px]">
                    <label htmlFor="description" className="mb-2 font-semibold">Description</label>
                    <textarea className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600"
                        placeholder="Banner Description"
                        value={banner.description || ""}
                        onChange={(e) => setBanner({ ...banner, description: e.target.value })}
                    />
                </div>
                <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="start date" className="mb-2 font-semibold">Start Date</label>
                        <input
                            name="start_date"
                            id="start_date"
                            type='date'
                            value={formatDateForInput(banner.startDate) || ""}
                            onChange={(e) => setBanner({ ...banner, startDate: e.target.value })}
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
                            value={formatDateForInput(banner.endDate) || ""}
                            onChange={(e) => setBanner({ ...banner, endDate: e.target.value })}
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
                            value={banner.isActive}
                            onChange={(e) => setBanner({ ...banner, isActive: e.target.value })}
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
                            value={banner.bannerType}
                            onChange={(e) => setBanner({ ...banner, bannerType: e.target.value })}
                        >
                            <option value="slider">slider</option>
                            <option value="middle">middle</option>
                            <option value="card">card</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                    <label htmlFor="image link" className="mb-2 font-semibold">Link</label>
                    <input
                        type="text"
                        id="link"
                        name='link'
                        className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] text-sm focus:outline-blue-600 cursor-pointer"
                        value={banner.link}
                        onChange={(e) => setBanner({ ...banner, link: e.target.value })}
                    />
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
                    {banner.image && (
                        <div className="mt-4 flex justify-start">
                            <div className="relative w-[120px] h-[120px] rounded-md border border-gray-300">
                                <img
                                    src={banner.image}
                                    alt="Preview banner image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}
                </div>
                


                <div className='lg:w-[30%] md:w-[40%] sm:w-[60%] w-[70%]' >
                    <Button
                        onClick={() => handleUpdateBanner(banner._id)}
                        disabled={submitting}
                        className="!bg-blue-600 hover:!bg-blue-700 !text-white !w-full"
                    >
                        {submitting ? <CircularProgress size={20} color="inherit" /> : 'Update & View Banner'}
                    </Button>
                </div>

            </div>
        </>
    )
}

export default BannerEdit