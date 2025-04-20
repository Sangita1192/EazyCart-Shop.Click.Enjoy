import Button from "@mui/material/Button";

const RecentOrders = () => {
    return (
        <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white p-5">
            <div className="flex justify-between items-center my-[15px] mb-[25px]">
                <h1 className="text-2xl font-bold">Recent Orders </h1>
                <p className="hover:!text-blue-600 hover:underline transition-all duration-200 cursor-pointer">View Orders</p>
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
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">1</td>
                            <td className="px-4 py-3">John Doe</td>
                            <td className="px-4 py-3">25</td>
                            <td className="px-4 py-3">$250</td>
                            <td className="px-4 py-3">12/02/2025</td>
                            <td className="px-4 py-3">
                                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Pending</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">1</td>
                            <td className="px-4 py-3">John Doe</td>
                            <td className="px-4 py-3">25</td>
                            <td className="px-4 py-3">$250</td>
                            <td className="px-4 py-3">12/02/2025</td>
                            <td className="px-4 py-3">
                                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Pending</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">1</td>
                            <td className="px-4 py-3">John Doe</td>
                            <td className="px-4 py-3">25</td>
                            <td className="px-4 py-3">$250</td>
                            <td className="px-4 py-3">12/02/2025</td>
                            <td className="px-4 py-3">
                                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Pending</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">1</td>
                            <td className="px-4 py-3">John Doe</td>
                            <td className="px-4 py-3">25</td>
                            <td className="px-4 py-3">$250</td>
                            <td className="px-4 py-3">12/02/2025</td>
                            <td className="px-4 py-3">
                                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Pending</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">1</td>
                            <td className="px-4 py-3">John Doe</td>
                            <td className="px-4 py-3">25</td>
                            <td className="px-4 py-3">$250</td>
                            <td className="px-4 py-3">12/02/2025</td>
                            <td className="px-4 py-3">
                                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Pending</span>
                            </td>
                        </tr>

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
                <div className="space-x-2">
                    <span className="text-sm text-gray-600">
                        Page 1 of 20
                    </span>
                    <Button
                        size="small"
                        variant="outlined"
                    // onClick={handlePrev}
                    // disabled={currentPage === 1}
                    >
                        Prev
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                    // onClick={handleNext}
                    // disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RecentOrders;