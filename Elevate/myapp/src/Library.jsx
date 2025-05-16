import { Link } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { usePDF } from 'react-to-pdf';
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
    FaExternalLinkAlt, 
    FaFileDownload,
    FaFilePdf,
    FaVideo,
    FaSearch,
    FaFilter
} from 'react-icons/fa';
import './Library.css';

const Library = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMajor, setSelectedMajor] = useState('all');
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

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

  // Sample resource data
  const resources = [
    {
      id: 1,
      title: "Internship Guidelines for Media Engineering",
      type: "pdf",
      category: "guidelines",
      major: "media",
      description: "Complete guide to internship requirements, expectations, and evaluation criteria for Media Engineering students.",
      url: "/pdfs/media_engineering_guidelines.pdf",
      thumbnail: "/guidelines.jpg"
    },
    {
      id: 2,
      title: "What Counts as an Internship? (Video)",
      type: "video",
      category: "orientation",
      major: "all",
      description: "Learn what kinds of internships count towards your requirement based on your major.",
      url: "https://www.youtube.com/embed/example1",
      thumbnail: "/internship.png"
    },
    {
      id: 3,
      title: "Computer Science Internship Handbook",
      type: "pdf",
      category: "guidelines",
      major: "cs",
      description: "Detailed handbook for Computer Science students preparing for internships.",
      url: "/pdfs/cs_internship_handbook.pdf",
      thumbnail: "/handbook.jpg"
    },
    {
      id: 4,
      title: "How to Write a Great Internship Report",
      type: "video",
      category: "tutorial",
      major: "all",
      description: "Step-by-step guide to writing effective internship reports that meet faculty requirements.",
      url: "https://www.youtube.com/embed/example2",
      thumbnail: "/Report.jpg"
    },
    {
      id: 5,
      title: "Engineering Internship Evaluation Form",
      type: "pdf",
      category: "forms",
      major: "engineering",
      description: "Downloadable evaluation form for Engineering internships.",
      url: "/pdfs/engineering_evaluation_form.pdf",
      thumbnail: "/eval.jpg"
    },
    {
      id: 6,
      title: "Internship Success Stories",
      type: "video",
      category: "orientation",
      major: "all",
      description: "Hear from past students about their internship experiences and tips for success.",
      url: "https://www.youtube.com/embed/example3",
      thumbnail: "/success.jpg"
    },
    {
      id: 7,
      title: "Business Administration Internship Requirements",
      type: "pdf",
      category: "guidelines",
      major: "business",
      description: "Specific requirements and expectations for Business Administration internships.",
      url: "/pdfs/business_internship_requirements.pdf",
      thumbnail: "/bus.jpg"
    },
    {
      id: 8,
      title: "Preparing for Your First Day (Video)",
      type: "video",
      category: "tutorial",
      major: "all",
      description: "Essential tips to prepare for your first day at your internship.",
      url: "https://www.youtube.com/embed/example4",
      thumbnail: "/first.jpg"
    }
  ];

  // Filter resources based on search and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesMajor = selectedMajor === 'all' || resource.major === selectedMajor;
    
    return matchesSearch && matchesCategory && matchesMajor;
  });

  // Generate PDF file function
  const generatePdf = (title) => {
    const content = `
      <h1>${title}</h1>
      <p>This is a generated PDF file for ${title}.</p>
      <p>In a real application, this would be the actual content from the server.</p>
    `;
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='lib'>
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
          <aside className={`sidebar ${darkMode ? 'dark-sidebar' : ''}`}>
         <div className="profile-section">
            <div className="profile-avatar">
              ME
            </div>
            <h2 className="profile-name">Menna Elsayed</h2>
            <p className="profile-title">Media Engineering & Technology</p>
            <div className="profile-status">
              <span className="status-indicator"></span>
              Active
            </div>
            <div className="profile-badge">
              <i className="fas fa-crown crown-icon"></i>
              <span className="badge-text">PRO Student</span>
            </div>
          </div>
          
           <div className="sidebar-section">
            <h3 className="section-title">Quick Links</h3>
            <ul className="sidebar-menu">
              <li>
                <a href="/new" className="menu-item">
                  <i className="fas fa-home menu-icon"></i>
                  <span>Internship Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/analytics" className="menu-item">
                  <i className="fas fa-chart-line menu-icon"></i>
                  <span>Profile Analytics</span>
                </a>
              </li>
              <li>
                <a href="/assessment" className="menu-item">
                  <i className="fas fa-tasks menu-icon"></i>
                  <span>Online Assessments</span>
                </a>
              </li>
              <li>
                <a href="/workshop" className="menu-item">
                  <i className="fas fa-chalkboard-teacher menu-icon"></i>
                  <span>Online Workshops</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Resources</h3>
            <ul className="sidebar-menu">
              <li>
                <a href="/ReportStudent" className="menu-item">
                  <i className="fas fa-file-alt menu-icon"></i>
                  <span>Report Submissions</span>
                </a>
              </li>
              <li>
                <a href="/eval" className="menu-item">
                  <i className="fas fa-clipboard-list menu-icon"></i>
                  <span>Evaluation Forms</span>
                </a>
              </li>
              <li>
                <a href="/lib" className="menu-item active">
                  <i className="fas fa-book menu-icon"></i>
                  <span>Resources Library</span>
                </a>
              </li>
 
            </ul>
          </div>
        </aside>
        <main className="main-content">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FaBook style={{marginRight: '0.75rem', color: 'var(--accent)'}} />
                Internship Resources Library
              </h2>
            </div>
            
            <div className="library-intro">
              <p>Welcome to the Internship Resources Library. Here you'll find all the materials you need to prepare for, 
                complete, and get the most out of your internship experience. Explore guidelines, watch instructional videos, 
                and download necessary forms.</p>
              
              <div className="video-highlight">
                <h3>
                  <FaVideo style={{marginRight: '0.5rem', color: 'var(--accent)'}} />
                  What Counts as an Internship?
                </h3>
                <p>Watch this short video to understand what kinds of internships count towards your internship requirement based on your major.</p>
                
                <div className="video-container">
                  <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FaBook style={{marginRight: '0.75rem', color: 'var(--accent)'}} />
                Browse Resources
              </h2>
            </div>
            
            <div className="resource-filters">
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-group">
                <label htmlFor="category-filter">
                  <FaFilter style={{marginRight: '0.5rem'}} />
                  Category:
                </label>
                <select 
                  id="category-filter" 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="guidelines">Guidelines</option>
                  <option value="orientation">Orientation</option>
                  <option value="tutorial">Tutorials</option>
                  <option value="forms">Forms</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label htmlFor="major-filter">
                  <FaFilter style={{marginRight: '0.5rem'}} />
                  Major:
                </label>
                <select 
                  id="major-filter" 
                  value={selectedMajor}
                  onChange={(e) => setSelectedMajor(e.target.value)}
                >
                  <option value="all">All Majors</option>
                  <option value="media">Media Engineering</option>
                  <option value="cs">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>
            
            <div className="resources-grid">
              {filteredResources.length > 0 ? (
                filteredResources.map(resource => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-thumbnail">
                      {resource.type === 'pdf' ? (
                        <FaFilePdf className="pdf-icon" />
                      ) : (
                        <FaVideo className="video-icon" />
                      )}
                      <img src={resource.thumbnail} alt={resource.title} />
                    </div>
                    
                    <div className="resource-content">
                      <h3>{resource.title}</h3>
                      <div className="resource-meta">
                        <span className={`resource-type ${resource.type}`}>
                          {resource.type.toUpperCase()}
                        </span>
                        <span className="resource-category">
                          {resource.category}
                        </span>
                        {resource.major !== 'all' && (
                          <span className="resource-major">
                            {resource.major}
                          </span>
                        )}
                      </div>
                      
                      <p className="resource-description">{resource.description}</p>
                      
                      <div className="resource-actions">
                        {resource.type === 'pdf' ? (
                          <button 
                            className="download-button"
                            onClick={() => generatePdf(resource.title)}
                          >
                            <FaFileDownload style={{marginRight: '0.5rem'}} />
                            Download PDF
                          </button>
                        ) : (
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="view-button"
                          >
                            <FaExternalLinkAlt style={{marginRight: '0.5rem'}} />
                            Watch Video
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No resources found matching your criteria. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <FaBook style={{marginRight: '0.75rem', color: 'var(--accent)'}} />
                Essential Downloads
              </h2>
            </div>
            
            <div className="downloads-list">
              <div className="download-item">
                <div className="download-icon">
                  <FaFilePdf />
                </div>
                <div className="download-info">
                  <h3>Internship Agreement Form</h3>
                  <p>Required form to be signed by student, company, and academic advisor</p>
                </div>
                <button 
                  className="download-button"
                  onClick={() => generatePdf('Internship_Agreement_Form')}
                >
                  <FaFileDownload style={{marginRight: '0.5rem'}} />
                  Download
                </button>
              </div>
              
              <div className="download-item">
                <div className="download-icon">
                  <FaFilePdf />
                </div>
                <div className="download-info">
                  <h3>Weekly Report Template</h3>
                  <p>Standard template for submitting weekly internship reports</p>
                </div>
                <button 
                  className="download-button"
                  onClick={() => generatePdf('Weekly_Report_Template')}
                >
                  <FaFileDownload style={{marginRight: '0.5rem'}} />
                  Download
                </button>
              </div>
              
              <div className="download-item">
                <div className="download-icon">
                  <FaFilePdf />
                </div>
                <div className="download-info">
                  <h3>Final Report Guidelines</h3>
                  <p>Detailed instructions for preparing your final internship report</p>
                </div>
                <button 
                  className="download-button"
                  onClick={() => generatePdf('Final_Report_Guidelines')}
                >
                  <FaFileDownload style={{marginRight: '0.5rem'}} />
                  Download
                </button>
              </div>
              
              <div className="download-item">
                <div className="download-icon">
                  <FaFilePdf />
                </div>
                <div className="download-info">
                  <h3>Company Evaluation Form</h3>
                  <p>Form for companies to evaluate student performance during internship</p>
                </div>
                <button 
                  className="download-button"
                  onClick={() => generatePdf('Company_Evaluation_Form')}
                >
                  <FaFileDownload style={{marginRight: '0.5rem'}} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};

export default Library;