import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Hero = () => {
  const navigate = useNavigate();

  const goToReportForm = () => {
    navigate('/report');
  };

  return (
    <section className="hero">
      <img src="University Center.jpg" alt="Campus" className="hero-image" />
      <div className="hero-overlay">
        <h1>Find What's Yours, Return What's Not</h1>
        <p>
          Bits lost-and-found helps students and staff reunite with their lost items and return found items to their rightful owners.
        </p>
        <div className="hero-buttons">
          <button className="btn green" onClick={goToReportForm}>
            Report Lost Item
          </button>
          <button className="btn white" onClick={goToReportForm}>
            Report Found Item
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
