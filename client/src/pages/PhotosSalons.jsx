import { useEffect, useState } from 'react';
import axiosConfig from "../Services/AxiosConfig";
import logo from '@assets/logo.webp';
import SpinnerLogo from '../components/SpinnerLogo';
import './PhotosSalons.css';

const PhotosSalons = () => {
  const [photosSalons, setPhotosSalons] = useState([]);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    axiosConfig.get('/photos') 
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.photos || [];
        const salonsOnly = data.filter(photo => photo.categorie === "salon");
        setPhotosSalons(salonsOnly);
      })
      .catch(err => console.error("Erreur chargement:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="photos-salons-container">
      {loading && <SpinnerLogo />}
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

  