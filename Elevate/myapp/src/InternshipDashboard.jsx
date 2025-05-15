import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './InternshipDashboard.css';

const InternshipDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
    <header className="header">
      <a href="/" className="logo">
        <span className="logo-icon">↑</span>
        Elevate
      </a>
      
      <div className="header-controls">
        <button id="themeToggle" className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <img 
          src="https://ui-avatars.com/api/?name=Intern+User&background=83C5BE&color=fff" 
          alt="User" 
          className="user-avatar" 
        />
      </div>
     </header>
    </div>
  );
  
};


export default InternshipDashboard;