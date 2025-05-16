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
    FaTimes,
    FaPlus,
    FaTrash,
    FaHeart,
    FaGraduationCap,
    FaUsers,
    FaCrown
} from 'react-icons/fa';
import './student2.css';

const Student2 = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    fullName: "Menna Ashraf Khaled Helmy Elsayed",
    studentId: "W2201027",
    email: "menna.elsayed@student.guc.edu.eg",
    studyProgram: "Media Engineering & Technology",
    currentSemester: "Spring 2025",
    academicAdvisor: "Dr. Mohamed El-Shafel",
    enrollmentDate: "September 2022",
    expectedGraduation: "June 2026",
    jobInterests: [
      "Full-stack Development",
      "Mobile Application Development",
      "UX/UI Design"
    ],
    previousExperience: [
      {
        id: 1,
        title: "Junior Web Developer",
        company: "TechSolutions Cairo",
        duration: "June 2024 - September 2024",
        responsibilities: "Developed responsive web applications, collaborated on front-end improvements, and participated in code reviews",
        type: "Internship"
      }
    ],
    collegeActivities: [
      {
        id: 1,
        name: "Media Engineering Student Association",
        role: "Technology Lead",
        duration: "2023 - Present",
        description: "Organized technical workshops and coordinated technology-focused student events"
      }
    ]
  });
  const [editFormData, setEditFormData] = useState({ ...formData });
  const [newInterest, setNewInterest] = useState("");
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    duration: "",
    responsibilities: "",
    type: "Internship"
  });
  const [newActivity, setNewActivity] = useState({
    name: "",
    role: "",
    duration: "",
    description: ""
  });

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
    setActiveTab('personal');
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Job Interests functions
  const handleAddInterest = () => {
    if (newInterest.trim() !== "") {
      setEditFormData(prev => ({
        ...prev,
        jobInterests: [...prev.jobInterests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (index) => {
    setEditFormData(prev => ({
      ...prev,
      jobInterests: prev.jobInterests.filter((_, i) => i !== index)
    }));
  };

  // Previous Experience functions
  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExperience = () => {
  if (newExperience.title && newExperience.company && newExperience.duration) {
    const newId = editFormData.previousExperience.length > 0 
      ? Math.max(...editFormData.previousExperience.map(exp => exp.id)) + 1 
      : 1;
    
    const updatedExperience = {
      ...newExperience,
      id: newId
    };

    // Update both editFormData and formData
    setEditFormData(prev => ({
      ...prev,
      previousExperience: [...prev.previousExperience, updatedExperience]
    }));
    
    setFormData(prev => ({
      ...prev,
      previousExperience: [...prev.previousExperience, updatedExperience]
    }));
    
    // Reset the form
    setNewExperience({
      title: "",
      company: "",
      duration: "",
      responsibilities: "",
      type: "Internship"
    });
  }
};
  const handleRemoveExperience = (id) => {
    setEditFormData(prev => ({
      ...prev,
      previousExperience: prev.previousExperience.filter(exp => exp.id !== id)
    }));
  };

  // College Activities functions
  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setNewActivity(prev => ({ ...prev, [name]: value }));
  };

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.role && newActivity.duration) {
      const newId = editFormData.collegeActivities.length > 0 
        ? Math.max(...editFormData.collegeActivities.map(act => act.id)) + 1 
        : 1;
      
      setEditFormData(prev => ({
        ...prev,
        collegeActivities: [...prev.collegeActivities, {
          ...newActivity,
          id: newId
        }]
      }));
      
      setNewActivity({
        name: "",
        role: "",
        duration: "",
        description: ""
      });
    }
  };

  const handleRemoveActivity = (id) => {
    setEditFormData(prev => ({
      ...prev,
      collegeActivities: prev.collegeActivities.filter(act => act.id !== id)
    }));
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
   <div className={`student2 ${darkMode ? 'dark-mode' : ''}`}>
       <header className="header">
         <div className="left-section">
           <a href="/student2" className="logo2">
             <span className="logo2-icon">↑</span>
             Elevate
           </a>
           <Link to="/Analytics" className="user1-badge">
          <FaCrown className="crown1-icon" />
          <span className="badge1-text">PRO features</span>
        </Link>
         </div>

      <div className="header-controls">
        
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
                <span>Internship Listing</span>
              </a>
              <a href="/Rpro" className="link-item">
                <FaFileUpload className="link-icon" />
                <span>Report Submissions</span>
              </a>
              <a href="/Epro" className="link-item">
                <FaTasks className="link-icon" />
                <span>Evaluation Forms</span>
              </a>
            
              <a href="/Libpro" className="link-item">
                <FaBook className="link-icon" />
                <span>Resources Library</span>
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

          {/* Professional Profile Card */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FaBriefcase style={{marginRight: '0.75rem', color: 'var(--accent)'}} />
                Professional Profile
              </h2>
              <button className="action-button" onClick={() => {
                setEditFormData({ ...formData });
                setActiveTab('interests');
                setShowEditModal(true);
              }}>
                <FaEdit style={{marginRight: '0.5rem'}} />
                Edit Professional Info
              </button>
            </div>
            
            {/* Job Interests Section */}
            <div className="professional-section">
              <h3 className="section-title">
                <FaHeart style={{marginRight: '0.5rem', color: 'var(--accent)'}} />
                Job Interests
              </h3>
              
              <div className="interests-container">
                {formData.jobInterests.map((interest, index) => (
                  <div key={index} className="interest-tag">
                    {interest}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Previous Experience Section */}
<div className="professional-section">
  <h3 className="section-title">
    <FaBriefcase style={{marginRight: '0.5rem', color: 'var(--accent)'}} />
    Previous Experience
  </h3>
  
  {formData.previousExperience.length > 0 ? (
    <div className="experience-container">
      {formData.previousExperience.map((exp) => (
        <div key={exp.id} className="experience-card">
          <div className="experience-header">
            <h4 className="experience-title">{exp.title}</h4>
            <span className="experience-badge">{exp.type}</span>
          </div>
          <p className="experience-company">
            <FaBuilding style={{marginRight: '0.5rem'}} />
            {exp.company}
          </p>
          <p className="experience-duration">
            <FaCalendarAlt style={{marginRight: '0.5rem'}} />
            {exp.duration}
          </p>
          {exp.responsibilities && (
            <div className="experience-responsibilities">
              <p className="responsibilities-label">Responsibilities:</p>
              <p className="responsibilities-text">{exp.responsibilities}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    <p className="empty-state">No previous experience added yet.</p>
  )}
</div>

            
            {/* College Activities Section */}
            <div className="professional-section">
              <h3 className="section-title">
                <FaUsers style={{marginRight: '0.5rem', color: 'var(--accent)'}} />
                College Activities
              </h3>
              
              {formData.collegeActivities.length > 0 ? (
                <div className="activities-container">
                  {formData.collegeActivities.map((activity) => (
                    <div key={activity.id} className="activity-card">
                      <h4 className="activity-name">{activity.name}</h4>
                      <p className="activity-role">
                        <FaGraduationCap style={{marginRight: '0.5rem'}} />
                        {activity.role}
                      </p>
                      <p className="activity-duration">
                        <FaCalendarAlt style={{marginRight: '0.5rem'}} />
                        {activity.duration}
                      </p>
                      {activity.description && (
                        <p className="activity-description">{activity.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No college activities added yet.</p>
              )}
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
                
                <div className="modal-tabs">
                  <button 
                    className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
                    onClick={() => handleTabChange('personal')}
                  >
                    <FaUserGraduate style={{marginRight: '0.5rem'}} />
                    Personal
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'interests' ? 'active' : ''}`}
                    onClick={() => handleTabChange('interests')}
                  >
                    <FaHeart style={{marginRight: '0.5rem'}} />
                    Job Interests
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
                    onClick={() => handleTabChange('experience')}
                  >
                    <FaBriefcase style={{marginRight: '0.5rem'}} />
                    Experience
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
                    onClick={() => handleTabChange('activities')}
                  >
                    <FaUsers style={{marginRight: '0.5rem'}} />
                    Activities
                  </button>
                </div>
                
                <div className="modal-content">
                  {/* Personal Information Tab */}
                  {activeTab === 'personal' && (
                    <>
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
                    </>
                  )}
                  
                  {/* Job Interests Tab */}
                  {activeTab === 'interests' && (
                    <>
                      <div className="form-group">
                        <label>Current Job Interests</label>
                        <div className="edit-interests-container">
                          {editFormData.jobInterests.map((interest, index) => (
                            <div key={index} className="edit-interest-tag">
                              {interest}
                              <button 
                                type="button" 
                                className="remove-interest"
                                onClick={() => handleRemoveInterest(index)}
                              >
                                <FaTimes />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="newInterest">Add New Interest</label>
                        <div className="add-interest-group">
                          <input
                            type="text"
                            id="newInterest"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            placeholder="e.g. Data Science"
                          />
                          <button 
                            type="button" 
                            className="add-button"
                            onClick={handleAddInterest}
                          >
                            <FaPlus style={{marginRight: '0.5rem'}} />
                            Add
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Previous Experience Tab */}
                  {activeTab === 'experience' && (
                    <>
                      {/* Current Experience List */}
                      <div className="form-group">
                        <label>Current Experience</label>
                        {editFormData.previousExperience.length > 0 ? (
                          <div className="edit-experience-list">
                            {editFormData.previousExperience.map((exp) => (
                              <div key={exp.id} className="edit-experience-item">
                                <div className="edit-experience-info">
                                  <h4>{exp.title}</h4>
                                  <p>{exp.company} | {exp.duration} | {exp.type}</p>
                                </div>
                                <button 
                                  type="button" 
                                  className="remove-button"
                                  onClick={() => handleRemoveExperience(exp.id)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="empty-state">No experience added yet.</p>
                        )}
                      </div>
                      
                      {/* Add New Experience Form */}
                      <div className="add-experience-form">
                        <h4>Add New Experience</h4>
                        
                        <div className="form-group">
                          <label htmlFor="title">Job Title</label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={newExperience.title}
                            onChange={handleExperienceChange}
                            placeholder="e.g. Software Developer Intern"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="company">Company</label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={newExperience.company}
                            onChange={handleExperienceChange}
                            placeholder="e.g. Tech Solutions Inc."
                          />
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="duration">Duration</label>
                            <input
                              type="text"
                              id="duration"
                              name="duration"
                              value={newExperience.duration}
                              onChange={handleExperienceChange}
                              placeholder="e.g. June 2024 - August 2024"
                            />
                          </div>
                          
                          <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <select
                              id="type"
                              name="type"
                              value={newExperience.type}
                              onChange={handleExperienceChange}
                            >
                              <option value="Internship">Internship</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Full-time">Full-time</option>
                              <option value="Freelance">Freelance</option>
                              <option value="Volunteer">Volunteer</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="responsibilities">Responsibilities</label>
                          <textarea
                            id="responsibilities"
                            name="responsibilities"
                            value={newExperience.responsibilities}
                            onChange={handleExperienceChange}
                            placeholder="Describe your key responsibilities and achievements..."
                            rows="4"
                          ></textarea>
                        </div>
                        
                        <button 
                          type="button" 
                          className="add-button full-width"
                          onClick={handleAddExperience}
                        >
                          <FaPlus style={{marginRight: '0.5rem'}} />
                          Add Experience
                        </button>
                      </div>
                    </>
                  )}
                  
                  {/* College Activities Tab */}
                  {activeTab === 'activities' && (
                    <>
                      {/* Current Activities List */}
                      <div className="form-group">
                        <label>Current Activities</label>
                        {editFormData.collegeActivities.length > 0 ? (
                          <div className="edit-activities-list">
                            {editFormData.collegeActivities.map((activity) => (
                              <div key={activity.id} className="edit-activity-item">
                                <div className="edit-activity-info">
                                  <h4>{activity.name}</h4>
                                  <p>{activity.role} | {activity.duration}</p>
                                </div>
                                <button 
                                  type="button" 
                                  className="remove-button"
                                  onClick={() => handleRemoveActivity(activity.id)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="empty-state">No activities added yet.</p>
                        )}
                      </div>
                      
                      {/* Add New Activity Form */}
                      <div className="add-activity-form">
                        <h4>Add New Activity</h4>
                        
                        <div className="form-group">
                          <label htmlFor="name">Activity Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={newActivity.name}
                            onChange={handleActivityChange}
                            placeholder="e.g. Student Council"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="role">Your Role</label>
                          <input
                            type="text"
                            id="role"
                            name="role"
                            value={newActivity.role}
                            onChange={handleActivityChange}
                            placeholder="e.g. Vice President"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="activityDuration">Duration</label>
                          <input
                            type="text"
                            id="activityDuration"
                            name="duration"
                            value={newActivity.duration}
                            onChange={handleActivityChange}
                            placeholder="e.g. 2023 - Present"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea
                            id="description"
                            name="description"
                            value={newActivity.description}
                            onChange={handleActivityChange}
                            placeholder="Describe your responsibilities and achievements..."
                            rows="4"
                          ></textarea>
                        </div>
                        
                        <button 
                          type="button" 
                          className="add-button full-width"
                          onClick={handleAddActivity}
                        >
                          <FaPlus style={{marginRight: '0.5rem'}} />
                          Add Activity
                        </button>
                      </div>
                    </>
                  )}
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

export default Student2;