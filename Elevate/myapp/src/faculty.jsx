import { useState, useEffect } from 'react';
import './faculty.css';
import { jsPDF } from 'jspdf';
import { 
  FaMoon, 
  FaSun, 
  FaBell, 
  FaFilePdf,
  FaFileDownload,
  FaBook,
  FaChartBar,
  FaSearch,
  FaFilter,
  FaUserGraduate,
  FaFileUpload,
  FaTasks,
  FaBuilding,
  FaCalendarAlt,
  FaEnvelope,
  FaCog
} from 'react-icons/fa';

const FacultyProfile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filters, setFilters] = useState({
    major: '',
    studentName: '',
    companyName: '',
    status: '',
  });
  const [stats, setStats] = useState({
    accepted: 0,
    rejected: 0,
    pending: 0,
    flagged: 0,
  });
  const [comment, setComment] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [activeTab, setActiveTab] = useState('reports');

  // Mock faculty data
  const faculty = {
    name: 'Dr. Jane Doe',
    role: 'Faculty Advisor',
    department: 'Computer Science',
    pendingReports: 2,
    avatarInitials: 'JD',
  };

  // Initialize mock data
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
        course: 'CS 450',
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
        course: 'GD 320',
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
        course: 'ANIM 410',
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
        course: 'CS 450',
      },
    ];

    setReports(mockReports);
    setFilteredReports(mockReports);

    const stats = {
      accepted: mockReports.filter(r => r.status === 'accepted').length,
      rejected: mockReports.filter(r => r.status === 'rejected').length,
      pending: mockReports.filter(r => r.status === 'pending').length,
      flagged: mockReports.filter(r => r.status === 'flagged').length,
    };
    setStats(stats);
  }, []);

  // Filter reports
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

  // Calculate statistics
  const calculateStatistics = () => {
    if (reports.length === 0) return {};

    const totalReviewTime = reports.reduce((sum, report) => sum + (report.reviewTime || 0), 0);
    const avgReviewTime = (totalReviewTime / reports.length).toFixed(1);

    const courseCounts = reports.reduce((acc, report) => {
      acc[report.course] = (acc[report.course] || 0) + 1;
      return acc;
    }, {});
    const topCourses = Object.entries(courseCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([course, count]) => ({ course, count, percentage: ((count / reports.length) * 100).toFixed(1) }));

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
        count: data.count,
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 3);

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
      topCompaniesByCount,
    };
  };

  const statistics = calculateStatistics();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
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
      const doc = new jsPDF();
      doc.setFontSize(12);
      doc.text(`Internship Report - ${report.studentName}`, 10, 10);
      doc.text('===================================', 10, 20);
      doc.text(`Student: ${report.studentName}`, 10, 30);
      doc.text(`Major: ${report.major}`, 10, 40);
      doc.text(`Company: ${report.companyName}`, 10, 50);
      doc.text(`Status: ${report.status}`, 10, 60);
      doc.text(`Submission Date: ${report.submissionDate}`, 10, 70);
      doc.text('Report Content:', 10, 80);
      doc.text(report.content, 10, 90, { maxWidth: 180 });
      doc.save(`Internship_Report_${report.studentName.replace(' ', '_')}.pdf`);
    }
  };

  const generateStatsReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Internship Report Statistics', 10, 10);
    doc.text('===========================', 10, 20);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, 30);
    doc.text('Summary:', 10, 40);
    doc.text(`- Accepted: ${stats.accepted}`, 10, 50);
    doc.text(`- Rejected: ${stats.rejected}`, 10, 60);
    doc.text(`- Pending: ${stats.pending}`, 10, 70);
    doc.text(`- Flagged: ${stats.flagged}`, 10, 80);
    doc.text('Performance Metrics:', 10, 90);
    doc.text(`- Average Review Time: ${statistics.avgReviewTime} days`, 10, 100);
    doc.text('Top Courses:', 10, 110);
    statistics.topCourses?.forEach((c, i) => {
      doc.text(`  * ${c.course}: ${c.count} reports (${c.percentage}%)`, 10, 120 + i * 10);
    });
    doc.text('Company Insights:', 10, 150);
    doc.text('Top Rated Companies:', 10, 160);
    statistics.topRatedCompanies?.forEach((c, i) => {
      doc.text(`  * ${c.company}: ★${c.avgRating} (${c.count} interns)`, 10, 170 + i * 10);
    });
    doc.text('Top Companies by Internship Count:', 10, 200);
    statistics.topCompaniesByCount?.forEach((c, i) => {
      doc.text(`  * ${c.company}: ${c.count} interns`, 10, 210 + i * 10);
    });
    doc.save(`Internship_Statistics_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleViewPendingReports = () => {
    setFilters(prev => ({ ...prev, status: 'pending' }));
    setActiveTab('reports');
  };

  const exportAnalyticsData = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Accepted Reports', stats.accepted],
      ['Rejected Reports', stats.rejected],
      ['Flagged Reports', stats.flagged],
      ['Average Review Time (days)', statistics.avgReviewTime],
      ...statistics.topCourses.map((c, i) => [
        `Top Course #${i + 1}`,
        `${c.course} (${c.count} reports, ${c.percentage}%)`,
      ]),
      ...statistics.topRatedCompanies.map((c, i) => [
        `Top Rated Company #${i + 1}`,
        `${c.company} (★${c.avgRating}, ${c.count} interns)`,
      ]),
      ...statistics.topCompaniesByCount.map((c, i) => [
        `Top Company by Count #${i + 1}`,
        `${c.company} (${c.count} interns)`,
      ]),
    ]
      .map(e => e.join(','))
      .join('\n');

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
    <div className={`faculty-app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="faculty-header">
        <a href="/" className="logo2">
          <span className="logo2-icon">↑</span>
          Elevate
        </a>
        <div className="header-right">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="notification-bell">
            <FaBell />
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </div>
          <div className="user-avatar">{faculty.avatarInitials}</div>
        </div>
      </header>

      <div className="faculty-container">
        <aside className={`faculty-sidebar ${darkMode ? 'dark-sidebar' : ''}`}>
          <div className="profile-section">
            <div className="profile-avatar">
              {faculty.avatarInitials}
            </div>
            <h2 className="profile-name">{faculty.name}</h2>
            <p className="profile-title">{faculty.role}</p>
            <p className="profile-department">{faculty.department}</p>
            <div className="profile-status">
              <span className="status-indicator"></span>
              Active
            </div>
          </div>

          <div className="quick-links">
            <h4>Navigation</h4>
            <div className="quick-links-list">
              <button 
                className={`link-item ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                <FaBook className="link-icon" />
                <span>Report Management</span>
              </button>
              <button 
                className={`link-item ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                <FaChartBar className="link-icon" />
                <span>Faculty Analytics</span>
              </button>
            </div>

            <h4>Quick Actions</h4>
            <div className="quick-links-list">
              <button 
                className="link-item"
                onClick={handleViewPendingReports}
              >
                <FaTasks className="link-icon" />
                <span>View Pending Reports</span>
              </button>
              <button 
                className="link-item"
                onClick={generateStatsReport}
              >
                <FaFilePdf className="link-icon" />
                <span>Generate Stats PDF</span>
              </button>
              <button 
                className="link-item"
                onClick={exportAnalyticsData}
              >
                <FaFileDownload className="link-icon" />
                <span>Export Analytics</span>
              </button>
            </div>

            <h4>Resources</h4>
            <div className="quick-links-list">
              <a href="/student-profiles" className="link-item">
                <FaUserGraduate className="link-icon" />
                <span>Student Profiles</span>
              </a>
              <a href="/submission-guidelines" className="link-item">
                <FaFileUpload className="link-icon" />
                <span>Submission Guidelines</span>
              </a>
              <a href="/company-directory" className="link-item">
                <FaBuilding className="link-icon" />
                <span>Company Directory</span>
              </a>
              <a href="/calendar" className="link-item">
                <FaCalendarAlt className="link-icon" />
                <span>Academic Calendar</span>
              </a>
            </div>

            <h4>Settings</h4>
            <div className="quick-links-list">
              <a href="/notifications" className="link-item">
                <FaEnvelope className="link-icon" />
                <span>Notification Settings</span>
              </a>
              <a href="/account-settings" className="link-item">
                <FaCog className="link-icon" />
                <span>Account Settings</span>
              </a>
            </div>
          </div>
        </aside>

        <main className="faculty-main-content">
          {activeTab === 'analytics' ? (
            <div className="faculty-card">
              <div className="card-header">
                <h2 className="card-title">
                  <FaChartBar style={{marginRight: '0.75rem', color: '#27a1a1'}} />
                  Faculty Academic Analytics Dashboard
                </h2>
              </div>

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
                    <div className="status-item pending">
                      <span>⏳ Pending:</span>
                      <strong>{stats.pending}</strong>
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
            </div>
          ) : (
            <div className="faculty-card">
              <div className="card-header">
                <h2 className="card-title">
                  <FaBook style={{marginRight: '0.75rem', color: '#27a1a1'}} />
                  Internship Report Management
                </h2>
              </div>

              <div className="stats-overview">
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
              </div>

              <div className="reports-section">
                <div className="reports-list-container">
                  <div className="filters">
                    <div className="search-bar">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        name="studentName"
                        placeholder="Search reports..."
                        value={filters.studentName}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div className="filter-controls">
                      <div className="filter-group">
                        <label htmlFor="major-filter">
                          <FaFilter style={{marginRight: '0.5rem'}} />
                          Major:
                        </label>
                        <input
                          type="text"
                          name="major"
                          placeholder="Filter by major"
                          value={filters.major}
                          onChange={handleFilterChange}
                        />
                      </div>
                      <div className="filter-group">
                        <label htmlFor="company-filter">
                          <FaFilter style={{marginRight: '0.5rem'}} />
                          Company:
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          placeholder="Filter by company"
                          value={filters.companyName}
                          onChange={handleFilterChange}
                        />
                      </div>
                      <div className="filter-group">
                        <label htmlFor="status-filter">
                          <FaFilter style={{marginRight: '0.5rem'}} />
                          Status:
                        </label>
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
                            <p>
                              <strong>Major:</strong> {report.major}
                            </p>
                            <p>
                              <strong>Company:</strong> {report.companyName}
                            </p>
                            <p>
                              <strong>Status:</strong>{' '}
                              <span className={`status-badge ${report.status}`}>{report.status}</span>
                            </p>
                            <p>
                              <strong>Submitted:</strong> {report.submissionDate}
                            </p>
                          </div>
                          <button
                            className="download-btn"
                            onClick={e => {
                              e.stopPropagation();
                              downloadReport(report.id);
                            }}
                          >
                            <FaFileDownload style={{marginRight: '0.5rem'}} />
                            Download
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="no-results">No reports match your filters.</p>
                    )}
                  </div>
                </div>

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
                        <div className="detail-row">
                          <span className="detail-label">Course:</span>
                          <span className="detail-value">{selectedReport.course}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Student Rating:</span>
                          <span className="detail-value">{selectedReport.studentRating}/5</span>
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
                            onChange={e => setComment(e.target.value)}
                            placeholder="Enter your clarification comments here..."
                          />
                          <button className="submit-comment-btn" onClick={handleSubmitComment}>
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
        </main>
      </div>
    </div>
  );
};

export default FacultyProfile;