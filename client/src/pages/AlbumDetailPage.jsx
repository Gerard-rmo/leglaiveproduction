import './AlbumDetailPage.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosConfig from '../Services/AxiosConfig';
import SpinnerLogo from '../components/SpinnerLogo';

const AlbumDetailPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosConfig.get(`/albums/${id}`)
      .then(res => {
        setAlbum(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors du chargement de l'album :", err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <SpinnerLogo />;
  if (!album) return <p>Album introuvable</p>;

  return (

    <div className="album-detail-container">
      {loading && <SpinnerLogo />}
      <h1 className="album-detail-title">{album.title}</h1>
      <img 
        src={album.imageURL?.url} 
        alt={album.title} 
        className="album-detail-cover" 
        onError={(e) => {
          e.target.src = 'path/to/default/image.jpg';
        }}
      />
      <p className="album-detail-summary">{album.summary}</p>
    </div>
  );
};

export default AlbumDetailPage;
