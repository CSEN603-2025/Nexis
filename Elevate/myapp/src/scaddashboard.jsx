import React, { useState, useEffect, useRef } from "react";
import "./scadDashboard.css";

import { useNavigate, useLocation } from "react-router-dom";
import callRingtone from './call-ringtone.mp3';

function ScadDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [selectedView, setSelectedView] = useState("reports");
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("statistics");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [reportPeriod, setReportPeriod] = useState("current");
  const [reportGenerating, setReportGenerating] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
  name: "SCAD Office",
  title: "Student Career & Alumni Department",
  email: "scad.office@guc.edu.eg",
  location: "Building B, Floor 2",
  officeHours: "9:00 AM - 5:00 PM",
  head: "Dr. Sarah Ahmed",
  established: "January 2020",
  staff: "12 Members",
  avatar: "/scadIcon.jpeg" // Remove the duplicate line
});
  const navigate = useNavigate();
  const location = useLocation();

  // Call and appointment states
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
  const [callStatus, setCallStatus] = useState('idle');
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
    setActiveItem(item.label);
    navigate(item.path);
  };

  useEffect(() => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    if (currentItem) setActiveItem(currentItem.label);
  }, [location.pathname]);

  // Sample data
  const statisticsData = {
    reports: { accepted: 28, rejected: 12, flagged: 5, pending: 15, total: 60 },
    reviewTimes: { average: "3.5 days", fastest: "2 hours", slowest: "7 days", currentCycle: "4.2 days" },
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

  const initialCompanies = [
    {
      id: 1, name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      industry: "Technology", location: "Mountain View, CA", status: "Approved",
      description: "Leading technology company specializing in internet-related services and products.",
      employees: "156,500", founded: "1998", website: "www.google.com", openPositions: "45"
    },
    {
      id: 2, name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      industry: "Technology", location: "Redmond, WA", status: "Pending",
      description: "Global leader in software, services, devices, and solutions.",
      employees: "221,000", founded: "1975", website: "www.microsoft.com", openPositions: "32"
    },
    {
      id: 3, name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      industry: "E-commerce", location: "Seattle, WA", status: "Under Review",
      description: "Global e-commerce and cloud computing giant.",
      employees: "1,523,000", founded: "1994", website: "www.amazon.com", openPositions: "67"
    }
  ];

  useEffect(() => {
    const sampleAppointments = [
      {
        id: 1, date: '2025-05-20', time: '14:30', with: 'Student - Ahmed Mohamed',
        purpose: 'career_guidance', status: 'accepted', notes: 'Discuss internship opportunities', isOnline: true
      },
      {
        id: 2, date: '2025-05-22', time: '10:00', with: 'Student - Sarah Smith',
        purpose: 'report_clarification', status: 'pending', notes: 'Clarify report submission requirements', isOnline: false
      }
    ];
    setAppointments(sampleAppointments);
  }, []);

  // Call handling
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
    return () => stopMedia();
  }, [callStatus, videoEnabled, audioEnabled]);

  useEffect(() => {
    if (toastNotification) {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => setToastNotification(null), 3000);
    }
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [toastNotification]);

  const startMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoEnabled,
        audio: audioEnabled
      });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      setLocalStream(stream);
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
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.src = '';
  };

  const simulateUserLeaving = () => {
    setCallLeft(true);
    setRemoteVideoBlack(true);
    addNotification(`${activeCall.with} has left the call`);
    showToast(`${activeCall.with} has left the call`);
    setTimeout(() => {
      setRemoteVideoBlack(false);
      addNotification(`${activeCall.with} has rejoined the call`);
      showToast(`${activeCall.with} has rejoined the call`);
      setCallLeft(false);
    }, 5000);
  };

  const showToast = (message) => setToastNotification(message);

  const addNotification = (message) => {
    setNotifications([{ id: Date.now(), message, timestamp: new Date().toLocaleTimeString(), read: false }, ...notifications]);
  };

  const toggleScreenShare = async () => {
    try {
      if (screenShareEnabled) {
        if (screenStream) {
          screenStream.getTracks().forEach(track => track.stop());
          setScreenStream(null);
        }
        if (videoEnabled && localStream) localVideoRef.current.srcObject = localStream;
      } else {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        setScreenStream(stream);
        localVideoRef.current.srcObject = stream;
        stream.getVideoTracks()[0].onended = () => toggleScreenShare();
      }
      setScreenShareEnabled(!screenShareEnabled);
    } catch (err) {
      console.error("Error with screen sharing:", err);
      showToast("Could not start screen sharing");
    }
  };

  useEffect(() => {
    let interval;
    if (callStatus === 'ongoing') {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
        if (callTimer === 10 && !callLeft) simulateUserLeaving();
      }, 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [callStatus, callTimer]);

  const industries = ["All", ...new Set(initialCompanies.map(company => company.industry))];
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

  const filterCompanies = () => {
    let filtered = initialCompanies;
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (industryFilter !== "All") {
      filtered = filtered.filter(company => company.industry === industryFilter);
    }
    setCompanies(filtered);
  };

  useEffect(() => {
    filterCompanies();
  }, [searchTerm, industryFilter]);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const navItems = [
    { icon: "fa-home", label: "Dashboard", path: "/dashboard" },
    { icon: "fa-briefcase", label: "Internships", path: "/internships" },
    { icon: "fa-file-alt", label: "Reports", path: "/reports" },
    { icon: "fa-clipboard-list", label: "Evaluations", path: "/EvaluationForms" },
    { icon: "fa-building", label: "Students", path: "/students" },
    { icon: "fa-chalkboard-teacher", label: "Workshops", path: "/WorkshopsManagement" },
    { icon: "fa-cog", label: "Log Out", path: "/reg" }
  ];

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

  const handleGenerateReport = () => {
    setReportGenerating(true);
    setTimeout(() => {
      setReportGenerating(false);
      setReportSuccess(true);
      setTimeout(() => {
        setReportSuccess(false);
        setShowReportModal(false);
      }, 3000);
    }, 2000);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const requestAppointment = () => setShowAppointmentModal(true);

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
      isOnline: true
    };
    setAppointments([...appointments, newAppt]);
    setShowAppointmentModal(false);
    setNewAppointment({ date: '', time: '', purpose: 'career_guidance', notes: '' });
    addNotification('Appointment requested with Student');
  };

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    setShowEditProfileModal(false);
    addNotification('Profile updated successfully');
    showToast('Profile updated successfully');
  };

  const respondToAppointment = (id, response) => {
    setAppointments(appointments.map(appt => 
      appt.id === id ? {...appt, status: response} : appt
    ));
    const appointment = appointments.find(a => a.id === id);
    addNotification(`Appointment ${response} with ${appointment.with}`);
    showToast(`Appointment ${response} with ${appointment.with}`);
  };

  const initiateCall = (appointment) => {
    setIncomingCall(appointment);
    setCallStatus('ringing');
    addNotification(`Initiating call with ${appointment.with}`);
    showToast(`Calling ${appointment.with}...`);
    // Simulate call acceptance
    setTimeout(() => {
      if (callStatus === 'ringing') {
        answerCall();
        addNotification(`${appointment.with} has accepted the call`);
        showToast(`${appointment.with} has joined the call`);
      }
    }, 2000);
  };

  const answerCall = () => {
    setActiveCall(incomingCall);
    setIncomingCall(null);
    setCallStatus('ongoing');
  };

  const endCall = () => {
    if (callStatus === 'ongoing') {
      addNotification(`Call ended with ${activeCall.with} (${formatTime(callTimer)})`);
      showToast(`Call ended with ${activeCall.with}`);
    }
    setActiveCall(null);
    setIncomingCall(null);
    setCallStatus('idle');
  };

  const toggleVideo = () => setVideoEnabled(!videoEnabled);
  const toggleAudio = () => setAudioEnabled(!audioEnabled);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`scad-container ${darkMode ? 'dark-mode' : ''}`}>
      <audio ref={audioRef} loop>
        <source src={callRingtone} type="audio/mpeg" />
      </audio>

      <header className="header">
        <div className="header-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <h1 className="header-title">SCAD Dashboard</h1>
        </div>
        <div className="user-controls">
          <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <div className="notification-icon" onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}>
            <i className="fas fa-bell"></i>
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </div>
          <div className="user-avatar">
  <img src="/scadIcon.jpeg" alt="SCAD Office" />
