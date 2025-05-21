import mongoose from "mongoose";

// Création du schéma de données pour les albums de BD

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

//  Exportation du modèle de données pour les albums
export default mongoose.model("Album", AlbumSchema);
