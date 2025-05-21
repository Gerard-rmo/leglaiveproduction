import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Bedetheque from './pages/Bedetheque';
import DatesSalons from './pages/DatesSalons';
import PhotosPresse from './pages/PhotosPresse';
import PhotosSalons from './pages/PhotosSalons';
import Skates from './pages/Skates';
import AlbumDetailPage from './pages/AlbumDetailPage';
import DashboardAdmin from './components/DashboardAdmin';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
  return (
    
    <Router>
      
        <Navbar />
        
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/albums' element={<Bedetheque />} />
          <Route path='/skates' element={<Skates />} />
          <Route path='/salons' element={<DatesSalons />} />
          <Route path='/presse' element={<PhotosPresse />} />
          <Route path='/photos-salons' element={<PhotosSalons />} />
          <Route path='/albums/:id' element={<AlbumDetailPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin' element={<PrivateRoute><DashboardAdmin /></PrivateRoute>} />
        </Routes>

        <div className="contact-wrapper">
          <a href="mailto:gerard.romero.glaive@gmail.com" className="floating-contact">
            Contactez-moi
          </a>
        </div>

        <Footer />
      
    </Router>
  );
};

export default App;
