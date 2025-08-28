import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import Color from "../../models/color.model.js";

// create color
export const createProductColor = async (req, res) => {
    try {
        const { name, code} = req.body;
        if (!name || !name.trim() || !code || !code.trim()) {
            return res.status(400).json({ message: "Color is required." });
        }

        const existing = await Color.findOne({ name: name.trim(), code:code.trim() });
        if (existing) {
            return res.status(409).json({ message: "Color already exists." });
        }
        const newColor = new Color({ name, code});
        await newColor.save();
        return res.status(200).json({
            error: false,
            success: true,
            message:"color created successfully"
        })
    } catch (error) {
        const msg = error.message || "internal server error";
        return sendErrorResponse(res, 500, msg);
    }
}

//fetch all colors
export const getAllColors = async (req, res) => {
    try {
        const colors = await Color.find();
        res.status(200).json({
            error:false,
            success:true,
            colors
        })
        
    } catch (error) {
        const msg = error.message || "internal server error";
        return sendErrorResponse(res, 500, msg);
    }
}