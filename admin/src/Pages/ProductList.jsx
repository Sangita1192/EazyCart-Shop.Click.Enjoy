import { Button, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaInfo, FaRegStar, FaStar } from 'react-icons/fa';
import { IoMdSearch } from "react-icons/io";
import { GlobalContext } from '../context/GlobalContext';
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchAllProducts, toggleFeaturedProduct} from '../api/productApi';
import { confirmDelete } from '../../utils/confirmDelete';
import { showError, showSuccess } from '../services/toastService';

const ProductList = () => {
    const { activeCategories, fetchActiveCategories } = useContext(GlobalContext);
    const [products, setProducts] = useState([]);
    const [selectedProdCategory, setSelectedProdCategory] = useState('');
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => { fetchActiveCategories() }, [])
    useEffect(() => {
        getProducts();
    }, [page, search, rowsPerPage, selectedProdCategory]);

    const getProducts = async () => {
        try {
            const response = await fetchAllProducts({ page, limit: rowsPerPage, search, categoryId: selectedProdCategory });
            setProducts(response.data.products);
            setPage(response?.data?.curentPage);
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        const result = await confirmDelete();
        if (result.isConfirmed) {
            try {
                setLoading(true);
                await deleteProduct(id);
                showSuccess("Product deleted successfully.");
                getProducts();
            } catch (err) {
                showError(err.message || "Delete Failed");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleFeaturedProduct = async (id) => {
        try {
            await toggleFeaturedProduct(id);
            showSuccess("Product updated sucessfully.");
            getProducts();
        } catch (err) {
            showError(err.message || "Updation Failed");
        }
    }

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
                    <select
                        name="category"
                        className='bg-[#f1f1f1] px-[5px] py-[10px] rounded-md'
                        value={selectedProdCategory}
                        onChange={(e) => setSelectedProdCategory(e.target.value)}
                    >
                        <option value="">All</option>
                        {activeCategories.length > 0 &&
                            activeCategories.map(cat => (
                                <option value={cat._id} key={cat._id}>{cat.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='relative lg:w-[400px] md:w-[350px]'>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#f1f1f1] px-[25px] py-[10px] rounded-md border-transparent focus:outline-none focus:border-gray-600 border" placeholder="search here.." />
                    <IoMdSearch className='absolute top-1/2 left-[5px] font-[16px] transform -translate-y-1/2' />
                </div>

            </div>
            <div className="overflow-x-auto overflow-y-auto ">
                <table className="min-w-full text-left text-sm text-gray-700 shadow-md rounded-[10px]">
                    <thead className="bg-[#F3F4F6] text-[#333333]  text-xs uppercase sticky top-0 z-10 ">
                        <tr>
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Images</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Discount</th>
                            <th className="px-4 py-3">Rating</th>
                            <th className="px-4 py-3">Featured</th>
                            <th className="px-4 py-3 col-3">Action</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {!loading ? (
                            products.length > 0 ? (
                                products.map((product) => (
                                    <tr className="hover:bg-[#FFF3E8]" key={product._id}>
                                        <td className="px-4 py-3 align-top">{product.name}</td>
                                        <td className="px-4 py-3 align-top">{product.description.slice(0, 20)}...</td>
                                        <td className="px-4 py-3 flex gap-1 justify-between mr-1">
                                            {product.images.map((img,idx) => (
                                                <img src={img} alt={`product Image${idx}`} key={idx} className="w-[70px] h-[50px] rounded object-cover" />
                                            ))}
                                        </td>

                                        <td className="px-4 py-3 align-top">{product.category.name}</td>
                                        <td className="px-4 py-3 align-top">${product.price}</td>
                                        <td className="px-4 py-3 align-top">{product.discount}%</td>
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex items-start gap-[2px] text-yellow-500">
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaRegStar className="text-gray-400" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <Tooltip title={`Click to mark as ${product.is_featured ? "No" : "Yes"}`}>
                                                <button
                                                    onClick={() => handleFeaturedProduct(product._id)}
                                                    className={`text-white px-3 py-1 rounded-md capitalize cursor-pointer 
                                                        ${product.is_featured ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"}`}
                                                >
                                                    {product.is_featured ? "Yes" : "No"}
                                                </button>
                                            </Tooltip>
                                        </td>

                                        <td className="px-4 py-3 whitespace-nowrap align-top">
                                            <div className="flex items-center gap-2 text-white">
                                                <Link to={`/products/detail/${product._id}`}>
                                                    <div className="bg-green-500 p-2 rounded-full hover:bg-green-700 cursor-pointer">
                                                        <FaInfo />
                                                    </div>
                                                </Link>
                                                <Link to={`/products/edit/${product._id}`}>
                                                    <div className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-500 cursor-pointer">
                                                        <FaEdit />
                                                    </div>
                                                </Link>
                                                <button
                                                    className="bg-red-600 p-2 rounded-full hover:bg-red-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                    onClick={() => handleDelete(product._id)}
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
                                        No Products found
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

)
}

export default ProductList