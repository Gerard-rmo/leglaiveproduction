import { useEffect, useState } from 'react';
import axiosConfig from "../Services/AxiosConfig";
import logo from '@assets/logo.webp';
import './PhotosSalons.css';

const PhotosSalons = () => {
  const [photosSalons, setPhotosSalons] = useState([]);

  useEffect(() => {
    axiosConfig.get('/photos') 
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.photos || [];
        const salonsOnly = data.filter(photo => photo.categorie === "salon");
        setPhotosSalons(salonsOnly);
      })
      .catch(err => console.error("Erreur chargement:", err));
  }, []);

  return (
    <div className="photos-salons-container">
      <img src={logo} alt="Logo" className="logo" />
      <p className="bedetheque-title">MES PHOTOS DE SALONS</p>
      <ul className="photo-listSa">
        {photosSalons.map((photo, index) => (
          <li key={index} className="photo-itemSa">
            <img src={photo.imageURL?.url} alt={`Salon ${index}`} className="photoSa" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotosSalons;


  