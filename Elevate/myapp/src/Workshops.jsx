import React, { useState, useEffect, useRef } from 'react';
import './Workshops.css';

const Workshops = () => {
  const [showVideoConferenceModal, setShowVideoConferenceModal] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [currentRecording, setCurrentRecording] = useState(null);
  const [activeWorkshop, setActiveWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([
    { 
      id: 1, 
      title: 'Building Your Professional Brand', 
      presenter: 'Sarah Johnson, Career Coach', 
      date: '2025-05-15', 
      time: '14:00-16:00',
      status: 'upcoming',
      registered: true,
      description: 'Learn how to craft a compelling professional brand that showcases your unique skills and value proposition to potential employers.',
      recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Example embedded video URL
      certificateUrl: '',
      feedback: '',
      rating: 0,
      notes: ''
    },
    { 
      id: 2, 
      title: 'Technical Interview Preparation', 
      presenter: 'Michael Chen, Senior Developer', 
      date: '2025-05-20', 
      time: '10:00-12:00',
      status: 'upcoming',
      registered: false,
      description: 'Master the art of technical interviews with hands-on coding exercises and problem-solving strategies from industry experts.',
      recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      certificateUrl: '',
      feedback: '',
      rating: 0,
      notes: ''
    },
    { 
      id: 3, 
      title: 'Portfolio Development Workshop', 
      presenter: 'Emma Davis, Design Director', 
      date: '2025-05-25', 
      time: '15:00-17:00',
      status: 'upcoming',
      registered: false,
      description: 'Create a standout portfolio that effectively communicates your skills and experience to potential employers.',
      recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      certificateUrl: '',
      feedback: '',
      rating: 0,
      notes: ''
    },
    { 
      id: 4, 
      title: 'Networking Skills for Tech Professionals', 
      presenter: 'James Wilson, HR Manager', 
      date: '2025-05-18', 
      time: '11:00-13:00',
      status: 'upcoming',
      registered: true,
      description: 'Develop essential networking skills to build professional relationships and uncover hidden job opportunities.',
      recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      certificateUrl: '',
      feedback: '',
      rating: 0,
      notes: ''
    },
    { 
      id: 5, 
      title: 'Resume Building Masterclass', 
      presenter: 'Sarah Johnson, Career Coach', 
      date: '2025-05-01', 
      time: '14:00-16:00',
      status: 'completed',
      registered: true,
      description: 'Transform your resume into a powerful marketing tool that gets you noticed by recruiters and hiring managers.',
      recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      certificateUrl: 'https://example.com/certificate1',
      feedback: 'Great workshop with practical tips!',
      rating: 5,
      notes: 'Focus on quantifiable achievements\nTailor resume for each application'
    },
    { 
      id: 6, 
      title: 'Effective Communication in Tech', 
      presenter: 'James Wilson, HR Manager', 
      date: '2025-04-15', 
      time: '11:00-13:00',
      status: 'completed',
      registered: true,
      description: 'Improve your communication skills to collaborate effectively with teams and present your ideas clearly.',
      recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      certificateUrl: 'https://example.com/certificate2',
      feedback: 'Helpful for improving team collaboration',
      rating: 4,
      notes: 'Active listening techniques\nNon-verbal communication matters'
    }
  ]);
  
  // Handle register for workshop
  const handleRegister = (workshopId) => {
    setWorkshops(workshops.map(workshop => 
      workshop.id === workshopId ? { ...workshop, registered: true } : workshop
    ));
  };

  // Handle join workshop
  const handleJoinWorkshop = (workshop) => {
    setActiveWorkshop(workshop);
    setShowVideoConferenceModal(true);
  };

  // Handle download certificate
  const handleDownloadCertificate = (workshopId) => {
    const workshop = workshops.find(w => w.id === workshopId);
    if (workshop && workshop.certificateUrl) {
      window.open(workshop.certificateUrl, '_blank');
    } else {
      alert('Certificate is not yet available. Please check back later.');
    }
  };

  // Handle view recording
  const handleViewRecording = (workshopId) => {
    const workshop = workshops.find(w => w.id === workshopId);
    if (workshop && workshop.recordingUrl) {
      setCurrentRecording(workshop);
      setShowRecordingModal(true);
    } else {
      alert('Recording is not yet available. Please check back later.');
    }
  };

  // Dummy data for participants in video conference
  const participants = [
    { id: 1, name: 'Menna Elsayed', role: 'Student', isSpeaking: false, hasCamera: true, hasMic: true },
    { id: 2, name: 'Sarah Johnson', role: 'Presenter', isSpeaking: true, hasCamera: true, hasMic: true },
    { id: 3, name: 'Alex Thompson', role: 'Student', isSpeaking: false, hasCamera: true, hasMic: true },
    { id: 4, name: 'Jessica Lee', role: 'Student', isSpeaking: false, hasCamera: false, hasMic: true },
    { id: 5, name: 'David Miller', role: 'Student', isSpeaking: false, hasCamera: true, hasMic: false },
    { id: 6, name: 'Emily Wilson', role: 'Student', isSpeaking: false, hasCamera: true, hasMic: true },
    { id: 7, name: 'Michael Chen', role: 'Student', isSpeaking: false, hasCamera: false, hasMic: false },
    { id: 8, name: 'Emma Davis', role: 'Student', isSpeaking: false, hasCamera: true, hasMic: true },
  ];

  // Recording Modal Component
  const RecordingModal = () => {
    if (!currentRecording) return null;

    return (
      <div className="recording-modal">
        <div className="recording-modal-content">
          <div className="recording-modal-header">
            <h2>{currentRecording.title}</h2>
            <p className="presenter-name">{currentRecording.presenter}</p>
            <button 
              onClick={() => setShowRecordingModal(false)}
              className="close-button"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="video-player-container">
            <iframe
              src={currentRecording.recordingUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Workshop Recording"
              className="embedded-video"
            ></iframe>
          </div>
          
          <div className="recording-details">
            <div className="recording-description">
              <h3>Workshop Description</h3>
              <p>{currentRecording.description}</p>
            </div>
            
            <div className="recording-actions">
              <button 
                className="action-button"
                onClick={() => handleDownloadCertificate(currentRecording.id)}
              >
                <i className="fas fa-certificate"></i> Download Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Video Conference Modal Component
  const VideoConferenceModal = () => {
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [activeTab, setActiveTab] = useState('participants');
    const [messages, setMessages] = useState([
      { id: 1, sender: 'Sarah Johnson', message: 'Welcome everyone to the workshop! We\'ll be starting in a few minutes.', time: '13:55' },
      { id: 2, sender: 'Alex Thompson', message: 'Looking forward to it!', time: '13:56' },
      { id: 3, sender: 'Jessica Lee', message: 'Will the slides be available after the session?', time: '13:57' },
      { id: 4, sender: 'Sarah Johnson', message: 'Yes, I\'ll share all materials after the workshop.', time: '13:58' },
    ]);
    const [notes, setNotes] = useState(activeWorkshop?.notes || '');
    const [showNotes, setShowNotes] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState(activeWorkshop?.feedback || '');
    const [rating, setRating] = useState(activeWorkshop?.rating || 0);
    
    const videoRef = useRef(null);
    const localVideoRef = useRef(null);
    const streamRef = useRef(null);

    // Get video stream when modal opens
    useEffect(() => {
      const getVideoStream = async () => {
        try {
          if (showVideoConferenceModal && isCameraOn) {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: isMicOn
            });
            streamRef.current = stream;
            
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          }
        } catch (err) {
          console.error("Error accessing media devices:", err);
          // Fallback to placeholder if camera access fails
          if (localVideoRef.current) {
            localVideoRef.current.src = "https://placehold.co/600x400?text=No+Camera";
          }
        }
      };

      getVideoStream();

      // Cleanup function to stop streams when component unmounts
      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
    }, [showVideoConferenceModal, isCameraOn, isMicOn]);

    // Simulate presenter video with a realistic talking head video
    useEffect(() => {
      if (showVideoConferenceModal && videoRef.current) {
        // Using a realistic talking head video from a free stock video source
        videoRef.current.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
        videoRef.current.loop = true;
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      }
    }, [showVideoConferenceModal]);

    // Toggle camera
    const toggleCamera = async () => {
      if (!isCameraOn) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: isMicOn
          });
          streamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          setIsCameraOn(true);
        } catch (err) {
          console.error("Error accessing camera:", err);
          alert("Could not access camera. Please check permissions.");
        }
      } else {
        if (streamRef.current) {
          streamRef.current.getVideoTracks().forEach(track => track.stop());
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
          }
        }
        setIsCameraOn(false);
      }
    };

    // Toggle microphone
    const toggleMic = () => {
      if (streamRef.current) {
        const audioTracks = streamRef.current.getAudioTracks();
        audioTracks.forEach(track => {
          track.enabled = !track.enabled;
        });
        setIsMicOn(!isMicOn);
      }
    };

    const handleSendMessage = () => {
      if (chatInput.trim()) {
        const newMessage = {
          id: messages.length + 1,
          sender: 'You',
          message: chatInput,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);
        setChatInput('');
        
        // Simulate response after 1-3 seconds
        setTimeout(() => {
          const responses = [
            "That's a great question!",
            "I'll cover that in a few minutes.",
            "Thanks for sharing!",
            "Has anyone else had similar experiences?",
            "Let me add that to the discussion points."
          ];
          const presenterResponse = {
            id: messages.length + 2,
            sender: activeWorkshop.presenter.split(',')[0],
            message: responses[Math.floor(Math.random() * responses.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, presenterResponse]);
        }, 1000 + Math.random() * 2000);
      }
    };

    const handleSaveNotes = () => {
      setWorkshops(workshops.map(workshop => 
        workshop.id === activeWorkshop.id ? { ...workshop, notes } : workshop
      ));
      setShowNotes(false);
    };

    const handleSubmitFeedback = () => {
      setWorkshops(workshops.map(workshop => 
        workshop.id === activeWorkshop.id ? { ...workshop, feedback, rating } : workshop
      ));
      setShowFeedback(false);
    };

    if (!activeWorkshop) return null;

    return (
      <div className="video-conference-modal" id="videoConferenceModal">
        <div className="video-conference-container">
          {/* Header */}
          <div className="video-header">
            <div>
              <h2>{activeWorkshop.title}</h2>
              <p className="presenter-name">{activeWorkshop.presenter}</p>
            </div>
            <div className="header-actions">
              <button 
                onClick={() => setShowNotes(!showNotes)}
                className={`action-button ${showNotes ? 'active' : ''}`}
              >
                <i className="fas fa-edit"></i> Notes
              </button>
              {activeWorkshop.status === 'completed' && (
                <button 
                  onClick={() => setShowFeedback(!showFeedback)}
                  className={`action-button ${showFeedback ? 'active' : ''}`}
                >
                  <i className="fas fa-star"></i> Feedback
                </button>
              )}
              <button 
                onClick={() => {
                  if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                  }
                  setShowVideoConferenceModal(false);
                }}
                className="close-button"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="video-content">
            {/* Video area */}
            <div className="video-area">
              {/* Main video */}
              <div className="main-video">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted={!isMicOn}
                  className="video-element"
                />
                <div className="video-overlay">
                  <div className="presenter-info">
                    <div className="presenter-avatar">
                      {activeWorkshop.presenter.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="presenter-display-name">{activeWorkshop.presenter.split(',')[0]}</p>
                    <p className="presenter-role">Presenter</p>
                  </div>
                  <div className="speaking-indicator">
                    <i className="fas fa-microphone"></i> Speaking
                  </div>
                </div>
              </div>
              
              {/* Local video */}
              <div className={`local-video ${isCameraOn ? '' : 'disabled'}`}>
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="video-element"
                />
                <div className="local-video-overlay">
                  <p>You</p>
                  {!isCameraOn && <i className="fas fa-video-slash"></i>}
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="video-thumbnails">
                {participants.slice(0, 5).map((participant, index) => (
                  <div key={index} className="thumbnail">
                    <div className="thumbnail-content">
                      <div className="thumbnail-avatar">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="thumbnail-name">{participant.name.split(' ')[0]}</p>
                    </div>
                    {participant.isSpeaking && (
                      <div className="mic-indicator speaking">
                        <i className="fas fa-microphone"></i>
                      </div>
                    )}
                    {!participant.hasMic && (
                      <div className="mic-indicator muted">
                        <i className="fas fa-microphone-slash"></i>
                      </div>
                    )}
                    {!participant.hasCamera && (
                      <div className="camera-indicator off">
                        <i className="fas fa-video-slash"></i>
                      </div>
                    )}
                  </div>
                ))}
                {participants.length > 5 && (
                  <div className="thumbnail more-participants">
                    <div className="more-content">
                      <i className="fas fa-users"></i>
                      <p>+{participants.length - 5} more</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Notes Panel */}
              {showNotes && (
                <div className="notes-panel">
                  <div className="notes-header">
                    <h3>Workshop Notes</h3>
                    <button onClick={() => setShowNotes(false)} className="close-notes">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Type your notes here..."
                    className="notes-textarea"
                  />
                  <button onClick={handleSaveNotes} className="save-notes-button">
                    Save Notes
                  </button>
                </div>
              )}
              
              {/* Feedback Panel */}
              {showFeedback && (
                <div className="feedback-panel">
                  <div className="feedback-header">
                    <h3>Workshop Feedback</h3>
                    <button onClick={() => setShowFeedback(false)} className="close-feedback">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="rating-section">
                    <p>Rate this workshop:</p>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`fas fa-star ${star <= rating ? 'active' : ''}`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your feedback about this workshop..."
                    className="feedback-textarea"
                  />
                  <button onClick={handleSubmitFeedback} className="submit-feedback-button">
                    Submit Feedback
                  </button>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="video-sidebar">
              {/* Tabs */}
              <div className="sidebar-tabs">
                <button 
                  onClick={() => setActiveTab('participants')}
                  className={activeTab === 'participants' ? 'active' : ''}
                >
                  <i className="fas fa-users"></i>
                  Participants ({participants.length})
                </button>
                <button 
                  onClick={() => setActiveTab('chat')}
                  className={activeTab === 'chat' ? 'active' : ''}
                >
                  <i className="fas fa-comment-alt"></i>
                  Chat
                  {activeTab !== 'chat' && messages.some(m => m.sender !== 'You') && (
                    <span className="new-message-indicator"></span>
                  )}
                </button>
              </div>
              
              {/* Tab content */}
              <div className="tab-content">
                {activeTab === 'participants' && (
                  <div className="participants-list">
                    {participants.map((participant, index) => (
                      <div key={index} className="participant-item">
                        <div className="participant-info">
                          <div className="participant-avatar">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="participant-details">
                            <p className="participant-name">{participant.name}</p>
                            <p className="participant-role">{participant.role}</p>
                          </div>
                        </div>
                        <div className="participant-status">
                          {participant.isSpeaking && (
                            <span className="speaking-icon">
                              <i className="fas fa-volume-up"></i>
                            </span>
                          )}
                          <span className={`status-icon ${participant.hasCamera ? '' : 'off'}`}>
                            <i className={participant.hasCamera ? 'fas fa-video' : 'fas fa-video-slash'}></i>
                          </span>
                          <span className={`status-icon ${participant.hasMic ? '' : 'off'}`}>
                            <i className={participant.hasMic ? 'fas fa-microphone' : 'fas fa-microphone-slash'}></i>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'chat' && (
                  <div className="chat-container">
                    <div className="chat-messages">
                      {messages.map((message, index) => (
                        <div key={index} className={`chat-message ${message.sender === 'You' ? 'own-message' : ''}`}>
                          <div className="message-content">
                            <div className="message-avatar">
                              {message.sender.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="message-details">
                              <div className="message-header">
                                <p className="message-sender">{message.sender}</p>
                                <p className="message-time">{message.time}</p>
                              </div>
                              <p className="message-text">{message.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="chat-input-container">
                      <div className="input-group">
                        <input 
                          type="text" 
                          placeholder="Type a message..." 
                          className="chat-input"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button 
                          className="send-button"
                          onClick={handleSendMessage}
                        >
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="video-controls">
            <div className="control-buttons">
              <button 
                onClick={toggleMic}
                className={`control-button ${isMicOn ? '' : 'muted'}`}
                title={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
              >
                <i className={isMicOn ? 'fas fa-microphone' : 'fas fa-microphone-slash'}></i>
              </button>
              <button 
                onClick={toggleCamera}
                className={`control-button ${isCameraOn ? '' : 'camera-off'}`}
                title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
              >
                <i className={isCameraOn ? 'fas fa-video' : 'fas fa-video-slash'}></i>
              </button>
              <button 
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`control-button ${isScreenSharing ? 'sharing' : ''}`}
                title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
              >
                <i className="fas fa-desktop"></i>
              </button>
              <button className="control-button" title="Raise hand">
                <i className="fas fa-hand-paper"></i>
              </button>
            </div>
            
            <div className="leave-container">
              <button 
                onClick={() => {
                  if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                  }
                  setShowVideoConferenceModal(false);
                }}
                className="leave-button"
              >
                Leave Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <a href="#" className="logo">
            <i className="fas fa-arrow-up"></i>
            <span>Elevate</span>
          </a>
          
          <div className="search-container">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>&nbsp;&nbsp;
              <input 
                type="text" 
                placeholder="Search workshops..." 
                className="search-input" 
              />
              
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <button className="dark-mode-toggle">
            <i className="fas fa-moon"></i>
          </button>
          
          <div className="user-avatar">
            ME
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="user-profile">
            <div className="profile-avatar">
              ME
            </div>
            <h2 className="profile-name">Menna Elsayed</h2>
            <p className="profile-program">Media Engineering & Technology</p>
            <div className="profile-status">
              <span className="status-indicator"></span>
              Active
            </div>
            <div className="profile-badge">
              <i className="fas fa-crown"></i>
              <span>PRO Student</span>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Quick Links</h3>
            <ul className="nav-links">
              <li>
                <a href="/dashboard" className="nav-link">
                  <i className="fas fa-home"></i>
                  <span>Internship Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/analytics" className="nav-link">
                  <i className="fas fa-chart-line"></i>
                  <span>Profile Analytics</span>
                </a>
              </li>
              <li>
                <a href="/assessments" className="nav-link">
                  <i className="fas fa-tasks"></i>
                  <span>Online Assessments</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link active">
                  <i className="fas fa-chalkboard-teacher"></i>
                  <span>Online Workshops</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Resources</h3>
            <ul className="nav-links">
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-file-alt"></i>
                  <span>Report Submissions</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-clipboard-list"></i>
                  <span>Evaluation Forms</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-building"></i>
                  <span>Company Portal</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-book"></i>
                  <span>Resources Library</span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fas fa-calendar-alt"></i>
                  <span>Schedule</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        
        {/* Content Area */}
        <main className="content">
          <div className="content-header">
            <h1 className="page-title">Online Workshops</h1>
            <p className="page-description">Enhance your skills with interactive workshops led by industry experts</p>
          </div>
          
          <div className="content-card">
            <h2 className="card-title">Upcoming Workshops</h2>
            
            <div className="workshops-list">
              {workshops.filter(w => w.status === 'upcoming').map((workshop, index) => (
                <div key={index} className="workshop-item">
                  <div className="workshop-details">
                    <div className="workshop-info">
                      <h3 className="workshop-title">{workshop.title}</h3>
                      <p className="workshop-presenter">{workshop.presenter}</p>
                      <div className="workshop-schedule">
                        <i className="far fa-calendar"></i>
                        <span>{workshop.date}</span>
                        <i className="far fa-clock"></i>
                        <span>{workshop.time}</span>
                        {workshop.registered && (
                          <span className="notification-badge">
                            <i className="fas fa-bell"></i> Starts in {Math.floor(Math.random() * 24)} hours
                          </span>
                        )}
                      </div>
                    </div>
                    {workshop.registered ? (
                      <div className="workshop-actions">
                        <span className="registered-badge">Registered</span>
                        <button 
                          className="join-button"
                          onClick={() => handleJoinWorkshop(workshop)}
                        >
                          <i className="fas fa-video"></i> Join
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="register-button"
                        onClick={() => handleRegister(workshop.id)}
                      >
                        Register
                      </button>
                    )}
                  </div>
                  <div className="workshop-description">
                    <p>{workshop.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="content-card">
            <h2 className="card-title">Completed Workshops</h2>
            
            <div className="workshops-list">
              {workshops.filter(w => w.status === 'completed').map((workshop, index) => (
                <div key={index} className="workshop-item completed">
                  <div className="workshop-details">
                    <div className="workshop-info">
                      <h3 className="workshop-title">{workshop.title}</h3>
                      <p className="workshop-presenter">{workshop.presenter}</p>
                      <div className="workshop-schedule">
                        <i className="far fa-calendar"></i>
                        <span>{workshop.date}</span>
                        <span className="completed-badge">Completed</span>
                      </div>
                    </div>
                    <div className="workshop-actions">
                      <button 
                        className="action-button"
                        onClick={() => handleViewRecording(workshop.id)}
                      >
                        <i className="fas fa-play"></i> View Recording
                      </button>
                      <button 
                        className="action-button"
                        onClick={() => handleDownloadCertificate(workshop.id)}
                      >
                        <i className="fas fa-certificate"></i> Download Certificate
                      </button>
                    </div>
                  </div>
                  <div className="workshop-rating">
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <i 
                          key={star} 
                          className={`fas fa-star ${star <= workshop.rating ? 'active' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="rating-text">
                      {workshop.rating > 0 ? `Your rating: ${workshop.rating}/5` : 'Not rated yet'}
                    </span>
                    {workshop.feedback && (
                      <p className="workshop-feedback">
                        <strong>Your feedback:</strong> {workshop.feedback}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      {/* Modals */}
      {showVideoConferenceModal && <VideoConferenceModal />}
      {showRecordingModal && <RecordingModal />}
    </div>
  );
}

export default Workshops;