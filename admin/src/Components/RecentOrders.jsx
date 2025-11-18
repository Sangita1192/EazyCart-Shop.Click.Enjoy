import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const RecentOrders = ({ orders }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentOrders = orders.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(orders.length / rowsPerPage);
    return (
        <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white p-5">
            <div className="flex justify-between items-center my-[15px] mb-[25px]">
                <h1 className="text-2xl font-bold">Recent Orders </h1>
                <Link to="/orders">
                    <p className="hover:!text-blue-600 hover:underline transition-all duration-200 cursor-pointer">View Orders</p>
                </Link>

            </div>
            <div className="overflow-x-auto overflow-y-auto ">
                <table className="min-w-full text-left text-sm text-gray-700 shadow-md rounded-[8px]">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3">Order Id</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Items</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.length > 0 ?
                            (
                                currentOrders?.map(o => (
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{o._id.slice(0, 8)}..</td>
                                        <td className="px-4 py-3">{o.user_id?.name}</td>
                                        <td className="px-4 py-3">{o.products.length}</td>
                                        <td className="px-4 py-3">${o.total_amt}</td>
                                        <td className="px-4 py-3">{new Date(o.createdAt).toLocaleString()}</td>
                                        <td className="px-4 py-3">
                                            <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">{o.payment_status}</span>
                                        </td>
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
                <div className="space-x-2">
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages || 1}
                    </span>
                    <Button
                        size="small"
                        variant="outlined"
                        className="!me-1"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                        Prev
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RecentOrders;