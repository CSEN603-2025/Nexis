import React, { useState, useEffect, useRef } from 'react';
import './Workshops.css';
import EmojiPicker from 'emoji-picker-react';

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
      recordingUrl: 'dummy-video.mp4',
      certificateUrl: '/sample-certificate.pdf',
      feedback: '',
      rating: 0,
      notes: '',
      notification: true
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
      recordingUrl: 'dummy-video.mp4',
      certificateUrl: '/sample-certificate.pdf',
      feedback: '',
      rating: 0,
      notes: '',
      notification: false
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
      recordingUrl: '/dummy-video.mp4',
      certificateUrl: '/sample-certificate.pdf',
      feedback: '',
      rating: 0,
      notes: '',
      notification: false
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
      recordingUrl: '/dummy-video.mp4',
      certificateUrl: '/sample-certificate.pdf',
      feedback: '',
      rating: 0,
      notes: '',
      notification: true
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
      recordingUrl: '/dummy-video.mp4',
      certificateUrl: '/sample-certificate.pdf',
      feedback: 'Great workshop with practical tips!',
      rating: 5,
      notes: 'Focus on quantifiable achievements\nTailor resume for each application',
      notification: false
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
      recordingUrl: '/dummy-video.mp4',
      certificateUrl: '/sample-certificate.pdf',
      feedback: 'Helpful for improving team collaboration',
      rating: 4,
      notes: 'Active listening techniques\nNon-verbal communication matters',
      notification: false
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'workshop',
      message: 'Your workshop "Building Your Professional Brand" starts in 2 hours',
      timestamp: '2025-05-15 12:00',
      read: false
    },
    {
      id: 2,
      type: 'chat',
      message: 'New message from Sarah Johnson in "Building Your Professional Brand"',
      timestamp: '2025-05-15 11:30',
      read: false
    }
  ]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Simulated participants data
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

  // Handle register for workshop
  const handleRegister = (workshopId) => {
    const updatedWorkshops = workshops.map(workshop => 
      workshop.id === workshopId ? { ...workshop, registered: true, notification: true } : workshop
    );
    setWorkshops(updatedWorkshops);
    
    const workshop = workshops.find(w => w.id === workshopId);
    const newNotification = {
      id: Date.now(),
      type: 'registration',
      message: `You've registered for "${workshop.title}" on ${workshop.date}`,
      timestamp: new Date().toLocaleString(),
      read: false
    };
    setNotifications([...notifications, newNotification]);
    
    alert('You have successfully registered for this workshop!');
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
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = workshop.certificateUrl;
      link.download = `Certificate_${workshop.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
      window.open(workshop.recordingUrl, '_blank');
    } else {
      alert('Recording is not yet available. Please check back later.');
    }
  };

  // Video Conference Modal Component
  const VideoConferenceModal = () => {
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [activeTab, setActiveTab] = useState('participants');
    const [messages, setMessages] = useState([
      { 
        id: 1, 
        sender: activeWorkshop.presenter.split(',')[0], 
        message: 'Welcome everyone to the workshop! We\'ll be starting in a few minutes.', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPresenter: true
      },
      { 
        id: 2, 
        sender: 'Alex Thompson', 
        message: 'Looking forward to it!', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPresenter: false
      },
      { 
        id: 3, 
        sender: 'Jessica Lee', 
        message: 'Will the slides be available after the session?', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPresenter: false
      },
      { 
        id: 4, 
        sender: activeWorkshop.presenter.split(',')[0], 
        message: 'Yes, I\'ll share all materials after the workshop.', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPresenter: true
      }
    ]);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [raisedHand, setRaisedHand] = useState(false);
    const [showFileUpload, setShowFileUpload] = useState(false);
    
    const videoRef = useRef(null);
    const localVideoRef = useRef(null);
    const screenShareRef = useRef(null);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    // Simulate new messages from participants
    useEffect(() => {
      const timer = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomParticipants = participants.filter(p => p.role === 'Student' && p.name !== 'Menna Elsayed');
          if (randomParticipants.length > 0) {
            const randomParticipant = randomParticipants[Math.floor(Math.random() * randomParticipants.length)];
            const newMessage = {
              id: Date.now(),
              sender: randomParticipant.name,
              message: getRandomMessage(),
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isPresenter: false
            };
            setMessages(prev => [...prev, newMessage]);
            if (activeTab !== 'chat') {
              setUnreadMessages(prev => prev + 1);
              const newNotification = {
                id: Date.now(),
                type: 'chat',
                message: `New message from ${randomParticipant.name}`,
                timestamp: new Date().toLocaleString(),
                read: false
              };
              setNotifications(prev => [...prev, newNotification]);
            }
          }
        }
      }, 8000);

      return () => clearInterval(timer);
    }, [activeTab]);

    const getRandomMessage = () => {
      const messages = [
        "That's a great point!",
        "I have a question about the last slide",
        "Could you explain that again?",
        "This is really helpful, thanks!",
        "Has anyone tried this approach before?",
        "I'm having trouble with this part",
        "Can you share the slides after the workshop?",
        "What's the best way to practice this?"
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    };

    // Auto-scroll chat to bottom when new messages arrive
    useEffect(() => {
      if (chatContainerRef.current && activeTab === 'chat') {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        setUnreadMessages(0);
      }
    }, [messages, activeTab]);

    // Get video stream when modal opens
    useEffect(() => {
      const getVideoStream = async () => {
        try {
          if (showVideoConferenceModal && isCameraOn) {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: isMicOn
            });
            
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          }
        } catch (err) {
          console.error("Error accessing media devices:", err);
          if (localVideoRef.current) {
            localVideoRef.current.src = "https://placehold.co/600x400?text=No+Camera";
          }
        }
      };

      getVideoStream();

      return () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
      };
    }, [showVideoConferenceModal, isCameraOn, isMicOn]);

    // Simulate presenter video
    useEffect(() => {
      if (showVideoConferenceModal && videoRef.current) {
        videoRef.current.src = "/presenter-video.mp4";
        videoRef.current.loop = true;
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      }
    }, [showVideoConferenceModal]);

    const handleSendMessage = () => {
      if (chatInput.trim()) {
        const newMessage = {
          id: Date.now(),
          sender: 'You',
          message: chatInput,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isPresenter: false
        };
        setMessages(prev => [...prev, newMessage]);
        setChatInput('');
        
        setTimeout(() => {
          const responses = [
            "Thanks for your question!",
            "I'll address that in a moment",
            "Great point!",
            "Let me add that to our discussion",
            "Has anyone else experienced this?"
          ];
          const presenterResponse = {
            id: Date.now(),
            sender: activeWorkshop.presenter.split(',')[0],
            message: responses[Math.floor(Math.random() * responses.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isPresenter: true
          };
          setMessages(prev => [...prev, presenterResponse]);
        }, 2000);
      }
    };

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const newMessage = {
          id: Date.now(),
          sender: 'You',
          message: `File: ${file.name}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isPresenter: false,
          isFile: true,
          file: {
            name: file.name,
            size: file.size,
            type: file.type
          }
        };
        setMessages(prev => [...prev, newMessage]);
        setSelectedFile(file);
        setShowFileUpload(false);
      }
    };

    const onEmojiClick = (emojiData) => {
      setChatInput(prev => prev + emojiData.emoji);
      setShowEmojiPicker(false);
    };

    const toggleRaiseHand = () => {
      setRaisedHand(!raisedHand);
      if (!raisedHand) {
        const newMessage = {
          id: Date.now(),
          sender: 'You',
          message: '✋ Raised hand',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isPresenter: false,
          isSystem: true
        };
        setMessages(prev => [...prev, newMessage]);
        
        setTimeout(() => {
          const response = {
            id: Date.now(),
            sender: activeWorkshop.presenter.split(',')[0],
            message: 'I see your raised hand. What would you like to ask?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isPresenter: true
          };
          setMessages(prev => [...prev, response]);
          setRaisedHand(false);
        }, 3000);
      }
    };

    const toggleCamera = async () => {
      if (!isCameraOn) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: isMicOn
          });
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          setIsCameraOn(true);
        } catch (err) {
          console.error("Error accessing camera:", err);
          alert("Could not access camera. Please check permissions.");
        }
      } else {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          localVideoRef.current.srcObject.getVideoTracks().forEach(track => track.stop());
          localVideoRef.current.srcObject = null;
        }
        setIsCameraOn(false);
      }
    };

    const toggleMic = () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
        audioTracks.forEach(track => {
          track.enabled = !track.enabled;
        });
        setIsMicOn(!isMicOn);
      }
    };

    const toggleScreenShare = async () => {
      try {
        if (!isScreenSharing) {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
          });
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = screenStream;
          }
          
          screenStream.getVideoTracks()[0].onended = () => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = null;
            }
            setIsScreenSharing(false);
          };
          
          setIsScreenSharing(true);
        } else {
          if (localVideoRef.current && localVideoRef.current.srcObject) {
            localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
            localVideoRef.current.srcObject = null;
          }
          setIsScreenSharing(false);
        }
      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    };

    if (!activeWorkshop) return null;

    return (
      <div className="video-conference-modal" id="videoConferenceModal">
        <div className="video-conference-container">
          <div className="video-header">
            <div>
              <h2>{activeWorkshop.title}</h2>
              <p className="presenter-name">{activeWorkshop.presenter}</p>
            </div>
            <div className="header-actions">
              <button 
                onClick={() => setShowVideoConferenceModal(false)}
                className="close-button"
              >
                <i className="fas fa-times"></i> Leave
              </button>
            </div>
          </div>
          
          <div className="video-content">
            <div className="video-area">
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
                  {raisedHand && <div className="raised-hand-indicator"><i className="fas fa-hand-paper"></i></div>}
                </div>
              </div>
              
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
            </div>
            
            <div className="video-sidebar">
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
                  {unreadMessages > 0 && (
                    <span className="new-message-indicator">{unreadMessages}</span>
                  )}
                </button>
              </div>
              
              <div className="tab-content">
                {activeTab === 'participants' && (
                  <div className="participants-tab">
                    <div className="participants-header">
                      <h3>Participants ({participants.length})</h3>
                      <div className="search-participants">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search participants..." />
                      </div>
                    </div>
                    <div className="participants-list">
                      {participants.map((p) => (
                        <div key={p.id} className="participant-item">
                          <div className="participant-avatar">
                            {p.name.split(' ').map(n => n[0]).join('')}
                            {p.isSpeaking && <div className="speaking-indicator"></div>}
                          </div>
                          <div className="participant-info">
                            <div className="participant-name">
                              {p.name}
                              {p.role === 'Presenter' && <span className="presenter-badge">Presenter</span>}
                            </div>
                            <div className="participant-status">
                              <span className={`status-icon ${p.hasCamera ? '' : 'off'}`}>
                                <i className={p.hasCamera ? 'fas fa-video' : 'fas fa-video-slash'}></i>
                              </span>
                              <span className={`status-icon ${p.hasMic ? '' : 'off'}`}>
                                <i className={p.hasMic ? 'fas fa-microphone' : 'fas fa-microphone-slash'}></i>
                              </span>
                              {p.role === 'Student' && (
                                <button className="private-message-button">
                                  <i className="fas fa-envelope"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'chat' && (
                  <div className="chat-container">
                    <div className="chat-header">
                      <h3>Workshop Chat</h3>
                      <button 
                        className="faq-button"
                        onClick={() => setShowFAQ(!showFAQ)}
                      >
                        <i className="fas fa-question-circle"></i> FAQ
                      </button>
                    </div>
                    
                    {showFAQ && (
                      <div className="faq-section">
                        <h4>Frequently Asked Questions</h4>
                        <ul>
                          <li>Q: Will the slides be available after?<br/>A: Yes, all materials will be shared via email.</li>
                          <li>Q: Can I get a certificate?<br/>A: Certificates are available after completing the feedback form.</li>
                          <li>Q: How do I ask a question?<br/>A: Type in the chat or raise your hand using the hand icon.</li>
                        </ul>
                      </div>
                    )}
                    
                    <div className="chat-messages" ref={chatContainerRef}>
                      {messages.map((msg) => (
                        <div key={msg.id} className={`chat-message ${msg.sender === 'You' ? 'own-message' : ''} ${msg.isPresenter ? 'presenter-message' : ''}`}>
                          <div className="message-avatar">
                            {msg.sender.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="message-content">
                            <div className="message-header">
                              <span className="message-sender">{msg.sender}</span>
                              <span className="message-time">{msg.time}</span>
                            </div>
                            {msg.isFile ? (
                              <div className="file-message">
                                <i className="fas fa-file"></i>
                                <span>{msg.file.name}</span>
                                <button className="download-button">
                                  <i className="fas fa-download"></i>
                                </button>
                              </div>
                            ) : (
                              <p className="message-text">{msg.message}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="chat-input-container">
                      <div className="input-tools">
                        <button 
                          className="tool-button"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                          <i className="far fa-smile"></i>
                        </button>
                        <button 
                          className="tool-button"
                          onClick={() => fileInputRef.current.click()}
                        >
                          <i className="fas fa-paperclip"></i>
                        </button>
                        <input 
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          style={{ display: 'none' }}
                        />
                      </div>
                      {showEmojiPicker && (
                        <div className="emoji-picker-container">
                          <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                      )}
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
                )}
              </div>
            </div>
          </div>
          
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
                onClick={toggleScreenShare}
                className={`control-button ${isScreenSharing ? 'sharing' : ''}`}
                title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
              >
                <i className="fas fa-desktop"></i>
              </button>
              <button 
                onClick={toggleRaiseHand}
                className={`control-button ${raisedHand ? 'active' : ''}`}
                title={raisedHand ? 'Lower hand' : 'Raise hand'}
              >
                <i className="fas fa-hand-paper"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Notification system
  const NotificationIndicator = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    };

    return (
      <div className="notification-container">
        <button 
          className="notification-button"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <i className="fas fa-bell"></i>
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </button>
        
        {showNotifications && (
          <div className="notification-dropdown">
            <div className="notification-header">
              <h3>Notifications</h3>
              <button 
                className="clear-all"
                onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
              >
                Mark all as read
              </button>
            </div>
            
            {notifications.length === 0 ? (
              <div className="empty-notifications">No new notifications</div>
            ) : (
              <div className="notification-list">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.read ? '' : 'unread'}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-icon">
                      {notification.type === 'chat' ? (
                        <i className="fas fa-comment-alt"></i>
                      ) : (
                        <i className="fas fa-calendar-check"></i>
                      )}
                    </div>
                    <div className="notification-content">
                      <p className="notification-message">{notification.message}</p>
                      <p className="notification-time">{notification.timestamp}</p>
                    </div>
                    {!notification.read && <div className="unread-dot"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
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
          <NotificationIndicator />
          <div className="user-avatar">
            ME
          </div>
        </div>
      </header>
      
      <div className="main-container">
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
                        {workshop.registered && workshop.notification && (
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
                        <i className="fas fa-certificate"></i> Certificate
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
      
      {showVideoConferenceModal && <VideoConferenceModal />}
      {showRecordingModal && (
        <div className="recording-modal">
          <div className="recording-modal-content">
            <p>The workshop recording is opening in a new tab...</p>
            <button 
              className="close-button"
              onClick={() => setShowRecordingModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workshops;