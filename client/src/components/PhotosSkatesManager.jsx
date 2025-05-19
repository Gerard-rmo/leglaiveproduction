import React, { useEffect, useState } from 'react';
import axiosConfig from '../Services/AxiosConfig';
import './PhotosSkatesManager.css';

const PhotosSkatesManager = () => {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get("/photos?categorie=skate");
      setPhotos(Array.isArray(res.data) ? res.data : res.data.photos || []);
    } catch (err) {
      console.error('Erreur chargement:', err);
      setError("Impossible de charger les photos");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("categorie", "skate");

    try {
      await axiosConfig.post("/photos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(null);
      fetchPhotos();
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      setError("Échec de l'upload");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette photo ?")) return;

    try {
      setLoading(true);
      await axiosConfig.delete(`/photos/${id}`);
      fetchPhotos();
    } catch (err) {
      console.error('Erreur suppression:', err);
      setError("Échec de la suppression");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skates-container">
      <h2 className="skates-title">Gérer les photos de skates</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleUpload} className="skates-form">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
          disabled={loading}
        />
        <button type="submit" className="upload-btn" disabled={loading}>
          {loading ? "Chargement..." : "Ajouter"}
        </button>
      </form>

      <div className="photo-grid">
        {photos.map(photo => (
          <div key={photo._id} className="photo-item">
            <img src={photo.imageURL?.url} alt="Skate" className="photo-img" />
            <button
              onClick={() => handleDelete(photo._id)}
              className="delete-btn"
              disabled={loading}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosSkatesManager;
