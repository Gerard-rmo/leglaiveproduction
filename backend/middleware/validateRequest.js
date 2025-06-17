
import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  // Valider les données de la requête
  const errors = validationResult(req);

  // Si données invalides, renvoyer une erreur
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Passer au middleware suivant si les données sont valides.
  next();
};
