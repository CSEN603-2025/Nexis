import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after component mounts
    setLoaded(true);
    
    // Set a timeout to mark animations as complete for secondary animations
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    // Navigate to registration/login page
    navigate('/reg');
  };

  return (
    <div className="welcome-container">
      {/* Animated background elements */}
      <div className="animated-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>
      
      <div className={`welcome-content ${loaded ? 'visible' : ''}`}>
        {/* Logo and Title */}
        <div className="logo-container">
          <div className="logo">
            <span className="logo-icon">E</span>
          </div>
          <h1 className="app-title">ELEVATE</h1>
        </div>
        
        {/* Tagline */}
        <h2 className="tagline">Professional Network for Academic Excellence</h2>
        
        {/* Feature Cards */}
        <div className={`feature-cards ${animationComplete ? 'animate-cards' : ''}`}>
          <div className="feature-card">
            <div className="card-icon student-icon"></div>
            <h3>Students</h3>
            <p>Build your professional profile and connect with opportunities</p>
          </div>
          
          <div className="feature-card">
            <div className="card-icon faculty-icon"></div>
            <h3>Faculty</h3>
            <p>Mentor students and collaborate with industry partners</p>
          </div>
          
          <div className="feature-card">
            <div className="card-icon company-icon"></div>
            <h3>Companies</h3>
            <p>Discover emerging talent from the German University in Cairo</p>
          </div>
        </div>
        
        {/* Partners Section */}
        <div className="partners-section">
          <h3>Proudly Partnered with</h3>
          <div className="partners-logo">
            <div className="partner guc-logo">GUC</div>
            <div className="partner industry-logo">Industry Leaders</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="primary-btn" onClick={handleGetStarted}>Get Started</button>
          <button className="secondary-btn" onClick={() => window.open('https://www.guc.edu.eg', '_blank')}>Learn More</button>
        </div>
        
        {/* Scroll Indicator for Mobile */}
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="welcome-footer">
        <p>© 2025 ELEVATE - German University in Cairo</p>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;