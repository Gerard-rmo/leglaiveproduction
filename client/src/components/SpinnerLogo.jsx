
import './SpinnerLogo.css';
import logo from '@assets/logo.webp'; 

const SpinnerLogo = () => {
  return (
    <div className="spinner-overlay">
      <img src={logo} alt="Chargement..." className="spinner-logo" />
    </div>
  );
};

export default SpinnerLogo;
