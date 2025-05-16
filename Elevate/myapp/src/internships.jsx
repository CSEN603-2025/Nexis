import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Internships.css";
import "./Internshipcycles.css"; // New CSS file for the cycle dates component

function Internships() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Internships");
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [showCycleSettings, setShowCycleSettings] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const initialInternships = [
    {
      id: 1,
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      industry: "Technology",
      jobtitle: "software engineering intern",
      status: "paid",
      expectedSalary: "$5000",
      skillsrequired: "JavaScript, React, Node.js",
      jobdescription: "Develop and maintain web applications using modern technologies.",
      website: "www.google.com",
      duration: "1 month",
    },
    {
      id: 2,
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      industry: "E-commerce",
      jobtitle: "data analyst intern",
      status: "unpaid",
      skillsrequired: "Python, SQL, Data Analysis",
      jobdescription: "Analyze large datasets to derive insights and support decision-making.",
      website: "www.amazon.com",
      duration: "2 months",
    },
    {
      id: 3,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      industry: "Technology",
      jobtitle: "UX design intern",
      status: "paid",
      expectedSalary: "$4000",
      skillsrequired: "Figma, User Research, Prototyping",
      jobdescription: "Design user-friendly interfaces and conduct user testing.",
      website: "www.microsoft.com",
      duration: "3 months",
    },
    {
      id: 4,
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      industry: "Entertainment",
      jobtitle: "content marketing intern",
      status: "unpaid",
      skillsrequired: "SEO, Content Creation, Social Media",
      jobdescription: "Create and promote content to enhance brand visibility.",
      website: "www.netflix.com",
      duration: "1 month",
    },
  ];

  const navItems = [
    { icon: "fa-home", label: "Dashboard", path: "/dashboard" },
    { icon: "fa-briefcase", label: "Internships", path: "/internships" },
    { icon: "fa-file-alt", label: "Reports", path: "/reports" },
    { icon: "fa-clipboard-list", label: "Evaluations", path: "/evaluations" },
    { icon: "fa-building", label: "Students", path: "/students" },
    { icon: "fa-book", label: "Resources", path: "/resources" },
    { icon: "fa-cog", label: "Settings", path: "/settings" },
  ];

  const industries = ["All", ...new Set(initialInternships.map(i => i.industry))];
  const statuses = ["All", ...new Set(initialInternships.map(i => i.status))];
  const durations = ["All", ...new Set(initialInternships.map(i => i.duration))];

  const [companies, setCompanies] = useState(initialInternships);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompanyData, setSelectedCompanyData] = useState(null);

  useEffect(() => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    if (currentItem) setActiveItem(currentItem.label);
  }, [location.pathname]);

  useEffect(() => {
    const selectedCompany = companies.find(i => i.id === selectedCompanyId);
    setSelectedCompanyData(selectedCompany || null);
  }, [selectedCompanyId, companies]);

  const handleNavigation = (item) => {
    setActiveItem(item.label);
    navigate(item.path);
  };

  const handleRowClick = (companyId) => {
    setSelectedCompanyId(companyId === selectedCompanyId ? null : companyId);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleIndustryFilter = (e) => setIndustryFilter(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);
  const handleDurationFilter = (e) => setDurationFilter(e.target.value);

  useEffect(() => {
    let filtered = initialInternships.filter(internship => {
      const matchesSearch =
        internship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.jobtitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesIndustry =
        industryFilter === "All" || internship.industry === industryFilter;

      const matchesStatus =
        statusFilter === "All" || internship.status === statusFilter;

      const matchesDuration =
        durationFilter === "All" || internship.duration === durationFilter;

      return matchesSearch && matchesIndustry && matchesStatus && matchesDuration;
    });

    setCompanies(filtered);
  }, [searchTerm, industryFilter, statusFilter, durationFilter]);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleCycleSettings = () => setShowCycleSettings(!showCycleSettings);

  return (
    <div className="scad-container">
   

      <div className="main-container">
       

        <main className="content">
         
          <div className="companies-container">
            
            {/* Internship Cycle Settings Button */}
            <div className="cycle-settings-button-container">
              <button className="btn btn-secondary cycle-settings-button" onClick={toggleCycleSettings}>
                <i className="fas fa-calendar-alt"></i>
                <span>{showCycleSettings ? "Hide Cycle Settings" : "Manage Internship Cycle"}</span>
              </button>
               <button 
      className="back-to-dashboard"
      onClick={() => window.location.href = '/scaddashboard'}
    >
      Back to Dashboard
    </button>
            </div>
            
            {/* Internship Cycle Settings Panel */}
            {showCycleSettings && <InternshipCycleDates />}

            <div className="card companies-card">
              <div className="card-header">
                <h2 className="card-title">Internships List</h2>
                <div className="filter-controls">
                  <div className="search-box">
                    <i className="fas fa-search search-icon"></i>
                    <input
                      type="text"
                      placeholder="Search internships..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="search-input"
                    />
                  </div>

                  <select value={statusFilter} onChange={handleStatusFilter} className="industry-filter">
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>

                  <select value={industryFilter} onChange={handleIndustryFilter} className="industry-filter">
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>

                  <select value={durationFilter} onChange={handleDurationFilter} className="industry-filter">
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="card-body">
                <table className="companies-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Job Title</th>
                      <th>Duration</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(company => (
                      <tr
                        key={company.id}
                        onClick={() => handleRowClick(company.id)}
                        className={selectedCompanyId === company.id ? "selected-row" : ""}
                      >
                        <td className="company-cell">
                          <img src={company.logo} alt={`${company.name} logo`} className="company-logo" />
                          <div className="company-info">
                            <div className="company-name">{company.name}</div>
                          </div>
                        </td>
                        <td>{company.jobtitle}</td>
                        <td>{company.duration}</td>
                        <td className="actions-cell">
                          <button className="action-btn"><i className="fas fa-edit"></i></button>
                          <button className="action-btn"><i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedCompanyData && (
              <div className="company-details-panel">
                <div className="panel-header">
                  <h3>Internship Details</h3>
                  <button onClick={() => setSelectedCompanyId(null)} className="close-btn">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="panel-body">
                  <div className="company-profile">
                    <img src={selectedCompanyData.logo} alt={`${selectedCompanyData.name} logo`} className="profile-logo" />
                    <h4>{selectedCompanyData.name}</h4>
                    <p className="description">{selectedCompanyData.duration}</p>
                    <div className="detail-row">
                      <div className="detail-item">
                        <span className="label">Status:</span>
                        <span className="value">{selectedCompanyData.status}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Job Description:</span>
                        <span className="value">{selectedCompanyData.jobdescription}</span>
                      </div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-item">
                        <span className="label">Expected Salary:</span>
                        <span className="value">{selectedCompanyData.expectedSalary}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Skills Required:</span>
                        <span className="value">{selectedCompanyData.skillsrequired}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-footer">
                  <button className="btn btn-secondary">
                    <i className="fas fa-envelope"></i>
                    <span>Contact</span>
                  </button>
                  <button className="btn btn-primary">
                    <i className="fas fa-handshake"></i>
                    <span>View Partnership</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// New component for the Internship Cycle Dates
const InternshipCycleDates = () => {
  // State for form data
  const [formData, setFormData] = useState({
    startDate: '2025-06-01',
    endDate: '2025-12-31',
  });
  
  // State for previous cycles
  const [previousCycles, setPreviousCycles] = useState([
    { id: 1, startDate: '2024-12-01', endDate: '2025-05-31', updatedBy: 'Jane Smith', updatedAt: '2024-11-15' },
    { id: 2, startDate: '2024-06-01', endDate: '2024-11-30', updatedBy: 'John Doe', updatedAt: '2024-05-20' },
  ]);
  
  // State for validation errors
  const [errors, setErrors] = useState({});
  
  // State for confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // State for success message
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];
    
    // Validate start date is not in the past
    if (formData.startDate < today) {
      newErrors.startDate = 'Start date cannot be in the past';
    }
    
    // Validate end date is after start date
    if (formData.endDate <= formData.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  // Confirm and save changes
  const confirmChanges = () => {
    // Mock successful save
    setShowConfirmation(false);
    setSuccessMessage('Internship cycle dates updated successfully! Notifications have been sent to stakeholders.');
    
    // Add the current cycle to previous cycles
    const currentCycle = {
      id: previousCycles.length + 1,
      startDate: formData.startDate,
      endDate: formData.endDate,
      updatedBy: 'Current User',
      updatedAt: new Date().toISOString().split('T')[0],
    };
    
    setPreviousCycles([currentCycle, ...previousCycles]);
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  // Cancel confirmation
  const cancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="card cycle-settings-card">
      <div className="card-header">
        <h2 className="card-title">Internship Cycle Management</h2>
      </div>
      
      <div className="card-body">
        {successMessage && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            {successMessage}
          </div>
        )}
        
        <div className="cycle-settings-section">
          <h3>Set Current Internship Cycle Dates</h3>
          
          <div className="cycle-form">
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={errors.startDate ? 'error' : ''}
              />
              {errors.startDate && <span className="error-message">{errors.startDate}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={errors.endDate ? 'error' : ''}
              />
              {errors.endDate && <span className="error-message">{errors.endDate}</span>}
            </div>
            
            <button className="btn btn-primary" onClick={handleSubmit}>
              <i className="fas fa-calendar-check"></i>
              <span>Update Cycle Dates</span>
            </button>
          </div>
        </div>
        
        <div className="previous-cycles-section">
          <h3>Previous Internship Cycles</h3>
          <table className="cycles-table">
            <thead>
              <tr>
                <th>Cycle ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Updated By</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {previousCycles.map((cycle) => (
                <tr key={cycle.id}>
                  <td>{cycle.id}</td>
                  <td>{cycle.startDate}</td>
                  <td>{cycle.endDate}</td>
                  <td>{cycle.updatedBy}</td>
                  <td>{cycle.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-header">
              <h3>Confirm Cycle Date Update</h3>
              <button onClick={cancelConfirmation} className="close-modal-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to update the internship cycle dates to:</p>
              <div className="confirmation-details">
                <div className="detail-item">
                  <span className="label">Start Date:</span>
                  <span className="value">{formData.startDate}</span>
                </div>
                <div className="detail-item">
                  <span className="label">End Date:</span>
                  <span className="value">{formData.endDate}</span>
                </div>
              </div>
              <p className="warning-text">
                <i className="fas fa-exclamation-triangle"></i>
                This action will update the cycle dates across all system functions and notify stakeholders.
              </p>
            </div>
            <div className="modal-footer">
              <button onClick={cancelConfirmation} className="btn btn-secondary">
                <i className="fas fa-times"></i>
                <span>Cancel</span>
              </button>
              <button onClick={confirmChanges} className="btn btn-primary">
                <i className="fas fa-check"></i>
                <span>Confirm Update</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internships;
export { InternshipCycleDates };