import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    imageURL: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    summary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Album", AlbumSchema);
