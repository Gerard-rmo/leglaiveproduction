import User from "../models/User.js";
import JWT from "jsonwebtoken"; // bibliothèque `jsonwebtoken` pour travailler avec les JWT.
const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //  Définir le token du porteur dans l’ header
    token = req.headers.authorization.split(" ")[1];
  }

  // verifie si le token existe
  if (!token) {
    return res.status(401).json({ message: "Le token n'existe pas" });
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Pas de droit d'accès" });
  }
};

// Fonction pour vérifier si l'utilisateur est admin
export const adminCheck = async (req, res, next) => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
    if (req.user.role === "admin") {
      return next();
    } else {
      return res.status(403).json({
        message: "Vous n'avez pas l'autorisation d'accéder à cette ressource.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur d'authentification admin",
      error: error.message,
    });
  }
};