</div>
          </div>
     
      </header>

      <div className="main-container">
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="profile-section">
           <div className="avatar-container">
  <img src="/scadIcon.jpeg" alt="SCAD Office" />
</div>
            <h2 className="user-name">{profileData.name}</h2>
            <p className="user-title">{profileData.title}</p>
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
                <button className="nav-link" onClick={() => initiateCall(appointments[0])}>
                  <i className="fas fa-phone nav-icon"></i>
                  <span>Simulate Call</span>
                </button>
              </li>
              <li>
                <button className="nav-link" onClick={() => setShowReportModal(true)}>
                  <i className="fas fa-file-export nav-icon"></i>
                  <span>Generate Report</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <main className="content-area">
    <div className="card profile-card">
  <div className="card-body">
    <div className="profile-header">
      <div className="profile-info">
        <div className="profile-avatar">
          <img src="/scadIcon.jpeg" alt="SCAD Office" />
        </div>
        <div className="profile-details">
          <h1 className="profile-title">{profileData.name}</h1>
          <p className="profile-subtitle">{profileData.title}</p>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => setShowEditProfileModal(true)}>
        <i className="fas fa-edit"></i>
        <span>Edit Profile</span>
      </button>
    </div>
    
    <div className="profile-grid">
      <div className="profile-grid-item">
        <h3 className="grid-label">
          <i className="fas fa-building"></i>
          Department
        </h3>
        <p className="grid-value">{profileData.title}</p>
      </div>
      
      <div className="profile-grid-item">
        <h3 className="grid-label">
          <i className="fas fa-id-card"></i>
          Office ID
        </h3>
        <p className="grid-value">SCAD-2025</p>
      </div>
      
      <div className="profile-grid-item">
        <h3 className="grid-label">
          <i className="fas fa-envelope"></i>
          Email
        </h3>
        <p className="grid-value">{profileData.email}</p>
      </div>
      
      <div className="profile-grid-item">
        <h3 className="grid-label">
          <i className="fas fa-map-marker-alt"></i>
          Location
        </h3>
        <p className="grid-value">{profileData.location}</p>
      </div>
      
      <div className="profile-grid-item">
        <h3 className="grid-label">
          <i className="fas fa-clock"></i>
          Office Hours
        </h3>
        <p className="grid-value">{profileData.officeHours}</p>
      </div>
      
      <div className="profile-grid-item">
        <h3 className="grid-label">
          <i className="fas fa-user-tie"></i>
          Head of Department
        </h3>
        <p className="grid-value">{profileData.head}</p>
      </div>
      
      <div className="profile-grid-item">
        <h3 className="grid-label">
          <i className="fas fa-calendar-alt"></i>
          Establishment Date
        </h3>
        <p className="grid-value">{profileData.established}</p>
      </div>
      
      <div className="profile-grid-item">
        <h3 className="grid-label">
          <i className="fas fa-users"></i>
          Staff Members
        </h3>
        <p className="grid-value">{profileData.staff}</p>
      </div>
    </div>
  </div>
