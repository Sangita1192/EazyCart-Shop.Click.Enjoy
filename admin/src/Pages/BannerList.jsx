import { Button, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { deleteBanner, getAllBanners, toggleBannerStaus } from '../api/bannerApi'
import { confirmDelete } from '../../utils/confirmDelete'
import { showError, showSuccess } from '../services/toastService'

const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBannerType, setSelectedBannerType] = useState('all');
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchBanners();
    }, [page, selectedBannerType, search])

    const fetchBanners = async () => {
        try {
            const res = await getAllBanners({ page, limit: rowsPerPage, search, bannerType: selectedBannerType });
            setBanners(res.data.banners || []);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("failed to fetch banners", error);
        }
    }

    // delete banner
    const handleDelete = async (id) => {
        const result = await confirmDelete();
        if (result.isConfirmed) {
            try {
                await deleteBanner(id);
                showSuccess("Banner deleted successfully.");
                fetchBanners();
            } catch (err) {
                showError("Delete Banner Failed");
            }
        }
    }

    const handleStatus = async (id) => {
        try {
            const res = await toggleBannerStaus(id);
            showSuccess("status updated!")
            fetchBanners();
        } catch (err) {
            showError("Status Updation Failed");
        }
    }


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
                <div className="md:flex justify-between items-center my-[15px] mb-[25px]">
                    <div>
                        <label htmlFor="type" className='font-semibold italic'>Sort by: </label>
                        <select name="type"
                            className='bg-[#f1f1f1] px-[15px] py-[10px] rounded-md !text-[14px]'
                            value={selectedBannerType}
                            onChange={(e) => {
                                setSelectedBannerType(e.target.value);
                                setPage(1)
                            }}
                        >
                            <option value="all">All</option>
                            <option value="slider">slider</option>
                            <option value="middle">middle</option>
                            <option value="card">card</option>
                        </select>
                    </div>
                    <div className="relative mt-[10px] md:mt-0 ">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setPage(1);
                                setSearch(e.target.value);
                            }}
                            className="bg-[#f1f1f1] px-[25px] py-[10px] rounded-md border-transparent focus:outline-none focus:border-gray-600 border"
                            placeholder="search here.."
                        />
                        <IoMdSearch className="absolute top-1/2 left-[5px] text-[16px] transform -translate-y-1/2" />
                    </div>
                </div>
                <div className="overflow-x-auto overflow-y-auto ">
                    <table className="min-w-full text-left text-sm text-gray-700 shadow-md rounded-[10px]">
                        <thead className="bg-[#F3F4F6] text-[#333333] text-xs uppercase  sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Link</th>
                                <th className="px-4 py-3">Start Date</th>
                                <th className="px-4 py-3">End Date</th>
                                <th className="px-4 py-3">isActive</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {banners.length <= 0 ?
                                <tr>
                                    <td colSpan="8" className="text-center py-4">-----No Banner Exists----</td>
                                </tr>

                                :
                                banners.map((banner) => (
                                    <tr className="hover:bg-[#FFF3E8]" key={banner._id}>
                                        <td className="px-4 py-3 align-top ">
                                            <img src={banner.image} alt="" className="w-[150px] h-[80px] rounded object-cover" />
                                        </td>
                                        <td className="px-4 py-3 align-top"> {banner.title}</td>
                                        <td className='px-4 py-3 align-top'>
                                            {banner.description.slice(0, 50)}...
                                        </td>
                                        <td className="px-4 py-3 align-top"> {banner.link}</td>
                                        <td className="px-4 py-3 align-top">{new Date(banner.startDate).toISOString().slice(0, 10)}
                                        </td>
                                        <td className="px-4 py-3 align-top">{new Date(banner.endDate).toISOString().slice(0, 10)}
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <Tooltip title={`Click to mark as ${banner.isActive ? "In-Active" : "Active"}`}>
                                                <button
                                                    onClick={() => handleStatus(banner._id, banner.isActive)}
                                                    className={`text-white px-3 py-1 rounded-md capitalize cursor-pointer 
                                                        ${banner.isActive ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"}`}
                                                >
                                                    {banner.isActive ? "Active" : "In-Active"}
                                                </button>
                                            </Tooltip>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap align-top">
                                            <div className="flex items-center gap-2 text-white">
                                                <Link to={`/banners/${banner._id}`}>
                                                    <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                                        <FaEdit />
                                                    </div>
                                                </Link>
                                                <div className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer" onClick={() => handleDelete(banner._id)}>
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="md:flex justify-between items-center mt-4 ">
                    <div className="flex gap-3 items-center">
                        <span className="text-sm font-medium text-gray-700">Row per page </span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => {
                                setPage(1);
                                setRowsPerPage(Number(e.target.value));
                            }}
                            className="border border-gray-300 text-sm rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            className={`text-gray-700 p-2 rounded hover:bg-gray-100 transition ${page <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                }`}
                            aria-label="Previous Page"
                        >
                            <MdKeyboardArrowLeft />
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            className={`text-gray-700 p-2 rounded hover:bg-gray-100 transition ${page >= totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                }`}
                            aria-label="Next Page"
                        >
                            <MdKeyboardArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BannerList