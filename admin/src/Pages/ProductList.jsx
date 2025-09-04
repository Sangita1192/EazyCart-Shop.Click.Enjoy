import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaInfo, FaRegStar, FaStar } from 'react-icons/fa';
import { IoMdSearch } from "react-icons/io";
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import product from "/Images/profile.jpg"
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../api/productApi';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProdCategory, setSelectedProdCategory] = useState('all');
    const [categoryList, setCategoryList] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const getProducts = async () => {
        try {
            const response = await fetchAllProducts({ page, limit: rowsPerPage, search, prodCategory: selectedProdCategory });
            console.log(response.data);
            setProducts(response.data.products);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [page, search, rowsPerPage, selectedProdCategory])
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Product List</h1>
                <Link to="/products/add">
                    <Button className='!bg-[#3B82F6] !text-white hover:!bg-[#2563EB]'>
                        + Add Product
                    </Button>
                </Link>

            </div>
            <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white p-5">
                <div className="flex justify-between items-center my-[15px] mb-[25px]">
                    <div>
                        <label htmlFor="category" className='font-semibold italic'>Category by: </label>
                        <select name="category" id="" className='bg-[#f1f1f1] px-[5px] py-[10px] rounded-md'>
                            <option value="all">All</option>
                            <option value="">Fashion</option>
                        </select>
                    </div>
                    <div className='relative lg:w-[400px] md:w-[350px]'>
                        <input
                            type="text"
                            className="w-full bg-[#f1f1f1] px-[25px] py-[10px] rounded-md border-transparent focus:outline-none focus:border-gray-600 border" placeholder="search here.." />
                        <IoMdSearch className='absolute top-1/2 left-[5px] font-[16px] transform -translate-y-1/2' />
                    </div>

                </div>
                <div className="overflow-x-auto overflow-y-auto ">
                    <table className="min-w-full text-left text-sm text-gray-700 shadow-md rounded-[10px]">
                        <thead className="bg-[#F3F4F6] text-[#333333]  text-xs uppercase sticky top-0 z-10 ">
                            <tr>
                                <th className="px-4 py-3">Product</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Sub-Category</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Rating</th>
                                <th className="px-4 py-3">Action</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {!loading ? (
                                products.length > 0 ? (
                                    products.map((product) => (
                                        <tr className="hover:bg-[#FFF3E8]" key={product._id}>
                                            <td className="px-4 py-3 flex items-center gap-3">
                                                <img src={product.images[0]} alt="product Image" className="w-[50px] h-[50px] rounded object-cover" />
                                                <div>
                                                    <h2 className="font-bold">{product.name}</h2>
                                                    <p className="text-[14px] text-gray-600">
                                                        {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae iusto amet ab pariatur nulla natus ipsa harum ratione consectetur saepe quasi, sunt rerum laboriosam veritatis odit voluptates architecto illum earum?`.slice(0, 50)}...
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 align-top">Fashion</td>
                                            <td className="px-4 py-3 align-top">Women Jeans</td>
                                            <td className="px-4 py-3 align-top">${product.price}</td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="flex items-start gap-[2px] text-yellow-500">
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaRegStar className="text-gray-400" />
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 whitespace-nowrap align-top">
                                                <div className="flex items-center gap-2 text-white">
                                                    <Link to={`/products/detail/1234`}>
                                                        <div className="bg-green-500 p-2 rounded-full hover:bg-green-700 cursor-pointer">
                                                            <FaInfo />
                                                        </div>
                                                    </Link>
                                                    <Link to={`/products/edit/1234`}>
                                                        <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                                            <FaEdit />
                                                        </div>
                                                    </Link>
                                                    <div className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer">
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-xl font-semibold text-center py-3">
                                            No Products found
                                        </td>
                                    </tr>
                                )
                            ) : null}





                        </tbody>
                    </table>
                </div>
                <div className="md:flex justify-between items-center mt-4 text-center">
                    <div className="flex gap-2 items-center justify-content-center">
                        <span className="">Row per page </span>
                        <select name="pageNumber" id="" className="bg-[#f1f1f1] px-[5px] py-[10px]">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>

                        </select>
                    </div>
                    <div className="space-x-2 flex  items-center">
                        <MdKeyboardArrowLeft />
                        <span className="text-sm text-gray-600">
                            Page 1 of 20
                        </span>

                        <MdKeyboardArrowRight />
                        {/* <Button
                            size="small"
                            variant="outlined"
                        // onClick={handlePrev}
                        // disabled={currentPage === 1}
                        >
                            <MdKeyboardArrowLeft />
                        </Button> */}
                        {/* <Button
                            size="small"
                            variant="outlined"
                        // onClick={handleNext}
                        // disabled={currentPage === totalPages}
                        >
                            Next
                        </Button> */}
                    </div>
                </div>
            </div>
        </>

    )
}

export default ProductList