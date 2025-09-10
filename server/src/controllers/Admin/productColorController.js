import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import Color from "../../models/color.model.js";

// create color
export const createProductColor = async (req, res) => {
    try {
        const { name, code } = req.body;
        if (!name || !name.trim() || !code || !code.trim()) {
            return res.status(400).json({ message: "Color is required." });
        }

        const existing = await Color.findOne({ name: name.trim(), code: code.trim() });
        if (existing) {
            return res.status(409).json({ message: "Color already exists." });
        }
        const newColor = new Color({ name, code });
        await newColor.save();
        return res.status(200).json({
            error: false,
            success: true,
            message: "color created successfully"
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
            error: false,
            success: true,
            colors
        })

    } catch (error) {
        const msg = error.message || "internal server error";
        return sendErrorResponse(res, 500, msg);
    }
}

//fetch color
export const getColor = async (req, res) => {
    try {
        const { id } = req.params;
        const color = await Color.findById(id);
        if (!color) {
            return sendErrorResponse(res, "Color not exists", 404);
        };
        return res.status(200).json({
            color,
            error: false,
            success: true
        });


    }
    catch (error) {
        console.log(error);
        return sendErrorResponse(res, "Internal Server Error", 500);
    }
}

//update color
export const updateColor = async (req, res) => {
    try {
        const { name, code } = req.body;
        const { id } = req.params;

        if (!name || !name.trim() || !code || !code.trim()) {
            return res.status(400).json({ message: "Color name or code is required." });
        }

        const updateColor = await Color.findByIdAndUpdate(
            id,
            { name, code},
            { new: true, runValidators: true }  //ensures validation is checked
        );

        if (!updateColor) {
            return sendErrorResponse(res, 404, "Color not updated! Something went wrong!");
        }

        return res.status(200).json({
            size: updateColor,
            error: false,
            success: true
        })

    } catch (error) {
        const msg = error.message || "internal server error";
        return sendErrorResponse(res, 500, msg);
    }
}


//delete color
export const deleteColor = async (req, res) => {
    try {
        const { id } = req.params;
        const color = await Color.findById(id);
        if (!color) {
            return sendErrorResponse(res, 404, "color not found");
        }
        await color.deleteOne();
        return res.status(200).json({
            color,
            message: "Color deleted successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return sendErrorResponse(res, 500, `${error.message} || "Server error"`);
    }
}