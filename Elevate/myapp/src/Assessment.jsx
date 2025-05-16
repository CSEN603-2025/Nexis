import React, { useState, useEffect, useRef } from 'react';
import './Assessment.css';

const Assessment = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [completedAssessments, setCompletedAssessments] = useState([
    { id: 1, title: 'JavaScript Fundamentals', company: 'TechGlobal', score: 92, posted: true },
    { id: 2, title: 'Problem Solving Skills', company: 'AnalyticsPro', score: 85, posted: false }
  ]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);

  // Assessment data with questions
  const assessments = [
    { 
      id: 1, 
      title: 'Web Development Skills', 
      company: 'TechGlobal', 
      duration: '45 mins', 
      questions: [
        {
          id: 1,
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Text Makeup Language"
          ],
          correctAnswer: "Hyper Text Markup Language"
        },
        {
          id: 2,
          question: "Which of the following is NOT a JavaScript framework?",
          options: [
            "React",
            "Angular",
            "Vue",
            "Django"
          ],
          correctAnswer: "Django"
        },
        {
          id: 3,
          question: "What does CSS stand for?",
          options: [
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
          ],
          correctAnswer: "Cascading Style Sheets"
        }
      ]
    },
    { 
      id: 2, 
      title: 'UI/UX Design Principles', 
      company: 'DesignHub', 
      duration: '60 mins', 
      questions: [
        {
          id: 1,
          question: "What does UX stand for?",
          options: [
            "User Experience",
            "User Example",
            "User Experiment",
            "User Extension"
          ],
          correctAnswer: "User Experience"
        },
        {
          id: 2,
          question: "Which of these is NOT a principle of good design?",
          options: [
            "Consistency",
            "Complexity",
            "Hierarchy",
            "Contrast"
          ],
          correctAnswer: "Complexity"
        }
      ]
    },
    { 
      id: 3, 
      title: 'Data Analysis Fundamentals', 
      company: 'AnalyticsPro', 
      duration: '50 mins', 
      questions: [
        {
          id: 1,
          question: "What is the most common measure of central tendency?",
          options: [
            "Mean",
            "Median",
            "Mode",
            "Range"
          ],
          correctAnswer: "Mean"
        },
        {
          id: 2,
          question: "Which of these is NOT a data visualization tool?",
          options: [
            "Tableau",
            "Power BI",
            "Excel",
            "Photoshop"
          ],
          correctAnswer: "Photoshop"
        }
      ]
    },
    { 
      id: 4, 
      title: 'Digital Marketing Basics', 
      company: 'BrandMasters', 
      duration: '40 mins', 
      questions: [
        {
          id: 1,
          question: "What does SEO stand for?",
          options: [
            "Search Engine Optimization",
            "Search Engine Operation",
            "Social Engine Optimization",
            "Search Experience Optimization"
          ],
          correctAnswer: "Search Engine Optimization"
        },
        {
          id: 2,
          question: "Which platform is primarily used for professional networking?",
          options: [
            "Facebook",
            "Instagram",
            "LinkedIn",
            "Twitter"
          ],
          correctAnswer: "LinkedIn"
        }
      ]
    },
  ];

  // Set up audio reference and user interaction tracking
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audioRef.current.load();

    const handleInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  // Simulate receiving notifications after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotifications = [
        {
          id: 1,
          title: 'Appointment Accepted',
          message: 'Your appointment with SCAD Officer has been accepted for May 15 at 2:00 PM.',
          time: 'Just now',
          read: false
        },
        {
          id: 2,
          title: 'Upcoming Workshop',
          message: 'Reminder: UI/UX Design Workshop starts tomorrow at 10:00 AM.',
          time: 'Just now',
          read: false
        },
        {
          id: 3,
          title: 'New Internship Cycle',
          message: 'The Summer 2023 internship cycle begins next Monday. Apply now!',
          time: 'Just now',
          read: false
        }
      ];
      setNotifications(newNotifications);
      setHasNewNotification(true);
      
      if (userInteracted && audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [userInteracted]);

  const startAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowScore(false);
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentAssessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAssessment = () => {
    let correctAnswers = 0;
    currentAssessment.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / currentAssessment.questions.length) * 100);
    
    const newCompletedAssessment = {
      id: currentAssessment.id,
      title: currentAssessment.title,
      company: currentAssessment.company,
      score: score,
      posted: false
    };
    
    setCompletedAssessments([...completedAssessments, newCompletedAssessment]);
    setShowScore(true);
  };

  const togglePostToProfile = (id) => {
    setCompletedAssessments(completedAssessments.map(assessment => {
      if (assessment.id === id) {
        return { ...assessment, posted: !assessment.posted };
      }
      return assessment;
    }));
  };

  const exitAssessment = () => {
    setCurrentAssessment(null);
    setShowScore(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (hasNewNotification) {
      setNotifications(notifications.map(notif => ({ ...notif, read: true })));
      setHasNewNotification(false);
    }
  };

  if (currentAssessment && !showScore) {
    const currentQuestion = currentAssessment.questions[currentQuestionIndex];
    return (
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <main className="content-area">
          <div className="content-card">
            <h2 className="section-heading">{currentAssessment.title} Assessment</h2>
            <div className="assessment-progress">
              Question {currentQuestionIndex + 1} of {currentAssessment.questions.length}
            </div>
            <div className="assessment-question">
              <h3>{currentQuestion.question}</h3>
              <div className="options-container">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`option ${answers[currentQuestion.id] === option ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className="assessment-navigation">
              {currentQuestionIndex > 0 && (
                <button className="nav-button" onClick={handlePreviousQuestion}>
                  Previous
                </button>
              )}
              {currentQuestionIndex < currentAssessment.questions.length - 1 ? (
                <button className="nav-button primary" onClick={handleNextQuestion}>
                  Next
                </button>
              ) : (
                <button className="nav-button primary" onClick={submitAssessment}>
                  Submit Assessment
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (showScore && currentAssessment) {
    const completed = completedAssessments.find(a => a.id === currentAssessment.id);
    return (
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <main className="content-area">
          <div className="content-card">
            <h2 className="section-heading">Assessment Completed</h2>
            <div className="score-display">
              <h3>Your Score: {completed.score}%</h3>
              <p>You scored {completed.score}% on the {currentAssessment.title} assessment.</p>
              <div className="score-actions">
                <button 
                  className={`post-button ${completed.posted ? 'posted' : ''}`}
                  onClick={() => togglePostToProfile(currentAssessment.id)}
                >
                  {completed.posted ? '✓ Posted to Profile' : 'Post to Profile'}
                </button>
                <button className="view-button" onClick={exitAssessment}>
                  Back to Assessments
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`assess ${darkMode ? 'dark-mode' : ''}`}>
      <header className={`app-header ${darkMode ? 'dark-header' : ''}`}>
        <div className="header-left">
          <a href="#" className="logo">
            <i className="fas fa-arrow-up logo-icon"></i>
            <span className="logo-text">Elevate</span>
          </a>
          <div className="search-container">
            <div className="search-wrapper">
             
             
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="notification-icon-container">
            <button
              onClick={toggleNotifications}
              className="notification-button"
            >
              <i className="fas fa-bell"></i>
              {hasNewNotification && <span className="notification-badge"></span>}
            </button>
            {showNotifications && (
              <div className={`notification-dropdown ${darkMode ? 'dark-notification' : ''}`}>
                <div className="notification-header">
                  <h3>Notifications</h3>
                  <button 
                    onClick={toggleNotifications}
                    className="close-notifications"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                      >
                        <div className="notification-icon">
                          <i className="fas fa-bell"></i>
                        </div>
                        <div className="notification-content">
                          <h4>{notification.title}</h4>
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-notifications">
                      <p>No new notifications</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <div className="user-avatar">
            ME
          </div>
        </div>
      </header>
      
      <div className="main-container">
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
                <a href="/assessment" className="menu-item active">
                  <i className="fas fa-tasks menu-icon"></i>
                  <span>Online Assessments</span>
                </a>
              </li>
              <li>
                <a href="/workshop" className="menu-item">
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

        
        <main className="content-area">
          <div className="page-header">
            <h1 className="page-title">Online Assessments</h1>
            <p className="page-description">Complete assessments to showcase your skills on your profile</p>
          </div>
          
          <div className="content-card">
            <h2 className="section-heading">Available Assessments</h2>
            <div className="assessment-grid">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="assessment-item">
                  <div className="assessment-header">
                    <div>
                      <h3 className="assessment-title">{assessment.title}</h3>
                      <p className="assessment-company">By {assessment.company}</p>
                      <div className="assessment-details">
                        <i className="far fa-clock detail-icon"></i>
                        <span>{assessment.duration}</span>
                        <i className="fas fa-question-circle detail-icon-space"></i>
                        <span>{assessment.questions.length} questions</span>
                      </div>
                    </div>
                    <button 
                      className="start-button"
                      onClick={() => startAssessment(assessment)}
                    >
                      Start Assessment
                    </button>
                  </div>
                  <div className="assessment-description">
                    <p>This assessment evaluates your knowledge and skills in key areas relevant to the position. Upon completion, you can choose to display your score on your profile.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="content-card">
            <h2 className="section-heading">Completed Assessments</h2>
            <div className="assessment-grid">
              {completedAssessments.map((assessment) => (
                <div key={assessment.id} className="assessment-item">
                  <div className="assessment-header">
                    <div>
                      <h3 className="assessment-title">{assessment.title}</h3>
                      <p className="assessment-company">By {assessment.company}</p>
                      <div className="assessment-badges">
                        <div className="score-badge">
                          Score: {assessment.score}%
                        </div>
                        {assessment.posted ? (
                          <div className="posted-badge">
                            <i className="fas fa-check-circle badge-icon"></i> Posted to Profile
                          </div>
                        ) : (
                          <button 
                            className="post-button"
                            onClick={() => togglePostToProfile(assessment.id)}
                          >
                            Post to Profile
                          </button>
                        )}
                      </div>
                    </div>
                    <button className="view-button">
                      View Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assessment;