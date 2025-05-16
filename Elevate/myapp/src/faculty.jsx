import { useState, useEffect } from 'react';
import './faculty.css';

const NotificationIcon = () => <span>🔔</span>;

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
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [activeTab, setActiveTab] = useState('reports');

  // Mock faculty data
  const faculty = {
    name: 'Dr. Jane Doe',
    role: 'Faculty Advisor',
    department: 'Computer Science',
    pendingReports: 2,
    avatarInitials: 'JD'
  };

  // Enhanced mock data initialization
  useEffect(() => {
    const mockReports = [
      { 
        id: 1, 
        studentName: 'John Doe', 
        major: 'Computer Science', 
        companyName: 'Tech Corp', 
        status: 'pending', 
        submissionDate: '2023-05-15', 
        content: 'Lorem ipsum dolor sit amet...',
        reviewTime: 2,
        studentRating: 4.5,
        course: 'CS 450'
      },
      { 
        id: 2, 
        studentName: 'Jane Smith', 
        major: 'Graphic Design', 
        companyName: 'Design Studio', 
        status: 'accepted', 
        submissionDate: '2023-05-10', 
        content: 'Consectetur adipiscing elit...',
        reviewTime: 1,
        studentRating: 3.8,
        course: 'GD 320'
      },
      { 
        id: 3, 
        studentName: 'Mike Johnson', 
        major: 'Animation', 
        companyName: 'Media Arts', 
        status: 'rejected', 
        submissionDate: '2023-05-12', 
        content: 'Sed do eiusmod tempor...',
        reviewTime: 3,
        studentRating: 2.5,
        course: 'ANIM 410'
      },
      { 
        id: 4, 
        studentName: 'Sarah Williams', 
        major: 'Computer Science', 
        companyName: 'Data Systems', 
        status: 'flagged', 
        submissionDate: '2023-05-08', 
        content: 'Incididunt ut labore et dolore...',
        reviewTime: 4,
        studentRating: 4.2,
        course: 'CS 450'
      },
    ];
    
    setReports(mockReports);
    setFilteredReports(mockReports);
    
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

  // Calculate statistics for the dashboard
  const calculateStatistics = () => {
    if (reports.length === 0) return {};
    
    // Average review time
    const totalReviewTime = reports.reduce((sum, report) => sum + (report.reviewTime || 0), 0);
    const avgReviewTime = (totalReviewTime / reports.length).toFixed(1);
    
    // Most frequent courses
    const courseCounts = reports.reduce((acc, report) => {
      acc[report.course] = (acc[report.course] || 0) + 1;
      return acc;
    }, {});
    const topCourses = Object.entries(courseCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([course, count]) => ({ course, count, percentage: (count / reports.length * 100).toFixed(1) }));
    
    // Top rated companies
    const companyRatings = reports.reduce((acc, report) => {
      if (!acc[report.companyName]) {
        acc[report.companyName] = { sum: 0, count: 0 };
      }
      acc[report.companyName].sum += report.studentRating;
      acc[report.companyName].count += 1;
      return acc;
    }, {});
    const topRatedCompanies = Object.entries(companyRatings)
      .map(([company, data]) => ({
        company,
        avgRating: (data.sum / data.count).toFixed(1),
        count: data.count
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 3);
    
    // Top companies by internship count
    const companyCounts = reports.reduce((acc, report) => {
      acc[report.companyName] = (acc[report.companyName] || 0) + 1;
      return acc;
    }, {});
    const topCompaniesByCount = Object.entries(companyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([company, count]) => ({ company, count }));
    
    return {
      avgReviewTime,
      topCourses,
      topRatedCompanies,
      topCompaniesByCount
    };
  };

  const statistics = calculateStatistics();

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
    
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport({ ...selectedReport, status: newStatus });
    }
  };

  const handleSubmitComment = () => {
    if (comment.trim() && selectedReport) {
      alert(`Comment submitted for report ${selectedReport.id}: ${comment}`);
      setComment('');
    }
  };

  const downloadReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      const pdfContent = `
        Internship Report - ${report.studentName}
        ===================================
        
        Student: ${report.studentName}
        Major: ${report.major}
        Company: ${report.companyName}
        Status: ${report.status}
        Submission Date: ${report.submissionDate}
        
        Report Content:
        ${report.content}
      `;
      
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Internship_Report_${report.studentName.replace(' ', '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const generateStatsReport = () => {
    const pdfContent = `
      Internship Report Statistics
      ===========================
      Generated on: ${new Date().toLocaleDateString()}
      
      Summary:
      - Accepted: ${stats.accepted}
      - Rejected: ${stats.rejected}
      - Pending: ${stats.pending}
      - Flagged: ${stats.flagged}
      
      Performance Metrics:
      - Average Review Time: ${statistics.avgReviewTime} days
      - Top Courses:
      ${statistics.topCourses?.map(c => `  * ${c.course}: ${c.count} reports (${c.percentage}%)`).join('\n')}
      
      Company Insights:
      - Top Rated Companies:
      ${statistics.topRatedCompanies?.map(c => `  * ${c.company}: ★${c.avgRating} (${c.count} interns)`).join('\n')}
      - Top Companies by Internship Count:
      ${statistics.topCompaniesByCount?.map(c => `  * ${c.company}: ${c.count} interns`).join('\n')}
    `;
    
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Internship_Statistics_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewPendingReports = () => {
    setFilters(prev => ({ ...prev, status: 'pending' }));
  };

  const exportAnalyticsData = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Accepted Reports', stats.accepted],
      ['Rejected Reports', stats.rejected],
      ['Flagged Reports', stats.flagged],
      ['Average Review Time (days)', statistics.avgReviewTime],
      ...statistics.topCourses.map((c, i) => [
        `Top Course #${i+1}`,
        `${c.course} (${c.count} reports, ${c.percentage}%)`
      ]),
      ...statistics.topRatedCompanies.map((c, i) => [
        `Top Rated Company #${i+1}`,
        `${c.company} (★${c.avgRating}, ${c.count} interns)`
      ]),
      ...statistics.topCompaniesByCount.map((c, i) => [
        `Top Company by Count #${i+1}`,
        `${c.company} (${c.count} interns)`
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Internship_Analytics_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`faculty-profile ${darkMode ? 'dark-mode' : ''}`}>
      <div className="main-content">
        <header className="profile-header">
          <h1>Faculty Dashboard</h1>
          <div className="header-right">
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <div className="notification-bell">
              <NotificationIcon />
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </div>
            <div className="user-avatar">
              {faculty.avatarInitials}
            </div>
          </div>
        </header>

        <div className="dashboard-container">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h2>Welcome, {faculty.name}!</h2>
            <div className="welcome-content">
              <div className="welcome-info">
                <p><strong>Role:</strong> {faculty.role}</p>
                <p><strong>Department:</strong> {faculty.department}</p>
                <p>
                  As a faculty advisor, you oversee student internship reports, ensuring timely review and feedback. 
                  You currently have <strong>{faculty.pendingReports} pending reports</strong> awaiting your action.
                </p>
              </div>
              <button 
                className="action-btn"
                onClick={handleViewPendingReports}
              >
                View Pending Reports
              </button>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <div className="dashboard-tabs">
            <button 
              className={activeTab === 'reports' ? 'active' : ''}
              onClick={() => setActiveTab('reports')}
            >
              Report Management
            </button>
            <button 
              className={activeTab === 'analytics' ? 'active' : ''}
              onClick={() => setActiveTab('analytics')}
            >
              Faculty Academic Analytics Dashboard
            </button>
          </div>

          {activeTab === 'analytics' ? (
            <div className="analytics-dashboard">
              <div className="analytics-grid">
                {/* Report Status Summary */}
                <div className="analytics-card">
                  <h3>Report Status (Current Cycle)</h3>
                  <div className="status-summary">
                    <div className="status-item accepted">
                      <span>✅ Accepted:</span>
                      <strong>{stats.accepted}</strong>
                    </div>
                    <div className="status-item rejected">
                      <span>❌ Rejected:</span>
                      <strong>{stats.rejected}</strong>
                    </div>
                    <div className="status-item flagged">
                      <span>⚠️ Flagged:</span>
                      <strong>{stats.flagged}</strong>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="analytics-card">
                  <h3>Performance Metrics</h3>
                  <div className="metric">
                    <span>⏱️ Average Review Time:</span>
                    <strong>{statistics.avgReviewTime} days</strong>
                  </div>
                  <div className="metric">
                    <span>📊 Most Frequent Courses:</span>
                    <ul className="top-list">
                      {statistics.topCourses?.map((item, i) => (
                        <li key={i}>
                          {item.course} - {item.count} reports ({item.percentage}%)
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Company Insights */}
                <div className="analytics-card">
                  <h3>Top Rated Companies</h3>
                  <ul className="top-list">
                    {statistics.topRatedCompanies?.map((item, i) => (
                      <li key={i}>
                        {item.company} - ★{item.avgRating} ({item.count} interns)
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="analytics-card">
                  <h3>Top Companies by Internship Count</h3>
                  <ul className="top-list">
                    {statistics.topCompaniesByCount?.map((item, i) => (
                      <li key={i}>
                        {item.company} - {item.count} interns
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="dashboard-actions">
                <button className="export-btn" onClick={exportAnalyticsData}>
                  Export Analytics (CSV)
                </button>
                <select className="cycle-selector">
                  <option>Current Cycle</option>
                  <option>Spring 2023</option>
                  <option>Fall 2022</option>
                  <option>Summer 2022</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="reports-interface">
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
                  Generate Statistics Report (PDF)
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
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;