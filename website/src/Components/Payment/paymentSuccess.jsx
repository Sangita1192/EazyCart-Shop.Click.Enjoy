import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { showError, showWarning } from "../../services/toastService";
import { verifyPayment } from "../../Api/api";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../../redux/slices/cartSlice";
import { MdCheckCircle, MdError } from "react-icons/md";
import { Button } from "@mui/material";

const PaymentSuccess = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState(null);
    const [status, setStatus] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        if (!sessionId) {
            showWarning("No payment session found.");
            navigate("/cart");
            return;
        }

        const confirmPayment = async () => {
            try {
                const res = await verifyPayment(sessionId);
                if (res.data.success) {
                    setOrderData(res.data.order);
                    setStatus("success");
                    dispatch(clearCartItems());
                } else {
                    setStatus("failed");
                    setOrderData(res.data.order || null);
                }
            } catch (err) {
                showError("Something went wrong during payment verification.");
                setStatus("failed");
            } finally {
                setLoading(false);
            }
        };
        confirmPayment();
    }, [searchParams, navigate, dispatch]);

    if (loading) return <p className="text-center py-10 text-lg">Loading payment status...</p>;

    return (
        <div className="max-w-md mx-auto my-20 bg-white shadow-lg rounded-lg p-8 text-center">
            {status === "success" ? (
                <>
                    <MdCheckCircle className="mx-auto text-green-500" size={60} />
                    <h2 className="text-2xl font-bold mt-4">Payment Successful!</h2>
                    <p className="mt-2 text-gray-600">Thank you for your order.</p>
                </>
            ) : (
                <>
                    <MdError className="mx-auto text-red-500" size={60} />
                    <h2 className="text-2xl font-bold mt-4">Payment Failed</h2>
                    <p className="mt-2 text-gray-600">There was an issue processing your payment. Please try again or contact support.</p>
                </>
            )}

            {orderData && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg text-left">
                    <p><span className="font-semibold">Order ID:</span> {orderData._id}</p>
                    <p><span className="font-semibold">Total Amount:</span> ${orderData.total_amt.toFixed(2)}</p>
                    {orderData.payment_status && (
                        <p>
                            <span className="font-semibold">Payment Status:</span> {orderData.payment_status}
                        </p>
                    )}
                </div>
            )}

            <Button
                className="!mt-6 !bg-amber-600 !text-white !hover:bg-amber-700"
                variant="contained"
                onClick={() => navigate("/")}
            >
                Continue Shopping
            </Button>
        </div>
    );
};

export default PaymentSuccess;
