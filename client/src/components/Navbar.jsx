import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userIsAuthenticated = JSON.parse(localStorage.getItem("isAuth") || "false");
    setIsAuth(userIsAuthenticated);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav" role="navigation">
      <div className="navContainer">
        <button className={`burger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`navList ${menuOpen ? 'open' : ''}`}>
          <li className="navItem">
            <Link to="/" className="btnLink" onClick={() => setMenuOpen(false)}>Accueil</Link>
          </li>
          <li className="navItem">
            <Link to="/albums" className="navLink" onClick={() => setMenuOpen(false)}>Bédéthèque</Link>
          </li>
          <li className="navItem">
            <Link to="/skates" className="navLink" onClick={() => setMenuOpen(false)}>Planches de skate</Link>
          </li>
          <li className="navItem">
            <Link to="/salons" className="navLink" onClick={() => setMenuOpen(false)}>Salons</Link>
          </li>
          
        </ul>
        
      </div>
      
    </nav>
    
  );
};

export default Navbar;
