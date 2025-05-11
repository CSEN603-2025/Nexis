import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faChartLine, faTasks, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import {  faMicrophone, faDesktop, faPhoneSlash,faCrown, } from '@fortawesome/free-solid-svg-icons';
import {
  faQuestionCircle,
  faCalendarPlus,
  faCheck,
  faTimes,
  faSave,
  faPlay,
  faShareAlt,
  faCalendarAlt,
  faClock,
  faUserTie,
  faInfoCircle,
  faFileAlt,
  faCertificate,
  faDownload,faSun, faMoon
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('guidance');

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <header className="header">
        <a href="#" className="logo">
          <span className="logo-icon">↑</span>
          Elevate <span className="pro-badge"><FontAwesomeIcon icon={faCrown} />&nbsp; PRO</span>
        </a>
        <div className="header-controls">
          <button id="themeToggle" className="theme-toggle" onClick={toggleTheme}>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="theme-icon" />
          </button>
          <img
            src="https://ui-avatars.com/api/?name=Menna+Elsayed&background=83C5BE&color=fff"
            alt="User"
            className="user-avatar"
          />
        </div>
      </header>

      <div className="container">
        <aside className="sidebar">
          <div className="profile-card">
            <img
              src="https://ui-avatars.com/api/?name=Menna+Elsayed&background=006D77&color=fff&size=100"
              alt="Profile"
              className="avatar"
            />
            <h3>
              Menna Elsayed <span className="pro-badge"><FontAwesomeIcon icon={faCrown} />&nbsp;  PRO</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>Media Engineering & Technology</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ display: 'inline-block', background: 'rgba(var(--primary), 0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' }}>
                PRO Member
              </span>
              <span style={{ display: 'inline-block', background: 'rgba(40 Johansson, 69, 0.1)', color: '#28A745', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' }}>
                182 Internship Days
              </span>
            </div>
          </div>

          <div className="quick-links">
            <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>PRO Quick Links</h4>
            <a href="#" className="link-item" onClick={() => handleTabClick('guidance')}>
              <i className="fas fa-video link-icon"></i>
              <FontAwesomeIcon icon={faVideo} className="link-icon" />
              <span>Career Guidance</span>
            </a>
            <a href="#" className="link-item" onClick={() => handleTabClick('analytics')}>
              <i className="fas fa-chart-line link-icon"></i>
              <FontAwesomeIcon icon={faChartLine} className="link-icon" />
              <span>Profile Analytics</span>
            </a>
            <a href="#" className="link-item" onClick={() => handleTabClick('assessments')}>
              <i className="fas fa-tasks link-icon"></i>
              <FontAwesomeIcon icon={faTasks} className="link-icon" />
              <span>Assessments</span>
            </a>
            <a href="#" className="link-item" onClick={() => handleTabClick('workshops')}>
              <i className="fas fa-chalkboard-teacher link-icon"></i>
              <FontAwesomeIcon icon={faChalkboardTeacher} className="link-icon" />
              <span>Workshops</span>
            </a>
          </div>
        </aside>

        <main className="main-content">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <i className="fas fa-crown"></i>
                <FontAwesomeIcon icon={faCrown} />&nbsp;
                PRO Dashboard
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="action-button" style={{ padding: '0.5rem 1rem' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  <i className="fas fa-question-circle"></i> PRO Help
                </button>
              </div>
            </div>

            <div className="tab-container">
              <div
                className={`tab ${activeTab === 'guidance' ? 'active' : ''}`}
                onClick={() => handleTabClick('guidance')}
              >
                Career Guidance
              </div>
              <div
                className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => handleTabClick('analytics')}
              >
                Profile Analytics
              </div>
              <div
                className={`tab ${activeTab === 'assessments' ? 'active' : ''}`}
                onClick={() => handleTabClick('assessments')}
              >
                Assessments
              </div>
              <div
                className={`tab ${activeTab === 'workshops' ? 'active' : ''}`}
                onClick={() => handleTabClick('workshops')}
              >
                Workshops
              </div>
            </div>

            <div className={`tab-content ${activeTab === 'guidance' ? 'active' : ''}`} id="guidance">
              <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Schedule Career Guidance Session</h3>
              <br></br>
              <div className="video-call-container" style={{ marginBottom: '1.5rem' }}>
                <div className="video-main">
                  <div style={{ textAlign: 'center' }}>
                    <i className="fas fa-video" style={{ fontSize: '3rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}></i>
                    <FontAwesomeIcon icon={faVideo}  />
                    <p>Your video session will appear here</p>
                  </div>
                  <div className="video-controls">
                    <button className="video-control-btn">
                      <FontAwesomeIcon icon={faVideo} />
                      <i className="fas fa-video"></i>
                    </button>
                    <button className="video-control-btn">
                      <FontAwesomeIcon icon={faMicrophone} />
                      <i className="fas fa-microphone"></i>
                    </button>
                    <button className="video-control-btn">
                      <FontAwesomeIcon icon={faDesktop} />
                      <i className="fas fa-desktop"></i>
                    </button>
                    <button className="video-control-btn end-call">
                      <FontAwesomeIcon icon={faPhoneSlash} />
                      <i className="fas fa-phone-slash"></i>
                    </button>
                  </div>
                </div>
                <div className="video-sidebar">
                  <h4 style={{ marginTop: 0 }}>SCAD Office Availability</h4>
                  <div className="participant-list">
                    <div className="participant-item">
                      <img
                        src="https://ui-avatars.com/api/?name=SCAD+Advisor&background=4A4E69&color=fff"
                        className="participant-avatar"
                        alt="SCAD Advisor"
                      />
                      <span>Career Advisor</span>
                      <span className="online-status"></span>
                    </div>
                    <div className="participant-item">
                      <img
                        src="https://ui-avatars.com/api/?name=Industry+Mentor&background=4A4E69&color=fff"
                        className="participant-avatar"
                        alt="Industry Mentor"
                      />
                      <span>Industry Mentor</span>
                      <span className="offline-status"></span>
                    </div>
                  </div>
                  <button className="action-button" style={{ width: '100%', marginTop: '1.5rem' }}>
                    <i className="fas fa-calendar-plus"></i> <FontAwesomeIcon icon={faCalendarPlus} /> &nbsp; Schedule Appointment
                  </button>
                  <div style={{ marginTop: '1.5rem', background: 'rgba(var(--primary), 0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <h5 style={{ margin: '0 0 0.5rem', color: 'var(--primary)' }}>Upcoming Appointment</h5>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                      <strong>Career Guidance Session</strong><br />May 15, 2025 at 2:00 PM
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                      <button className="action-button" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', flex: 1 }}>
                        <i className="fas fa-check"></i><FontAwesomeIcon icon={faCheck} />&nbsp; Confirm
                      </button>
                      <button className="action-button secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', flex: 1 }}>
                        <i className="fas fa-times"></i><FontAwesomeIcon icon={faTimes} /> Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="card">
                  <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>Recent Sessions</h4>
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(var(--text), 0.1)' }}>
                      <span>Apr 28, 2025</span>
                      <span style={{ color: 'var(--primary)' }}>Resume Review</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(var(--text), 0.1)' }}>
                      <span>Apr 14, 2025</span>
                      <span style={{ color: 'var(--primary)' }}>Career Path</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                      <span>Mar 30, 2025</span>
                      <span style={{ color: 'var(--primary)' }}>Internship Feedback</span>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>Session Notes</h4>
                  <textarea
                    style={{ width: '100%', height: '150px', marginTop: '1rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(var(--text), 0.2)', backgroundColor: 'var(--card)', color: 'var(--text)' }}
                    placeholder="Take notes during your session..."
                  ></textarea>
                  <button className="action-button" style={{ width: '100%', marginTop: '0.75rem' }}>
                    <i className="fas fa-save"></i> <FontAwesomeIcon icon={faSave} />&nbsp; Save Notes
                  </button>
                </div>
              </div>
            </div>

            <div className={`tab-content ${activeTab === 'analytics' ? 'active' : ''}`} id="analytics">
              <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Your Profile Analytics</h3>
              <br></br>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="card">
                  <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>Profile Views</h4>
                  <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                    [Profile Views Chart]
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>24</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>This Month</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>142</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Views</div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>Top Companies</h4>
                  <div style={{ marginTop: '1rem' }}>
                    <div className="company-view">
                      <img
                        src="https://logo.clearbit.com/siemens.com"
                        className="company-logo"
                        alt="Siemens"
                        onError={(e) => (e.target.src = 'https://ui-avatars.com/api/?name=Siemens&background=006D77&color=fff')}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Siemens</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Viewed 5 times</div>
                      </div>
                    </div>
                    <div className="company-view">
                      <img
                        src="https://logo.clearbit.com/google.com"
                        className="company-logo"
                        alt="Google"
                        onError={(e) => (e.target.src = 'https://ui-avatars.com/api/?name=Google&background=006D77&color=fff')}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Google</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Viewed 3 times</div>
                      </div>
                    </div>
                    <div className="company-view">
                      <img
                        src="https://logo.clearbit.com/microsoft.com"
                        className="company-logo"
                        alt="Microsoft"
                        onError={(e) => (e.target.src = 'https://ui-avatars.com/api/?name=Microsoft&background=006D77&color=fff')}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Microsoft</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Viewed 2 times</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>Profile Completeness</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem' }}>
                  <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(var(--text), 0.1)"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="3"
                        strokeDasharray="85, 100"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                      85%
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Basic Information</span>
                        <span style={{ color: 'var(--primary)' }}>Complete</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(var(--text), 0.1)', marginTop: '0.25rem' }}>
                        <div style={{ height: '100%', width: '100%', background: 'var(--primary)' }}></div>
                      </div>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Skills</span>
                        <span style={{ color: 'var(--primary)' }}>90%</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(var(--text), 0.1)', marginTop: '0.25rem' }}>
                        <div style={{ height: '100%', width: '90%', background: 'var(--primary)' }}></div>
                      </div>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Projects</span>
                        <span style={{ color: 'var(--primary)' }}>75%</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(var(--text), 0.1)', marginTop: '0.25rem' }}>
                        <div style={{ height: '100%', width: '75%', background: 'var(--primary)' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Assessments</span>
                        <span style={{ color: 'var(--primary)' }}>60%</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(var(--text), 0.1)', marginTop: '0.25rem' }}>
                        <div style={{ height: '100%', width: '60%', background: 'var(--primary)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`tab-content ${activeTab === 'assessments' ? 'active' : ''}`} id="assessments">
              <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Online Assessments</h3>
              <br></br>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="card">
                  <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>Available Assessments</h4>
                  <div style={{ marginTop: '1rem' }}>
                    <div className="assessment-card">
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Technical Skills Evaluation</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>60 min • Programming, Problem Solving</div>
                      </div>
                      <button className="action-button" style={{ padding: '0.5rem 1rem' }}>
                        <i className="fas fa-play"></i> <FontAwesomeIcon icon={faPlay} />&nbsp; Start
                      </button>
                    </div>
                    <div className="assessment-card">
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Soft Skills Assessment</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>45 min • Communication, Teamwork</div>
                      </div>
                      <button className="action-button" style={{ padding: '0.5rem 1rem' }}>
                        <i className="fas fa-play"></i><FontAwesomeIcon icon={faPlay} />&nbsp; Start
                      </button>
                    </div>
                    <div className="assessment-card">
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Industry Knowledge Test</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>30 min • Media Engineering</div>
                      </div>
                      <button className="action-button" style={{ padding: '0.5rem 1rem' }}>
                        <i className="fas fa-play"></i><FontAwesomeIcon icon={faPlay} />&nbsp; Start
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>Completed Assessments</h4>
                  <div style={{ marginTop: '1rem' }}>
                    <div className="assessment-card">
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Technical Skills Evaluation</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Completed: Apr 28, 2025</div>
                      </div>
                      <div className="assessment-score">92%</div>
                    </div>
                    <div className="assessment-card">
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Soft Skills Assessment</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Completed: Apr 15, 2025</div>
                      </div>
                      <div className="assessment-score">88%</div>
                    </div>
                    <div className="assessment-card">
                      <div>
                        <div style={{ fontWeight: 'bold' }}>Industry Knowledge Test</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Completed: Mar 30, 2025</div>
                      </div>
                      <div className="assessment-score">95%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>Assessment Statistics</h4>
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                  [Assessment Performance Chart]
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                  <button className="action-button">
                    <i className="fas fa-share-alt"></i><FontAwesomeIcon icon={faShareAlt} />&nbsp; Share Scores on Profile
                  </button>
                </div>
              </div>
            </div>

            <div className={`tab-content ${activeTab === 'workshops' ? 'active' : ''}`} id="workshops">
              <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Career Workshops</h3>
              <br></br>
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="workshop-card">
                  <div className="workshop-thumbnail">
                    <i className="fas fa-chalkboard-teacher"></i>
                    <FontAwesomeIcon icon={faChalkboardTeacher} />
                  </div>
                  <div className="workshop-details">
                    <div>
                      <h4 style={{ margin: 0 }}>Tech Industry Career Paths</h4>
                      <p style={{ margin: '0.5rem 0', color: 'var(--text-secondary)' }}>
                        Explore various career opportunities in the technology sector and learn how to position yourself for success.
                      </p>
                      <div className="workshop-meta">
                        <span><i className="fas fa-calendar-alt"></i><FontAwesomeIcon icon={faCalendarAlt} />&nbsp; May 10, 2025</span>
                        <span><i className="fas fa-clock"></i><FontAwesomeIcon icon={faClock} />&nbsp; 3:00 PM - 5:00 PM</span>
                        <span><i className="fas fa-user-tie"></i><FontAwesomeIcon icon={faUserTie} />&nbsp; Dr. Ahmed Samir</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <button className="action-button">
                        <i className="fas fa-calendar-plus"></i><FontAwesomeIcon icon={faCalendarPlus} />&nbsp; Register
                      </button>
                      <button className="action-button secondary">
                        <i className="fas fa-info-circle"></i><FontAwesomeIcon icon={faInfoCircle} />&nbsp; Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="workshop-card">
                  <div className="workshop-thumbnail">
                    <i className="fas fa-file-alt"><FontAwesomeIcon icon={faFileAlt} />&nbsp;</i>
                  </div>
                  <div className="workshop-details">
                    <div>
                      <h4 style={{ margin: 0 }}>Resume & LinkedIn Optimization</h4>
                      <p style={{ margin: '0.5rem 0', color: 'var(--text-secondary)' }}>
                        Learn how to craft a standout resume and optimize your LinkedIn profile to attract recruiters.
                      </p>
                      <div className="workshop-meta">
                        <span><i className="fas fa-calendar-alt"></i><FontAwesomeIcon icon={faCalendarAlt} />&nbsp; May 17, 2025</span>
                        <span><i className="fas fa-clock"></i><FontAwesomeIcon icon={faClock} />&nbsp; 10:00 AM - 12:00 PM</span>
                        <span><i className="fas fa-user-tie"></i><FontAwesomeIcon icon={faUserTie} />&nbsp; HR Specialist</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <button className="action-button">
                        <i className="fas fa-calendar-plus"></i><FontAwesomeIcon icon={faCalendarPlus} />&nbsp; Register
                      </button>
                      <button className="action-button secondary">
                        <i className="fas fa-info-circle"></i><FontAwesomeIcon icon={faInfoCircle} />&nbsp; Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <h4 style={{ marginTop: 0, color: 'var(--primary)' }}>Your Workshop Certificates</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                  <div className="certificate-card">
                    <i className="fas fa-certificate" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i><FontAwesomeIcon icon={faCertificate} />
                    <div style={{ fontWeight: 'bold' }}>Interview Skills</div>
                    <div style={{ fontSize: '0.8rem' }}>Completed: Apr 5, 2025</div>
                    <button className="action-button" style={{ width: '100%', marginTop: '1rem', background: 'white', color: 'var(--primary)' }}>
                      <i className="fas fa-download"></i><FontAwesomeIcon icon={faDownload} />&nbsp; Download
                    </button>
                  </div>
                  <div className="certificate-card">
                    <i className="fas fa-certificate" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i><FontAwesomeIcon icon={faCertificate} />
                    <div style={{ fontWeight: 'bold' }}>Networking Strategies</div>
                    <div style={{ fontSize: '0.8rem' }}>Completed: Mar 15, 2025</div>
                    <button className="action-button" style={{ width: '100%', marginTop: '1rem', background: 'white', color: 'var(--primary)' }}>
                      <i className="fas fa-download"></i><FontAwesomeIcon icon={faDownload} />&nbsp; Download
                    </button>
                  </div>
                  <div className="certificate-card">
                    <i className="fas fa-certificate" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i><FontAwesomeIcon icon={faCertificate} />
                    <div style={{ fontWeight: 'bold' }}>Personal Branding</div>
                    <div style={{ fontSize: '0.8rem' }}>Completed: Feb 28, 2025</div>
                    <button className="action-button" style={{ width: '100%', marginTop: '1rem', background: 'white', color: 'var(--primary)' }}>
                      <i className="fas fa-download"></i><FontAwesomeIcon icon={faDownload} />&nbsp; Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;