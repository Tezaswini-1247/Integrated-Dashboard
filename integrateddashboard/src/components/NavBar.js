import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo-container">
        <img 
          src='https://cloud4coolkids.com/assets/admin_image/image/20240513194409.png' 
          alt="Logo" 
          className="logo" 
        />
      </div>
      <div className="nav-links">
        <Link to="/update" className="nav-link">InstUpdate</Link>
        <Link to="/retrieve" className="nav-link">InstRetrieve</Link>
        <Link to="/update-server" className="nav-link">ServerUpdate</Link>
        <Link to="/retrieve-server" className="nav-link">ServerRetrieve</Link>
        <Link to="/business-opportunity" className="nav-link">BusinessUpdate</Link>
        <Link to="/retrieve-business-opportunity" className="nav-link">BusinessRetrieve</Link>
        <button className="logout-button" onClick={onLogout}>Logout</button>
        
      </div>
    </nav>
  );
};

export default NavBar;
