import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    explanation: { type: String, default: "" },
    status: { type: String, default: "Pending AI Review" },
    score: { type: Number, default: null },
    suggestions: { type: [String], default: [] },
    flags: { type: [String], default: [] },
    createdAt: { type: Date, default: () => new Date().toISOString() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// expose `id` as string version of _id for compatibility with frontend expecting id
ProductSchema.virtual("id").get(function () {
  return this._id.toString();
});

export default mongoose.model("Product", ProductSchema);
