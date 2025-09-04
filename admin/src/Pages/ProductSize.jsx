import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoMdCloudUpload } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { addSize, deleteSize, getProductSize, getProductSizes, updateProductSize } from '../api/productApi';
import { showError, showSuccess, showWarning } from '../services/toastService';
import { confirmDelete } from '../../utils/confirmDelete';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const ProductSize = () => {
    const { sizes, fetchSizes } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [newSize, setNewSize] = useState({ name: '', label: '' });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchSizes();
    }, []);

    const handleAddSize = async () => {
        if (!newSize.name?.trim() && !newSize.label?.trim()) {
            return showWarning('Please enter a valid size.');
        }
        setLoading(true);
        try {
            if (editMode) {
                await updateProductSize(editId, newSize);
                showSuccess("Size updated successfully")

            } else {
                await addSize(newSize);
                showSuccess('Size added successfully');
            }
            setNewSize({ name: '', label: '' });
            setEditMode(false);
            setEditId(null);
            fetchSizes();
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong';
            showError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSize = async (id) => {
        const result = await confirmDelete();
        if (result.isConfirmed) {
            try {
                const response = await deleteSize(id);
                showSuccess(response.data.message);
                fetchSizes();

            } catch (err) {
                const msg = err.response?.data?.message || 'Something went wrong';
                showError(msg);
            }
        }

    };

    const fetchProductSize = async (id) => {
        try {
            const response = await getProductSize(id);
            const sizeData = response.data.size;
            setNewSize({ name: sizeData.name, label: sizeData.label });
            setEditMode(true);
            setEditId(id);
        }
        catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong';
            showError(msg);
        }
    }

    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className="text-2xl font-bold">Product Size</h1>
            </div>

            {/* Add Size Section */}
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 lg:w-[70%] md:w-[80%] w-full">
                <div className="my-[25px] flex flex-col gap-[5px] relative">
                    <label htmlFor="size" className="mb-2 font-semibold">Add Product Size</label>
                    <input
                        type="text"
                        className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600"
                        placeholder="Product Size"
                        name="name"
                        value={newSize.name || ''}
                        onChange={(e) => setNewSize({ ...newSize, name: e.target.value })}
                    />
                    {/* Size Label Input */}
                    <label htmlFor="label" className="mb-2 font-semibold">Size Label </label>
                    <input
                        type="text"
                        name="label"
                        placeholder="size label"
                        value={newSize.label}
                        onChange={(e) => setNewSize({ ...newSize, label: e.target.value })}
                        className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600"
                    />
                </div>

                <div className="lg:w-[30%] md:w-[40%] sm:w-[60%] w-[70%]">
                    <Button
                        className="
                           !bg-[#F66C2B] hover:!bg-[#E55B1C]
                            !text-white 
                            !capitalize 
                            !w-full 
                            !flex 
                            !justify-center 
                            !items-center 
                            gap-x-2
                        "
                        onClick={handleAddSize}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            <>
                                <IoMdCloudUpload className="text-xl" />
                                {editMode ? "Update Size" : "Publish & View"}
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Sizes Table */}
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 lg:w-[70%] md:w-[80%] w-full">
                <h1 className="text-xl font-semibold mb-5">Product Sizes</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-[#F3F4F6] text-[#333333]  text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">Size</th>
                                <th className="px-4 py-3 text-left">Label</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sizes.length > 0 ? (
                                sizes.map((size) => (
                                    <tr
                                        key={size._id}
                                        className="bg-white border-b border-gray-200 hover:bg-[#FFF3E8]"
                                    >
                                        <td className="px-4 py-3">{size.name}</td>
                                        <td className="px-4 py-3">{size.label}</td>
                                        <td className="px-4 py-3">{size.category || ""}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <div className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-400 cursor-pointer transition">
                                                    <FaEdit size={16} onClick={() => fetchProductSize(size._id)} />
                                                </div>
                                                <div className="bg-red-500 text-white p-2 rounded-full hover:bg-red-400 cursor-pointer transition">
                                                    <MdDelete size={16} onClick={() => handleDeleteSize(size._id)} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center py-4 text-gray-500">
                                        No Sizes Exist!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ProductSize;
