import React, { useState } from 'react';
import './InternshipDashboard.css';

const InternshipDashboard = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
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

  const AppointmentModal = () => (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Request Appointment</h3>
          <button onClick={() => setShowAppointmentModal(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="form-group">
          <label>Purpose</label>
          <select>
            <option>Career Guidance</option>
            <option>Report Clarification</option>
            <option>Internship Advice</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Preferred Date</label>
          <input type="date" />
        </div>
        
        <div className="form-group">
          <label>Preferred Time</label>
          <input type="time" />
        </div>
        
        <div className="form-group">
          <label>Additional Notes</label>
          <textarea rows={4}></textarea>
        </div>
        
        <div className="modal-actions">
          <button 
            className="secondary-button"
            onClick={() => setShowAppointmentModal(false)}
          >
            Cancel
          </button>
          <button 
            className="primary-button"
            onClick={() => {
              setShowAppointmentModal(false);
              setShowNotification(true);
              setTimeout(() => setShowNotification(false), 3000);
            }}
          >
            Request Appointment
          </button>
        </div>
      </div>
    </div>
  );

  const Notification = () => (
    <div className="notification">
      <div className="notification-content">
        <i className="fas fa-check-circle"></i>
        <p>Appointment request sent successfully!</p>
      </div>
    </div>
  );

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-left">
          <a href="#" className="logo">
            <i className="fas fa-arrow-up"></i>
            <span>Elevate</span>
          </a>
          
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search internships..." />
          </div>
        </div>
        
        <div className="header-right">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          
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
              <i className="fas fa-crown"></i>
              <span>PRO Student</span>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Quick Links</h3>
            <ul className="sidebar-menu">
              <li className="active">
                <i className="fas fa-home"></i>
                <span>Internship Dashboard</span>
              </li>
              <li>
                <a href="/analytics">
                  <i className="fas fa-chart-line"></i>
                  <span>Profile Analytics</span>
                </a>
              </li>
              <li>
                <a href="/assessments">
                  <i className="fas fa-tasks"></i>
                  <span>Online Assessments</span>
                </a>
              </li>
              <li>
                <a href="/workshops">
                  <i className="fas fa-chalkboard-teacher"></i>
                  <span>Online Workshops</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3>Resources</h3>
            <ul className="sidebar-menu">
              {resources.map(resource => (
                <li key={resource.id}>
                  <i className={`fas ${resource.icon}`}></i>
                  <span>{resource.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        
        <main className="dashboard-content">
          {/* Dashboard content only */}
          <div className="dashboard-header">
            <div className="dashboard-title">
              <h1>PRO Student Dashboard</h1>
              <div className="pro-badge">
                <i className="fas fa-crown"></i>
                <span>PRO</span>
              </div>
            </div>
            <button
              onClick={() => setShowAppointmentModal(true)}
              className="primary-button"
            >
              <i className="fas fa-video"></i>
              Request Appointment
            </button>
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
              <button className="text-button">
                View All <i className="fas fa-arrow-right"></i>
              </button>
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
                <button className="text-button">
                  View All <i className="fas fa-arrow-right"></i>
                </button>
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
                            <button className="workshop-button primary-button">
                              <i className="fas fa-video"></i> Join
                            </button>
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
                <button className="text-button">
                  View All <i className="fas fa-arrow-right"></i>
                </button>
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
                  <button className="text-button">
                    Take Assessment
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      {showAppointmentModal && <AppointmentModal />}
      {showNotification && <Notification />}
    </div>
  );
};

export default InternshipDashboard;