// On importe la bibliothèque morgan pour enregistrer les requêtes HTTP.
import morgan from "morgan";

// On importe une instance de logger configurée avec winston pour les logs personnalisés.
import logger from "../config/logger.js";

// Configuration du middleware morgan pour loguer les requêtes HTTP.
const morganMiddleware = morgan("combined", {
  stream: {
    // On redéfinit la méthode "write" du stream pour envoyer les logs générés par morgan à notre logger personnalisé.
    write: (message) => {
      // On utilise logger.info pour loguer chaque requête HTTP.
      // "message.trim()" permet de retirer les espaces blancs superflus en début et fin de chaîne.
      logger.info(message.trim());  // Loguer la requête HTTP via winston
    },
  },
});

// On exporte le middleware morgan pour qu'il puisse être utilisé ailleurs dans l'application
export default morganMiddleware;

