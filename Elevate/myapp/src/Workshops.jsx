import React, { useState, useEffect, useRef } from 'react';
import './Workshops.css';
import EmojiPicker from 'emoji-picker-react';

const Workshops = () => {
  const [showVideoConferenceModal, setShowVideoConferenceModal] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [currentRecording, setCurrentRecording] = useState(null);
  const [activeWorkshop, setActiveWorkshop] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState('');
  const [showNotification, setShowNotification] = useState(null);
  
  
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
      recordingUrl: '/dummy-video.mp4',
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

  const handleRegister = (workshopId) => {
    const updatedWorkshops = workshops.map(workshop => 
      workshop.id === workshopId ? { ...workshop, registered: true, notification: true } : workshop
    );
    setWorkshops(updatedWorkshops);
    
    const workshop = workshops.find(w => w.id === workshopId);
    setShowNotification({
      message: 'Registration Confirmed',
      content: `You've successfully registered for "${workshop.title}"`
    });
    setTimeout(() => setShowNotification(null), 5000);
  };

  const handleJoinWorkshop = (workshop) => {
    setActiveWorkshop(workshop);
    setShowVideoConferenceModal(true);
  };

  const handleDownloadCertificate = (workshopId) => {
    const workshop = workshops.find(w => w.id === workshopId);
    if (workshop && workshop.certificateUrl) {
      // In a real app, this would download the actual certificate
      setShowNotification({
        message: 'Certificate Downloaded',
        content: `Certificate for "${workshop.title}" has been downloaded`
      });
      setTimeout(() => setShowNotification(null), 5000);
    } else {
      setShowNotification({
        message: 'Certificate Not Available',
        content: 'The certificate is not yet available. Please check back later.'
      });
      setTimeout(() => setShowNotification(null), 5000);
    }
  };

  const handleViewRecording = (workshopId) => {
    const workshop = workshops.find(w => w.id === workshopId);
    if (workshop && workshop.recordingUrl) {
<<<<<<< Updated upstream
      // In a real app, this would open the recording
      setTimeout(() => {
=======
      setCurrentRecording(workshop);
      setShowRecordingModal(true);
      // In a real app, this would open the recording
      setTimeout(() => {
        setShowRecordingModal(false);
>>>>>>> Stashed changes
        window.open(workshop.recordingUrl, '_blank');
      }, 2000);
    } else {
      setShowNotification({
        message: 'Recording Not Available',
        content: 'The recording is not yet available. Please check back later.'
      });
      setTimeout(() => setShowNotification(null), 5000);
    }
  };

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
<<<<<<< Updated upstream
=======
      },
      { 
        id: 2, 
        sender: 'Alex Thompson', 
        message: 'Looking forward to it!', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPresenter: false
>>>>>>> Stashed changes
      }
    ]);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [raisedHand, setRaisedHand] = useState(false);
    const [pinnedMessage, setPinnedMessage] = useState(null);
    
    const videoRef = useRef(null);
    const localVideoRef = useRef(null);
    const chatContainerRef = useRef(null);

<<<<<<< Updated upstream
    // Participants data
    const participants = [
      { id: 1, name: activeWorkshop.presenter.split(',')[0], role: 'Presenter', isSpeaking: true, hasCamera: true, hasMic: true },
      { id: 2, name: 'Alex Thompson', role: 'Student', isSpeaking: false, hasCamera: true, hasMic: true },
      { id: 3, name: 'Jessica Lee', role: 'Student', isSpeaking: false, hasCamera: false, hasMic: true },
      { id: 4, name: 'David Miller', role: 'Student', isSpeaking: false, hasCamera: true, hasMic: false },
      { id: 5, name: 'Emily Wilson', role: 'Student', isSpeaking: false, hasCamera: true, hasMic: true }
    ];

=======
>>>>>>> Stashed changes
    // Simulate video stream
    useEffect(() => {
      const getVideoStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: isCameraOn,
            audio: isMicOn
          });
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing media devices:", err);
<<<<<<< Updated upstream
=======
          if (localVideoRef.current) {
            localVideoRef.current.src = "https://placehold.co/600x400?text=No+Camera";
          }
>>>>>>> Stashed changes
        }
      };

      getVideoStream();

      return () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
      };
    }, [isCameraOn, isMicOn]);

    // Simulate presenter video
    useEffect(() => {
      if (showVideoConferenceModal && videoRef.current) {
<<<<<<< Updated upstream
        // In a real app, this would be the presenter's video stream
        videoRef.current.src = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";
=======
        videoRef.current.src = "/presenter-video.mp4";
>>>>>>> Stashed changes
        videoRef.current.loop = true;
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      }
    }, [showVideoConferenceModal]);

