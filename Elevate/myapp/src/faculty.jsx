
import { useState, useEffect } from 'react';

import './faculty.css';

const FacultyProfile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filters, setFilters] = useState({
    major: '',
    studentName: '',
    companyName: '',
    status: ''
  });
  const [stats, setStats] = useState({
    accepted: 0,
    rejected: 0,
    pending: 0,
    flagged: 0
  });
  const [comment, setComment] = useState('');

  // Mock data initialization
  useEffect(() => {
    // Simulate API call to fetch reports
    const mockReports = [
      { id: 1, studentName: 'John Doe', major: 'Computer Science', companyName: 'Tech Corp', status: 'pending', submissionDate: '2023-05-15' },
      { id: 2, studentName: 'Jane Smith', major: 'Graphic Design', companyName: 'Design Studio', status: 'accepted', submissionDate: '2023-05-10' },
      { id: 3, studentName: 'Mike Johnson', major: 'Animation', companyName: 'Media Arts', status: 'rejected', submissionDate: '2023-05-12' },
      { id: 4, studentName: 'Sarah Williams', major: 'Computer Science', companyName: 'Data Systems', status: 'flagged', submissionDate: '2023-05-08' },
    ];
    
    setReports(mockReports);
    setFilteredReports(mockReports);
    
    // Calculate statistics
    const stats = {
      accepted: mockReports.filter(r => r.status === 'accepted').length,
      rejected: mockReports.filter(r => r.status === 'rejected').length,
      pending: mockReports.filter(r => r.status === 'pending').length,
      flagged: mockReports.filter(r => r.status === 'flagged').length
    };
    setStats(stats);
  }, []);

  // Filter reports based on filter criteria
  useEffect(() => {
    let result = reports;
    if (filters.major) {
      result = result.filter(r => r.major.toLowerCase().includes(filters.major.toLowerCase()));
    }
    if (filters.studentName) {
      result = result.filter(r => r.studentName.toLowerCase().includes(filters.studentName.toLowerCase()));
    }
    if (filters.companyName) {
      result = result.filter(r => r.companyName.toLowerCase().includes(filters.companyName.toLowerCase()));
    }
    if (filters.status) {
      result = result.filter(r => r.status === filters.status);
    }
    setFilteredReports(result);
  }, [filters, reports]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (reportId, newStatus) => {
    const updatedReports = reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    );
    setReports(updatedReports);
    
    // Update selected report if it's the one being modified
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport({ ...selectedReport, status: newStatus });
    }
  };

  const handleSubmitComment = () => {
    if (comment.trim() && selectedReport) {
      // In a real app, this would send to backend
      alert(`Comment submitted for report ${selectedReport.id}: ${comment}`);
      setComment('');
    }
  };

  const downloadReport = (reportId) => {
    // Simulate PDF download
    alert(`Downloading report ${reportId} as PDF`);
  };

  const generateStatsReport = () => {
    // Simulate generating a report
    const reportContent = `Internship Report Statistics:
    - Accepted: ${stats.accepted}
    - Rejected: ${stats.rejected}
    - Pending: ${stats.pending}
    - Flagged: ${stats.flagged}`;
    
    alert(`Generated Report:\n\n${reportContent}`);
  };

  return (
    <div className={`faculty-profile ${darkMode ? 'dark-mode' : ''}`}>
      <header className="profile-header">
        <h1>Faculty Dashboard</h1>
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div className="dashboard-container">
        {/* Statistics Overview */}
        <div className="stats-overview">
          <h2>Internship Report Statistics</h2>
          <div className="stats-cards">
            <div className="stat-card accepted">
              <h3>Accepted</h3>
              <p>{stats.accepted}</p>
            </div>
            <div className="stat-card rejected">
              <h3>Rejected</h3>
              <p>{stats.rejected}</p>
            </div>
            <div className="stat-card pending">
              <h3>Pending</h3>
              <p>{stats.pending}</p>
            </div>
            <div className="stat-card flagged">
              <h3>Flagged</h3>
              <p>{stats.flagged}</p>
            </div>
          </div>
          <button 
            className="generate-report-btn"
            onClick={generateStatsReport}
          >
            Generate Statistics Report
          </button>
        </div>

        {/* Reports Section */}
        <div className="reports-section">
          <div className="reports-list-container">
            <div className="filters">
              <h2>Internship Reports</h2>
              <div className="filter-controls">
                <input
                  type="text"
                  name="studentName"
                  placeholder="Filter by student name"
                  value={filters.studentName}
                  onChange={handleFilterChange}
                />
                <input
                  type="text"
                  name="major"
                  placeholder="Filter by major"
                  value={filters.major}
                  onChange={handleFilterChange}
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Filter by company"
                  value={filters.companyName}
                  onChange={handleFilterChange}
                />
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All Statuses</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="pending">Pending</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
            </div>

            <div className="reports-list">
              {filteredReports.length > 0 ? (
                filteredReports.map(report => (
                  <div 
                    key={report.id} 
                    className={`report-card ${report.status} ${selectedReport?.id === report.id ? 'selected' : ''}`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="report-info">
                      <h3>{report.studentName}</h3>
                      <p><strong>Major:</strong> {report.major}</p>
                      <p><strong>Company:</strong> {report.companyName}</p>
                      <p><strong>Status:</strong> <span className={`status-badge ${report.status}`}>{report.status}</span></p>
                      <p><strong>Submitted:</strong> {report.submissionDate}</p>
                    </div>
                    <button 
                      className="download-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadReport(report.id);
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-results">No reports match your filters.</p>
              )}
            </div>
          </div>

          {/* Report Detail View */}
          <div className="report-detail">
            {selectedReport ? (
              <>
                <h2>Report Details</h2>
                <div className="detail-content">
                  <div className="detail-row">
                    <span className="detail-label">Student:</span>
                    <span className="detail-value">{selectedReport.studentName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Major:</span>
                    <span className="detail-value">{selectedReport.major}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Company:</span>
                    <span className="detail-value">{selectedReport.companyName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`detail-value status-badge ${selectedReport.status}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Submission Date:</span>
                    <span className="detail-value">{selectedReport.submissionDate}</span>
                  </div>
                  
                  <div className="status-actions">
                    <h3>Update Status</h3>
                    <div className="status-buttons">
                      <button 
                        className={`status-btn accepted ${selectedReport.status === 'accepted' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(selectedReport.id, 'accepted')}
                      >
                        Accept
                      </button>
                      <button 
                        className={`status-btn rejected ${selectedReport.status === 'rejected' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(selectedReport.id, 'rejected')}
                      >
                        Reject
                      </button>
                      <button 
                        className={`status-btn flagged ${selectedReport.status === 'flagged' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(selectedReport.id, 'flagged')}
                      >
                        Flag
                      </button>
                    </div>
                  </div>
                  
                  <div className="comment-section">
                    <h3>Add Clarification</h3>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Enter your clarification comments here..."
                    />
                    <button 
                      className="submit-comment-btn"
                      onClick={handleSubmitComment}
                    >
                      Submit Clarification
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-report-selected">
                <h2>Select a report to view details</h2>
                <p>Click on any report from the list to see its details and take actions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;