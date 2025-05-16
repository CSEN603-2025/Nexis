import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './registration.css';

const Registration = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [showCredentials, setShowCredentials] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    email: '',
    password: '',
    confirmPassword: '',
    logo: null,
    companyDocuments: null
  });
  
  const [fileName, setFileName] = useState('');
  const [documentsName, setDocumentsName] = useState('');

  // Demo credentials
  const demoCredentials = {
    student: { email: 'student@elevate.com', password: 'student123', route: '/student' },
    proStudent: { email: 'prostudent@elevate.com', password: 'prostudent123', route: '/student2' },
    faculty: { email: 'faculty@elevate.com', password: 'faculty123', route: '/faculty' },
    scad: { email: 'scad@elevate.com', password: 'scad123', route: '/scaddashboard' },
    company: { email: 'company@elevate.com', password: 'company123', route: '/company' }
  };

  // Show welcome notification on first load
  useEffect(() => {
    showNotification("Welcome to ELEVATE Professional Network", "welcome");
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, type === 'welcome' ? 8000 : 5000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (e.target.name === 'logo') {
        setFormData({ ...formData, logo: file });
        setFileName(file.name);
      } else if (e.target.name === 'companyDocuments') {
        setFormData({ ...formData, companyDocuments: file });
        setDocumentsName(file.name);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isSignIn && formData.password !== formData.confirmPassword) {
      showNotification("Passwords do not match!", "error");
      return;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }
    
    // Check if credentials match any demo account
    const matchedRole = Object.keys(demoCredentials).find(role => 
      formData.email === demoCredentials[role].email && 
      formData.password === demoCredentials[role].password
    );
    
    if (isSignIn) {
      if (matchedRole) {
        showNotification("Sign in successful! Redirecting...", "success");
        setTimeout(() => {
          navigate(demoCredentials[matchedRole].route);
        }, 2000);
      } else {
        showNotification("Invalid credentials. Try demo accounts if needed.", "error");
      }
    } else {
      // Registration logic
      showNotification("Registration submitted! Please wait for verification email.", "success");
      // Here you would typically send data to your backend
    }
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setFormData({
      companyName: '',
      industry: '',
      companySize: '',
      email: '',
      password: '',
      confirmPassword: '',
      logo: null,
      companyDocuments: null
    });
    setFileName('');
    setDocumentsName('');
  };

  const handleDemoLogin = (type) => {
    // Set the demo credentials in the form
    setFormData({
      ...formData,
      email: demoCredentials[type].email,
      password: demoCredentials[type].password
    });
    
    showNotification(`Logging in as ${type.replace(/([A-Z])/g, ' $1').toLowerCase()}...`, "info");
    setTimeout(() => {
      navigate(demoCredentials[type].route);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    showNotification(`Redirecting to ${provider} authentication...`, "info");
    
    // In a real app, these would be your actual OAuth endpoints
    setTimeout(() => {
      // For demo purposes, redirect to student dashboard
      navigate('/student');
    }, 2000);
  };

  // ... (rest of your component code remains the same)
  
  return (
    <div className="registration-container">
      {/* Background elements */}
      <div className="bg-elements">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
        <div className="bg-circle-3"></div>
        <div className="bg-grid"></div>
        <div className="bg-bubbles">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="bubble" style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.4 + 0.1
            }}></div>
          ))}
        </div>
      </div>
      
      {/* Modern notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            <div className="notification-icon">
              {notification.type === 'success' ? (
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                </svg>
              ) : notification.type === 'error' ? (
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M13 13H11V7H13M13 17H11V15H13M12 2C6.47 2 2 6.5 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2Z" />
                </svg>
              ) : notification.type === 'welcome' ? (
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,12.8 15.3,13.9 14.4,14.7L16.5,16.8C18,15.3 18.8,13.3 18.8,11.5C18.8,7.9 16.1,5.2 12.5,5.2C10.7,5.2 9.1,5.9 7.9,7.1L9.3,8.5C10.1,7.7 11.1,7.2 12,7.2V7.7M12,10C11.4,10 11,10.4 11,11C11,11.6 11.4,12 12,12C12.6,12 13,11.6 13,11C13,10.4 12.6,10 12,10M7.5,13L6.1,14.5L8.3,16.7L9.7,15.2L7.5,13M15.8,17.3L14.4,18.7L16.6,20.9L18,19.5L15.8,17.3M10.5,17.3L9.1,18.7L11.3,20.9L12.7,19.5L10.5,17.3Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17H13V11H11V17M11,9H13V7H11V9Z" />
                </svg>
              )}
            </div>
            <div className="notification-message">
              <h4>{notification.type === 'welcome' ? 'Welcome!' : notification.type === 'error' ? 'Error' : 'Success'}</h4>
              <p>{notification.message}</p>
            </div>
            <button className="notification-close" onClick={() => setNotification({ ...notification, show: false })}>
              &times;
            </button>
          </div>
          <div className="notification-progress"></div>
        </div>
      )}
      
      <div className="registration-content">
        <div className="logo-container">
          
          <div className="logo-subtitle">Professional Network for Internships</div>
        </div>

        <div className="form-header">
          <h2>{isSignIn ? ' Welcome to our Platform' : ' Registration'}</h2>
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
                    <option value="small">Small (1-50 employees)</option>
                    <option value="medium">Medium (51-200 employees)</option>
                    <option value="large">Large (201-1000 employees)</option>
                    <option value="enterprise">Enterprise (1000+ employees)</option>
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

                <div className="form-group">
                  <label htmlFor="companyDocuments">Company Verification Documents</label>
                  <div className="file-upload">
                    <div className="file-upload-content">
                      <button type="button" className="file-upload-btn">
                        <span>Upload documents</span>
                        <input
                          id="companyDocuments"
                          name="companyDocuments"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          onChange={handleFileChange}
                        />
                      </button>
                      <div className="file-name">{documentsName || "No file selected"}</div>
                    </div>
                    <p className="file-info">Upload tax documents or other proof (PDF, DOC, JPG up to 10MB)</p>
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
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

          <div className="demo-section">
            <button 
              type="button" 
              className="demo-toggle-button"
              onClick={() => setShowCredentials(!showCredentials)}
            >
              Need demo credentials?
            </button>
            {showCredentials && (
              <div className="credentials-popup">
                <h4>Demo Accounts</h4>
                <div className="demo-options">
                  <button className="demo-option" onClick={() => handleDemoLogin('student')}>
                    <i className="fas fa-user-graduate"></i> Normal Student
                  </button>
                  <button className="demo-option" onClick={() => handleDemoLogin('proStudent')}>
                    <i className="fas fa-user-tie"></i> Pro Student
                  </button>
                  <button className="demo-option" onClick={() => handleDemoLogin('faculty')}>
                    <i className="fas fa-chalkboard-teacher"></i> Faculty Member
                  </button>
                  <button className="demo-option" onClick={() => handleDemoLogin('scad')}>
                    <i className="fas fa-university"></i> SCAD Office
                  </button>
                  <button className="demo-option" onClick={() => handleDemoLogin('company')}>
                    <i className="fas fa-building"></i> Company
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="social-signin">
            <div className="separator">
              <span>Or continue with</span>
            </div>

            <div className="social-buttons">
              <button 
                type="button" 
                className="social-button google"
                onClick={() => handleSocialLogin('google')}
              >
                <i className="fab fa-google"></i> Google
              </button>
              <button 
                type="button" 
                className="social-button linkedin"
                onClick={() => handleSocialLogin('linkedin')}
              >
                <i className="fab fa-linkedin"></i> LinkedIn
              </button>
              <button 
                type="button" 
                className="social-button github"
                onClick={() => handleSocialLogin('github')}
              >
                <i className="fab fa-github"></i> GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;