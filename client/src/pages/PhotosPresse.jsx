import { useEffect, useState } from 'react';
import axiosConfig from "../Services/AxiosConfig";
import logo from '@assets/logo.webp';
import "./PhotosPresse.css";

const PhotosPresse = () => {
  const [photosPresse, setPhotosPresse] = useState([]);

  useEffect(() => {
    axiosConfig.get('/photos') 
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.photos || [];
        const presseOnly = data.filter(photo => photo.categorie === "presse");
        setPhotosPresse(presseOnly);
      })
      .catch(err => console.error("Erreur chargement:", err));
  }, []);

  return (
    <div className="photos-presse-container">
      <img src={logo} alt="Logo" className="logo" />
      <p className="presse-title">MES ARTICLES DE PRESSE</p>
      <ul className="photo-listPr">
        {photosPresse.map((photo, index) => (
          <li key={index} className="photo-itemPr">
            <img src={photo.imageURL?.url} alt={`Presse ${index}`} className="photoPr" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotosPresse;

  