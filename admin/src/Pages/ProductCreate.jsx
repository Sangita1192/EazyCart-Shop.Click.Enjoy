import React, { useState } from 'react';
import { Button } from '@mui/material';
import { RiProductHuntFill } from 'react-icons/ri';

const ProductCreate = () => {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setSelectedImages((prevImages) => [...prevImages, ...newImages]);

    };

    const handleRemoveImage = (index) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    };
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5">
                <h1 className='text-2xl mb-[35px]'>Add Product</h1>
                <div className="my-[25px] flex flex-col gap-[5px] relative">
                    <label htmlFor="name" className="mb-2 font-semibold">Product Name</label>
                    <input type="text" className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Product Name" />
                </div>
                <div className="my-[25px] flex flex-col gap-[5px]">
                    <label htmlFor="description" className="mb-2 font-semibold">Description</label>
                    <textarea className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Product Description" />
                </div>
                <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                    {/* Category */}
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="category" className="mb-2 font-semibold">Category</label>
                        <select
                            name="category"
                            id="category"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                            <option value="default">---select category---</option>
                            <option value="fashion">Fashion</option>
                            <option value="electronics">Electronics</option>
                        </select>
                    </div>

                    {/* Sub-Category */}
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="subcategory" className="mb-2 font-semibold">Sub-Category</label>
                        <select
                            name="subcategory"
                            id="subcategory"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                            <option value="default">---select sub-category---</option>
                            <option value="jeans">Jeans</option>
                            <option value="shirts">Shirts</option>
                            <option value="mobiles">Mobiles</option>
                            <option value="laptops">Laptops</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="price" className="mb-2 font-semibold">Price</label>
                        <input
                            name="price"
                            id="price"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                        </input>
                    </div>
                </div>
                <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="isfeatured" className="mb-2 font-semibold">isFeatured</label>
                        <select
                            name="isfeatured"
                            id="isfeatured"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                            <option value="none">IsFeatured</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="stock" className="mb-2 font-semibold">Product Stock</label>
                        <input
                            name="stock"
                            id="stock"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                        </input>
                    </div>
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="discount" className="mb-2 font-semibold">Discount</label>
                        <input
                            name="discount"
                            id="discount"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                        </input>
                    </div>
                </div>
                <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="size" className="mb-2 font-semibold">Product Size</label>
                        <select
                            name="size"
                            id="size"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                            <option value="default">---Select Size----</option>
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="XS">Extra Small</option>
                            <option value="L">Large</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                        <label htmlFor="weight" className="mb-2 font-semibold">Product Weight</label>
                        <input
                            name="weight"
                            id="weight"
                            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        >
                        </input>
                    </div>

                </div>
                <div className="my-[25px] flex flex-col w-full lg:w-1/2">
                    <label htmlFor="images" className="mb-2 font-semibold">Product Images</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] text-sm focus:outline-blue-600 cursor-pointer"
                    />
                    {/* Previews */}
                    {selectedImages.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-4">
                            {selectedImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative w-[100px] h-[100px] rounded-md border border-gray-300"
                                >
                                    {/* Cancel icon */}
                                    <button
                                        onClick={() => handleRemoveImage(idx)}
                                        className="absolute w-[20px] h-[20px] top-[-5px] right-[-5px] bg-red-500 rounded-full p-1 flex justify-center items-center z-[99] !text-white"
                                        title="Remove image"
                                    >
                                        ✕
                                    </button>

                                    {/* Image */}
                                    <img
                                        src={img.url}
                                        alt={`Preview ${idx}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                    )}
                </div>

                <div className='lg:w-[30%] md:w-[40%] sm:w-[60%] w-[70%]' >
                    <Button className='!bg-blue-600 hover:!bg-blue-700 !text-white !capitalize !w-full'>
                        Add Product
                    </Button>
                </div>

            </div>
        </>
    )
}


export default ProductCreate;