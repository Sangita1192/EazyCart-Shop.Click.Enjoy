import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { IoMdCloudUpload } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { fetchProduct } from '../api/productApi';

const ProductEdit = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const { activeCategories, fetchActiveCategories, sizes, fetchSizes, colors, fetchColors } = useContext(GlobalContext);

    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => { getProduct(id); }, [id]);
    useEffect(() => {
        fetchActiveCategories();
        fetchColors();
        fetchSizes();
    }, []);

    const getProduct = async (id) => {
        setProduct(null);
        try {
            const res = await fetchProduct(id);
            console.log(res.data);
            if (!res?.data?.product) {
                throw new Error('Product not found');
            }
            setProduct(res?.data?.product);

        } catch (error) {
            setError(error.message || 'Failed to load product.');
        } finally {
            setLoading(false);
        }

        if (loading) {
            return <p className="text-center p-10 text-blue-500">Loading product details...</p>;
        }

        if (error) {
            return <p className="text-center p-10 text-red-500">{error}</p>;
        }

        if (!product) {
            return <p className="text-center p-10 text-gray-500">No product found.</p>;
        }
    }


    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-[30px]">
                <h1 className='text-2xl mb-[35px]'>Edit Product</h1>
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
                        // onChange={handleImageChange}
                        className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] text-sm focus:outline-blue-600 cursor-pointer"
                    />

                </div>

                <div className='lg:w-[30%] md:w-[40%] sm:w-[60%] w-[70%]' >
                    <Button className='!bg-[#F66C2B] hover:!bg-[#E55B1C] !text-white !capitalize !w-full                        !flex 
                                !justify-center !items-center gap-x-2'
                    >
                        <IoMdCloudUpload className='text-xl' />
                        Update & View Product
                    </Button>
                </div>

            </div>
        </>
    )
}

export default ProductEdit