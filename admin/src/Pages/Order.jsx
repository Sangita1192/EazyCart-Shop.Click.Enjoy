import React from 'react';
import product from "/Images/profile.jpg"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllUserOrders } from '../api/orderApi';
import {useNavigate} from 'react-router-dom';

const OrderList = () => {
    const nav = useNavigate();
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const res = await getAllUserOrders();
                setOrders(res.data.orders);

            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAllOrders();
    }, []);


    const filteredOrders = orders.filter(order => {
        const query = search.toLowerCase();
        return (
            order._id.toLowerCase().includes(query) ||
            order.payment_id.toLowerCase().includes(query) ||
            order.user_id?.name.toLowerCase().includes(query) ||
            order.user_id?.email.toLowerCase().includes(query)
        );
    });

    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);




    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Order List</h1>
            </div>
            <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white p-5">
                <div className="flex justify-end items-center my-[15px] mb-[25px]">
                    <div className='relative lg:w-[400px] md:w-[350px] w-[220px]'>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1); 
                            }}
                            className="w-full bg-[#f1f1f1] px-[25px] py-[10px] rounded-md border-transparent focus:outline-none focus:border-gray-600 border"
                            placeholder="search here.."
                        />

                        <IoMdSearch className='absolute top-1/2 left-[5px] font-[16px] transform -translate-y-1/2' />
                    </div>

                </div>
                <div className="overflow-x-auto overflow-y-auto ">
                    <table className="min-w-full text-left text-sm text-gray-700 shadow-md rounded-[10px]">
                        <thead className="bg-[#F3F4F6] text-[#333333] text-xs uppercase sticky top-0 z-10 ">
                            <tr>
                                <th className="px-6 py-4 whitespace-nowrap">Order Id</th>
                                <th className="px-6 py-4 whitespace-nowrap">Payment Id</th>
                                <th className="px-6 py-4 whitespace-nowrap">Products</th>
                                <th className="px-6 py-4 whitespace-nowrap">Customer Name</th>
                                <th className="px-6 py-4 whitespace-nowrap">Email</th>
                                <th className="px-6 py-4 whitespace-nowrap">Phone Number</th>
                                <th className="px-6 py-4 whitespace-nowrap">Address</th>
                                <th className="px-6 py-4 whitespace-nowrap">PinCode</th>
                                <th className="px-6 py-4 whitespace-nowrap">Order Status</th>
                                <th className="px-6 py-4 whitespace-nowrap">Total Amount</th>
                                <th className="px-6 py-4 whitespace-nowrap">Order Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.length > 0 ?
                                (
                                    currentOrders?.map(o => (
                                        <tr className="hover:bg-[#FFF3E8] cursor-pointer" key={o._id} onClick={()=>nav(`/orders/${o._id}`)}>
                                            <td className="px-6 py-3 whitespace-nowrap">{o._id.slice(0, 10)}..</td>
                                            <td className="px-6 py-3 whitespace-nowrap">{o.payment_id.slice(0, 6)}..</td>
                                            <td className="px-6 py-3 whitespace-nowrap flex items-center gap-2">
                                                {o.products.slice(0, 2).map((p, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={p.product_details?.image || product}
                                                        alt={p.product_id?.name || "Product"}
                                                        className="w-[30px] h-[30px] object-cover rounded"
                                                    />
                                                ))}
                                            </td>

                                            <td className="px-6 py-3 whitespace-nowrap">{o?.user_id?.name}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">{o?.user_id?.email}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">{o?.user_id?.phone || o.delivery_address?.phone || "NA"}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                {o.delivery_address?.address_line} &nbsp;
                                                {o.delivery_address?.city} &nbsp;
                                                {o.delivery_address?.state} &nbsp;

                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap">{o.delivery_address?.pincode}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">{o.payment_status}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">${o.total_amt.toFixed(2)}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">{new Date(o.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))
                                )
                                :
                                (
                                    <tr>
                                        <td colSpan={11} className="text-xl font-semibold text-center py-3 mt-2">
                                            No orders found
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="md:flex justify-between items-center mt-4 text-center">
                    <div className="flex gap-2 items-center justify-content-center">
                        <span className="">Row per page </span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="bg-[#f1f1f1] outline-gray-200 py-1 px-2"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>

                    </div>
                    <div className="space-x-2 flex items-center">
                        <MdKeyboardArrowLeft
                            className={`cursor-pointer ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        />
                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages || 1}
                        </span>
                        <MdKeyboardArrowRight
                            className={`cursor-pointer ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default OrderList