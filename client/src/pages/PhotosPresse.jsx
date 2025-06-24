import { useEffect, useState } from 'react';
import axiosConfig from "../Services/AxiosConfig";
import logo from '@assets/logo.webp';
import SpinnerLogo from '../components/SpinnerLogo';
import "./PhotosPresse.css";

const PhotosPresse = () => {
  const [photosPresse, setPhotosPresse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosConfig.get('/photos') 
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.photos || [];
        const presseOnly = data.filter(photo => photo.categorie === "presse");
        setPhotosPresse(presseOnly);
      })
      .catch(err => console.error("Erreur chargement:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="photos-presse-container">
      {loading && <SpinnerLogo />}
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


  