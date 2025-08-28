import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Button, CircularProgress } from '@mui/material'
import { IoMdCloudUpload } from 'react-icons/io'
import namer from 'color-namer';
import { showError, showSuccess, showWarning } from '../services/toastService'
import { addColor } from '../api/productApi'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { useEffect } from 'react'


const ProductColors = () => {
    const { colors, fetchColors } = useContext(GlobalContext);
    const [color, setColor] = useState({ name: "", code: "" });
    const [editMode, setEditMode] = useState(false);
    const [colorId, setColorId] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchColors();
    }, [])

    const handleColorChange = (e) => {
        const colorCode = e.target.value;
        const named = namer(colorCode);
        setColor({ name: named.html[0].name, code: colorCode });
    };

    const AddandUpdateColor = async () => {
        if (!color.name?.trim() && !color.name?.trim()) {
            return showWarning('Please select color');
        }
        setLoading(true);
        try {
            if (editMode) {
                console.log("edit mode");
            } else {
                await addColor(color);
                showSuccess("Color added successfully!")
            }
            setColor({ name: '', code: '' });

        }
        catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong';
            showError(msg);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Product Colors</h1>
            </div>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 lg:w-[70%] md:w-[80%] w-[100%]">
                {/* Color Name */}
                <div className="my-[25px] flex flex-col gap-[5px]">
                    <label htmlFor="name" className="mb-2 font-semibold">Color Name</label>
                    <input
                        type="text"
                        value={color.name}
                        name='name'
                        className="bg-[#f1f1f1] px-4 py-2 rounded-md w-full"
                        placeholder='color name'
                        onChange={handleColorChange}
                    />
                </div>
                {/* Color Code */}
                <div className="my-[25px] flex flex-col gap-[5px]">
                    <label htmlFor="code" className="mb-2 font-semibold">Color Code</label>
                    <input
                        type="text"
                        id="colorCode"
                        name='code'
                        value={color.code}
                        onChange={handleColorChange}
                        className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600"
                        placeholder="color code"
                    />
                </div>

                {/* Color Picker */}
                <div className="mb-[25px] flex flex-col gap-[5px]">
                    <label htmlFor="colorPicker" className="mb-2 font-semibold">Pick Color</label>
                    <input
                        type="color"
                        id="colorPicker"
                        value={color.colorCode}
                        onChange={handleColorChange}
                        className="w-[60px] h-[40px] border border-gray-300 rounded-md p-1 cursor-pointer"
                    />
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
                        onClick={AddandUpdateColor}
                    >
                        {loading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            <>
                                <IoMdCloudUpload className="text-xl" />
                                {editMode ? "Update Color" : "Publish & View"}
                            </>
                        )}
                    </Button>
                </div>

            </div>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 lg:w-[70%] md:w-[80%] w-[100%]">
                <h1 className="text-xl font-semibold mb-5">Product Colors</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-blue-600 text-white text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">Color Name</th>
                                <th className="px-4 py-3 text-left">Color Code</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {colors.length > 0 ? (
                                colors.map((color) => (
                                    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50" key={color._id}>
                                        <td className="px-4 py-3">{color.name}</td>
                                        <td className="px-4 py-3">{color.code}</td>
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center py-4 text-gray-500">
                                        No Color Exist!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default ProductColors