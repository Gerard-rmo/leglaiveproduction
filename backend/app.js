import express from "express"; //création d'un serveur web
import dotenv from "dotenv"; //  gestion des variables d'environnement
import connectDB from "./config/db.js";
import cloudinaryConfig from "./config/cloudinary.js";
import userRoutes from "./routes/userRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import dateRoutes from "./routes/dateRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import errorHandler from "./middleware/errorHandler.js"; // gestionnaire d'erreurs.
import helmet from "helmet";
import cors from "cors"; // gérer les requêtes cross-origin
import rateLimit from "express-rate-limit"; // limitation des requêtes.

dotenv.config(); // Chargement des variables d'env.
const app = express(); // Création d'une instance de l'application Express

connectDB();

cloudinaryConfig();

// Middleware pour gérer les requêtes cross-origin
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://res.cloudinary.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// Middleware pour sécuriser l'application
app.use(helmet());

// Middleware pour limiter le nombre de requêtes
// à l'API afin de prévenir les abus
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Trop de requêtes, veuillez réessayer plus tard",
  },
  skip: (req) => {
    return process.env.NODE_ENV === "development";
  },
});
app.use("/api/", apiLimiter);

// Middleware pour analyser les requêtes avec des URL encodées
app.use(express.urlencoded({ extended: true }));

// Middleware pour analyser les requêtes JSON
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/user", userRoutes); 
app.use("/api/albums", albumRoutes); 
app.use("/api/dates", dateRoutes); 
app.use("/api/photos", photoRoutes); 

// Middleware pour gérer les erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 3007;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
