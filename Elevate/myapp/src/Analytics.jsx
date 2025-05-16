import React, { useState, useEffect, useRef } from 'react';
import './Analytics.css';
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
  
  
  
  // Dummy data for companies that viewed profile
  const companiesViewed = [
    { name: 'TechGlobal', date: '2025-05-10', industry: 'Technology' },
    { name: 'DesignHub', date: '2025-05-08', industry: 'Design' },
    { name: 'GlobalFinance', date: '2025-05-05', industry: 'Finance' },
    { name: 'CreativeMedia', date: '2025-05-01', industry: 'Media' },
  ];

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
      
      {/* Header with functional notification button */}
      <header className={`header ${darkMode ? 'dark-header' : ''}`}>
        {/* ... other header content ... */}
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
          <div className="user-avatar">ME</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${darkMode ? 'dark-sidebar' : ''}`}>
          <div className="profile-section">
            <div className="avatar-container">ME</div>
            <h2 className="user-name">Menna Elsayed</h2>
            <p className="user-title">Media Engineering & Technology</p>
            <div className="user-status">
              <span className="status-indicator"></span>
              Active
            </div>
            <div className="user-badge">
              <i className="fas fa-crown crown-icon"></i>
              <span className="badge-text">PRO Student</span>
            </div>
          </div>
          <div className="quick-links">
            <h3 className="section-title">Quick Links</h3>
            <ul className="nav-links">
              <li>
                <a href="/dashboard" className="nav-link">
                  <i className="fas fa-home nav-icon"></i>
                  <span>Internship Dashboard</span>
                </a>
              </li>
              <li>
                <button
                  className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
                >
                  <i className="fas fa-chart-line nav-icon"></i>
                  <span>Profile Analytics</span>
                </button>
              </li>
              <li>
                <a href="/assessments" className="nav-link">
                  <i className="fas fa-tasks nav-icon"></i>
                  <span>Online Assessments</span>
                </a>
              </li>
              <li>
                <a href="/workshops" className="nav-link">
                  <i className="fas fa-chalkboard-teacher nav-icon"></i>
                  <span>Online Workshops</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="resources">
            <h3 className="section-title">Resources</h3>
            <ul className="nav-links">
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-file-alt nav-icon"></i>
                  <span>Report Submissions</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-clipboard-list nav-icon"></i>
                  <span>Evaluation Forms</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-building nav-icon"></i>
                  <span>Company Portal</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-book nav-icon"></i>
                  <span>Resources Library</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-calendar-alt nav-icon"></i>
                  <span>Schedule</span>
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
                <i className="fas fa-plus"></i> Request Appointment
              </button>
              <button 
                className="simulate-call-btn"
                onClick={simulateIncomingCall}
              >
                <i className="fas fa-phone"></i> Simulate Call
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
};

export default Analytics;