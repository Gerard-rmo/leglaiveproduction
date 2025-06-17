//bibliothèque pour gérer les téléchargements de fichiers.
import multer from "multer";
//interaction avec le système de fichiers.
import fs from "fs";

// Définition du répertoire où les fichiers seront téléchargés
const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); //option 'recursive' pour créer tous les répertoires nécessaires.
}

const storage = multer.diskStorage({
  // Destination pour spécifier le répertoire où le fichier sera enregistré
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // Définition du nom du fichier téléchargé
  filename: function (req, file, cb) {
    // Création d'un suffixe unique pour éviter les conflits de nommage
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

  // Filtrage des fichiers des images.
const fileFilter = (req, file, cb) => {

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  // Vérifie si le type du fichier correspond aux types autorisés.
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error("Le fichier doit être une image (JPEG, PNG, WEBP)"), false); 
  }
};

// Configuration de Multer avec les limites et le filtre de fichier
const upload = multer({
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de taille du fichier à 5 Mo
  },
});

export { upload };
