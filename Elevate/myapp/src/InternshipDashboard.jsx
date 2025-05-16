import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InternshipDashboard.css';

const InternshipDashboard = () => {
 
  const [showNotification, setShowNotification] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dummy data (keep only what's needed for the dashboard)
  const companiesViewed = [
    { name: 'TechGlobal', date: '2025-05-10', industry: 'Technology' },
    { name: 'DesignHub', date: '2025-05-08', industry: 'Design' },
    { name: 'GlobalFinance', date: '2025-05-05', industry: 'Finance' },
    { name: 'CreativeMedia', date: '2025-05-01', industry: 'Media' },
  ];

  const assessments = [
    { id: 1, title: 'Web Development Skills', company: 'TechGlobal', duration: '45 mins', questions: 25 },
    { id: 2, title: 'UI/UX Design Principles', company: 'DesignHub', duration: '60 mins', questions: 30 },
  ];

  const workshops = [
    { 
      id: 1, 
      title: 'Building Your Professional Brand', 
      presenter: 'Sarah Johnson, Career Coach', 
      date: '2025-05-15', 
      time: '14:00-16:00',
      description: 'Learn how to craft a compelling personal brand that stands out to employers and recruiters in the tech industry.',
      status: 'upcoming',
      registered: true
    },
    { 
      id: 2, 
      title: 'Technical Interview Preparation', 
      presenter: 'Michael Chen, Senior Developer', 
      date: '2025-05-20', 
      time: '10:00-12:00',
      description: 'Master the art of technical interviews with coding challenges, system design questions, and problem-solving strategies.',
      status: 'upcoming',
      registered: true
    },
  ];

  const resources = [
    { id: 1, title: 'Report Submissions', icon: 'fa-file-alt' },
    { id: 2, title: 'Evaluation Forms', icon: 'fa-clipboard-list' },
    { id: 3, title: 'Company Portal', icon: 'fa-building' },
    { id: 4, title: 'Resources Library', icon: 'fa-book' },
    { id: 5, title: 'Schedule', icon: 'fa-calendar-alt' }
  ];



  const Notification = () => (
    <div className="notification">
      <div className="notification-content">
        <i className="fas fa-check-circle"></i>
        <p>Appointment request sent successfully!</p>
      </div>
    </div>
  );

  return (
    <div className={`pro ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-left">
                 <a href=" " className="logo2">
          <span className="logo2-icon">↑</span>
          Elevate
        </a>
          
         
        </div>
        
        <div className="header-right">
         
          
          <div className="user-avatar">
            ME
          </div>
        </div>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
          <div className="user-profile">
            <div className="avatar">ME</div>
            <h2>Menna Elsayed</h2>
            <p>Media Engineering & Technology</p>
            <div className="status">
              <span className="status-indicator"></span>
              Active
            </div>
            <div className="pro-badge">
              <i className="fas fa-crown crown-icon"></i>
              <span>PRO Student</span>
            </div>
          </div>
          
          <div className="quick-links-list">
            <h3 className="section-title">Quick Links</h3>
            <ul className="sidebar-menu">
              <li>
                <a href="/new" className="link-item">
                  <i className="fas fa-home menu-icon"></i>
                  <span>Internship Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/analytics" className="link-item">
                  <i className="fas fa-chart-line menu-icon"></i>
                  <span>Profile Analytics</span>
                </a>
              </li>
              <li>
                <a href="/assessment" className="link-item">
                  <i className="fas fa-tasks menu-icon"></i>
                  <span>Online Assessments</span>
                </a>
              </li>
              <li>
                <a href="/workshop" className="link-item">
                  <i className="fas fa-chalkboard-teacher menu-icon"></i>
                  <span>Online Workshops</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="quick-links-list">
            <h3 className="section-title">Resources</h3>
            <ul className="sidebar-menu">
              <li>
                <a href="/search" className="link-item">
                  <i className="fas fa-file-alt menu-icon"></i>
                  <span>Internship listing</span>
                </a>
              </li>
              <li>
                <a href="/Rpro" className="link-item">
                  <i className="fas fa-file-alt menu-icon"></i>
                  <span>Report Submissions</span>
                </a>
              </li>
              <li>
                <a href="/Epro" className="link-item">
                  <i className="fas fa-clipboard-list menu-icon"></i>
                  <span>Evaluation Forms</span>
                </a>
              </li>
              <li>
                <a href="/lib" className="link-item">
                  <i className="fas fa-book menu-icon"></i>
                  <span>Resources Library</span>
                </a>
              </li>
 
            </ul>
          </div>
        </aside>
        
        
        <main className="dashboard-content">
          {/* Dashboard content only */}
          <div className="dashboard-header">
            <div className="dashboard-title">
              <h1>PRO Student Dashboard</h1>
              <div className="pro-badge">
                <i className="fas fa-crown crown-icon"></i>
                <span> PRO</span>
              </div>
            </div>
           
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <h3>Internship Status</h3>&nbsp;
                <i className="fas fa-briefcase"></i>
              </div>
              <p className="stat-value">3 months</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3>Profile Views</h3>&nbsp;
                <i className="fas fa-eye"></i>
              </div>
              <p className="stat-value">24</p>
              <p className="stat-description">Last 30 days</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3>Assessments</h3>&nbsp;
                <i className="fas fa-tasks"></i>
              </div>
              <p className="stat-value">2</p>
              <p className="stat-description">Completed</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3>Workshops</h3>
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <p className="stat-value">2</p>
              <p className="stat-description">Registered</p>
            </div>
          </div>
          
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Profile Viewers</h2>
              <Link to="/analytics" className="text-button">
  View All <i className="fas fa-arrow-right"></i>
</Link>
            </div>
            
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {companiesViewed.slice(0, 3).map((company, index) => (
                    <tr key={index}>
                      <td>{company.name}</td>
                      <td>{company.industry}</td>
                      <td>{company.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="dashboard-columns">
            <div className="upcoming-workshops">
              <div className="section-header">
                <h2>Upcoming Workshops</h2>
               <Link to="/workshop" className="text-button">
  View All <i className="fas fa-arrow-right"></i>
</Link>
              </div>
              
              <div className="workshops-grid">
                {workshops.map((workshop) => (
                  <div key={workshop.id} className="workshop-card">
                    <div className="workshop-content">
                      <div className="workshop-info">
                        <h3 className="workshop-title">{workshop.title}</h3>
                        <p className="workshop-presenter">{workshop.presenter}</p>
                        <div className="workshop-meta">
                          <span className="workshop-meta-item">
                            <i className="far fa-calendar"></i> {workshop.date}
                          </span>
                          <span className="workshop-meta-item">
                            <i className="far fa-clock"></i> {workshop.time}
                          </span>
                        </div>
                        {workshop.description && (
                          <p className="workshop-description">{workshop.description}</p>
                        )}
                      </div>
                      
                      <div className="workshop-actions">
                        {workshop.registered ? (
                          <>
                            <span className="badge registered">Registered</span>
                            
                          </>
                        ) : (
                          <button className="workshop-button secondary-button">
                            Register
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="dashboard-column">
              <div className="section-header">
                <h2>Available Assessments</h2>
<Link to="/assessment" className="text-button">
  View All <i className="fas fa-arrow-right"></i>
</Link>
              </div>
              
              {assessments.map((assessment) => (
                <div key={assessment.id} className="assessment-card">
                  <div className="assessment-info">
                    <h3>{assessment.title}</h3>
                    <p>By {assessment.company}</p>
                    <div className="assessment-details">
                      <span><i className="far fa-clock"></i> {assessment.duration}</span>
                      <span><i className="fas fa-question-circle"></i> {assessment.questions} questions</span>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      
     
      {showNotification && <Notification />}
    </div>
  );
};

export default InternshipDashboard;