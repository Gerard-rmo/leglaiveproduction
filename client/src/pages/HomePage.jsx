import logo from '@assets/logo.webp';
import slide1 from '@assets/T1.jpg';
import slide2 from '@assets/T2.jpg';
import slide3 from '@assets/T3B.jpg';
import slide4 from '@assets/T3M.jpg';
import slide5 from '@assets/AKELARRE.jpg';
import slide6 from '@assets/ALEM.jpg';
import slide7 from '@assets/MOSQUITO.jpg';
import slide8 from '@assets/protecteurs.png';
import slide9 from '@assets/couv2.png';
import slide10 from '@assets/couv.png';
import slide11 from '@assets/az.png';
import "./HomePage.css";

// ✅ Key/value format (with descriptive alt texts)
const slides = [
  { src: slide1, alt: "Tome 1" },
  { src: slide2, alt: "Tome 2" },
  { src: slide3, alt: "Tome 3 couverture B" },
  { src: slide4, alt: "Tome 3 couverture M" },
  { src: slide5, alt: "Akelarre" },
  { src: slide6, alt: "Alem" },
  { src: slide7, alt: "Mosquito" },
  { src: slide8, alt: "Les Protecteurs" },
  { src: slide9, alt: "Couverture alternative 2" },
  { src: slide10, alt: "Couverture alternative 1" },
  { src: slide11, alt: "AZ illustration" },
];

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
          {[...slides, ...slides].map((slide, index) => (
            <div className="carousel-item-frise" key={index}>
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

