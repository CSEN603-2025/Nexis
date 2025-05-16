import React, { useState } from 'react';
import { 
  FaFileUpload, 
  FaCalendarAlt, 
  FaCheck, 
  FaTimes, 
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
  FaSort,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaTrash,
  FaEdit,
  FaPaperclip,
  FaClock,
  FaFileAlt,
  FaBell,
  FaDownload,
  FaCommentAlt,
  FaReply
} from 'react-icons/fa';
import './ReportSubmissions.css';

const ReportSubmissions = () => {
  // State for form data
  const [formData, setFormData] = useState({
    studentName: 'Menna Elsayed',
    studentId: '58-1027',
    email: 'menna.elsayed@student.guc.edu.eg',
    internshipTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    internshipType: '',
    reportFile: null,
    additionalFiles: [],
    tasksDescription: '',
    skillsGained: ''
  });
// Add this to your state declarations at the beginning of the component
const [filters, setFilters] = useState({
  status: 'all',
  dateRange: 'all',
  searchTerm: ''
});
  // State for submission status
  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitted: false,
    isWithinCycle: true,
    isComplete: false,
    missingFields: [],
    plagiarismDetected: false,
    dateConflict: false,
    companyBlacklisted: false
  });

  // State for previous submissions
  const [previousSubmissions, setPreviousSubmissions] = useState([
    {
      id: 1,
      title: 'Software Engineering Internship Report',
      company: 'TechGlobal',
      dates: 'Jun 1, 2024 - Aug 30, 2024',
      status: 'Approved',
      feedback: 'Excellent report detailing your software development experience. Well documented tasks and skills gained.',
      dateSubmitted: 'Sep 5, 2024',
      fileUrl: '/reports/report1.pdf',
      additionalFiles: [
        { name: 'evaluation.pdf', url: '/reports/evaluation1.pdf' },
        { name: 'certificate.pdf', url: '/reports/certificate1.pdf' }
      ],
      reviewedDate: 'Sep 10, 2024'
    },
    {
      id: 2,
      title: 'UX Design Internship Report',
      company: 'DesignHub',
      dates: 'Jan 15, 2024 - Apr 15, 2024',
      status: 'Rejected',
      feedback: 'Missing company evaluation form and incomplete tasks description. Please resubmit with the required documents.',
      dateSubmitted: 'Apr 20, 2024',
      fileUrl: '/reports/report2.docx',
      additionalFiles: [],
      reviewedDate: 'Apr 25, 2024'
    }
  ]);

  // State for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'status-update',
      message: 'Your UX Design Internship Report has been reviewed',
      read: false,
      date: '2024-04-25',
      submissionId: 2
    },
    {
      id: 2,
      type: 'reminder',
      message: 'Reminder: Internship report submission deadline is October 15',
      read: false,
      date: '2024-09-20'
    }
  ]);

  // State for UI
  const [viewingSubmission, setViewingSubmission] = useState(null);
  const [appealMessage, setAppealMessage] = useState('');
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'dateSubmitted', direction: 'descending' });

  // Current submission cycle dates
  const currentCycle = {
    start: '2024-09-01',
    end: '2024-10-15'
  };

  // Check if current date is within submission cycle
  const checkSubmissionCycle = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    return currentDate >= currentCycle.start && currentDate <= currentCycle.end;
  };

  // Validate form function
  const validateForm = () => {
    const requiredFields = [
      'internshipTitle', 'companyName', 'startDate', 'endDate', 
      'internshipType', 'reportFile', 'tasksDescription', 'skillsGained'
    ];
    const missing = requiredFields.filter(field => !formData[field]);
    
    setSubmissionStatus(prev => ({
      ...prev,
      missingFields: missing,
      isComplete: missing.length === 0
    }));
    
    return missing.length === 0;
  };

  // Check for plagiarism (mock function)
  const checkForPlagiarism = async (file) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Math.random() < 0.1);
      }, 1000);
    });
  };

  // Check company against blacklist (mock function)
  const checkCompanyBlacklist = async (companyName) => {
    const blacklistedCompanies = ['FakeCorp', 'ScamInc', 'UnethicalLLC'];
    return blacklistedCompanies.includes(companyName);
  };

  // Check dates against academic calendar (mock function)
  const checkDateConflicts = (startDate, endDate, internshipType) => {
    const activeSemesters = [
      { start: '2024-02-10', end: '2024-06-15' },
      { start: '2024-09-15', end: '2024-12-20' }
    ];
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    for (const semester of activeSemesters) {
      const semesterStart = new Date(semester.start);
      const semesterEnd = new Date(semester.end);
      
      if (
        (start >= semesterStart && start <= semesterEnd) ||
        (end >= semesterStart && end <= semesterEnd) ||
        (start <= semesterStart && end >= semesterEnd)
      ) {
        if (internshipType !== 'part-time') {
          return true;
        }
      }
    }
    return false;
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, reportFile: file }));
    }
  };

  // Handle additional files
  const handleAdditionalFiles = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      additionalFiles: [...prev.additionalFiles, ...files]
    }));
  };

  // Remove additional file
  const removeAdditionalFile = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalFiles: prev.additionalFiles.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!checkSubmissionCycle()) {
      setSubmissionStatus(prev => ({ ...prev, isWithinCycle: false }));
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    const hasPlagiarism = await checkForPlagiarism(formData.reportFile);
    const isBlacklisted = await checkCompanyBlacklist(formData.companyName);
    const hasDateConflict = checkDateConflicts(
      formData.startDate,
      formData.endDate,
      formData.internshipType
    );
    
    setSubmissionStatus(prev => ({
      ...prev,
      plagiarismDetected: hasPlagiarism,
      companyBlacklisted: isBlacklisted,
      dateConflict: hasDateConflict,
      isSubmitted: !hasPlagiarism && !isBlacklisted && !hasDateConflict
    }));
    
    if (!hasPlagiarism && !isBlacklisted && !hasDateConflict) {
      const newSubmission = {
        id: previousSubmissions.length + 1,
        title: formData.internshipTitle,
        company: formData.companyName,
        dates: `${new Date(formData.startDate).toLocaleDateString()} - ${new Date(formData.endDate).toLocaleDateString()}`,
        status: 'Pending',
        feedback: '',
        dateSubmitted: new Date().toLocaleDateString(),
        fileUrl: URL.createObjectURL(formData.reportFile),
        additionalFiles: formData.additionalFiles.map(file => ({
          name: file.name,
          url: URL.createObjectURL(file)
        })),
        reviewedDate: ''
      };
      
      setPreviousSubmissions(prev => [newSubmission, ...prev]);
      
      // Add notification
      const newNotification = {
        id: notifications.length + 1,
        type: 'submission',
        message: `Your ${formData.internshipTitle} report has been submitted`,
        read: false,
        date: new Date().toISOString().split('T')[0],
        submissionId: newSubmission.id
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setShowNotificationBadge(true);
      
      // Reset form
      setFormData(prev => ({
        ...prev,
        internshipTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        internshipType: '',
        reportFile: null,
        additionalFiles: [],
        tasksDescription: '',
        skillsGained: ''
      }));
    }
  };

  // Handle sort request
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort submissions
  const sortedSubmissions = [...previousSubmissions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Filter previous submissions
  const filteredSubmissions = sortedSubmissions.filter(submission => {
    const matchesStatus = filters.status === 'all' || submission.status.toLowerCase() === filters.status;
    const matchesSearch = submission.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
                         submission.company.toLowerCase().includes(filters.searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get file icon based on type
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch(extension) {
      case 'pdf': return <FaFilePdf className="file-icon pdf" />;
      case 'doc':
      case 'docx': return <FaFileWord className="file-icon word" />;
      case 'xls':
      case 'xlsx': return <FaFileExcel className="file-icon excel" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return <FaFileImage className="file-icon image" />;
      default: return <FaFileAlt className="file-icon" />;
    }
  };

  // View submission details
  const viewSubmission = (submission) => {
    setViewingSubmission(submission);
  };

  // Close submission view
  const closeView = () => {
    setViewingSubmission(null);
    setAppealMessage('');
  };

  // Handle appeal submission
  const handleAppeal = () => {
    if (!appealMessage.trim()) return;
    
    const updatedSubmissions = previousSubmissions.map(sub => {
      if (sub.id === viewingSubmission.id) {
        return { 
          ...sub, 
          status: 'Appealed',
          feedback: `STUDENT APPEAL: ${appealMessage}\n\nOriginal Feedback: ${sub.feedback}`
        };
      }
      return sub;
    });
    
    setPreviousSubmissions(updatedSubmissions);
    
    // Add notification
    const newNotification = {
      id: notifications.length + 1,
      type: 'appeal',
      message: `You appealed the decision on ${viewingSubmission.title}`,
      read: false,
      date: new Date().toISOString().split('T')[0],
      submissionId: viewingSubmission.id
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setShowNotificationBadge(true);
    
    closeView();
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    if (notifications.filter(n => !n.read).length === 1) {
      setShowNotificationBadge(false);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => 
      ({ ...notification, read: true })
    ));
    setShowNotificationBadge(false);
  };

  // Download file
  const downloadFile = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="report-submissions-container">
      <div className="submission-header">
        <h1><FaFileUpload /> Report Submissions</h1>
        <div className="header-actions">
          <p className="submission-cycle-info">
            <FaCalendarAlt /> Current cycle: {new Date(currentCycle.start).toLocaleDateString()} - {new Date(currentCycle.end).toLocaleDateString()}
          </p>
          <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
            <FaBell />
            {showNotificationBadge && <span className="notification-badge"></span>}
          </div>
        </div>
      </div>

      {showNotifications && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <button onClick={markAllAsRead} className="mark-all-read">Mark all as read</button>
            <button onClick={() => setShowNotifications(false)} className="close-notifications">
              <FaTimes />
            </button>
          </div>
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => {
                    if (notification.submissionId) {
                      const sub = previousSubmissions.find(s => s.id === notification.submissionId);
                      if (sub) viewSubmission(sub);
                    }
                    markAsRead(notification.id);
                  }}
                >
                  <div className="notification-message">
                    {notification.type === 'status-update' && <FaCheck />}
                    {notification.type === 'reminder' && <FaExclamationTriangle />}
                    {notification.type === 'appeal' && <FaReply />}
                    <span>{notification.message}</span>
                  </div>
                  <div className="notification-date">
                    {new Date(notification.date).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-notifications">No notifications</div>
            )}
          </div>
        </div>
      )}

      <div className="submission-main-content">
        <div className="submission-form-container">
          <h2>Submit New Report</h2>
          
          {!submissionStatus.isWithinCycle && (
            <div className="alert alert-error">
              <FaExclamationTriangle /> Submissions are only accepted during the defined cycles.
            </div>
          )}
          
          {submissionStatus.plagiarismDetected && (
            <div className="alert alert-error">
              <FaExclamationTriangle /> Potential plagiarism detected in your report. Please revise and resubmit.
            </div>
          )}
          
          {submissionStatus.companyBlacklisted && (
            <div className="alert alert-error">
              <FaExclamationTriangle /> The company you interned with is on our blacklist. Please contact SCAD office.
            </div>
          )}
          
          {submissionStatus.dateConflict && (
            <div className="alert alert-error">
              <FaExclamationTriangle /> Full-time internships during active semesters are not allowed. Please mark as part-time.
            </div>
          )}
          
          {submissionStatus.missingFields.length > 0 && (
            <div className="alert alert-warning">
              <FaExclamationTriangle /> Missing required fields: {submissionStatus.missingFields.join(', ')}
            </div>
          )}
          
          {submissionStatus.isSubmitted && (
            <div className="alert alert-success">
              <FaCheck /> Report submitted successfully! Your submission is under review.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Student Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={formData.studentName} 
                    readOnly 
                  />
                </div>
                <div className="form-group">
                  <label>Student ID</label>
                  <input 
                    type="text" 
                    value={formData.studentId} 
                    readOnly 
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    readOnly 
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Internship Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Internship Title *</label>
                  <input 
                    type="text" 
                    value={formData.internshipTitle}
                    onChange={(e) => setFormData({...formData, internshipTitle: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input 
                    type="text" 
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Start Date *</label>
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date *</label>
                  <input 
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Internship Type *</label>
                  <select 
                    value={formData.internshipType}
                    onChange={(e) => setFormData({...formData, internshipType: e.target.value})}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Report Details</h3>
              <div className="form-group">
                <label>Internship Report (PDF/DOCX) *</label>
                <div className="file-upload">
                  <label>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileUpload}
                      required
                    />
                    <span className="upload-btn">Choose File</span>
                    <span>{formData.reportFile ? formData.reportFile.name : 'No file chosen'}</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Additional Files (Optional)</label>
                <div className="file-upload">
                  <label>
                    <input 
                      type="file" 
                      multiple 
                      onChange={handleAdditionalFiles}
                    />
                    <span className="upload-btn">Choose Files</span>
                  </label>
                </div>
                
                {formData.additionalFiles.length > 0 && (
                  <div className="additional-files">
                    {formData.additionalFiles.map((file, index) => (
                      <div key={index} className="file-item">
                        {getFileIcon(file.name)}
                        <span>{file.name}</span>
                        <button 
                          type="button" 
                          onClick={() => removeAdditionalFile(index)}
                          className="remove-file"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Tasks Description *</label>
                <textarea 
                  value={formData.tasksDescription}
                  onChange={(e) => setFormData({...formData, tasksDescription: e.target.value})}
                  rows="5"
                  required
                />
              </div>

              <div className="form-group">
                <label>Skills Gained *</label>
                <textarea 
                  value={formData.skillsGained}
                  onChange={(e) => setFormData({...formData, skillsGained: e.target.value})}
                  rows="5"
                  required
                />
                <p className="hint">List the skills you developed during this internship (e.g., communicator, team player, leader, problem solver, critical thinker)</p>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={!submissionStatus.isWithinCycle}
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>

        <div className="previous-submissions">
          <h2>Your Previous Submissions</h2>
          
          <div className="submission-filters">
            <div className="search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Search reports..." 
                value={filters.searchTerm}
                onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
              />
            </div>
            
            <div className="filter-group">
              <label><FaFilter /> Status:</label>
              <select 
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          <div className="submissions-list">
            {filteredSubmissions.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th onClick={() => requestSort('title')}>
                      Report Title <FaSort className={sortConfig.key === 'title' ? 'active' : ''} />
                    </th>
                    <th onClick={() => requestSort('company')}>
                      Company <FaSort className={sortConfig.key === 'company' ? 'active' : ''} />
                    </th>
                    <th onClick={() => requestSort('dates')}>
                      Dates <FaSort className={sortConfig.key === 'dates' ? 'active' : ''} />
                    </th>
                    <th onClick={() => requestSort('dateSubmitted')}>
                      Date Submitted <FaSort className={sortConfig.key === 'dateSubmitted' ? 'active' : ''} />
                    </th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map(submission => (
                    <tr key={submission.id}>
                      <td>{submission.title}</td>
                      <td>{submission.company}</td>
                      <td>{submission.dates}</td>
                      <td>{submission.dateSubmitted}</td>
                      <td>
                        <span className={`status-badge ${submission.status.toLowerCase()}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="action-btn view-btn"
                          onClick={() => viewSubmission(submission)}
                        >
                          View
                        </button>
                        {submission.status === 'Rejected' && (
                          <button 
                            className="action-btn edit-btn"
                            onClick={() => viewSubmission(submission)}
                          >
                            <FaEdit /> Resubmit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-results">
                <p>No submissions found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {viewingSubmission && (
        <div className="submission-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{viewingSubmission.title}</h2>
              <button onClick={closeView} className="close-modal">
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-section">
                <h3>Internship Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Company:</label>
                    <span>{viewingSubmission.company}</span>
                  </div>
                  <div className="detail-item">
                    <label>Internship Dates:</label>
                    <span>{viewingSubmission.dates}</span>
                  </div>
                  <div className="detail-item">
                    <label>Date Submitted:</label>
                    <span>{viewingSubmission.dateSubmitted}</span>
                  </div>
                  {viewingSubmission.reviewedDate && (
                    <div className="detail-item">
                      <label>Date Reviewed:</label>
                      <span>{viewingSubmission.reviewedDate}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <label>Status:</label>
                    <span className={`status-badge ${viewingSubmission.status.toLowerCase()}`}>
                      {viewingSubmission.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="modal-section">
                <h3>Report Files</h3>
                <div className="file-list">
                  <div className="file-item" onClick={() => downloadFile(viewingSubmission.fileUrl, viewingSubmission.title)}>
                    {getFileIcon(viewingSubmission.fileUrl)}
                    <span>Main Report</span>
                    <FaDownload className="download-icon" />
                  </div>
                  {viewingSubmission.additionalFiles.map((file, index) => (
                    <div 
                      key={index} 
                      className="file-item" 
                      onClick={() => downloadFile(file.url, file.name)}
                    >
                      {getFileIcon(file.name)}
                      <span>{file.name}</span>
                      <FaDownload className="download-icon" />
                    </div>
                  ))}
                </div>
              </div>
              
              {(viewingSubmission.feedback || viewingSubmission.status === 'Rejected') && (
                <div className="modal-section">
                  <h3>
                    <FaCommentAlt /> Feedback
                  </h3>
                  <div className="feedback-content">
                    {viewingSubmission.feedback}
                  </div>
                </div>
              )}
              
              {viewingSubmission.status === 'Rejected' && (
                <div className="modal-section">
                  <h3>
                    <FaReply /> Appeal Decision
                  </h3>
                  <textarea
                    value={appealMessage}
                    onChange={(e) => setAppealMessage(e.target.value)}
                    placeholder="Explain why you believe the decision should be reconsidered..."
                    rows="4"
                  />
                  <div className="modal-actions">
                    <button onClick={handleAppeal} className="appeal-btn">
                      Submit Appeal
                    </button>
                    <button onClick={closeView} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportSubmissions;