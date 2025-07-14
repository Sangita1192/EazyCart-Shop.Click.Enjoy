import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from '@mui/material';
import { IoMdSearch } from 'react-icons/io';
import { deleteCategory, getAllCategories, getCategoryList, toggleFeaturedCategory, toggleStatus } from '../api/categoryApi';
import LoadingSpinner from '../Components/LoadingSpinner';
import { confirmDelete } from '../../utils/confirmDelete';
import { showError, showSuccess } from '../services/toastService';


const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categoryList, setCategoryList] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchCategories();
    }, [page, search, rowsPerPage, selectedCategory]);

    useEffect(() => {
        const fetchCategoryNames = async () => {
            try {
                const res = await getCategoryList();
                setCategoryList(res.data.categories || []);
            } catch (err) {
                console.error('Failed to fetch category names', err);
            }
        };

        fetchCategoryNames();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getAllCategories({ page, limit: rowsPerPage, search, categoryName: selectedCategory });
            setCategories(res.data.categories || []);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await confirmDelete();
        if (result.isConfirmed) {
            try {
                setLoading(true);
                await deleteCategory(id);
                showSuccess("Category deleted successfully.");
                fetchCategories();
            } catch (err) {
                showError("Delete Failed");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleStatus = async (id, currentStatus) => {
        setLoading(true);
        try {
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            await toggleStatus(id);
            showSuccess(`Category ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
            fetchCategories();
        } catch (err) {
            showError("Failed to update status");
        } finally {
            setLoading(false);
        }
    }

    const handleFeaturedCat = async (id, current) => {
        setLoading(true);
        try {
            await toggleFeaturedCategory(id); 
            showSuccess(`Category marked as ${!current ? 'featured' : 'not featured'}`);
            fetchCategories(); 
        } catch (err) {
            showError("Failed to update featured status");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className="text-2xl font-bold">Category List</h1>
                <Link to="/category/add">
                    <Button className="!bg-blue-600 !text-white hover:!bg-blue-800">
                        + Add Category
                    </Button>
                </Link>
            </div>

            <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white p-5">
                <div className="flex justify-between items-center my-[15px] mb-[25px]">
                    <div>
                        <label htmlFor="category" className="font-semibold italic">Category by: </label>
                        <select name="category" id="category"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setPage(1)
                            }}
                            className="bg-[#f1f1f1] px-[5px] py-[10px] rounded-md">
                            <option value="all">All</option>
                            {categoryList.map((cat) => (
                                <option key={cat._id} value={cat.name} className='capitalize'>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="relative">
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

                <div className="relative overflow-x-auto overflow-y-auto">
                    {loading && (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-50">
                            <LoadingSpinner />
                        </div>
                    )}
                    <table className="min-w-full text-left text-sm text-gray-700 shadow-md rounded-[10px]">
                        <thead className="bg-blue-300 text-xs uppercase text-gray-600 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Parent Category</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Images</th>
                                <th className="px-4 py-3">isFeatured</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {!loading ? (
                                categories.length > 0 ? (
                                    categories.map((category) => (
                                        <tr key={category._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 align-top">{category.name}</td>
                                            <td className="px-4 py-3 align-top">
                                                {category.parent ? category.parent.name || 'Unnamed' : 'None'}
                                            </td>
                                            <td className="px-4 py-3 align-top">{category.description}</td>
                                            <td className="px-4 py-3 align-top">
                                                {category.images && category.images.length > 0 ? (
                                                    <img
                                                        src={category.images[0]}
                                                        alt={`${category.name} photo`}
                                                        className="w-[60px] h-[70px]"
                                                    />
                                                ) : (
                                                    <div className="w-[30px] h-[30px] bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                                                        N/A
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <Tooltip title={`Click to mark as ${category.isFeatured ? "Not Featured" : "featured"}`}>
                                                    <button
                                                        onClick={() => handleFeaturedCat(category._id, category.isFeatured)}
                                                        className={`text-white px-3 py-1 rounded-md capitalize cursor-pointer 
            ${category.isFeatured ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"}`}
                                                    >
                                                        {category.isFeatured ? 'Featured' : 'Not Featured'}
                                                    </button>
                                                </Tooltip>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <Tooltip title={`Click to mark as ${category.status === "active" ? "Inactive" : "Active"}`}>
                                                    <button
                                                        onClick={() => handleStatus(category._id, category.status)}
                                                        className={`text-white px-3 py-1 rounded-md capitalize cursor-pointer 
            ${category.status === "active" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"}`}
                                                    >
                                                        {category.status}
                                                    </button>
                                                </Tooltip>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap align-top">
                                                <div className="flex items-center gap-2 text-white">
                                                    <Link
                                                        to={`/category/edit/${category._id}`}
                                                        className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                        onClick={() => handleDelete(category._id)}
                                                        disabled={loading}
                                                        title={loading ? 'Please wait...' : 'Delete'}
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-xl font-semibold text-center py-3">
                                            No Categories found
                                        </td>
                                    </tr>
                                )
                            ) : null}
                        </tbody>
                    </table>
                </div>

                <div className="md:flex justify-between items-center mt-4 text-center">
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
    );
};

export default CategoryList;
