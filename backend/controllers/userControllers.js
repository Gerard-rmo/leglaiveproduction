import User from "../models/User.js";
import bcrypt from "bcrypt";

// Fonction pour créer un utilisateur.

export const registerUser = async (req, res, next) => {
  
  //destructurer les données du corps de la requête.

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return next({
      statusCode: 400,
      message: "Tous les champs sont obligatoires.",
    });
  }
  try {
    // Vérifie si l'email existe déjà.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next({
        statusCode: 400,
        message: "Un utilisateur avec cet email existe déjà.",
      });
    }

    //Hache le mdp avant de le stocker

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: `L'utilisateur a bien été créé.`, user });
  } catch (error) {
    next(error);
  }
};

//Mise à jour des données utilisateur.

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let updateData = { name, email };

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//Suppression des données

export const deleteUser = async (req, res, next) => {
  try {
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    next(error);
  }
};

// Fonction pour se connecter

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Recherche de l'utilisateur par email.
    const userLogin = await User.findOne({ email });

    if (!email || !password) {
      return next({
        statusCode: 400,
        message: "L'email et le mot de passe sont requis.",
      });
    }

    // Vérifie si l'utilisateur existe
    if (!userLogin) {
      return res.status(401).json({ message: "L'utilisateur n'existe pas" });
    }

    const token = userLogin.getSignedJwtToken();

    // Envoi de la réponse avec le token
    res.status(200).json({
      success: true,
      userLogin,
      token,
    });
  } catch (error) {
    next(error);
  }
};
