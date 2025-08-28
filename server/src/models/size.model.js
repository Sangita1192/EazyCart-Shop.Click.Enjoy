import mongoose, { set } from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      set: (v) => v.trim().toLowerCase(),
    },
    label: {
      type: String,
      required: true,
      trim: true,
      set: (v) => v.trim().toUpperCase(),
    },
  },
  { timestamps: true }
);

sizeSchema.index({ name: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });

const Size = mongoose.model("Size", sizeSchema);
export default Size;
