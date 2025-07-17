import sendErrorResponse from "../../helperFunction/sendErrorResponse.js";
import Size from "../../models/size.model.js"

export const getAllProductSizes = async (req, res) => {
    try {
        const sizes = await Size.find();
        return res.status(200).json({
            sizes,
            error: false,
            success: true
        })
    } catch (error) {
        sendErrorResponse(res, 500, 'Internal server error');
    }
}

// create Size
export const createProductSize = async (req, res) => {
    try {
        const { name, label} = req.body;
        if (!name || !name.trim() || !label || !label.trim()) {
            return res.status(400).json({ message: "Size is required." });
        }

        const existing = await Size.findOne({ name: name.trim() });
        if (existing) {
            return res.status(409).json({ message: "Size already exists." });
        }
        const newSize = new Size({ name: name.trim() , label: label.trim()});
        await newSize.save();
        return res.status(200).json({
            newSize,
            error: false,
            success: true
        })
    } catch (error) {
        if (error.code === 11000) {
            console.log('checked true');
            // Duplicate key error
            return sendErrorResponse(res, 409, "Size already exist!")
        }
        const msg = error.message || "internal server error";
        return sendErrorResponse(res, 500, msg);
    }
}


//update Product Size
export const updateProductSize = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Size name is required." });
        }

        const updatedSize = await Size.findByIdAndUpdate(
            id,
            { name: name.trim() },
            { new: true, runValidators: true }  //ensures unique is checked
        );

        if (!updatedSize) {
            return sendErrorResponse(res, 404, "Size not found");
        }

        return res.status(200).json({
            size: updatedSize,
            error: false,
            success: true
        })

    } catch (error) {
        if (error.code === 11000) {
            return sendErrorResponse(res, 409, "Size already exist!")
        }
        const msg = error.message || "internal server error";
        return sendErrorResponse(res, 500, msg);
    }
}

//delete productSize
export const deleteProductSize = async (req, res) => {
    try {
        const {id} = req.params;
        const size = await Size.findById(id);
        if(!size){
            return sendErrorResponse(res, 404, "Size not found");
        }
        await size.deleteOne();
        return res.status(200).json({
            size,
            message: "product size deleted successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return sendErrorResponse(res,500,`${error.message} || "Server error"`);
    }
}