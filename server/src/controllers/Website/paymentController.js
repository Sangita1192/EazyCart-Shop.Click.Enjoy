import Stripe from "stripe";
import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import Order from "../../models/order.model.js";

const stripe = new Stripe(process.env.STRIPE_KEY);


export const createPaymentSession = async (req, res) => {
    const userId = req.userId;
    try {
        if (!userId) {
            return sendErrorResponse(res, 400, "you are not logged In");
        }
        const { cartItems, shippingAddress } = req.body;
        if (!cartItems || !shippingAddress || !cartItems.items) return sendErrorResponse(res, 400, "cart or address cannot be empty.");

        // calculate total
        const subTotal = cartItems.items.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        );

        const discountAmt = cartItems.items.reduce(
            (acc, item) => acc + (item.product.price * item.quantity * (item.product.discount || 0)) / 100,
            0
        );

        const shippingFee = subTotal > 19.99 ? 0 : 19.99;
        const taxRate = 12.5 / 100; // 12.5% GST/PST
        const taxAmt = (subTotal - discountAmt + shippingFee) * taxRate;

        const totalAmt = subTotal - discountAmt + shippingFee + taxAmt;

        const orderProducts = cartItems.items.map(item => ({
            product_id: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
            product_details: {
                name: item.product.name,
                image: item.product.images?.[0],
                color: item.color,
                size: item.size,
            },
        }));

        const order = await Order.create({
            user_id: userId,
            products: orderProducts,
            delivery_address: shippingAddress,
            discount_amt: discountAmt,
            shipping_fee: shippingFee,
            tax_amt: taxAmt,
            total_amt: totalAmt,
            payment_status: "pending",
        });

        // Create Stripe Checkout Session
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "cad",
                        product_data: { name: "Order Total" },
                        unit_amount: Math.round(totalAmt * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId: userId.toString(),
            },
        });

        // update order with payment_id
        order.payment_id = stripeSession.id;
        await order.save();

        return res.status(200).json({
            url: stripeSession.url,
            orderId: order._id,
        });

    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "internal server error");
    }
}


export const verifyPayment = async (req, res) => {
    const { sessionId } = req.body;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            const orderId = session.metadata.orderId;
            const order = await Order.findById(orderId);
            if (!order) return sendErrorResponse(res, 404, "Order not found");

            order.payment_status = "paid";
            await order.save();

            return res.status(200).json({ success: true, order });
        } else {
            return res.status(400).json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "Internal server error");
    }
};