// Middleware pour traiter les erreurs
export const errorHandler = (err, req, res, next) => {
  // logger l'erreur dans la console
  console.error(`errorHandler: ${err.stack}`);

  // code erreur par défaut 500.

  const statusCode = err.statusCode || 500;

  const message = err.message || "Erreur interne du serveur";

  const errorCode = err.code || "Erreur serveur";

  //affichage de la stack trace à l'environnement .
  const stack = process.env.NODE_ENV === "development" ? err.stack : undefined;

  // Réponse JSON

  res.status(statusCode).json({
    success: false,
    message,
    code: errorCode,
    stack: err.stack,
  });
};

export default errorHandler;
