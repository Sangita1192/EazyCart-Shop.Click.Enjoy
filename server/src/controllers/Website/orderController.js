import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import Order from "../../models/order.model.js";

//get orders by particular user
export const getOrders = async(req,res)=>{
    const userId = req.userId;
    try{
        if(!userId) return sendErrorResponse(res, 400, 'you are not logged in');

        const orders = await Order.find({user_id: userId});

        return res.status(200).json({
            success: true,
            error: false,
            orders
        })

    }
    catch(error){
        console.log(error);
        return sendErrorResponse(res,500, 'internal server error')
    }
}