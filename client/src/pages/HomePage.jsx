
import logo from '../assets/logo.webp';
import slide1 from '../assets/T1.jpg';
import slide2 from '../assets/T2.jpg';
import slide3 from '../assets/T3B.jpg';
import slide4 from '../assets/T3M.jpg';
import slide5 from '../assets/AKELARRE.jpg';
import slide6 from '../assets/ALEM.jpg';
import slide7 from '../assets/MOSQUITO.jpg';
import slide8 from '../assets/protecteurs.png';
import slide9 from '../assets/couv - Copie.png';
import slide10 from '../assets/couv.png';
import slide11 from '../assets/az.png';
import "./HomePage.css";

const slides = [slide1, slide2, slide3, slide4, slide5, slide6,slide7, slide8, slide9, slide10, slide11]; 

const HomePage = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="Logo du glaive production" className="responsive-logo" />

      <p className="home-description">
        BIENVENUE DANS L'UNIVERS DE GERARD ROMERO
        OÙ VOUS POURREZ DÉCOUVRIR TOUT SON TRAVAIL
        ET COMMANDER SES DIFFÉRENTS ALBUMS BD ET AUTRES CRÉATIONS.
      </p>

      <div className="carousel-frise">
        <div className="carousel-track-frise">
          {[...slides, ...slides].map((img, index) => (
            <div className="carousel-item-frise" key={index}>
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
