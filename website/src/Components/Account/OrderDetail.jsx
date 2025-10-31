import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOrderDetails } from "../../Api/api";
import { showError } from "../../services/toastService";

const OrderDetails = () => {
    const { orderId } = useParams();
    const nav = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await getOrderDetails(orderId);
                setOrder(res.data.order);
            } catch (err) {
                showError("Failed to fetch order details");
                nav("/my-account/orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId, nav]);

    if (loading) return <p className="text-center py-10">Loading order...</p>;

    const productsTotal = order.products?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const finalTotal = productsTotal - order.discount_amt + order.tax_amt + order.shipping_fee;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <p><span className="font-semibold">Order ID:</span> {order._id}</p>
            <p><span className="font-semibold">Payment ID:</span> {order.payment_id}</p>
            <p><span className="font-semibold">Payment Status:</span> {order.payment_status}</p>
            <p><span className="font-semibold">Order Date:</span> {new Date(order.createdAt).toLocaleString()}</p>

            <h2 className="mt-6 text-xl font-semibold">Products</h2>
            <table className="w-full mt-2 border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products?.map((item, idx) => (
                        <tr key={item._id} className="text-center border-t">
                            <td className="px-4 py-2">{idx + 1}</td>
                            <td className="px-4 py-2">{item.product_details?.name}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                            <td className="px-4 py-2">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 text-right">
                <p>Products Total: ${productsTotal.toFixed(2)}</p>
                <p>Discount: -${order.discount_amt.toFixed(2)}</p>
                <p>Tax (12.5%): +${order.tax_amt.toFixed(2)}</p>
                <p>Shipping Fee: +${order.shipping_fee.toFixed(2)}</p>
                <p className="font-semibold">Final Total: ${finalTotal.toFixed(2)}</p>
            </div>

            <h2 className="mt-6 text-xl font-semibold">Shipping Address</h2>
            <p>#{order.delivery_address?.address_line}</p>
            <p>{order.delivery_address?.city}, {order.delivery_address?.state}, {order.delivery_address?.country} - {order.delivery_address?.pincode}</p>
            <p>{order.delivery_address?.phone}</p>

            <Link
                to="/my-account/orders"
                className="inline-block mt-6 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            >
                Back to Orders
            </Link>
        </div>
    );
};

export default OrderDetails;
