import React, { useState } from 'react';
import './Analytics.css';

const Analytics = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');
  
  // Dummy data for companies that viewed profile
  const companiesViewed = [
    { name: 'TechGlobal', date: '2025-05-10', industry: 'Technology' },
    { name: 'DesignHub', date: '2025-05-08', industry: 'Design' },
    { name: 'GlobalFinance', date: '2025-05-05', industry: 'Finance' },
    { name: 'CreativeMedia', date: '2025-05-01', industry: 'Media' },
  ];

  return (
    <div className={`analytics-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <header className={`header ${darkMode ? 'dark-header' : ''}`}>
        <div className="logo-search">
          <a href="#" className="logo">
            <i className="fas fa-arrow-up logo-icon"></i>
            <span className="logo-text">Elevate</span>
          </a>
          <div className="search-container">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search internships..."
                className={`search-input ${darkMode ? 'dark-search' : ''}`}
              />
              <i className="fas fa-search search-icon"></i>
            </div>
          </div>
        </div>
        <div className="user-controls">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <div className="user-avatar">ME</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${darkMode ? 'dark-sidebar' : ''}`}>
          <div className="profile-section">
            <div className="avatar-container">ME</div>
            <h2 className="user-name">Menna Elsayed</h2>
            <p className="user-title">Media Engineering & Technology</p>
            <div className="user-status">
              <span className="status-indicator"></span>
              Active
            </div>
            <div className="user-badge">
              <i className="fas fa-crown crown-icon"></i>
              <span className="badge-text">PRO Student</span>
            </div>
          </div>
          <div className="quick-links">
            <h3 className="section-title">Quick Links</h3>
            <ul className="nav-links">
              <li>
                <a href="/dashboard" className="nav-link">
                  <i className="fas fa-home nav-icon"></i>
                  <span>Internship Dashboard</span>
                </a>
              </li>
              <li>
                <button
                  className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
                >
                  <i className="fas fa-chart-line nav-icon"></i>
                  <span>Profile Analytics</span>
                </button>
              </li>
              <li>
                <a href="/assessments" className="nav-link">
                  <i className="fas fa-tasks nav-icon"></i>
                  <span>Online Assessments</span>
                </a>
              </li>
              <li>
                <a href="/workshops" className="nav-link">
                  <i className="fas fa-chalkboard-teacher nav-icon"></i>
                  <span>Online Workshops</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="resources">
            <h3 className="section-title">Resources</h3>
            <ul className="nav-links">
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-file-alt nav-icon"></i>
                  <span>Report Submissions</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-clipboard-list nav-icon"></i>
                  <span>Evaluation Forms</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-building nav-icon"></i>
                  <span>Company Portal</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-book nav-icon"></i>
                  <span>Resources Library</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-calendar-alt nav-icon"></i>
                  <span>Schedule</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Content Area - Analytics Content */}
        <main className="content-area">
          <div className="analytics-header">
            <h1 className="page-title">Profile Analytics</h1>
            <p className="page-description">Track who's viewed your profile and monitor your visibility</p>
          </div>
          
          <div className="card profile-viewers">
            <h2 className="card-title">Companies That Viewed Your Profile</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companiesViewed.map((company, index) => (
                    <tr key={index}>
                      <td>{company.name}</td>
                      <td>{company.industry}</td>
                      <td>{company.date}</td>
                      <td className="action-buttons">
                        <button className="action-button">
                          <i className="fas fa-external-link-alt"></i>
                        </button>
                        <button className="action-button">
                          <i className="fas fa-info-circle"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="chart-grid">
            <div className="card">
              <h2 className="card-title">Profile View Trends</h2>
              <div className="chart-placeholder">
                <p>Chart showing profile view trends would appear here</p>
              </div>
            </div>
            <div className="card">
              <h2 className="card-title">Industry Breakdown</h2>
              <div className="chart-placeholder">
                <p>Chart showing industry breakdown would appear here</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;