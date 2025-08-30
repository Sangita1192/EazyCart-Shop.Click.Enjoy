import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Banner title is required"],
        set: (v) => v.trim().toLowerCase()
    },
    description: {
        type: String,
        required: [true, "Banner description is required"],
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    link: {
        type: String,
        required: [true, "link url is required"]
    },
    startDate: {
        type: Date,
        required: [true, "Start Date is required"]
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"]
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    bannerType: {
        type: String,
        enum: {
            values: ["slider", "middle", "card"],
            message: "Banner type must be either slider, middle, or card",
        },
        required: [true, "Banner type is required"],
    },
    order: Number,
});

const Banner = mongoose.model("banner", bannerSchema);

export default Banner;
