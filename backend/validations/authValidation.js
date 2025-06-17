
import { body, param } from "express-validator";

// Validation pour la création d'un utilisateur.
export const validateRegisterUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est obligatoire.")
    .isLength({ min: 3 })
    .withMessage("Le nom doit avoir au minimum trois caractères.")
    .isLength({ max: 15 })
    .withMessage("Le nom doit avoir 15 caractères maximum."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire.")
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide."),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire.")
    .isLength({ min: 6, max: 200 })
    .withMessage("Le mot de passe doit contenir entre 6 et 200 caractères."),
];

// Validation pour la connexion d'un utilisateur.
export const validateLoginUser = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire.")
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide."),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire.")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères."),
];

// Validation pour la suppression d'un utilisateur avec son ID.
export const validateDeleteUser = [
  param("id").isMongoId().withMessage("ID utilisateur manquant ou invalide."),
];

// Validation pour la mise à jour d'un utilisateur
export const validateUpdateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est obligatoire.")
    .isLength({ min: 3 })
    .withMessage("Le nom doit avoir au minimum trois caractères.")
    .isLength({ max: 15 })
    .withMessage("Le nom doit avoir 15 caractères maximum."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire.")
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide."),
];
