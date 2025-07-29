import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import '../styles/Navbar.css'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">WellnessApp</div>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#consult">Consultation</a></li>
          <li><a href="#login">Login</a></li>
        </ul>

        <div className="menu-icon" onClick={toggleMenu}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;