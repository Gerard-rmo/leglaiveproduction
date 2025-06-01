import { useEffect, useState } from 'react';
import axiosConfig from "../Services/AxiosConfig";
import logo from '../assets/logo.webp';
import './DatesSalons.css';

const DatesSalons = () => {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const res = await axiosConfig.get('/dates');
        setDates(res.data);
      } catch (err) {
        setError('Failed to load dates');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDates();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div>Loading dates...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dates-salons">
      <img src={logo} alt="Logo" className="dates-logo" />
      
      <h1 className='title-salons'>MES PROCHAINES DATES DE SALONS</h1>
      <ul>
        {dates.map(date => (
          <li key={date._id}>
            <h3>{formatDate(date.date)}</h3>
            <p className="date-salons">{date.lieu }</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DatesSalons;



  