</div>

          <div className="card appointments-card">
            <div className="card-header">
              <h2 className="card-title">Appointments</h2>
              <button className="btn btn-primary" onClick={requestAppointment}>
                <i className="fas fa-calendar-plus"></i>
                <span>New Appointment</span>
              </button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>With</th>
                    <th>Purpose</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appt) => (
                      <tr key={appt.id}>
                        <td>{appt.date}</td>
                        <td>{appt.time}</td>
                        <td>{appt.with}</td>
                        <td>{appt.purpose.replace('_', ' ').toUpperCase()}</td>
                        <td>
                          <span className={`status-badge status-${appt.status}`}>
                            {appt.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            {appt.status === 'pending' && (
                              <>
                                <button
                                  className="accept-button"
                                  onClick={() => respondToAppointment(appt.id, 'accepted')}
                                >
                                  <i className="fas fa-check"></i>
                                  Accept
                                </button>
                                <button
                                  className="reject-button"
                                  onClick={() => respondToAppointment(appt.id, 'rejected')}
                                >
                                  <i className="fas fa-times"></i>
                                  Reject
                                </button>
                              </>
                            )}
                            {appt.status === 'accepted' && appt.isOnline && (
                              <button
                                className="btn btn-primary"
                                onClick={() => initiateCall(appt)}
                              >
                                <i className="fas fa-phone"></i>
                                Call Student
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-results">No appointments scheduled</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card statistics-card">
            <div className="card-header">
              <h2 className="card-title">
                <i className="fas fa-chart-pie"></i>
                Statistics
              </h2>
            </div>
            <div className="tabs-container">
              <button
                className={`tab-button ${selectedView === 'reports' ? 'active' : ''}`}
                onClick={() => setSelectedView('reports')}
              >
                <i className="fas fa-file-alt"></i>
                Reports
              </button>
              <button
                className={`tab-button ${selectedView === 'reviewTimes' ? 'active' : ''}`}
                onClick={() => setSelectedView('reviewTimes')}
              >
                <i className="fas fa-clock"></i>
                Review Times
              </button>
              <button
                className={`tab-button ${selectedView === 'courses' ? 'active' : ''}`}
                onClick={() => setSelectedView('courses')}
              >
                <i className="fas fa-graduation-cap"></i>
                Courses
              </button>
              <button
                className={`tab-button ${selectedView === 'companies' ? 'active' : ''}`}
                onClick={() => setSelectedView('companies')}
              >
                <i className="fas fa-building"></i>
                Companies
              </button>
            </div>
            {selectedView === 'reports' && (
              <div className="stats-row">
                <div className="pie-chart-container">
                  <h3 className="stats-section-title">Report Status</h3>
                  <div className="pie-chart">
                    <div className="pie-chart-graphic" style={{ background: conicGradient }}></div>
                    <div className="pie-center">
                      <span>{statisticsData.reports.total}</span>
                      Total
                    </div>
                  </div>
                  <div className="pie-legend">
                    <div className="legend-item">
                      <span className="legend-color accepted"></span>
                      Accepted ({statisticsData.reports.accepted})
                    </div>
                    <div className="legend-item">
                      <span className="legend-color rejected"></span>
                      Rejected ({statisticsData.reports.rejected})
                    </div>
                    <div className="legend-item">
                      <span className="legend-color flagged"></span>
                      Flagged ({statisticsData.reports.flagged})
                    </div>
                    <div className="legend-item">
                      <span className="legend-color pending"></span>
                      Pending ({statisticsData.reports.pending})
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selectedView === 'reviewTimes' && (
              <div className="review-time-stats">
                <h3 className="stats-section-title">Review Time Statistics</h3>
                <div className="stats-metrics">
                  <div className="metric-card">
                    <div className="metric-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    <div className="metric-value">{statisticsData.reviewTimes.average}</div>
                    <div className="metric-label">Average Review Time</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-icon">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div className="metric-value">{statisticsData.reviewTimes.fastest}</div>
                    <div className="metric-label">Fastest Review</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-icon">
                      <i className="fas fa-hourglass-half"></i>
                    </div>
                    <div className="metric-value">{statisticsData.reviewTimes.slowest}</div>
                    <div className="metric-label">Slowest Review</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-icon">
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="metric-value">{statisticsData.reviewTimes.currentCycle}</div>
                    <div className="metric-label">Current Cycle</div>
                  </div>
                </div>
              </div>
            )}
            {selectedView === 'courses' && (
              <div className="horizontal-bar-chart">
                <h3 className="stats-section-title">Top Courses by Reports</h3>
                {statisticsData.topCourses.map((course, index) => (
                  <div className="bar-item" key={index}>
                    <div className="bar-label">{course.name}</div>
                    <div className="bar-container">
                      <div className="bar" style={{ width: `${(course.count / statisticsData.topCourses[0].count) * 100}%` }}></div>
                      <span className="bar-value">{course.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedView === 'companies' && (
              <div className="top-companies-list">
                <h3 className="stats-section-title">Top Companies by Rating</h3>
                {statisticsData.topCompanies.map((company, index) => (
                  <div className="company-rating-item" key={index}>
                    <div className="company-rating-rank">{index + 1}</div>
                    <div className="company-rating-info">
                      <div className="company-rating-name">{company.name}</div>
                      <div className="company-rating-stars">
                        {[...Array(Math.floor(company.rating))].map((_, i) => (
                          <i className="fas fa-star" key={i}></i>
                        ))}
                        {company.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
                        <span className="rating-value">{company.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="stat-value">{statisticsData.reports.total}</div>
              <div className="stat-label">Total Reports</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-value">{statisticsData.reports.accepted}</div>
              <div className="stat-label">Accepted Reports</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon red">
                <i className="fas fa-times-circle"></i>
              </div>
              <div className="stat-value">{statisticsData.reports.rejected}</div>
              <div className="stat-label">Rejected Reports</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon yellow">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="stat-value">{statisticsData.reports.flagged}</div>
              <div className="stat-label">Flagged Reports</div>
            </div>
          </div>

          <div className="card companies-card">
            <div className="card-header">
              <h2 className="card-title">
                <i className="fas fa-building"></i>
                Companies
              </h2>
            </div>
            <div className="filters-container">
              <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="industry-filter"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
              >
                {industries.map((industry, index) => (
                  <option key={index} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <tr
                        key={company.id}
                        className={`clickable-row ${selectedCompanyId === company.id ? 'selected' : ''}`}
                        onClick={() => handleRowClick(company.id)}
                      >
                        <td>
                          <div className="company-info">
                            <img src={company.logo} alt={company.name} className="company-logo" />
                            <span className="company-name">{company.name}</span>
                          </div>
                        </td>
                        <td>{company.industry}</td>
                        <td>{company.location}</td>
                        <td>
                          <span className={`status-badge status-${company.status.toLowerCase().replace(' ', '-')}`}>
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
                      </tr>
                      
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-results">No companies found</td>
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
                <div className="company-logo-container">
                  <img src={selectedCompanyData.logo} alt={selectedCompanyData.name} className="company-logo" />
                  
                </div>
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

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="close-button" onClick={() => setShowEditProfileModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditProfileSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.title}
                    onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Office Hours</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.officeHours}
                    onChange={(e) => setProfileData({...profileData, officeHours: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Head of Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.head}
                    onChange={(e) => setProfileData({...profileData, head: e.target.value})}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditProfileModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Generate Report</h3>
              <button className="close-button" onClick={() => setShowReportModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              {reportSuccess ? (
                <div className="success-message">
                  <i className="fas fa-check-circle success-icon"></i>
                  <h4>Report Generated Successfully!</h4>
                  <p>Your report is ready for download.</p>
                  <button className="btn btn-primary download-btn">
                    <i className="fas fa-download"></i>
                    Download Report
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleGenerateReport(); }}>
                  <div className="form-group">
                    <label>Report Type</label>
                    <select
                      className="form-select"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                    >
                      <option value="statistics">Statistics</option>
                      <option value="detailed">Detailed Report</option>
                      <option value="summary">Summary</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Format</label>
                    <select
                      className="form-select"
                      value={reportFormat}
                      onChange={(e) => setReportFormat(e.target.value)}
                    >
                      <option value="pdf">PDF</option>
                      <option value="csv">CSV</option>
                      <option value="xlsx">Excel</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Period</label>
                    <select
                      className="form-select"
                      value={reportPeriod}
                      onChange={(e) => setReportPeriod(e.target.value)}
                    >
                      <option value="current">Current Academic Year</option>
                      <option value="last">Last Academic Year</option>
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
                  <div className="report-info">
                    <h4>Report Information</h4>
                    <div className="report-info-item">
                      <span className="info-label">Generated on</span>
                      <span className="info-value">{getCurrentDate()}</span>
                    </div>
                    <div className="report-info-item">
                      <span className="info-label">Generated by</span>
                      <span className="info-value">{profileData.name}</span>
                    </div>
                    <div className="report-info-item">
                      <span className="info-label">Department</span>
                      <span className="info-value">{profileData.title}</span>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowReportModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={reportGenerating}>
                      {reportGenerating ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Generating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-file-export"></i>
                          Generate Report
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="modal-overlay">
          <div className="appointment-modal">
            <div className="modal-header">
              <h3>Schedule Video Call Appointment</h3>
              <button className="close-button" onClick={() => setShowAppointmentModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAppointmentSubmit}>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Purpose</label>
                <select
                  className="form-select"
                  value={newAppointment.purpose}
                  onChange={(e) => setNewAppointment({...newAppointment, purpose: e.target.value})}
                >
                  <option value="career_guidance">Career Guidance</option>
                  <option value="report_clarification">Report Clarification</option>
                  <option value="resume_review">Resume Review</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  className="form-control"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  placeholder="Any specific topics you'd like to discuss..."
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAppointmentModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {callStatus === 'ringing' && (
        <div className="incoming-call-notification">
          <div className="caller-info">
            
            <div className="caller-details">
              <h3>Incoming Call</h3>
              <p>{incomingCall.with}</p>
            </div>
          </div>
          <div className="call-actions">
            <button className="answer-call" onClick={answerCall}>
              <i className="fas fa-phone"></i>
              Accept
            </button>
            <button className="decline-call" onClick={endCall}>
              <i className="fas fa-phone-slash"></i>
              Decline
            </button>
          </div>
        </div>
      )}

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
                    className="fill-frame"
                  />
                )}
              </div>
              <div className={`local-video ${videoEnabled ? '' : 'disabled'}`}>
                {videoEnabled ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    className="fill-frame"
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
              <button className={`control-btn ${videoEnabled ? 'active' : ''}`} onClick={toggleVideo}>
                <i className={`fas ${videoEnabled ? 'fa-video' : 'fa-video-slash'}`}></i>
              </button>
              <button className={`control-btn ${audioEnabled ? 'active' : ''}`} onClick={toggleAudio}>
                <i className={`fas ${audioEnabled ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
              </button>
              <button className={`control-btn ${screenShareEnabled ? 'active' : ''}`} onClick={toggleScreenShare}>
                <i className="fas fa-desktop"></i>
              </button>
              <button className="control-btn end-call" onClick={endCall}>
                <i className="fas fa-phone-slash"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {toastNotification && (
        <div className="toast-notification">
          <i className="fas fa-info-circle"></i>
          {toastNotification}
        </div>
      )}

      <div className={`notifications-panel ${showNotificationsPanel ? 'show' : ''}`}>
        <div className="notifications-header">
          <h3>Notifications</h3>
          <button className="close-notifications" onClick={() => setNotifications([])}>
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
                  <i className="fas fa-times"></i>
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