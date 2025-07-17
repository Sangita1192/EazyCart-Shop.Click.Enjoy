import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Transform name to lowercase before saving
sizeSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.name = this.name.trim().toLowerCase();
  }
  next();
});


sizeSchema.index({ name: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });

const Size = mongoose.model("Size", sizeSchema);
export default Size;
