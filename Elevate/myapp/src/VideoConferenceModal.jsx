import React, { useState } from 'react';
import './Workshops.css';

const VideoConferenceModal = ({ workshop, onClose }) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState('participants');

  // Dummy data for participants and chat
  const participants = [
    { id: 1, name: 'Menna Elsayed', role: 'Student', isSpeaking: false, hasCamera: true, hasMic: true },
    { id: 2, name: 'Sarah Johnson', role: 'Presenter', isSpeaking: true, hasCamera: true, hasMic: true },
    // ... other participants
  ];

  const chatMessages = [
    { id: 1, sender: 'Sarah Johnson', message: 'Welcome everyone!', time: '13:55' },
    // ... other messages
  ];

  return (
    <div className="video-conference-modal">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2>{workshop.title}</h2>
            <p>{workshop.presenter}</p>
          </div>
          <button onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        {/* Main Content */}
        <div className="modal-main">
          {/* Video Area */}
          <div className="video-area">
            {/* Main Video */}
            <div className="main-video">
              <div className="presenter-info">
                <div className="presenter-avatar">SJ</div>
                <p>Sarah Johnson</p>
                <p>Presenter</p>
              </div>
              <div className="speaking-indicator">
                <i className="fas fa-microphone"></i> Speaking
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="video-thumbnails">
              {participants.slice(0, 5).map((participant) => (
                <div key={participant.id} className="thumbnail">
                  <div className="participant-avatar">
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <p>{participant.name.split(' ')[0]}</p>
                  {/* Status indicators */}
                </div>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="conference-sidebar">
            {/* Tabs */}
            <div className="sidebar-tabs">
              <button 
                className={activeTab === 'participants' ? 'active' : ''}
                onClick={() => setActiveTab('participants')}
              >
                <i className="fas fa-users"></i> Participants
              </button>
              <button 
                className={activeTab === 'chat' ? 'active' : ''}
                onClick={() => setActiveTab('chat')}
              >
                <i className="fas fa-comment-alt"></i> Chat
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'participants' && (
                <div className="participants-list">
                  {participants.map((participant) => (
                    <div key={participant.id} className="participant">
                      <div className="participant-info">
                        <div className="participant-avatar-small">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p>{participant.name}</p>
                          <p>{participant.role}</p>
                        </div>
                      </div>
                      <div className="participant-status">
                        {/* Status icons */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'chat' && (
                <div className="chat-container">
                  <div className="chat-messages">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="message">
                        <div className="message-sender">{message.sender}</div>
                        <div className="message-content">{message.message}</div>
                        <div className="message-time">{message.time}</div>
                      </div>
                    ))}
                  </div>
                  <div className="chat-input">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a message..."
                    />
                    <button>
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="conference-controls">
          <div className="control-buttons">
            <button 
              className={isMicOn ? '' : 'off'}
              onClick={() => setIsMicOn(!isMicOn)}
            >
              <i className={`fas fa-${isMicOn ? 'microphone' : 'microphone-slash'}`}></i>
            </button>
            <button 
              className={isCameraOn ? '' : 'off'}
              onClick={() => setIsCameraOn(!isCameraOn)}
            >
              <i className={`fas fa-${isCameraOn ? 'video' : 'video-slash'}`}></i>
            </button>
            {/* Other controls */}
          </div>
          <button className="leave-button" onClick={onClose}>
            Leave Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoConferenceModal;