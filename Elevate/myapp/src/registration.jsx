import React, { useState } from 'react';
import './registration.css';

const Registration = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    email: '',
    password: '',
    confirmPassword: '',
    logo: null
  });
  
  // For showing file name after selection
  const [fileName, setFileName] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        logo: file
      });
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match for registration
    if (!isSignIn && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // Validate email is a company email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid company email address.");
      return;
    }
    
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
    alert(isSignIn ? "Sign in successful!" : "Registration successful!");
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    // Reset form data when switching between sign in and register
    setFormData({
      companyName: '',
      industry: '',
      companySize: '',
      email: '',
      password: '',
      confirmPassword: '',
      logo: null
    });
    setFileName('');
  };

  return (
    <div className="registration-container">
      <div className="form-header">
        <h2>{isSignIn ? 'Sign in to your account' : 'Register your company on ELEVATE'}</h2>
        <p>
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={toggleForm} 
            className="toggle-button"
          >
            {isSignIn ? 'Register here' : 'Sign in'}
          </button>
        </p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <>
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="industry">Industry</label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleInputChange}
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="companySize">Company Size</label>
                <select
                  id="companySize"
                  name="companySize"
                  required
                  value={formData.companySize}
                  onChange={handleInputChange}
                >
                  <option value="">Select Company Size</option>
                  <option value="small">Small (50 employees or less)</option>
                  <option value="medium">Medium (51-100 employees)</option>
                  <option value="large">Large (101-500 employees)</option>
                  <option value="corporate">Corporate (more than 500 employees)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="logo">Company Logo</label>
                <div className="file-upload">
                  <div className="file-upload-content">
                    <button type="button" className="file-upload-btn">
                      <span>Upload company logo</span>
                      <input
                        id="logo"
                        name="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </button>
                    <div className="file-name">{fileName || "No file selected"}</div>
                  </div>
                  <p className="file-info">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Company Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="company@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>

          {!isSignIn && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button type="submit" className="submit-button">
            {isSignIn ? 'Sign in' : 'Register'}
          </button>
        </form>

        {isSignIn && (
          <div className="social-signin">
            <div className="separator">
              <span>Or continue with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-button google">
                Google
              </button>
              <button type="button" className="social-button linkedin">
                LinkedIn
              </button>
              <button type="button" className="social-button github">
                GitHub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;