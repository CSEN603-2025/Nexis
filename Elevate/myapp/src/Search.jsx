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
    FaTimes,
    FaLinkedin,
    FaMoneyBillWave
  } from 'react-icons/fa';

const Search = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [industryFilter, setIndustryFilter] = useState('All Industries');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [applicationDocuments, setApplicationDocuments] = useState({
        cv: null,
        coverLetter: null,
        certificates: [],
        otherDocuments: []
    });
    const [useLinkedInProfile, setUseLinkedInProfile] = useState(false);
    const [appliedInternships, setAppliedInternships] = useState([
        {
            internshipId: 7,
            title: 'Digital Marketing Intern',
            company: 'MarketGurus',
            appliedDate: 'May 10, 2025',
            status: 'accepted',
            documents: {
                cv: { name: 'my_cv.pdf' },
                coverLetter: { name: 'cover_letter.pdf' }
            },
            useLinkedInProfile: false
        },
        {
            internshipId: 8,
            title: 'Cybersecurity Intern',
            company: 'SecureNet',
            appliedDate: 'April 28, 2025',
            status: 'rejected',
            documents: {
                cv: { name: 'cv_updated.pdf' },
                certificates: [{ name: 'cyber_cert.pdf' }]
            },
            useLinkedInProfile: true
        }
    ]);
    const [viewApplied, setViewApplied] = useState(false);

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
            payment: {
                type: 'paid',
                salary: '$25/hour'
            },
            description: 'Join our engineering team to develop cutting-edge web applications using React, Node.js, and AWS. You will work closely with senior developers to implement new features, fix bugs, and improve application performance.',
            requirements: 'Proficiency in JavaScript, experience with React, knowledge of Git, currently pursuing a degree in Computer Science or related field.',
            deadline: 'May 30, 2025',
            skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Git']
        },
        {
            id: 2,
            title: 'UX/UI Design Intern',
            company: 'DesignHub',
            industry: 'Media',
            location: 'New York, NY',
            duration: '6 months',
            status: 'Current',
            payment: {
                type: 'paid',
                salary: '$22/hour'
            },
            description: 'Work with our creative team to design intuitive user interfaces for web and mobile applications. You will participate in user research, create wireframes, and develop high-fidelity prototypes.',
            requirements: 'Proficiency in Figma or Adobe XD, understanding of UI/UX principles, portfolio of design work, pursuing a degree in Design or related field.',
            deadline: 'June 15, 2025',
            skills: ['Figma', 'Adobe XD', 'UI/UX Design', 'Wireframing', 'Prototyping']
        },
        {
            id: 3,
            title: 'Data Science Intern',
            company: 'AnalyticsPro',
            industry: 'Technology',
            location: 'Boston, MA',
            duration: '4 months',
            status: 'Current',
            payment: {
                type: 'paid',
                salary: '$28/hour'
            },
            description: 'Assist our data science team in analyzing large datasets, developing predictive models, and creating data visualizations. You will work with Python, SQL, and various data analysis tools.',
            requirements: 'Experience with Python, knowledge of data analysis libraries (Pandas, NumPy), basic understanding of machine learning concepts, pursuing a degree in Statistics, Computer Science, or related field.',
            deadline: 'May 25, 2025',
            skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Data Visualization']
        },
        {
            id: 4,
            title: 'Marketing Intern',
            company: 'BrandMasters',
            industry: 'Marketing',
            location: 'Chicago, IL',
            duration: '3 months',
            status: 'Former',
            payment: {
                type: 'unpaid',
                salary: 'N/A'
            },
            description: 'Support our marketing team in developing and implementing digital marketing campaigns. You will assist with social media management, content creation, and marketing analytics.',
            requirements: 'Knowledge of social media platforms, basic understanding of SEO, excellent writing skills, pursuing a degree in Marketing, Communications, or related field.',
            deadline: 'June 5, 2025',
            skills: ['Social Media', 'Content Creation', 'SEO', 'Marketing Analytics']
        },
        {
            id: 5,
            title: 'Finance Intern',
            company: 'GlobalFinance',
            industry: 'Finance',
            location: 'Miami, FL',
            duration: '6 months',
            status: 'Current',
            payment: {
                type: 'paid',
                salary: '$20/hour'
            },
            description: 'Work with our finance team on financial analysis, reporting, and forecasting. You will assist with budget preparation, financial modeling, and investment analysis.',
            requirements: 'Strong analytical skills, proficiency in Excel, knowledge of financial concepts, pursuing a degree in Finance, Accounting, or related field.',
            deadline: 'May 20, 2025',
            skills: ['Financial Analysis', 'Excel', 'Financial Modeling', 'Budgeting']
        },
        {
            id: 6,
            title: 'Media Production Intern',
            company: 'CreativeMedia',
            industry: 'Media',
            location: 'Los Angeles, CA',
            duration: '4 months',
            status: 'Current',
            payment: {
                type: 'unpaid',
                salary: 'N/A'
            },
            description: 'Assist our production team in creating video content for various platforms. You will help with pre-production planning, filming, and post-production editing.',
            requirements: 'Experience with video editing software, understanding of video production principles, creative mindset, pursuing a degree in Film, Media Production, or related field.',
            deadline: 'June 10, 2025',
            skills: ['Video Editing', 'Pre-production', 'Filming', 'Post-production']
        },
        {
            id: 7,
            title: 'Digital Marketing Intern',
            company: 'MarketGurus',
            industry: 'Marketing',
            location: 'Remote',
            duration: '3 months',
            status: 'Current',
            payment: {
                type: 'paid',
                salary: '$18/hour'
            },
            description: 'Assist in developing and implementing digital marketing strategies across various channels including social media, email, and content marketing.',
            requirements: 'Basic knowledge of digital marketing tools, creative thinking, good communication skills, pursuing a degree in Marketing or related field.',
            deadline: 'June 1, 2025',
            skills: ['Digital Marketing', 'Social Media', 'Email Marketing', 'Content Creation']
        },
        {
            id: 8,
            title: 'Cybersecurity Intern',
            company: 'SecureNet',
            industry: 'Technology',
            location: 'Washington, DC',
            duration: '5 months',
            status: 'Current',
            payment: {
                type: 'paid',
                salary: '$30/hour'
            },
            description: 'Work with our security team to monitor systems, analyze threats, and implement security measures to protect company assets.',
            requirements: 'Understanding of cybersecurity principles, familiarity with security tools, pursuing a degree in Cybersecurity or related field.',
            deadline: 'May 15, 2025',
            skills: ['Cybersecurity', 'Network Security', 'Threat Analysis', 'Security Tools']
        }
    ];

       const majors = [
        { name: 'Computer Science', semesters: 8 },
        { name: 'Media Engineering', semesters: 7 },
        { name: 'Business Administration', semesters: 6 },
        { name: 'Electrical Engineering', semesters: 8 },
        { name: 'Graphic Design', semesters: 6 },
        { name: 'Data Science', semesters: 4 }
    ];
    
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [showMajorSelection, setShowMajorSelection] = useState(false);

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

    const handleApplyClick = () => {
        setIsApplyModalOpen(true);
        setIsDetailModalOpen(false);
    };

    const handleFileUpload = (e, field) => {
        const files = Array.from(e.target.files);
        if (field === 'certificates' || field === 'otherDocuments') {
            setApplicationDocuments(prev => ({
                ...prev,
                [field]: [...prev[field], ...files]
            }));
        } else {
            setApplicationDocuments(prev => ({
                ...prev,
                [field]: files[0]
            }));
        }
    };

    const removeFile = (field, index) => {
        if (field === 'certificates' || field === 'otherDocuments') {
            setApplicationDocuments(prev => ({
                ...prev,
                [field]: prev[field].filter((_, i) => i !== index)
            }));
        } else {
            setApplicationDocuments(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const submitApplication = () => {
        const internship = internships.find(i => i.id === selectedInternship);
        const application = {
            internshipId: selectedInternship,
            title: internship.title,
            company: internship.company,
            appliedDate: new Date().toLocaleDateString(),
            status: 'pending',
            documents: applicationDocuments,
            useLinkedInProfile
        };
        
        setAppliedInternships(prev => [...prev, application]);
        setIsApplyModalOpen(false);
        setApplicationDocuments({
            cv: null,
            coverLetter: null,
            certificates: [],
            otherDocuments: []
        });
        setUseLinkedInProfile(false);
    };

    const handleMajorSelection = (major) => {
        setSelectedMajor(major);
        setSelectedSemester('');
        setShowMajorSelection(false);
    };

    const handleSemesterSelection = (semester) => {
        setSelectedSemester(semester);
    };

    const renderSemesterOptions = () => {
        if (!selectedMajor) return null;
        
        const major = majors.find(m => m.name === selectedMajor);
        if (!major) return null;
        
        return (
            <div className="form-group">
                <label className="form-label">Select Semester</label>
                <div className="semester-options">
                    {Array.from({ length: major.semesters }, (_, i) => i + 1).map(semester => (
                        <button
                            key={semester}
                            className={`semester-option ${selectedSemester === semester.toString() ? 'selected' : ''}`}
                            onClick={() => handleSemesterSelection(semester.toString())}
                        >
                            Semester {semester}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending':
                return <span className="status-badge status-pending">Pending</span>;
            case 'finalized':
                return <span className="status-badge status-finalized">Finalized</span>;
            case 'accepted':
                return <span className="status-badge status-accepted">Accepted</span>;
            case 'rejected':
                return <span className="status-badge status-rejected">Rejected</span>;
            default:
                return <span className="status-badge status-pending">Pending</span>;
        }
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

    return (<div className="search">
        <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
            {/* Header */}
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
                            <a href="/ReportStudent" className="link-item">
                                <FaFileUpload className="link-icon" />
                                <span>Report Submissions</span>
                            </a>
                            <a href="/eval" className="link-item">
                                <FaTasks className="link-icon" />
                                <span>Evaluation Forms</span>
                            </a>
                           
                            <a href="/lib" className="link-item">
                                <FaBook className="link-icon" />
                                <span>Resources Library</span>
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
                                <h2 className="section-title">
                                    {viewApplied ? 'My Applications' : 'Available Internships'}
                                </h2>
                            </div>
                            <div className="internships-header-controls">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="filter-button"
                                >
                                    <i className="fas fa-filter filter-icon"></i>
                                    Filter Options
                                </button>
                                <button
                                    onClick={() => setViewApplied(!viewApplied)}
                                    className={`view-applications-button ${viewApplied ? 'active' : ''}`}
                                >
                                    {viewApplied ? 'View Internships' : 'View My Applications'}
                                </button>
                            </div>
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
                        
                        {viewApplied ? (
                            <div className="applications-list">
                                {appliedInternships.length > 0 ? (
                                    <table className="applications-table">
                                        <thead>
                                            <tr>
                                                <th>Internship</th>
                                                <th>Company</th>
                                                <th>Applied Date</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appliedInternships.map((application, index) => {
                                                const internship = internships.find(i => i.id === application.internshipId) || {};
                                                return (
                                                    <tr key={index}>
                                                        <td>{application.title}</td>
                                                        <td>{application.company}</td>
                                                        <td>{application.appliedDate}</td>
                                                        <td>{getStatusBadge(application.status)}</td>
                                                        <td>
                                                            <button 
                                                                className="view-application-button"
                                                                onClick={() => {
                                                                    setSelectedInternship(application.internshipId);
                                                                    setIsDetailModalOpen(true);
                                                                }}
                                                            >
                                                                View Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="no-results">
                                        <div className="no-results-icon">
                                            <i className="fas fa-file-alt"></i>
                                        </div>
                                        <h3 className="no-results-title">No applications yet</h3>
                                        <p className="no-results-message">Apply to internships to see them listed here</p>
                                    </div>
                                )}
                            </div>
                        ) : (
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
                                                    <span className={`tag ${internship.payment.type === 'paid' ? 'tag-paid' : 'tag-unpaid'}`}>
                                                        <FaMoneyBillWave className="tag-icon" /> 
                                                        {internship.payment.type === 'paid' ? `Paid (${internship.payment.salary})` : 'Unpaid'}
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
                        )}
                    </div>
                    
                    {/* Internship Detail Modal */}
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
                                        <div className="modal-section">
                                            <h3 className="modal-section-title">Skills Required</h3>
                                            <div className="skills-container">
                                                {internships.find(i => i.id === selectedInternship)?.skills.map((skill, index) => (
                                                    <span key={index} className="skill-tag">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
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
                                                <span className="modal-info-label">Payment</span>
                                                <p className="modal-info-value">
                                                    {internships.find(i => i.id === selectedInternship)?.payment.type === 'paid' ? (
                                                        <>Paid ({internships.find(i => i.id === selectedInternship)?.payment.salary})</>
                                                    ) : 'Unpaid'}
                                                </p>
                                            </div>
                                            <div className="modal-info-item">
                                                <span className="modal-info-label">Deadline</span>
                                                <p className="modal-info-value">
                                                    {internships.find(i => i.id === selectedInternship)?.deadline}
                                                </p>
                                            </div>
                                        </div>
                                        {!viewApplied && (
                                            <div className="modal-footer">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleApplyClick();
                                                    }}
                                                    className="apply-button"
                                                >
                                                    Apply Now
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Application Modal */}
                    {/* Application Modal */}
            {isApplyModalOpen && selectedInternship && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-title-container">
                                    <h2 className="modal-title">
                                        Apply for {internships.find(i => i.id === selectedInternship)?.title}
                                    </h2>
                                    <p className="modal-subtitle">
                                        {internships.find(i => i.id === selectedInternship)?.company}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsApplyModalOpen(false)}
                                    className="modal-close"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="application-form">
                                    <div className="form-section">
                                        <h3 className="form-section-title">Student Information</h3>
                                        
                                        <div className="form-group">
                                            <label className="form-label">Select Major</label>
                                            {!showMajorSelection ? (
                                                <div className="major-selection">
                                                    {selectedMajor ? (
                                                        <div className="selected-major">
                                                            <span>{selectedMajor}</span>
                                                            <button 
                                                                onClick={() => setShowMajorSelection(true)}
                                                                className="change-major-button"
                                                            >
                                                                Change
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button 
                                                            onClick={() => setShowMajorSelection(true)}
                                                            className="select-major-button"
                                                        >
                                                            Select Your Major
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="major-options">
                                                    {majors.map(major => (
                                                        <button
                                                            key={major.name}
                                                            className="major-option"
                                                            onClick={() => handleMajorSelection(major.name)}
                                                        >
                                                            {major.name} ({major.semesters} semesters)
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        
                                        {renderSemesterOptions()}
                                                <h3 className="form-section-title">Application Documents</h3>
                                                
                                                <div className="linkedin-option">
                                                    <label className="linkedin-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={useLinkedInProfile}
                                                            onChange={() => setUseLinkedInProfile(!useLinkedInProfile)}
                                                        />
                                                        <span className="checkmark"></span>
                                                        <FaLinkedin className="linkedin-icon" />
                                                        <span>Apply with my LinkedIn profile</span>
                                                    </label>
                                                </div>
                                                
                                                {!useLinkedInProfile && (
                                                    <>
                                                        <div className="form-group">
                                                            <label className="form-label">CV/Resume (required)</label>
                                                            <div className="file-upload-wrapper">
                                                                <label className="file-upload-label">
                                                                    <input
                                                                        type="file"
                                                                        accept=".pdf,.doc,.docx"
                                                                        onChange={(e) => handleFileUpload(e, 'cv')}
                                                                        className="file-upload-input"
                                                                    />
                                                                    <span className="file-upload-button">Choose File</span>
                                                                    <span className="file-upload-text">
                                                                        {applicationDocuments.cv ? applicationDocuments.cv.name : 'No file chosen'}
                                                                    </span>
                                                                </label>
                                                                {applicationDocuments.cv && (
                                                                    <button
                                                                        onClick={() => removeFile('cv')}
                                                                        className="file-remove-button"
                                                                    >
                                                                        <FaTimes />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label className="form-label">Cover Letter (recommended)</label>
                                                            <div className="file-upload-wrapper">
                                                                <label className="file-upload-label">
                                                                    <input
                                                                        type="file"
                                                                        accept=".pdf,.doc,.docx"
                                                                        onChange={(e) => handleFileUpload(e, 'coverLetter')}
                                                                        className="file-upload-input"
                                                                    />
                                                                    <span className="file-upload-button">Choose File</span>
                                                                    <span className="file-upload-text">
                                                                        {applicationDocuments.coverLetter ? applicationDocuments.coverLetter.name : 'No file chosen'}
                                                                    </span>
                                                                </label>
                                                                {applicationDocuments.coverLetter && (
                                                                    <button
                                                                        onClick={() => removeFile('coverLetter')}
                                                                        className="file-remove-button"
                                                                    >
                                                                        <FaTimes />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label className="form-label">Certificates (optional)</label>
                                                            <div className="file-upload-wrapper">
                                                                <label className="file-upload-label">
                                                                    <input
                                                                        type="file"
                                                                        accept=".pdf,.doc,.docx,.jpg,.png"
                                                                        onChange={(e) => handleFileUpload(e, 'certificates')}
                                                                        className="file-upload-input"
                                                                        multiple
                                                                    />
                                                                    <span className="file-upload-button">Choose Files</span>
                                                                    <span className="file-upload-text">
                                                                        {applicationDocuments.certificates.length > 0 
                                                                            ? `${applicationDocuments.certificates.length} files chosen` 
                                                                            : 'No files chosen'}
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            {applicationDocuments.certificates.length > 0 && (
                                                                <div className="file-list">
                                                                    {applicationDocuments.certificates.map((file, index) => (
                                                                        <div key={index} className="file-item">
                                                                            <FaFileAlt className="file-icon" />
                                                                            <span className="file-name">{file.name}</span>
                                                                            <button
                                                                                onClick={() => removeFile('certificates', index)}
                                                                                className="file-remove-button"
                                                                            >
                                                                                <FaTimes />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label className="form-label">Other Documents (optional)</label>
                                                            <div className="file-upload-wrapper">
                                                                <label className="file-upload-label">
                                                                    <input
                                                                        type="file"
                                                                        accept=".pdf,.doc,.docx,.jpg,.png"
                                                                        onChange={(e) => handleFileUpload(e, 'otherDocuments')}
                                                                        className="file-upload-input"
                                                                        multiple
                                                                    />
                                                                    <span className="file-upload-button">Choose Files</span>
                                                                    <span className="file-upload-text">
                                                                        {applicationDocuments.otherDocuments.length > 0 
                                                                            ? `${applicationDocuments.otherDocuments.length} files chosen` 
                                                                            : 'No files chosen'}
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            {applicationDocuments.otherDocuments.length > 0 && (
                                                                <div className="file-list">
                                                                    {applicationDocuments.otherDocuments.map((file, index) => (
                                                                        <div key={index} className="file-item">
                                                                            <FaFileAlt className="file-icon" />
                                                                            <span className="file-name">{file.name}</span>
                                                                            <button
                                                                                onClick={() => removeFile('otherDocuments', index)}
                                                                                className="file-remove-button"
                                                                            >
                                                                                <FaTimes />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            
                                   <div className="form-footer">
                                        <button
                                            onClick={() => setIsApplyModalOpen(false)}
                                            className="cancel-button"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={submitApplication}
                                            disabled={!useLinkedInProfile && !applicationDocuments.cv}
                                            className="submit-application-button"
                                        >
                                            Submit Application
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                    
                    {/* Recommendations Card */}
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
                            {internships.slice(0, 2).map((internship) => (
                                <div key={internship.id} className="recommendation-card">
                                    <div className="recommendation-content">
                                        <div className="recommendation-header">
                                            <div>
                                                <h3 className="recommendation-title">{internship.title}</h3>
                                                <p className="recommendation-company">{internship.company}</p>
                                            </div>
                                            <span className="recommendation-badge badge-new">
                                                New
                                            </span>
                                        </div>
                                        <div className="recommendation-tags">
                                            <span className="tag tag-industry">
                                                {internship.industry}
                                            </span>
                                            <span className="tag tag-location">
                                                <i className="fas fa-map-marker-alt tag-icon"></i> {internship.location}
                                            </span>
                                            <span className="tag tag-duration">
                                                <i className="fas fa-clock tag-icon"></i> {internship.duration}
                                            </span>
                                            <span className={`tag ${internship.payment.type === 'paid' ? 'tag-paid' : 'tag-unpaid'}`}>
                                                <FaMoneyBillWave className="tag-icon" /> 
                                                {internship.payment.type === 'paid' ? `Paid (${internship.payment.salary})` : 'Unpaid'}
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
                                            <button 
                                                className="view-details-button"
                                                onClick={() => {
                                                    setSelectedInternship(internship.id);
                                                    setIsDetailModalOpen(true);
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Search;