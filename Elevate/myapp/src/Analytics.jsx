import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import './Analytics.css';
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
    FaAward ,
   
    FaPhone,
    FaChalkboardTeacher,
    FaInfoCircle,
  } from 'react-icons/fa';
import callRingtone from './call-ringtone.mp3'; // You'll need to add this sound file
import dummyVideo from './dummy-video.mp4'; // Add a sample video for simulation

const Analytics = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');
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
  const toggleNotificationsPanel = () => {
  setShowNotificationsPanel(!showNotificationsPanel);
};
  const resources = [
    { id: 1, title: 'Report Submissions', icon: 'fa-file-alt' },
    { id: 2, title: 'Evaluation Forms', icon: 'fa-clipboard-list' },
    { id: 3, title: 'Company Portal', icon: 'fa-building' },
    { id: 4, title: 'Resources Library', icon: 'fa-book' },
    { id: 5, title: 'Schedule', icon: 'fa-calendar-alt' }
  ];
  const [notificationSettings, setNotificationSettings] = useState({
  showPopups: true,
  soundEnabled: true
});
  const addNotification = (message, type = 'info') => {
  if (!notificationSettings.showPopups && type === 'toast') return;
  
  const newNotification = {
    id: Date.now(),
    message,
    type,
    timestamp: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
    read: false
  };
  
  setNotifications([newNotification, ...notifications]);
  
  if (notificationSettings.showPopups && type === 'toast') {
    showToast(message);
  }
};
  // Dummy data for companies that viewed profile
  const companiesViewed = [
    { name: 'TechGlobal', date: '2025-05-10', industry: 'Technology' },
    { name: 'DesignHub', date: '2025-05-08', industry: 'Design' },
    { name: 'GlobalFinance', date: '2025-05-05', industry: 'Finance' },
    { name: 'CreativeMedia', date: '2025-05-01', industry: 'Media' },
  ];
useEffect(() => {
  const dummyNotifications = [
    {
      id: 1,
      message: "SCAD Officer accepted your appointment for May 20",
      type: "appointment",
      timestamp: "10:30 AM",
      date: "2025-05-15",
      read: false
    },
    {
      id: 2,
      message: "New workshop available: Interview Preparation",
      type: "workshop",
      timestamp: "Yesterday",
      date: "2025-05-14",
      read: false
    },
    {
      id: 3,
      message: "Your report submission was approved",
      type: "report",
      timestamp: "May 13",
      date: "2025-05-13",
      read: true
    },
    {
      id: 4,
      message: "Sarah Smith sent you a message",
      type: "message",
      timestamp: "May 12",
      date: "2025-05-12",
      read: true
    }
  ];
  setNotifications(dummyNotifications);
}, []);

