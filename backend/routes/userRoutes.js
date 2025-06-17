import express from "express";

// Middleware pour la protection et la gestion des rôles
import { protect } from "../middleware/authMiddleware.js";

import {
  registerUser,
  updateUser,
  deleteUser,
  login,
} from "../controllers/userControllers.js";

// Middleware de validation des requêtes
import { validateRequest } from "../middleware/validateRequest.js";

import {
  validateRegisterUser,
  validateUpdateUser,
  validateDeleteUser,
} from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", validateRegisterUser, validateRequest, registerUser);

router.put("/:id", protect, validateUpdateUser, validateRequest, updateUser);

router.delete("/:id", protect, validateDeleteUser, validateRequest, deleteUser);

router.post("/login", login);

export default router;
