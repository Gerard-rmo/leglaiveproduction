import Album from "../models/Album.js";
import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs"; //module natif node.js permettant d'interagir avec le système des fichiers.
import dotenv from "dotenv";
dotenv.config();

// Fonction pour créer les albums.
export const createAlbum = async (req, res, next) => {
  try {
    // destructurer les données du corps de la requête.
    const { title, summary } = req.body;

    if (!title || !summary) {
      return next({
        statusCode: 400,
        message: "Tous les champs doivent être remplis.",
      });
    }
    // Vérification si un fichier a bien été téléchargé
    if (!req.file) {
      return next({
        statusCode: 400,
        message: "Aucune image n'a été téléchargée.",
      });
    }
    //Téléchargement de l'image vers Cloudinary

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "visuels",
      resource_type: "image", // Type de fichier
    });
    console.log(result);
    // Supprimer le fichier local après le téléchargement
    unlinkSync(req.file.path);

    // Créer un nouvel album dans la db.
    const album = await Album.create({
      title,
      imageURL: { public_id: result.public_id, url: result.secure_url }, // URL sécurisée de l'img Cloudinary.
      summary,
    });
    res.status(201).json({ message: "Album créé avec succès.", album });
  } catch (error) {
    next(error);
  }
};

// Sélectionner tous les albums.

export const getAllAlbum = async (req, res, next) => {
  try {
    const allAlbum = await Album.find().select();
    res.status(200).json({
      message: `Récupération de tous les albums.`,
      allAlbum,
    });
  } catch (error) {
    next(error);
  }
};

//Mise à jour des données des albums.

export const updateAlbum = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "visuels",
        resource_type: "image",
      });
      unlinkSync(req.file.path);
      const updateData = {
        title: req.body.title,
        imageURL: { public_id: result.public_id, url: result.secure_url },
        summary: req.body.summary,
      };
      const updateAlbum = await Album.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updateAlbum) {
        return res.status(400).json({ message: `Album non trouvé.` });
      }
      return res
        .status(202)
        .json({ message: `Album mis à jour.`, album: updateAlbum });
    } else {
      const updateData = {
        title: req.body.title,
        summary: req.body.summary,
      };
    }
  } catch (error) {
    console.error(error);

    return next(error);
  }
};

// Suppression des données de l'album

export const deleteAlbum = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: `Album non trouvé.` });
    }
    await Album.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: `Album supprimé avec succès.` });
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Album non trouvé." });
    }
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};
