import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/orderApi";
import productPlaceholder from "/Images/profile.jpg";
import { Button } from "@mui/material";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useRef } from "react";

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const printRef = useRef();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await getOrderById(id);
                setOrder(res.data.order);
            } catch (err) {
                console.error("Error fetching order:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const productsTotal = order?.products?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handlePrint = () => {
        if (!printRef.current) return;

        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); 
    };

    if (loading) return <LoadingSpinner />;

    if (!order)
        return (
            <p className="text-center py-10 text-red-500 font-semibold">
                Order not found
            </p>
        );


    return (
        <div className="p-4 md:p-6 lg:p-8 bg-white shadow-md rounded-md max-w-7xl mx-auto" ref={printRef}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Order #{order._id}</h1>
                    <p className="text-gray-600 text-wrap">
                        Payment ID: {order.payment_id || "NA"}

                    </p>
                    <p className="text-gray-600">
                        Status:
                        <span className={`ms-2 px-2 py-1 mt-2 rounded text-white inline-block ${order.payment_status === "paid"
                            ? "bg-green-500"
                            : order.payment_status === "pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}>
                            {order.payment_status}
                        </span>

                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button variant="contained" color="primary">
                        Update Status
                    </Button>
                    <Button variant="outlined" color="error">
                        Refund
                    </Button>
                    <Button variant="outlined" onClick={handlePrint}>Print Invoice</Button>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <p>
                        <strong>Name:</strong> {order.user_id?.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {order.user_id?.email}
                    </p>
                    <p>
                        <strong>Phone:</strong>{" "}
                        {order.user_id?.phone || order.delivery_address?.phone || "NA"}
                    </p>
                    <p>
                        <strong>Address:</strong>{" "}
                        {order.delivery_address
                            ? `${order.delivery_address.address_line}, ${order.delivery_address.city}, ${order.delivery_address.state} - ${order.delivery_address.pincode}`
                            : "NA"}
                    </p>
                </div>
            </div>

            {/* Products */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Products</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border border-gray-200 rounded-md">
                        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                            <tr>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Options</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Unit Price</th>
                                <th className="px-4 py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {order.products.map((p, idx) => (
                                <tr key={idx}>
                                    <td className="px-4 py-2">
                                        <img
                                            src={p.product_details?.image[0] || productPlaceholder}
                                            alt={p.product_details?.name || "Product"}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-2">{p.product_details?.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                        {p.product_details?.color && `Color: ${p.product_details.color}`}
                                        {p.product_details?.size && ` | Size: ${p.product_details.size}`}
                                    </td>
                                    <td className="px-4 py-2">{p.quantity}</td>
                                    <td className="px-4 py-2">${p.price.toFixed(2)}</td>
                                    <td className="px-4 py-2">${productsTotal.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
                    <p>
                        <strong>Subtotal:</strong> $
                        {(productsTotal - order.discount_amt).toFixed(2)}
                    </p>
                    <p>
                        <strong>Discount:</strong> ${order.discount_amt.toFixed(2)}
                    </p>
                    <p>
                        <strong>Tax:</strong> ${order.tax_amt.toFixed(2)}
                    </p>
                    <p>
                        <strong>Shipping Fee:</strong> ${order.shipping_fee.toFixed(2)}
                    </p>
                    <p className="col-span-2 md:col-span-4 text-lg font-bold">
                        <strong>Total:</strong> ${order.total_amt.toFixed(2)}
                    </p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Order Timeline</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Order placed: {new Date(order.createdAt).toLocaleString()}</li>
                    <li>Payment status: {order.payment_status}</li>
                </ul>
            </div>
        </div>
    );
};

export default OrderDetail;
