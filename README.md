# leglaiveproduction

# Frontend - Application Bande Dessinée

Ce dossier contient la partie **frontend** de l'application de gestion de bande dessinée. Il est développé avec **React** et utilise **Vite** pour un bundling rapide et moderne.

Accès à l'application via http://localhost:5173.

## 📁 Structure globale du projet

client/ ├── index.html
├── .env
├── package.json
├── vite.config.js
├── public/
├── src/ │
├── components/ # Composants réutilisables (UI, formulaires, etc.) │
├── pages/ # Pages principales de l'application (Accueil, Détails, etc.) │
├── services/ # Fonctions Axios pour communication avec le backend │
├── routes/ # Définition des routes React │
└── App.jsx # Composant racine

## 📁 Détail du dossier `src/`

src/
├── components/ │
├── AlbumCard.jsx │
├── Navbar.jsx │
└── ...
├── pages/ │
├── Accueil.jsx │
├── Bedetheque.jsx │
├── AlbumDetailPage.jsx │
└── ...
├── services/ │
├── albumService.js │
├── photoService.js │
└── dateService.js
├── routes/ │
└── AppRoutes.jsx
├── App.jsx

## ⚙️ Technologies principales

- **React** : Construction de l’interface utilisateur.
- **React Router DOM** : Navigation entre les pages.
- **Axios** : Requêtes HTTP vers le backend.
- **Vite** : Serveur de développement moderne.
- **CSS classique** : Pour le style (pas de Tailwind).

## 🚀 Lancement du projet

1. Cloner le dépôt et naviguer dans le dossier `client`.
2. Installer les dépendances :

````bash
npm install

Créer un fichier .env à la racine avec :

env
Copier le code
VITE_API_URL=http://localhost:3007/api
Lancer le serveur de développement :

bash
Copier le code
npm run dev

----------------------------------

# Backend - Application Bande Dessinée

Ce dossier contient le backend de l'application de gestion de bande dessinée. Il est développé avec **Node.js**, **Express**, et **MongoDB**, et utilise **Cloudinary** pour la gestion des images.

## Déploiement

Le projet est déployé sur Render : [Voir le site](https://leglaiveproduction-gh2o.onrender.com)

## Prérequis

- Node.js (v16+ recommandé)
- MongoDB (local ou distant)
- Un compte Cloudinary (si stockage d'images requis)

## Installation

1. Cloner le dépôt :

   ```sh
   git clone https://gerardromero66-admin@bitbucket.org/gerardromero66/leglaiveproduction.git
   cd backend
````

2. Installer les dépendances :

   ```sh
   npm install
   ```

3. Créer un fichier `.env` en vous basant sur `.env.example` et remplir les variables d'environnement.

## Lancement du projet

### En mode production

```sh
npm start
```

## 📁 Structure du projet

```
backend/
├── app.js                 # Point d'entrée de l'application Express
├── .env                  # Variables d'environnement (non versionnées)
├── config/               # Fichiers de configuration (BDD, Cloudinary, Logger)
│   ├── cloudinary.js
│   ├── db.js
│   └── logger.js
├── controllers/          # Logique métier des routes
│   ├── albumControllers.js
│   ├── dateControllers.js
│   ├── photoControllers.js
│   └── userControllers.js
├── middleware/           # Middlewares pour l'auth, validation, erreurs, etc.
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── morganMiddleware.js
│   ├── uploadMiddleware.js
│   └── validateRequest.js
├── models/               # Schémas Mongoose (MongoDB)
│   ├── Album.js
│   ├── Date.js
│   ├── Photo.js
│   └── User.js
├── routes/               # (à ajouter ici si présent)
├── package.json
└── README.md             # Ce fichier
```

## ⚙️ Technologies principales

- **Express.js** : Framework web minimaliste.
- **Mongoose** : ODM pour MongoDB.
- **Cloudinary** : Stockage et gestion d'images.
- **Multer** : Upload des fichiers.
- **Morgan** : Logger de requêtes HTTP.
- **Dotenv** : Chargement des variables d'environnement.
- **JWT** : Authentification.

## 🚀 Lancement du projet

1. Cloner le dépôt et naviguer dans le dossier `backend`.
2. Créer un fichier `.env` à la racine avec les variables nécessaires :

```env
PORT=3007
MONGODB_URI=mongodb://localhost:27017/nomDeTaDB
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
JWT_SECRET=ton_secret
```

3. Installer les dépendances :

```bash
npm install
```

4. Lancer le serveur :

```bash
npm start
```

Le serveur sera disponible sur `http://localhost:3007`.

## API - Routes principales

### Albums

- `GET /albums` : Récupère tous les albums
- `POST /albums/create` : Ajoute un nouvel album
- `DELETE /albums/:id` : Supprime un album

### Dates

- `GET /dates` : Récupère toutes les dates
- `POST /dates/create` : Ajoute une nouvelle date
- `PUT /dates/:id` : Met à jour une date existante
- `DELETE /dates/:id` : Supprime une date

### Photos

- `GET /photos` : Récupère toutes les photos
- `POST /photos/create` : Ajoute une nouvelle photo
- `PUT /photos/:id` : Met à jour une photo existante
- `DELETE /photos/:id` : Supprime une photo

### Utilisateurs

- `POST /users/register` : Inscription d'un utilisateur
- `POST /users/login` : Connexion d'un utilisateur
- `PUT /users/:id` : Mise à jour d'un utilisateur
- `DELETE /users/:id` : Suppression d'un utilisateur

> Pour plus de détails, consulte les fichiers dans le dossier `controllers/`.

## 🔐 Authentification

Certaines routes sont protégées par un middleware d’authentification via JWT. Le token est à envoyer dans les headers avec :

```http
Authorization: Bearer <token>
```

## 🧪 Tests

Les tests peuvent être ajoutés avec Jest ou Supertest (non inclus pour l’instant).

## 📁 Dossier `node_modules`

Ce dossier contient toutes les dépendances installées. Il est automatiquement généré avec `npm install` et n'est pas versionné dans Git.