<<<<<<< Updated upstream
    // Auto-scroll chat to bottom
=======
    // Simulate incoming messages
>>>>>>> Stashed changes
    useEffect(() => {
      const timer = setInterval(() => {
        if (Math.random() > 0.7) {
          const names = ['Alex Thompson', 'Jessica Lee', 'David Miller', 'Emily Wilson'];
          const randomName = names[Math.floor(Math.random() * names.length)];
          const newMessage = {
            id: Date.now(),
            sender: randomName,
            message: getRandomMessage(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isPresenter: false
          };
          setMessages(prev => [...prev, newMessage]);
          
          // Show notification popup
          setShowNotification({
            message: `New message from ${randomName}`,
            content: newMessage.message
          });
          
          setTimeout(() => setShowNotification(null), 5000);
        }
      }, 8000);

      return () => clearInterval(timer);
    }, []);

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
        
<<<<<<< Updated upstream
        // Simulate responses
=======
        // Simulate response
>>>>>>> Stashed changes
        setTimeout(() => {
          const responses = [
            "Thanks for your question!",
            "I'll address that in a moment",
            "Great point!",
            "Let me add that to our discussion",
            "Has anyone else experienced this?"
          ];
<<<<<<< Updated upstream
          const response = {
            id: Date.now(),
            sender: Math.random() > 0.5 ? activeWorkshop.presenter.split(',')[0] : participants[Math.floor(Math.random() * participants.length)].name,
            message: randomResponses[Math.floor(Math.random() * randomResponses.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isPresenter: Math.random() > 0.5
          };
          setMessages(prev => [...prev, response]);
        }, 1000 + Math.random() * 2000);
=======
          const presenterResponse = {
            id: Date.now(),
            sender: activeWorkshop.presenter.split(',')[0],
            message: responses[Math.floor(Math.random() * responses.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isPresenter: true
          };
          setMessages(prev => [...prev, presenterResponse]);
        }, 2000);
>>>>>>> Stashed changes
      }
    };

    const toggleCamera = async () => {
<<<<<<< Updated upstream
      setIsCameraOn(!isCameraOn);
    };

    const toggleMic = () => {
      setIsMicOn(!isMicOn);
=======
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
          setShowNotification({
            message: 'Camera Error',
            content: 'Could not access camera. Please check permissions.'
          });
          setTimeout(() => setShowNotification(null), 5000);
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
>>>>>>> Stashed changes
    };

    const toggleScreenShare = async () => {
      try {
        if (!isScreenSharing) {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
          });
          
<<<<<<< Updated upstream
          if (videoRef.current) {
            videoRef.current.srcObject = screenStream;
          }
          
          screenStream.getVideoTracks()[0].onended = () => {
            setIsScreenSharing(false);
            // Return to presenter video
            if (videoRef.current) {
              videoRef.current.src = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";
              videoRef.current.play();
=======
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = screenStream;
          }
          
          screenStream.getVideoTracks()[0].onended = () => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = null;
>>>>>>> Stashed changes
            }
            setIsScreenSharing(false);
          };
          
          setIsScreenSharing(true);
<<<<<<< Updated upstream
        } catch (err) {
          console.error("Error sharing screen:", err);
        }
      } else {
        setIsScreenSharing(false);
        if (videoRef.current) {
          videoRef.current.src = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";
          videoRef.current.play();
=======
        } else {
          if (localVideoRef.current && localVideoRef.current.srcObject) {
            localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
            localVideoRef.current.srcObject = null;
          }
          setIsScreenSharing(false);
>>>>>>> Stashed changes
        }
      } catch (err) {
        console.error("Error sharing screen:", err);
        setShowNotification({
          message: 'Screen Share Error',
          content: 'Could not share screen. Please try again.'
        });
        setTimeout(() => setShowNotification(null), 5000);
      }
    };

    const toggleRaiseHand = () => {
      setRaisedHand(!raisedHand);
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
    };

    const handlePinMessage = (message) => {
      setPinnedMessage(message);
<<<<<<< Updated upstream
=======
      setShowNotification({
        message: 'Message Pinned',
        content: 'This message is now visible to all participants'
      });
      setTimeout(() => setShowNotification(null), 5000);
>>>>>>> Stashed changes
    };

    const handleEndMeeting = () => {
      setShowVideoConferenceModal(false);
      setShowRatingModal(true);
    };

    return (
      <div className="video-conference-modal">
        <div className="video-conference-container">
          <div className="video-header">
            <div>
              <h2>{activeWorkshop.title}</h2>
              <p className="presenter-name">{activeWorkshop.presenter}</p>
            </div>
            <div className="header-actions">
              <button 
                onClick={handleEndMeeting}
                className="end-button"
              >
                <i className="fas fa-times"></i> End Meeting
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
<<<<<<< Updated upstream
                  className="video-element"
                />
                {isScreenSharing && (
                  <div className="screen-share-indicator">
                    <i className="fas fa-desktop"></i> Screen Sharing
                  </div>
                )}
=======
                  muted={!isMicOn}
                  className="video-element"
                />
>>>>>>> Stashed changes
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
            </div>
            
            <div className="video-sidebar">
              <div className="sidebar-tabs">
                <button 
                  onClick={() => setActiveTab('participants')}
                  className={activeTab === 'participants' ? 'active' : ''}
                >
                  <i className="fas fa-users"></i>
                  Participants (8)
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('chat');
                    setUnreadMessages(0);
                  }}
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
                    <div className="participants-list">
                      {[
                        { id: 1, name: activeWorkshop.presenter.split(',')[0], role: 'Presenter' },
                        { id: 2, name: 'Alex Thompson', role: 'Student' },
                        { id: 3, name: 'Jessica Lee', role: 'Student' },
                        { id: 4, name: 'David Miller', role: 'Student' },
                        { id: 5, name: 'Emily Wilson', role: 'Student' },
                        { id: 6, name: 'Michael Chen', role: 'Student' },
                        { id: 7, name: 'Emma Davis', role: 'Student' },
                        { id: 8, name: 'Robert Johnson', role: 'Student' }
                      ].map((p) => (
                        <div key={p.id} className="participant-item">
                          <div className="participant-avatar">
                            {p.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="participant-info">
                            <div className="participant-name">
                              {p.name}
                              {p.role === 'Presenter' && <span className="presenter-badge">Presenter</span>}
                            </div>
                          </div>
                        </div>
                      ))}
<<<<<<< Updated upstream
                      {/* Add yourself to participants list */}
                      <div className="participant-item you">
                        <div className="participant-avatar">
                          You
                          {raisedHand && <div className="speaking-indicator"></div>}
                        </div>
                        <div className="participant-info">
                          <div className="participant-name">
                            You (Me)
                          </div>
                          <div className="participant-status">
                            <i className={`fas fa-video${isCameraOn ? '' : '-slash'}`}></i>
                            <i className={`fas fa-microphone${isMicOn ? '' : '-slash'}`}></i>
                          </div>
                        </div>
                      </div>
=======
>>>>>>> Stashed changes
                    </div>
                  </div>
                )}
                
                {activeTab === 'chat' && (
                  <div className="chat-container">
                    {pinnedMessage && (
                      <div className="pinned-message">
                        <div className="pinned-header">
                          <i className="fas fa-thumbtack"></i>
                          <span>Pinned message</span>
                        </div>
                        <div className="pinned-content">
                          <strong>{pinnedMessage.sender}</strong>: {pinnedMessage.message}
                        </div>
                      </div>
                    )}
                    
                    <div className="chat-messages" ref={chatContainerRef}>
                      <div className="chat-info">
                        <p>You can pin a message to make it visible for people who join later. When you leave the call, you won't be able to access this chat.</p>
                      </div>
                      
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
<<<<<<< Updated upstream
                          className={`chat-message ${msg.sender === 'You' ? 'own-message' : ''} ${msg.isPresenter ? 'presenter-message' : ''}`}
                        >
                          <div className="message-avatar">
                            {msg.sender.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="message-content">
                            <div className="message-header">
                              <span className="message-sender">{msg.sender}</span>
                              <span className="message-time">{msg.time}</span>
                              {msg.sender !== 'You' && (
                                <button 
                                  className="pin-button"
                                  onClick={() => handlePinMessage(msg)}
=======
                          className={`chat-message ${msg.sender === 'You' ? 'own-message' : ''}`}
                        onMouseEnter={() => {
  const pinButton = document.getElementById(`pin-${msg.id}`);
  if (pinButton) pinButton.style.display = 'block';
}}
onMouseLeave={() => {
  const pinButton = document.getElementById(`pin-${msg.id}`);
  if (pinButton) pinButton.style.display = 'none';
}}
                        >
                          <div className="message-content">
                            <div className="message-header">
                              <strong>{msg.sender}</strong>
                              <span className="message-time">{msg.time}</span>
                              {msg.sender !== 'You' && !msg.isSystem && (
                                <button 
                                  id={`pin-${msg.id}`}
                                  className="pin-button"
                                  onClick={() => handlePinMessage(msg)}
                                  style={{ display: 'none' }}
>>>>>>> Stashed changes
                                >
                                  <i className="fas fa-thumbtack"></i>
                                </button>
                              )}
                            </div>
                            <p className="message-text">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="chat-input-container">
                      <input
                        type="text"
                        placeholder="Send a message"
                        className="chat-input"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button 
                        className="send-button"
                        onClick={handleSendMessage}
                      >
                        <i className="fas fa-paper-plane"></i> Send
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
              >
                <i className={isMicOn ? 'fas fa-microphone' : 'fas fa-microphone-slash'}></i>
                {isMicOn ? '' : ''}
              </button>
              <button 
                onClick={toggleCamera}
                className={`control-button ${isCameraOn ? '' : 'camera-off'}`}
              >
                <i className={isCameraOn ? 'fas fa-video' : 'fas fa-video-slash'}></i>
                {isCameraOn ? '' : ''}
              </button>
              <button 
                onClick={toggleScreenShare}
                className={`control-button ${isScreenSharing ? 'sharing' : ''}`}
              >
                <i className="fas fa-desktop"></i>
               
              </button>
              <button 
                onClick={toggleRaiseHand}
                className={`control-button ${raisedHand ? 'active' : ''}`}
              >
                <i className="fas fa-hand-paper"></i>
                
              </button>
              <button 
                onClick={() => setShowVideoConferenceModal(false)}
                className="control-button leave-button"
              >
                <i className="fas fa-phone-slash"></i>
                
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RatingModal = () => {
    const handleSubmitRating = () => {
      const updatedWorkshops = workshops.map(w => 
        w.id === activeWorkshop.id 
          ? { ...w, rating: userRating, feedback: userFeedback, status: 'completed' } 
          : w
      );
      setWorkshops(updatedWorkshops);
      setShowRatingModal(false);
      setShowNotification({
        message: 'Thank you for your feedback!',
        content: `You rated "${activeWorkshop.title}" ${userRating} stars`
      });
      setTimeout(() => setShowNotification(null), 5000);
    };

    return (
      <div className="rating-modal">
        <div className="rating-modal-content">
          <h2>Rate this Workshop</h2>
          <p>How would you rate "{activeWorkshop.title}"?</p>
          
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <i 
                key={star} 
                className={`fas fa-star ${star <= userRating ? 'active' : ''}`}
                onClick={() => setUserRating(star)}
              />
            ))}
          </div>
          
          <textarea
            placeholder="Share your feedback (optional)"
            value={userFeedback}
            onChange={(e) => setUserFeedback(e.target.value)}
          />
          
          <div className="rating-buttons">
            <button 
              className="submit-button"
              onClick={handleSubmitRating}
              disabled={userRating === 0}
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Simulate workshop notification
  useEffect(() => {
    const timer = setTimeout(() => {
      const upcomingWorkshop = workshops.find(w => w.status === 'upcoming' && w.registered);
      if (upcomingWorkshop) {
        setShowNotification({
          message: 'Upcoming Workshop Reminder',
          content: `"${upcomingWorkshop.title}" starts in 1 hour`
        });
        setTimeout(() => setShowNotification(null), 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [workshops]);

  return (
    <div className='vid'>
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <a href="#" className="logo">
            <i className="fas fa-arrow-up"></i>
            <span>Elevate</span>
          </a>
          
          <div className="search-container">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input 
                type="text" 
                placeholder="Search workshops..." 
                className="search-input" 
              />
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="user-avatar">
            ME
          </div>
        </div>
      </header>
      
      <div className="main-container">
         <aside className="sidebar" >
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
                <a href="/workshop" className="menu-item ative">
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
                <a href="/lib" className="menu-item">
                  <i className="fas fa-book menu-icon"></i>
                  <span>Resources Library</span>
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
<<<<<<< Updated upstream
        {showVideoConferenceModal && <VideoConferenceModal />}
=======
      
      {showVideoConferenceModal && <VideoConferenceModal />}
>>>>>>> Stashed changes
      {showRatingModal && <RatingModal />}
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
      
      {showNotification && (
        <div className="notification-popup">
          <div className="notification-popup-content">
            <h4>{showNotification.message}</h4>
            <p>{showNotification.content}</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Workshops; /* General container styles */