import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { 
    FaMoon, 
    FaSun, 
    FaBriefcase, 
    FaFileUpload, 
    FaTasks, 
    FaBuilding, 
    FaBook, 
    FaCalendarAlt, 
    FaEnvelope, 
    FaCog, 
    FaUserGraduate, 
    FaEdit, 
    FaExternalLinkAlt, 
    FaCircle, 
    FaFileDownload, 
    FaComments, 
    FaList, 
    FaCheck, 
    FaComment, 
    FaCalendar, 
    FaFileAlt, 
    FaStar, 
    FaAward,
    FaTimes 
  } from 'react-icons/fa';
import './NormalStudent.css';

const NormalStudent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Menna Ashraf Khaled Helmy Elsayed",
    studentId: "W2201027",
    email: "menna.elsayed@student.guc.edu.eg",
    studyProgram: "Media Engineering & Technology",
    currentSemester: "Spring 2025",
    academicAdvisor: "Dr. Mohamed El-Shafel",
    enrollmentDate: "September 2022",
    expectedGraduation: "June 2026"
  });
  const [editFormData, setEditFormData] = useState({ ...formData });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const handleEditClick = () => {
    setEditFormData({ ...formData });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    setFormData({ ...editFormData });
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    const progressFill = document.querySelector('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (progressFill) {
            progressFill.style.width = '75%';
            observer.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.1 });
    
    if (progressFill) {
      observer.observe(progressFill);
    }

    return () => {
      if (progressFill) {
        observer.unobserve(progressFill);
      }
    };
  }, []);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <a href=" " className="logo">
          <span className="logo-icon">↑</span>
          Elevate
        </a>
        
        <div className="header-controls">
          <button id="themeToggle" className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <img src="https://ui-avatars.com/api/?name=Menna+Elsayed&background=83C5BE&color=fff" alt="User" className="user-avatar" />
        </div>
      </header>
      
      <div className="container">
        <aside className="sidebar">
          <div className="profile-card">
            <img src="https://ui-avatars.com/api/?name=Menna+Elsayed&background=006D77&color=fff&size=100" alt="Profile" className="avatar" />
            <h3>Menna Elsayed</h3>
            <p style={{color: 'var(--text-secondary)'}}>Media Engineering & Technology</p>
            <div style={{marginTop: '1rem'}}>
              <span style={{display: 'inline-block', background: 'rgba(var(--primary), 0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem'}}>Active</span>
            </div>
          </div>
          
          <div className="quick-links">
            <h4 style={{marginTop: 0, color: 'var(--primary)'}}>Quick Links</h4>
            <div className="quick-links-list">
              <a href="/Search" className="link-item">
                <FaBriefcase className="link-icon" />
                <span>Internship Dashboard</span>
              </a>
              <a href="#" className="link-item">
                <FaFileUpload className="link-icon" />
                <span>Report Submissions</span>
              </a>
              <a href="#" className="link-item">
                <FaTasks className="link-icon" />
                <span>Evaluation Forms</span>
              </a>
              <a href="#" className="link-item">
                <FaBuilding className="link-icon" />
                <span>Company Portal</span>
              </a>
              <a href="#" className="link-item">
                <FaBook className="link-icon" />
                <span>Resources Library</span>
              </a>
              <a href="#" className="link-item">
                <FaCalendarAlt className="link-icon" />
                <span>Schedule</span>
              </a>
              <a href="#" className="link-item">
                <FaEnvelope className="link-icon" />
                <span>Messages</span>
              </a>
              <a href="#" className="link-item">
                <FaCog className="link-icon" />
                <span>Settings</span>
              </a>
            </div>
          </div>
        </aside>
        
        <main className="main-content">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FaUserGraduate style={{marginRight: '0.75rem', color: 'var(--accent)'}} />
                Personal Information
              </h2>
              <button className="action-button" onClick={handleEditClick}>
                <FaEdit style={{marginRight: '0.5rem'}} />
                Edit Profile
              </button>
            </div>
            
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Full Name</div>
                <div className="info-value">{formData.fullName}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Student ID</div>
                <div className="info-value">{formData.studentId}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Email</div>
                <div className="info-value">{formData.email}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Study Program</div>
                <div className="info-value">{formData.studyProgram}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Current Semester</div>
                <div className="info-value">{formData.currentSemester}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Academic Advisor</div>
                <div className="info-value">{formData.academicAdvisor}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Enrollment Date</div>
                <div className="info-value">{formData.enrollmentDate}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Expected Graduation</div>
                <div className="info-value">{formData.expectedGraduation}</div>
              </div>
            </div>
          </div>

          {/* Edit Profile Modal */}
          {showEditModal && (
            <div className="modal-overlay">
              <div className={`edit-modal ${darkMode ? 'dark-mode' : ''}`}>
                <div className="modal-header">
                  <h2 className="modal-title">
                    <FaEdit style={{marginRight: '0.75rem', color: 'var(--accent)'}} />
                    Edit Profile
                  </h2>
                  <button className="modal-close" onClick={handleCancelEdit}>
                    <FaTimes />
                  </button>
                </div>
                
                <div className="modal-content">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleEditChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="studyProgram">Study Program</label>
                    <input
                      type="text"
                      id="studyProgram"
                      name="studyProgram"
                      value={editFormData.studyProgram}
                      onChange={handleEditChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="currentSemester">Current Semester</label>
                    <input
                      type="text"
                      id="currentSemester"
                      name="currentSemester"
                      value={editFormData.currentSemester}
                      onChange={handleEditChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="academicAdvisor">Academic Advisor</label>
                    <input
                      type="text"
                      id="academicAdvisor"
                      name="academicAdvisor"
                      value={editFormData.academicAdvisor}
                      onChange={handleEditChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="expectedGraduation">Expected Graduation</label>
                    <input
                      type="text"
                      id="expectedGraduation"
                      name="expectedGraduation"
                      value={editFormData.expectedGraduation}
                      onChange={handleEditChange}
                    />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button className="modal-button cancel" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                  <button className="modal-button save" onClick={handleSaveChanges}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="metrics-grid">
            <div className="metric-card">
              <FaCalendarAlt style={{color: 'var(--accent)', fontSize: '1.5rem'}} />
              <div className="metric-value">142</div>
              <div className="metric-label">Internship Days</div>
            </div>
            
            <div className="metric-card">
              <FaFileAlt style={{color: 'var(--accent)', fontSize: '1.5rem'}} />
              <div className="metric-value">8</div>
              <div className="metric-label">Reports Submitted</div>
            </div>
            
            <div className="metric-card">
              <FaStar style={{color: 'var(--accent)', fontSize: '1.5rem'}} />
              <div className="metric-value">4.8</div>
              <div className="metric-label">Average Rating</div>
            </div>
            
            <div className="metric-card">
              <FaAward style={{color: 'var(--accent)', fontSize: '1.5rem'}} />
              <div className="metric-value">3</div>
              <div className="metric-label">Achievements</div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FaBriefcase style={{marginRight: '0.75rem', color: 'var(--accent)'}} />
                Current Internship
              </h2>
              <button className="action-button">
                <FaExternalLinkAlt style={{marginRight: '0.5rem'}} />
                View Details
              </button>
            </div>
            
            <div className="internship-card">
              <div className="internship-header">
                <h3 className="internship-title">Software Engineering Intern</h3>
                <span className="status-badge status-active">
                  <FaCircle style={{fontSize: '0.5rem', marginRight: '0.5rem'}} />
                  Active
                </span>
              </div>
              
              <p style={{margin: '0.5rem 0', color: 'var(--text-secondary)'}}>
                <FaBuilding style={{marginRight: '0.5rem'}} />
                Siemens Digital Industries Software
              </p>
              
              <p style={{margin: '0.5rem 0', color: 'var(--text-secondary)'}}>
                <FaCalendarAlt style={{marginRight: '0.5rem'}} />
                Cairo, Egypt (Remote)
              </p>
              
              <p style={{margin: '0.5rem 0', color: 'var(--text-secondary)'}}>
                <FaCalendarAlt style={{marginRight: '0.5rem'}} />
                June 1, 2025 - August 31, 2025
              </p>
              
              <div className="progress-container">
                <div className="progress-header">
                  <span>Internship Progress</span>
                  <span>75%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem'}}>
              <button className="action-button" style={{background: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)'}}>
                <FaFileDownload style={{marginRight: '0.5rem'}} />
                Download Report
              </button>
              
              <button className="action-button">
                <FaEdit style={{marginRight: '0.5rem'}} />
                Submit Weekly Report
              </button>
              
              <button className="action-button">
                <FaComments style={{marginRight: '0.5rem'}} />
                Contact Mentor
              </button>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FaCalendarAlt style={{marginRight: '0.75rem', color: 'var(--accent)'}} />
                Recent Activities
              </h2>
              <button className="action-button">
                <FaList style={{marginRight: '0.5rem'}} />
                View All
              </button>
            </div>
            
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot">
                  <FaCheck />
                </div>
                <div>
                  <div className="timeline-date">Today, 10:45 AM</div>
                  <div className="timeline-content">
                    <strong>Submitted weekly report #5</strong>
                    <p style={{margin: '0.5rem 0 0', color: 'var(--text-secondary)'}}>Your report has been successfully submitted and is pending review</p>
                  </div>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot">
                  <FaComment />
                </div>
                <div>
                  <div className="timeline-date">Yesterday, 3:22 PM</div>
                  <div className="timeline-content">
                    <strong>New feedback from mentor</strong>
                    <p style={{margin: '0.5rem 0 0', color: 'var(--text-secondary)'}}>"Great progress on the API implementation. Let's discuss optimization in our next meeting."</p>
                  </div>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot">
                  <FaCalendar />
                </div>
                <div>
                  <div className="timeline-date">April 28, 2025</div>
                  <div className="timeline-content">
                    <strong>Mentor meeting scheduled</strong>
                    <p style={{margin: '0.5rem 0 0', color: 'var(--text-secondary)'}}>Weekly check-in meeting set for May 2 at 2:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot">
                  <FaFileAlt />
                </div>
                <div>
                  <div className="timeline-date">April 25, 2025</div>
                  <div className="timeline-content">
                    <strong>Midterm evaluation received</strong>
                    <p style={{margin: '0.5rem 0 0', color: 'var(--text-secondary)'}}>Your midterm evaluation score: 92/100</p>
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

export default NormalStudent;