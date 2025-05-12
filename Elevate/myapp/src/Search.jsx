import React, { useEffect, useState } from 'react';
import './Search.css';
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
const Search = () => {
    const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All Industries');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const industries = [
    'All Industries',
    'Technology',
    'Media',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing',
    'Engineering'
  ];

  const internships = [
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'TechGlobal',
      industry: 'Technology',
      location: 'San Francisco, CA',
      duration: '3 months',
      status: 'Current',
      description: 'Join our engineering team to develop cutting-edge web applications using React, Node.js, and AWS. You will work closely with senior developers to implement new features, fix bugs, and improve application performance.',
      requirements: 'Proficiency in JavaScript, experience with React, knowledge of Git, currently pursuing a degree in Computer Science or related field.',
      deadline: 'May 30, 2025'
    },
    {
      id: 2,
      title: 'UX/UI Design Intern',
      company: 'DesignHub',
      industry: 'Media',
      location: 'New York, NY',
      duration: '6 months',
      status: 'Current',
      description: 'Work with our creative team to design intuitive user interfaces for web and mobile applications. You will participate in user research, create wireframes, and develop high-fidelity prototypes.',
      requirements: 'Proficiency in Figma or Adobe XD, understanding of UI/UX principles, portfolio of design work, pursuing a degree in Design or related field.',
      deadline: 'June 15, 2025'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'AnalyticsPro',
      industry: 'Technology',
      location: 'Boston, MA',
      duration: '4 months',
      status: 'Current',
      description: 'Assist our data science team in analyzing large datasets, developing predictive models, and creating data visualizations. You will work with Python, SQL, and various data analysis tools.',
      requirements: 'Experience with Python, knowledge of data analysis libraries (Pandas, NumPy), basic understanding of machine learning concepts, pursuing a degree in Statistics, Computer Science, or related field.',
      deadline: 'May 25, 2025'
    },
    {
      id: 4,
      title: 'Marketing Intern',
      company: 'BrandMasters',
      industry: 'Marketing',
      location: 'Chicago, IL',
      duration: '3 months',
      status: 'Former',
      description: 'Support our marketing team in developing and implementing digital marketing campaigns. You will assist with social media management, content creation, and marketing analytics.',
      requirements: 'Knowledge of social media platforms, basic understanding of SEO, excellent writing skills, pursuing a degree in Marketing, Communications, or related field.',
      deadline: 'June 5, 2025'
    },
    {
      id: 5,
      title: 'Finance Intern',
      company: 'GlobalFinance',
      industry: 'Finance',
      location: 'Miami, FL',
      duration: '6 months',
      status: 'Current',
      description: 'Work with our finance team on financial analysis, reporting, and forecasting. You will assist with budget preparation, financial modeling, and investment analysis.',
      requirements: 'Strong analytical skills, proficiency in Excel, knowledge of financial concepts, pursuing a degree in Finance, Accounting, or related field.',
      deadline: 'May 20, 2025'
    },
    {
      id: 6,
      title: 'Media Production Intern',
      company: 'CreativeMedia',
      industry: 'Media',
      location: 'Los Angeles, CA',
      duration: '4 months',
      status: 'Current',
      description: 'Assist our production team in creating video content for various platforms. You will help with pre-production planning, filming, and post-production editing.',
      requirements: 'Experience with video editing software, understanding of video production principles, creative mindset, pursuing a degree in Film, Media Production, or related field.',
      deadline: 'June 10, 2025'
    }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'All Industries' || internship.industry === industryFilter;
    const matchesStatus = statusFilter === 'All' || internship.status === statusFilter;
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const handleInternshipClick = (id) => {
    setSelectedInternship(id);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
          <div className="logo-container">
            <a href=" " className="logo">
          <span className="logo-icon">↑</span>
          Elevate
           </a>
          </div>
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search internships..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-icon">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
         <div className="header-controls">
                  <button id="themeToggle" className="theme-toggle" onClick={toggleTheme}>
                    {darkMode ? <FaSun /> : <FaMoon />}
                  </button>
                  <img src="https://ui-avatars.com/api/?name=Menna+Elsayed&background=83C5BE&color=fff" alt="User" className="user-avatar" />
                <span className="user-initials">ME</span>
                </div>
        
      </header>
      <div className="main-container">
        
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
                    <a href="/report-submissions" className="link-item">
                      <FaFileUpload className="link-icon" />
                      <span>Report Submissions</span>
                    </a>
                    <a href="/evaluation-forms" className="link-item">
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
                    <a href="workshops-management" className="link-item">
                      <FaCalendarAlt className="link-icon" />
                      <span>Workshop Management</span>
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
        {/* Main Content */}
        <div className="content">
          <div className="internships-card">
            <div className="internships-header">
              <div className="internships-title">
                <i className="fas fa-search-location title-icon"></i>
                <h2 className="section-title">Available Internships</h2>
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="filter-button"
              >
                <i className="fas fa-filter filter-icon"></i>
                Filter Options
              </button>
            </div>
            {isFilterOpen && (
              <div className="filter-panel">
                <div className="filter-grid">
                  <div className="filter-item">
                    <label className="filter-label">Industry</label>
                    <div className="filter-select-wrapper">
                      <select
                        className="filter-select"
                        value={industryFilter}
                        onChange={(e) => setIndustryFilter(e.target.value)}
                      >
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="filter-item">
                    <label className="filter-label">Status</label>
                    <div className="filter-select-wrapper">
                      <select
                        className="filter-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="All">All</option>
                        <option value="Current">Current Intern</option>
                        <option value="Former">Former Intern</option>
                      </select>
                    </div>
                  </div>
                  <div className="filter-item">
                    <label className="filter-label">Search</label>
                    <div className="filter-input-wrapper">
                      <input
                        type="text"
                        placeholder="Search by title or company"
                        className="filter-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="filter-search-icon">
                        <i className="fas fa-search"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="internships-grid">
              {filteredInternships.length > 0 ? (
                filteredInternships.map((internship) => (
                  <div
                    key={internship.id}
                    className="internship-card"
                    onClick={() => handleInternshipClick(internship.id)}
                  >
                    <div className="internship-content">
                      <div className="internship-header">
                        <div className="internship-title-container">
                          <h3 className="internship-title">{internship.title}</h3>
                          <p className="internship-company">{internship.company}</p>
                        </div>
                        <span className={`internship-status ${internship.status === 'Current' ? 'status-current' : 'status-former'}`}>
                          {internship.status}
                        </span>
                      </div>
                      <div className="internship-tags">
                        <span className="tag tag-industry">
                          {internship.industry}
                        </span>
                        <span className="tag tag-location">
                          <i className="fas fa-map-marker-alt tag-icon"></i> {internship.location}
                        </span>
                        <span className="tag tag-duration">
                          <i className="fas fa-clock tag-icon"></i> {internship.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  <h3 className="no-results-title">No internships found</h3>
                  <p className="no-results-message">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
            {isDetailModalOpen && selectedInternship && (
              <div className="modal-overlay">
                <div className="modal-container">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="modal-title-container">
                        <h2 className="modal-title">
                          {internships.find(i => i.id === selectedInternship)?.title}
                        </h2>
                        <p className="modal-subtitle">
                          {internships.find(i => i.id === selectedInternship)?.company}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          closeDetailModal();
                        }}
                        className="modal-close"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="modal-section">
                        <h3 className="modal-section-title">Description</h3>
                        <p className="modal-text">
                          {internships.find(i => i.id === selectedInternship)?.description}
                        </p>
                      </div>
                      <div className="modal-section">
                        <h3 className="modal-section-title">Requirements</h3>
                        <p className="modal-text">
                          {internships.find(i => i.id === selectedInternship)?.requirements}
                        </p>
                      </div>
                      <div className="modal-info-grid">
                        <div className="modal-info-item">
                          <span className="modal-info-label">Location</span>
                          <p className="modal-info-value">
                            {internships.find(i => i.id === selectedInternship)?.location}
                          </p>
                        </div>
                        <div className="modal-info-item">
                          <span className="modal-info-label">Duration</span>
                          <p className="modal-info-value">
                            {internships.find(i => i.id === selectedInternship)?.duration}
                          </p>
                        </div>
                        <div className="modal-info-item">
                          <span className="modal-info-label">Deadline</span>
                          <p className="modal-info-value">
                            {internships.find(i => i.id === selectedInternship)?.deadline}
                          </p>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="apply-button"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="recommendations-card">
            <div className="recommendations-header">
              <div className="recommendations-title">
                <i className="fas fa-star title-icon"></i>
                <h2 className="section-title">Recommended for You</h2>
              </div>
              <button className="view-all-button">
                View All
              </button>
            </div>
            <div className="recommendations-grid">
              <div className="recommendation-card">
                <div className="recommendation-content">
                  <div className="recommendation-header">
                    <div>
                      <h3 className="recommendation-title">Product Design Intern</h3>
                      <p className="recommendation-company">CreativeWorks</p>
                    </div>
                    <span className="recommendation-badge badge-new">
                      New
                    </span>
                  </div>
                  <div className="recommendation-tags">
                    <span className="tag tag-industry">
                      Design
                    </span>
                    <span className="tag tag-location">
                      <i className="fas fa-map-marker-alt tag-icon"></i> Remote
                    </span>
                    <span className="tag tag-duration">
                      <i className="fas fa-clock tag-icon"></i> 4 months
                    </span>
                  </div>
                  <div className="recommendation-footer">
                    <div className="recommendation-rating">
                      <div className="rating-stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                      <span className="rating-value">4.5</span>
                    </div>
                    <button className="view-details-button">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              <div className="recommendation-card">
                <div className="recommendation-content">
                  <div className="recommendation-header">
                    <div>
                      <h3 className="recommendation-title">Research Assistant</h3>
                      <p className="recommendation-company">EduTech Institute</p>
                    </div>
                    <span className="recommendation-badge badge-featured">
                      Featured
                    </span>
                  </div>
                  <div className="recommendation-tags">
                    <span className="tag tag-industry">
                      Education
                    </span>
                    <span className="tag tag-location">
                      <i className="fas fa-map-marker-alt tag-icon"></i> Boston, MA
                    </span>
                    <span className="tag tag-duration">
                      <i className="fas fa-clock tag-icon"></i> 6 months
                    </span>
                  </div>
                  <div className="recommendation-footer">
                    <div className="recommendation-rating">
                      <div className="rating-stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                      <span className="rating-value">4.0</span>
                    </div>
                    <button className="view-details-button">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Search;