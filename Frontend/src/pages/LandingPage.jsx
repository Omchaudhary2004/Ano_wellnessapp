import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage'; 

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar inside the landing page */}
      <nav className="navbar">
        <div className="navbar-brand">WellnessApp</div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a onClick={() => navigate('/login')}>Login</a>
          <a onClick={() => navigate('/register')}>Register</a>
        </div>
      </nav>

      {/* Landing Content */}
      <div className="landing-container">
        <div className="landing-content">
          <h1>
            Welcome to <span className="highlight">WellnessApp</span>
          </h1>
          <p>
            Kickstart your New Year's resolution to become a healthier and happier version of yourself.
            Our platform helps you understand nutrition, book personalized consultations, and stay on
            track with your wellness goals. Make 2025 your healthiest year yet.
          </p>
          <div className="button-group">
            <button onClick={() => navigate('/login')} className="login-btn">Login</button>
            <button onClick={() => navigate('/register')} className="register-btn">Register</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