const markAsRead = (id) => {
  setNotifications(notifications.map(notification => 
    notification.id === id ? {...notification, read: true} : notification
  ));
};
  // Sample appointments data
  useEffect(() => {
    const sampleAppointments = [
      {
        id: 1,
        date: '2025-05-20',
        time: '14:30',
        with: 'SCAD Officer - John Doe',
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

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
   
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
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

  const requestAppointment = () => {
    setShowAppointmentModal(true);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const newAppt = {
      id: appointments.length + 1,
      date: newAppointment.date,
      time: newAppointment.time,
      with: 'SCAD Officer',
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
    addNotification('Appointment requested with SCAD Officer');
  };
const respondToAppointment = (id, response) => {
  setAppointments(appointments.map(appt => 
    appt.id === id ? {...appt, status: response} : appt
  ));
  const appointment = appointments.find(a => a.id === id);
  
  // Add different notifications based on response
  if (response === 'accepted') {
    addNotification(`Your appointment with ${appointment.with} was accepted`, 'appointment');
    addNotification(`Appointment accepted: ${appointment.date} at ${appointment.time}`, 'toast');
  } else {
    addNotification(`Your appointment with ${appointment.with} was rejected`, 'appointment');
  }
};
const simulateIncomingCall = () => {
  const caller = appointments.find(a => a.status === 'accepted');
  if (caller) {
    setIncomingCall(caller);
    setCallStatus('ringing');
    addNotification(`Incoming call from ${caller.with}`, 'call');
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
      
      {/* Header with functional notification button */}
     <header className="header">
  <a href="/new" className="logo2">
    <span className="logo2-icon">↑</span>
    Elevate 
  </a>
  
  <div className="header-controls">
    {/* Notification Bell */}
    <button 
      className="notification-icon" 
      onClick={toggleNotificationsPanel}
    >
      <FaBell />
      {notifications.length > 0 && (
        <span className="notification-badge">
          {notifications.length}
        </span>
      )}
    </button>
    
   
    <img 
      src="https://ui-avatars.com/api/?name=Menna+Elsayed&background=83C5BE&color=fff" 
      alt="User" 
      className="user-avatar" 
    />
  </div>
</header>

      {/* Main Content */}
      <div className="main-container">
        {/* Sidebar */}
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
            <br></br>
            <div className="profile-badge">
              <i className="fas fa-crown crown-icon"></i>
              <span className="badge-text">PRO Student</span>
            </div>
          </div>
          
          <div className="quick-links-list">
            <h3 className="section-title">Quick Links</h3>
            <ul className="sidebar-menu">
              <li>
                <a href="/new" className="link-item">
                  <i className="fas fa-home menu-icon"></i>
                  <span>Internship Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/analytics" className="link-item">
                  <i className="fas fa-chart-line menu-icon"></i>
                  <span>Profile Analytics</span>
                </a>
              </li>
              <li>
                <a href="/assessment" className="link-item">
                  <i className="fas fa-tasks menu-icon"></i>
                  <span>Online Assessments</span>
                </a>
              </li>
              <li>
                <a href="/workshop" className="link-item">
                  <i className="fas fa-chalkboard-teacher menu-icon"></i>
                  <span>Online Workshops</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="quick-links-list">
            <h3 className="section-title">Resources</h3>
            <ul className="sidebar-menu">
              <li>
                <a href="/search" className="link-item">
                  <i className="fas fa-file-alt menu-icon"></i>
                  <span>Internship listing</span>
                </a>
              </li>
              <li>
                <a href="/Rpro" className="link-item">
                  <i className="fas fa-file-alt menu-icon"></i>
                  <span>Report Submissions</span>
                </a>
              </li>
              <li>
                <a href="/Epro" className="link-item">
                  <i className="fas fa-clipboard-list menu-icon"></i>
                  <span>Evaluation Forms</span>
                </a>
              </li>
              <li>
                <a href="/lib" className="link-item">
                  <i className="fas fa-book menu-icon"></i>
                  <span>Resources Library</span>
                </a>
              </li>
 
            </ul>
          </div>
        </aside>

        {/* Content Area - Analytics Content */}
        <main className="content-area">
          <div className="analytics-header">
            <h1 className="page-title">Profile Analytics</h1>
            <p className="page-description">Track who's viewed your profile and monitor your visibility</p>
          </div>
          
          {/* Appointments Section */}
          <div className="card appointments-section">
            <div className="section-header">
              <h2 className="card-title">Video Call Appointments</h2>
              <button 
                className="request-appointment-btn"
                onClick={requestAppointment}
              >
                <i className="fas fa-plus"></i>&nbsp; Request Appointment
              </button>
              <button 
                className="simulate-call-btn"
                onClick={simulateIncomingCall}
              >
                <i className="fas fa-phone"></i>&nbsp; Simulate Call
              </button>
            </div>
            
            <div className="appointments-list">
              {appointments.length === 0 ? (
                <p className="no-appointments">No appointments scheduled</p>
              ) : (
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>With</th>
                      <th>Purpose</th>
                      <th>Status</th>
                      <th>Online</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.with}</td>
                        <td>
                          {appointment.purpose === 'career_guidance' 
                            ? 'Career Guidance' 
                            : 'Report Clarification'}
                        </td>
                        <td>
                          <span className={`status-badge ${appointment.status}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          {appointment.isOnline ? (
                            <span className="online-indicator">
                              <i className="fas fa-circle"></i> Online
                            </span>
                          ) : (
                            <span className="offline-indicator">
                              <i className="fas fa-circle"></i> Offline
                            </span>
                          )}
                        </td>
                        <td>
                          {appointment.status === 'pending' && (
                            <div className="appointment-actions">
                              <button 
                                className="accept-btn"
                                onClick={() => respondToAppointment(appointment.id, 'accepted')}
                              >
                                Accept
                              </button>
                              <button 
                                className="reject-btn"
                                onClick={() => respondToAppointment(appointment.id, 'rejected')}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {appointment.status === 'accepted' && (
                            <button 
                              className="start-call-btn"
                              onClick={() => {
                                setActiveCall(appointment);
                                setCallStatus('ongoing');
                              }}
                            >
                              Start Call
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          
          <div className="card profile-viewers">
            <h2 className="card-title">Companies That Viewed Your Profile</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companiesViewed.map((company, index) => (
                    <tr key={index}>
                      <td>{company.name}</td>
                      <td>{company.industry}</td>
                      <td>{company.date}</td>
                      <td className="action-buttons">
                        <button className="action-button">
                          <i className="fas fa-external-link-alt"></i>
                        </button>
                        <button className="action-button">
                          <i className="fas fa-info-circle"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="chart-grid">
            <div className="card">
              <h2 className="card-title">Profile View Trends</h2>
              <div className="chart-placeholder">
                <p>Chart showing profile view trends would appear here</p>
              </div>
            </div>
            <div className="card">
              <h2 className="card-title">Industry Breakdown</h2>
              <div className="chart-placeholder">
                <p>Chart showing industry breakdown would appear here</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Appointment Request Modal */}
      {showAppointmentModal && (
        <div className="modal-overlay">
          <div className="appointment-modal">
            <div className="modal-header">
              <h3>Request Video Call Appointment</h3>
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
                  Request Appointment
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
            {/* ... call header ... */}
            
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
    <div className="notifications-header-top">
      <h3>Notifications</h3>
      <div className="notification-actions">
        <button 
          className="notification-settings"
          onClick={() => setNotificationSettings({
            ...notificationSettings,
            showPopups: !notificationSettings.showPopups
          })}
        >
          <i className={`fas ${notificationSettings.showPopups ? 'fa-bell' : 'fa-bell-slash'}`}></i>
        </button>
        <button 
          className="clear-notifications"
          onClick={() => setNotifications([])}
        >
          Clear All
        </button>
        <button 
  className="close-notifications"
  onClick={() => setShowNotificationsPanel(false)}
>
  &times;
</button>
      </div>
    </div>
    <div className="notification-filter">
      <button className="filter-btn active">All</button>
      <button className="filter-btn">Unread</button>
    </div>
  </div>
  <div className="notifications-list">
    {notifications.length === 0 ? (
      <p className="no-notifications">No new notifications</p>
    ) : (
      notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`notification-item ${notification.type} ${notification.read ? '' : 'unread'}`}
          onClick={() => markAsRead(notification.id)}
        >
          <div className="notification-icon">
            {notification.type === 'appointment' && <FaCalendar className="appointment-icon" />}
            {notification.type === 'call' && <FaPhone className="call-icon" />}
            {notification.type === 'workshop' && <FaChalkboardTeacher className="workshop-icon" />}
            {notification.type === 'report' && <FaFileAlt className="report-icon" />}
            {notification.type === 'message' && <FaEnvelope className="message-icon" />}
            {!['appointment', 'call', 'workshop', 'report', 'message'].includes(notification.type) && 
              <FaInfoCircle className="info-icon" />}
          </div>
          <div className="notification-content">
            <p className="notification-message">{notification.message}</p>
            <div className="notification-meta">
              <span className="notification-time">{notification.timestamp}</span>
              <span className="notification-date">{notification.date}</span>
            </div>
          </div>
          <button 
            className="dismiss-notification"
            onClick={(e) => {
              e.stopPropagation();
              setNotifications(notifications.filter(n => n.id !== notification.id));
            }}
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
};

export default Analytics;