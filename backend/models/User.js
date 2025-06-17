import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Création du schéma de données pour ma connexion.

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Le nom est obligatoire."],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "L'email est obligatoire."],
      unique: true,
      lowercase: true, // pour normaliser l'email.
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Veuillez entrer un email valide.",
      ],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire."],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères."],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

// Hacher le mot de passe avant de le sauvegarder
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Vérification du mot de passe lors de la connexion
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(`Erreur lors de la comparaison du mot de passe.`);
  }
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", UserSchema);
