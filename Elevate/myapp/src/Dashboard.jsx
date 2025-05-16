import React, { useState, useEffect, useRef } from "react";
import "./scadDashboard.css"; // Import the CSS file
import { useNavigate, useLocation } from "react-router-dom";
import callRingtone from './call-ringtone.mp3'; // You'll need to add this sound file

function ScadDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [selectedView, setSelectedView] = useState("reports"); // For statistics tabs
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("statistics");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [reportPeriod, setReportPeriod] = useState("current");
  const [reportGenerating, setReportGenerating] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Call functionality states
  const [appointments, setAppointments] = useState([]);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    purpose: 'career_guidance',
    notes: ''
  });
  const [incomingCall, setIncomingCall] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'ringing', 'ongoing'
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [callTimer, setCallTimer] = useState(0);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);
  const [remoteVideoBlack, setRemoteVideoBlack] = useState(false);
  const [callLeft, setCallLeft] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);

  const audioRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const toastTimeoutRef = useRef(null);
  
  const handleNavigation = (item) => {
    setActiveItem(item.label); // visually highlight the clicked item
    navigate(item.path);       // go to the route
  };
  
  useEffect(() => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    if (currentItem) setActiveItem(currentItem.label);
  }, [location.pathname]);
  
  // Statistics data
  const statisticsData = {
    reports: {
      accepted: 28,
      rejected: 12,
      flagged: 5,
      pending: 15,
      total: 60
    },
    reviewTimes: {
      average: "3.5 days",
      fastest: "2 hours",
      slowest: "7 days",
      currentCycle: "4.2 days"
    },
    topCourses: [
      { name: "CSEN 601", count: 37 },
      { name: "DMET 501", count: 29 },
      { name: "CSEN 703", count: 24 },
      { name: "BLDG 401", count: 19 },
      { name: "ELIN 201", count: 16 }
    ],
    topCompanies: [
      { name: "Google", rating: 4.8, count: 24 },
      { name: "Microsoft", rating: 4.6, count: 18 },
      { name: "Amazon", rating: 4.5, count: 22 },
      { name: "Netflix", rating: 4.4, count: 15 },
      { name: "IBM", rating: 4.3, count: 12 }
    ]
  };
  
  // Initial companies data
  const initialCompanies = [
    {id: 1,
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      industry: "Technology",
      location: "Mountain View, CA",
      status: "Approved",
      statusClass: "bg-green-100 text-green-800",
      description:
        "Leading technology company specializing in internet-related services and products.",
      employees: "156,500",
      founded: "1998",
      website: "www.google.com",
      openPositions: "45",
    },
    {id: 2,
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      industry: "E-commerce",
      location: "Seattle, WA",
      status: "Under Review",
      statusClass: "bg-yellow-100 text-yellow-800",
      description: "Global e-commerce and technology company.",
      employees: "1,608,000",
      founded: "1994",
      website: "www.amazon.com",
      openPositions: "32",
    },
    {id: 3,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      industry: "Technology",
      location: "Redmond, WA",
      status: "Pending",
      statusClass: "bg-gray-100 text-gray-800",
      description:
        "Multinational technology corporation producing software and consumer electronics.",
      employees: "181,000",
      founded: "1975",
      website: "www.microsoft.com",
      openPositions: "28",
    },
    {id: 4,
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      industry: "Entertainment",
      location: "Los Gatos, CA",
      status: "Approved",
      statusClass: "bg-green-100 text-green-800",
      description: "Streaming media and video-on-demand provider.",
      employees: "12,800",
      founded: "1997",
      website: "www.netflix.com",
      openPositions: "15",
    },
  ];

  // Sample appointments data
  useEffect(() => {
    const sampleAppointments = [
      {
        id: 1,
        date: '2025-05-20',
        time: '14:30',
        with: 'Student - Ahmed Mohamed',
        purpose: 'career_guidance',
        status: 'accepted',
        notes: 'Discuss internship opportunities',
        isOnline: true
      },
      {
        id: 2,
        date: '2025-05-22',
        time: '10:00',
        with: 'Student - Sarah Smith',
        purpose: 'report_clarification',
        status: 'pending',
        notes: 'Clarify report submission requirements',
        isOnline: false
      }
    ];
    setAppointments(sampleAppointments);
  }, []);

  // Handle incoming call simulation
  useEffect(() => {
    if (callStatus === 'ringing') {
      audioRef.current.play();
      const timer = setTimeout(() => {
        if (callStatus === 'ringing') {
          endCall();
          addNotification('Missed call from ' + incomingCall.with);
        }
      }, 30000);
      return () => clearTimeout(timer);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [callStatus]);

  useEffect(() => {
    if (callStatus === 'ongoing') {
      startMedia();
    } else {
      stopMedia();
    }

    return () => {
      stopMedia();
    };
  }, [callStatus, videoEnabled, audioEnabled]);

  useEffect(() => {
    if (toastNotification) {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      
      toastTimeoutRef.current = setTimeout(() => {
        setToastNotification(null);
      }, 2000);
    }

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [toastNotification]);

  const startMedia = async () => {
    try {
      // Get user media (webcam and microphone)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoEnabled,
        audio: audioEnabled
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setLocalStream(stream);
      
      // For demo purposes, we'll use a dummy video for the remote stream
      if (remoteVideoRef.current) {
        remoteVideoRef.current.src = `${process.env.PUBLIC_URL}/dummy-video.mp4`;
        remoteVideoRef.current.loop = true;
        remoteVideoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
      addNotification("Could not access camera or microphone");
      showToast("Could not access camera or microphone");
    }
  };

  const stopMedia = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
    }
    
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    
    if (remoteVideoRef.current) {
      remoteVideoRef.current.src = '';
    }
  };

  const simulateUserLeaving = () => {
    setCallLeft(true);
    setRemoteVideoBlack(true);
    addNotification(`${activeCall.with} has left the call`);
    showToast(`${activeCall.with} has left the call`);
    
    // Simulate user returning after 5 seconds
    setTimeout(() => {
      setRemoteVideoBlack(false);
      addNotification(`${activeCall.with} has rejoined the call`);
      showToast(`${activeCall.with} has rejoined the call`);
      setCallLeft(false);
    }, 5000);
  };

  const showToast = (message) => {
    setToastNotification(message);
  };

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleTimeString(),
      read: false
    };
    setNotifications([newNotification, ...notifications]);
  };

  const toggleScreenShare = async () => {
    try {
      if (screenShareEnabled) {
        // Stop screen sharing
        if (screenStream) {
          screenStream.getTracks().forEach(track => track.stop());
          setScreenStream(null);
        }
        
        // Switch back to webcam
        if (videoEnabled && localStream) {
          localVideoRef.current.srcObject = localStream;
        }
      } else {
        // Start screen sharing
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        setScreenStream(stream);
        localVideoRef.current.srcObject = stream;
        
        // Handle when user stops screen sharing via browser UI
        stream.getVideoTracks()[0].onended = () => {
          toggleScreenShare();
        };
      }
      
      setScreenShareEnabled(!screenShareEnabled);
    } catch (err) {
      console.error("Error with screen sharing:", err);
      showToast("Could not start screen sharing");
    }
  };

  // Call timer
  useEffect(() => {
    let interval;
    if (callStatus === 'ongoing') {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
        
        // Simulate user leaving and returning to call after 10 seconds
        if (callTimer === 10 && !callLeft) {
          simulateUserLeaving();
        }
      }, 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [callStatus, callTimer]);

  // Extract unique industries for the filter dropdown
  const industries = ["All", ...new Set(initialCompanies.map(company => company.industry))];

  // State for filtered companies
  const [companies, setCompanies] = useState(initialCompanies);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompanyData, setSelectedCompanyData] = useState(null);
  
  useEffect(() => {
    const selectedCompany = companies.find((company) => company.id === selectedCompanyId);
    setSelectedCompanyData(selectedCompany || null);
  }, [selectedCompanyId, companies]);
  
  const handleRowClick = (companyId) => {
    setSelectedCompanyId(companyId === selectedCompanyId ? null : companyId);
  };
  
  // Handle filtering companies based on search term and industry
  const filterCompanies = () => {
    let filtered = initialCompanies;

    // Filter by search term (company name)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by industry
    if (industryFilter !== "All") {
      filtered = filtered.filter(company => company.industry === industryFilter);
    }

    setCompanies(filtered);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle industry filter change
  const handleIndustryFilter = (e) => {
    setIndustryFilter(e.target.value);
  };

  // Apply filters when search term or industry filter changes
  useEffect(() => {
    filterCompanies();
  }, [searchTerm, industryFilter]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Navigation items data
  const navItems = [
    { icon: "fa-home", label: "Dashboard", path: "/dashboard" },
    { icon: "fa-briefcase", label: "Internships", path: "/internships" },
    { icon: "fa-file-alt", label: "Reports", path: "/reports" },
    { icon: "fa-clipboard-list", label: "Evaluations", path: "/evaluations" },
    { icon: "fa-building", label: "Students", path: "/students" },
    { icon: "fa-chalkboard-teacher", label: "Workshops", path: "/workshops" },
    { icon: "fa-cog", label: "Settings", path: "/settings" },
  ];

  // Calculate report percentages for the pie chart visualization
  const totalReports = statisticsData.reports.total;
  const acceptedPercentage = Math.round((statisticsData.reports.accepted / totalReports) * 100);
  const rejectedPercentage = Math.round((statisticsData.reports.rejected / totalReports) * 100);
  const flaggedPercentage = Math.round((statisticsData.reports.flagged / totalReports) * 100);
  const pendingPercentage = Math.round((statisticsData.reports.pending / totalReports) * 100);
  const conicGradient = `conic-gradient(
    #2ecc71 0% ${acceptedPercentage}%, 
    #e74c3c ${acceptedPercentage}% ${acceptedPercentage + rejectedPercentage}%, 
    #f39c12 ${acceptedPercentage + rejectedPercentage}% ${acceptedPercentage + rejectedPercentage + flaggedPercentage}%,
    rgb(232, 239, 24) ${acceptedPercentage + rejectedPercentage + flaggedPercentage}% 100%
  )`;

  // Handle report generation
  const handleGenerateReport = () => {
    setReportGenerating(true);
    
    // Simulate report generation with a timeout
    setTimeout(() => {
      setReportGenerating(false);
      setReportSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setReportSuccess(false);
        setShowReportModal(false);
      }, 3000);
    }, 2000);
  };
  
  // Get formatted current date for reports
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const requestAppointment = () => {
    setShowAppointmentModal(true);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const newAppt = {
      id: appointments.length + 1,
      date: newAppointment.date,
      time: newAppointment.time,
      with: 'Student',
      purpose: newAppointment.purpose,
      status: 'pending',
      notes: newAppointment.notes,
      isOnline: false
    };
    setAppointments([...appointments, newAppt]);
    setShowAppointmentModal(false);
    setNewAppointment({
      date: '',
      time: '',
      purpose: 'career_guidance',
      notes: ''
    });
    addNotification('Appointment requested with Student');
  };

  const respondToAppointment = (id, response) => {
    setAppointments(appointments.map(appt => 
      appt.id === id ? {...appt, status: response} : appt
    ));
    const appointment = appointments.find(a => a.id === id);
    addNotification(`Appointment ${response} with ${appointment.with}`);
  };

  const simulateIncomingCall = () => {
    const caller = appointments.find(a => a.status === 'accepted');
    if (caller) {
      setIncomingCall(caller);
      setCallStatus('ringing');
      addNotification(`Incoming call from ${caller.with}`);
    }
  };

  const answerCall = () => {
    setActiveCall(incomingCall);
    setIncomingCall(null);
    setCallStatus('ongoing');
  };

  const endCall = () => {
    if (callStatus === 'ongoing') {
      addNotification(`Call ended with ${activeCall.with} (${formatTime(callTimer)})`);
    }
    setActiveCall(null);
    setIncomingCall(null);
    setCallStatus('idle');
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`analytics-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Hidden audio element for ringtone */}
      <audio ref={audioRef} loop>
        <source src={callRingtone} type="audio/mpeg" />
      </audio>
      
      {/* Header */}
      <header className={`header ${darkMode ? 'dark-header' : ''}`}>
        <div className="header-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <h1 className="header-title">SCAD Dashboard</h1>
        </div>
        <div className="user-controls">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <div 
            className="notification-icon" 
            onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
          >
            <i className="fas fa-bell"></i>
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </div>
          <div className="user-avatar">
            <img src="/path/to/your/logo.png" alt="SCAD Office" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${darkMode ? 'dark-sidebar' : ''} ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="profile-section">
            <div className="avatar-container">
              <img src="/path/to/your/logo.png" alt="SCAD Office" />
            </div>
            <h2 className="user-name">SCAD Office</h2>
            <p className="user-title">Student Career & Alumni Department</p>
            <div className="user-status">
              <span className="status-indicator"></span>
              Active
            </div>
          </div>
          <div className="quick-links">
            <h3 className="section-title">Navigation</h3>
            <ul className="nav-links">
              {navItems.map((item, index) => (
                <li key={index}>
                  <button
                    className={`nav-link ${activeItem === item.label ? 'active' : ''}`}
                    onClick={() => handleNavigation(item)}
                  >
                    <i className={`fas ${item.icon} nav-icon`}></i>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="resources">
            <h3 className="section-title">Quick Actions</h3>
            <ul className="nav-links">
              <li>
                <button className="nav-link" onClick={requestAppointment}>
                  <i className="fas fa-calendar-plus nav-icon"></i>
                  <span>Schedule Call</span>
                </button>
              </li>
              <li>
                <button className="nav-link" onClick={simulateIncomingCall}>
                  <i className="fas fa-phone nav-icon"></i>
                  <span>Simulate Call</span>
                </button>
              </li>
              <li>
                <button 
                  className="nav-link"
                  onClick={() => setShowReportModal(true)}
                >
                  <i className="fas fa-file-export nav-icon"></i>
                  <span>Generate Report</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Content Area */}
        <main className="content-area">
          {/* Profile Card */}
          <div className="card profile-card">
            <div className="card-body">
              <div className="profile-header">
                <div className="profile-info">
                  <div className="profile-avatar">
                    <img src="/path/to/your/logo.png" alt="SCAD Office" />
                  </div>
                  <div className="profile-details">
                    <h1 className="profile-title">SCAD Administrative Office</h1>
                    <p className="profile-subtitle">Student Career & Alumni Department</p>
                    <span className="status-badge status-active">
                      <span className="status-indicator"></span>
                      Active
                    </span>
                  </div>
                </div>
                <button className="btn btn-primary">
                  <i className="fas fa-edit"></i>
                  <span>Edit Profile</span>
                </button>
              </div>
              <div className="profile-grid">
                <div className="profile-grid-item">
                  <h3 className="grid-label">Department</h3>
                  <p className="grid-value">Student Career & Alumni Department</p>
                </div>
                <div className="profile-grid-item">
                  <h3 className="grid-label">Office ID</h3>
                  <p className="grid-value">SCAD-2025</p>
                </div>
                <div className="profile-grid-item">
                  <h3 className="grid-label">Email</h3>
                  <p className="grid-value">scad.office@guc.edu.eg</p>
                </div>
                <div className="profile-grid-item">
                  <h3 className="grid-label">Location</h3>
                  <p className="grid-value">Building B, Floor 2</p>
                </div>
                <div className="profile-grid-item">
                  <h3 className="grid-label">Office Hours</h3>
                  <p className="grid-value">9:00 AM - 5:00 PM</p>
                </div>
                <div className="profile-grid-item">
                  <h3 className="grid-label">Head of Department</h3>
                  <p className="grid-value">Dr. Sarah Ahmed</p>
                </div>
                <div className="profile-grid-item">
                  <h3 className="grid-label">Establishment Date</h3>
                  <p className="grid-value">January 2020</p>
                </div>
                <div className="profile-grid-item">
                  <h3 className="grid-label">Staff Members</h3>
                  <p className="grid-value">12 Members</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Real-time Statistics Section */}
          <div className="card statistics-card">
            <div className="card-header">
              <h2 className="card-title">Real-time Statistics</h2>
              <div className="card-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowReportModal(true)}
                >
                  <i className="fas fa-file-export"></i>
                  <span>Generate Report</span>
                </button>
                <div className="tabs-container">
                  <button 
                    className={`tab-button ${selectedView === 'reports' ? 'active' : ''}`}
                    onClick={() => setSelectedView('reports')}
                  >
                    <i className="fas fa-file-alt"></i> Reports
                  </button>
                  <button 
                    className={`tab-button ${selectedView === 'courses' ? 'active' : ''}`}
                    onClick={() => setSelectedView('courses')}
                  >
                    <i className="fas fa-book"></i> Courses
                  </button>
                  <button 
                    className={`tab-button ${selectedView === 'companies' ? 'active' : ''}`}
                    onClick={() => setSelectedView('companies')}
                  >
                    <i className="fas fa-building"></i> Companies
                  </button>
                </div>
              </div>
            </div>
            
            <div className="card-body">
              {selectedView === 'reports' && (
                <div className="statistics-view">
                  <div className="stats-row">
                    <div className="pie-chart-container">
                      <h3 className="stats-section-title">Report Status Distribution</h3>
                      
                      <div className="pie-chart">
                        <div className="pie-chart-graphic" style={{ background: conicGradient }}></div>
                        <div className="pie-center">
                          <span>{totalReports}</span>
                          <span>Total</span>
                        </div>
                      </div>
                      <div className="pie-legend">
                        <div className="legend-item">
                          <span className="legend-color accepted"></span>
                          <span className="legend-label">Accepted: {statisticsData.reports.accepted} ({acceptedPercentage}%)</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-color rejected"></span>
                          <span className="legend-label">Rejected: {statisticsData.reports.rejected} ({rejectedPercentage}%)</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-color flagged"></span>
                          <span className="legend-label">Flagged: {statisticsData.reports.flagged} ({flaggedPercentage}%)</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-color pending"></span>
                          <span className="legend-label">Pending: {statisticsData.reports.pending} ({pendingPercentage}%)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="review-time-stats">
                      <h3 className="stats-section-title">Review Times</h3>
                      <div className="stats-metrics">
                        <div className="metric-card">
                          <div className="metric-icon">
                            <i className="fas fa-clock"></i>
                          </div>
                          <div className="metric-content">
                            <h4 className="metric-value">{statisticsData.reviewTimes.average}</h4>
                            <p className="metric-label">Average Review Time</p>
                          </div>
                        </div>
                        <div className="metric-card">
                          <div className="metric-icon">
                            <i className="fas fa-bolt"></i>
                          </div>
                          <div className="metric-content">
                            <h4 className="metric-value">{statisticsData.reviewTimes.fastest}</h4>
                            <p className="metric-label">Fastest Review</p>
                          </div>
                        </div>
                        <div className="metric-card">
                          <div className="metric-icon">
                            <i className="fas fa-hourglass-end"></i>
                          </div>
                          <div className="metric-content">
                            <h4 className="metric-value">{statisticsData.reviewTimes.slowest}</h4>
                            <p className="metric-label">Slowest Review</p>
                          </div>
                        </div>
                        <div className="metric-card">
                          <div className="metric-icon">
                            <i className="fas fa-calendar-check"></i>
                          </div>
                          <div className="metric-content">
                            <h4 className="metric-value">{statisticsData.reviewTimes.currentCycle}</h4>
                            <p className="metric-label">Current Cycle Average</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedView === 'courses' && (
                <div className="statistics-view">
                  <h3 className="stats-section-title">Most Frequently Used Courses in Internships</h3>
                  <div className="horizontal-bar-chart">
                    {statisticsData.topCourses.map((course, index) => (
                      <div className="bar-item" key={index}>
                        <div className="bar-label">{course.name}</div>
                        <div className="bar-container">
                          <div 
                            className="bar" 
                            style={{width: `${(course.count / statisticsData.topCourses[0].count) * 100}%`}}
                          ></div>
                          <span className="bar-value">{course.count} internships</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedView === 'companies' && (
                <div className="statistics-view">
                  <div className="stats-row">
                    <div className="top-companies-container">
                      <h3 className="stats-section-title">Top Rated Companies</h3>
                      <div className="top-companies-list">
                        {statisticsData.topCompanies
                          .sort((a, b) => b.rating - a.rating)
                          .slice(0, 5)
                          .map((company, index) => (
                            <div className="company-rating-item" key={index}>
                              <div className="company-rating-rank">{index + 1}</div>
                              <div className="company-rating-info">
                                <div className="company-rating-name">{company.name}</div>
                                <div className="company-rating-stars">
                                  {[...Array(5)].map((_, i) => (
                                    <i 
                                      key={i} 
                                      className={`fas fa-star ${i < Math.floor(company.rating) ? 'filled' : 
                                                i === Math.floor(company.rating) && company.rating % 1 > 0 ? 'half-filled' : ''}`}
                                    ></i>
                                  ))}
                                  <span className="rating-value">{company.rating}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div className="top-companies-container">
                      <h3 className="stats-section-title">Top Companies by Internship Count</h3>
                      <div className="top-companies-list">
                        {statisticsData.topCompanies
                          .sort((a, b) => b.count - a.count)
                          .slice(0, 5)
                          .map((company, index) => (
                            <div className="company-count-item" key={index}>
                              <div className="company-count-rank">{index + 1}</div>
                              <div className="company-count-info">
                                <div className="company-count-name">{company.name}</div>
                                <div className="company-count-bar">
                                  <div 
                                    className="count-bar" 
                                    style={{width: `${(company.count / statisticsData.topCompanies[0].count) * 100}%`}}
                                  ></div>
                                </div>
                              </div>
                              <div className="company-count-value">{company.count}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Stats Grid (Simple metric cards)*/}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3 className="stat-value">{statisticsData.reports.total}</h3>
              <p className="stat-label">Total Reports</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3 className="stat-value">{statisticsData.reports.accepted}</h3>
              <p className="stat-label">Accepted Reports</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon red">
                <i className="fas fa-times-circle"></i>
              </div>
              <h3 className="stat-value">{statisticsData.reports.rejected}</h3>
              <p className="stat-label">Rejected Reports</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon yellow">
                <i className="fas fa-flag"></i>
              </div>
              <h3 className="stat-value">{statisticsData.reports.flagged}</h3>
              <p className="stat-label">Flagged Reports</p>
            </div>
          </div>
          
          {/* Companies List */}
          <div className="card companies-card">
            <div className="card-header">
              <h2 className="card-title">Companies List</h2>
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i>
                <span>Add Company</span>
              </button>
            </div>

            {/* Search and Filter Container */}
            <div className="filters-container">
              <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search by company name..." 
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="filter-container">
                <select 
                  className="industry-filter" 
                  value={industryFilter}
                  onChange={handleIndustryFilter}
                >
                  {industries.map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry === "All" ? "All Industries" : industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Industry</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <tr key={company.id} onClick={() => handleRowClick(company.id)} className="clickable-row">
                        <td>
                          <div className="company-info">
                            <img src={company.logo} alt={company.name} className="company-logo" />
                            <span className="company-name">{company.name}</span>
                          </div>
                        </td>
                        <td>{company.industry}</td>
                        <td>{company.location}</td>
                        <td>
                          <span className={`status-badge status-${company.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {company.status}
                          </span>
                        </td>
                        <td className="action-cell">
                          <div className="action-buttons">
                            {(company.status === "Under Review" || company.status === "Pending") && (
                              <>
                                <button
                                  className="accept-button"
                                  onClick={e => {
                                    e.stopPropagation()
                                    const updatedCompanies = companies.map(c =>
                                      c.name === company.name
                                        ? {
                                            ...c,
                                            status: "Approved",
                                            statusClass: "approvedst"
                                          }
                                        : c
                                    )
                                    setCompanies(updatedCompanies)
                                  }}
                                >
                                  <i className="fas fa-check text-sm"></i>
                                  <span>Accept</span>
                                </button>
                                <button
                                  className="reject-button"
                                  onClick={e => {
                                    e.stopPropagation()
                                    const updatedCompanies = companies.map(c =>
                                      c.name === company.name
                                        ? {
                                            ...c,
                                            status: "Rejected",
                                            statusClass: "rejst"
                                          }
                                        : c
                                    )
                                    setCompanies(updatedCompanies)
                                  }}
                                >
                                  <i className="fas fa-times text-sm"></i>
                                  <span>Reject</span>
                                </button>
                              </>
                            )}
                          </div>
                        </td>

                        <td>
                          <div className="action-buttons">
                            <button className="btn-icon">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn-icon">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-results">No companies found matching your criteria</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {selectedCompanyData && (
            <div className="card company-details-card">
              <div className="card-header">
                <h2 className="card-title">{selectedCompanyData.name} Details</h2>
              </div>
              <div className="card-body">
                <p><strong>Description:</strong> {selectedCompanyData.description}</p>
                <p><strong>Employees:</strong> {selectedCompanyData.employees}</p>
                <p><strong>Founded:</strong> {selectedCompanyData.founded}</p>
                <p><strong>Website:</strong> <a href={`https://${selectedCompanyData.website}`} target="_blank" rel="noopener noreferrer">{selectedCompanyData.website}</a></p>
                <p><strong>Open Positions:</strong> {selectedCompanyData.openPositions}</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Report Generation Modal */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Generate Report</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setShowReportModal(false);
                  setReportSuccess(false);
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              {reportSuccess ? (
                <div className="success-message">
                  <i className="fas fa-check-circle success-icon"></i>
                  <p>Report successfully generated and ready for download!</p>
                  <a href="#" className="btn btn-success download-btn">
                    <i className="fas fa-download"></i>
                    <span>Download Report</span>
                  </a>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label>Report Type</label>
                    <select 
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="form-select"
                    >
                      <option value="statistics">Statistics Overview</option>
                      <option value="companies">Companies Analysis</option>
                      <option value="courses">Courses Analysis</option>
                      <option value="performance">Performance Metrics</option>
                      <option value="complete">Complete Dashboard Report</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Report Format</label>
                    <select 
                      value={reportFormat}
                      onChange={(e) => setReportFormat(e.target.value)}
                      className="form-select"
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="excel">Excel Spreadsheet</option>
                      <option value="csv">CSV Data File</option>
                      <option value="docx">Word Document</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Time Period</label>
                    <select 
                      value={reportPeriod}
                      onChange={(e) => setReportPeriod(e.target.value)}
                      className="form-select"
                    >
                      <option value="current">Current Month</option>
                      <option value="previous">Previous Month</option>
                      <option value="quarter">Last Quarter</option>
                      <option value="year">Year to Date</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  
                  {reportPeriod === 'custom' && (
                    <div className="date-range-container">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>End Date</label>
                        <input type="date" className="form-control" />
                      </div>
                    </div>
                  )}
                  
                  <div className="form-group report-info">
                    <div className="report-info-item">
                      <span className="info-label">Generated On:</span>
                      <span className="info-value">{getCurrentDate()}</span>
                    </div>
                    <div className="report-info-item">
                      <span className="info-label">Generated By:</span>
                      <span className="info-value">SCAD Administrative Office</span>
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setShowReportModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={handleGenerateReport}
                      disabled={reportGenerating}
                    >
                      {reportGenerating ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-file-export"></i>
                          <span>Generate Report</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Appointment Request Modal */}
      {showAppointmentModal && (
        <div className="modal-overlay">
          <div className="appointment-modal">
            <div className="modal-header">
              <h3>Schedule Video Call Appointment</h3>
              <button 
                className="close-modal"
                onClick={() => setShowAppointmentModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAppointmentSubmit}>
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input 
                  type="time" 
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Purpose</label>
                <select
                  value={newAppointment.purpose}
                  onChange={(e) => setNewAppointment({...newAppointment, purpose: e.target.value})}
                >
                  <option value="career_guidance">Career Guidance</option>
                  <option value="report_clarification">Report Clarification</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  placeholder="Any specific topics you'd like to discuss..."
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAppointmentModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Incoming Call Notification */}
      {callStatus === 'ringing' && (
        <div className="incoming-call-notification">
          <div className="caller-info">
            <div className="caller-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="caller-details">
              <h3>Incoming Call</h3>
              <p>{incomingCall.with}</p>
            </div>
          </div>
          <div className="call-actions">
            <button className="answer-call" onClick={answerCall}>
              <i className="fas fa-phone"></i>
            </button>
            <button className="decline-call" onClick={endCall}>
              <i className="fas fa-phone-slash"></i>
            </button>
          </div>
        </div>
      )}

      {/* Active Call Interface */}
      {callStatus === 'ongoing' && (
        <div className="call-interface">
          <div className="iphone-frame">
            <div className="call-header">
              <div className="caller-info">
                <h3>{activeCall.with}</h3>
                <p>{formatTime(callTimer)}</p>
              </div>
            </div>
            
            <div className="video-container">
              {/* Remote video */}
              <div className="remote-video">
                {remoteVideoBlack ? (
                  <div className="black-screen">
                    <i className="fas fa-user-slash"></i>
                    <p>User has left the call</p>
                  </div>
                ) : (
                  <video 
                    ref={remoteVideoRef}
                    autoPlay 
                    muted={!audioEnabled}
                  />
                )}
              </div>
              
              {/* Local video */}
              <div className={`local-video ${videoEnabled ? '' : 'disabled'}`}>
                {videoEnabled ? (
                  <video 
                    ref={localVideoRef}
                    autoPlay 
                    muted 
                  />
                ) : (
                  <div className="video-off-placeholder">
                    <i className="fas fa-video-slash"></i>
                    <span>Your video is off</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="call-controls">
              <button 
                className={`control-btn ${videoEnabled ? 'active' : ''}`}
                onClick={toggleVideo}
              >
                <i className={`fas ${videoEnabled ? 'fa-video' : 'fa-video-slash'}`}></i>
              </button>
              <button 
                className={`control-btn ${audioEnabled ? 'active' : ''}`}
                onClick={toggleAudio}
              >
                <i className={`fas ${audioEnabled ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
              </button>
              <button 
                className={`control-btn ${screenShareEnabled ? 'active' : ''}`}
                onClick={toggleScreenShare}
              >
                <i className="fas fa-desktop"></i>
              </button>
              <button 
                className="control-btn end-call"
                onClick={endCall}
              >
                <i className="fas fa-phone-slash"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastNotification && (
        <div className="toast-notification">
          {toastNotification}
        </div>
      )}

      {/* Notifications Panel */}
      <div className={`notifications-panel ${showNotificationsPanel ? 'show' : ''}`}>
        <div className="notifications-header">
          <h3>Notifications</h3>
          <button 
            className="close-notifications"
            onClick={() => setNotifications([])}
          >
            Clear All
          </button>
        </div>
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <p className="no-notifications">No new notifications</p>
          ) : (
            notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.timestamp}</span>
                </div>
                <button 
                  className="dismiss-notification"
                  onClick={() => setNotifications(notifications.filter(n => n.id !== notification.id))}
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ScadDashboard;