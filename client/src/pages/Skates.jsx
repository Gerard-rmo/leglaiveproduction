import { useEffect, useState } from 'react';
import axiosConfig from "../Services/AxiosConfig";
import logo from '@assets/logo.webp';
import './Skates.css';

const Skates = () => {
  const [skates, setSkates] = useState([]);

  useEffect(() => {
    axiosConfig.get('/photos')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.photos || [];
        const skateOnly = data.filter(photo => photo.categorie === "skate");
        setSkates(skateOnly);
      })
      .catch(err => console.error("Erreur chargement:", err));
  }, []);

  return (
    <div className="photos-skates-container">
      <img src={logo} alt="Logo" className="logo" />
      <p className="bedetheque-title">PLANCHES DE SKATE DECORATIVES (sur commande).</p>
      <ul className="photo-listSk">
        {skates.map((skate, index) => (
          <li key={index} className="photo-itemSk">
            <img src={skate.imageURL?.url} alt={`Skate ${index}`} className="photoSk" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skates;
