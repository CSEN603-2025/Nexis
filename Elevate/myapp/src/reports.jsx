import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ReportsPage.css";
import { Link } from 'react-router-dom';

function Reports() {
  const navItems = [
    { icon: "fa-home", label: "Dashboard", path: "/dashboard" },
    { icon: "fa-briefcase", label: "Internships", path: "/internships" },
    { icon: "fa-file-alt", label: "Reports", path: "/reports" },
    { icon: "fa-clipboard-list", label: "Evaluations", path: "/evaluations" },
    { icon: "fa-building", label: "Students", path: "/students" },
    { icon: "fa-book", label: "Resources", path: "/resources" },
    { icon: "fa-cog", label: "Settings", path: "/settings" },
  ];

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [majorFilter, setMajorFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCompanyData, setSelectedCompanyData] = useState(null);
  const [showContent, setShowContent] = useState({});
  const [clarifications, setClarifications] = useState({});
  const [showClarificationForm, setShowClarificationForm] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();

  const reports = [
    {
      id: 1,
      title: "Final Internship Report",
      submittedBy: "Student A",
      content: "This is the content of the Final Internship Report for student A.",
      major: "MET",
      status: "Pending",
      GPA: 3.5,
      Company: "Tech Corp",
      clarificationComment: ""
    },
    {
      id: 2,
      title: "Final Internship Report",
      submittedBy: "Student B",
      content: "This is the content of the Final Internship Report for student B.",
      major: "IET",
      status: "Accepted",
      GPA: 3.8,
      Company: "Web Solutions",
      clarificationComment: ""
    },
    {
      id: 3,
      title: "Final Internship Report",
      submittedBy: "Student C",
      content: "This is the content of the Final Internship Report for student C.",
      major: "Law",
      status: "Rejected",
      GPA: 3.2,
      Company: "Legal Associates",
      clarificationComment: "The report lacks sufficient detail about legal procedures implemented during the internship."
    },
    {
      id: 4,
      title: "Final Internship Report",
      submittedBy: "Student D",
      content: "This is the content of the Final Internship Report for student D.",
      major: "Pharmacy",
      status: "Flagged",
      GPA: 3.9,
      Company: "Health Inc.",
      clarificationComment: "Potential plagiarism detected in sections 2.3 and 4.1. Please revise and resubmit."
    },
  ];

  const majors = ["All", ...new Set(reports.map(report => report.major))];
  const statuses = ["All", ...new Set(reports.map(report => report.status))];

  const handleNavigation = (item) => {
    console.log("Navigating to:", item.path);
    if (location.pathname !== item.path) {
      navigate(item.path);
    }
    setActiveItem(item.label);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleMajorFilter = (e) => setMajorFilter(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Set active navigation item based on current location
  useEffect(() => {
    const currentItem = navItems.find((item) => item.path === location.pathname);
    if (currentItem) setActiveItem(currentItem.label);
  }, [location.pathname, navItems]);

  // Initialize clarifications state from reports
  useEffect(() => {
    const initialClarifications = {};
    reports.forEach(report => {
      initialClarifications[report.id] = report.clarificationComment;
    });
    setClarifications(initialClarifications);
  }, []);

  // Filter reports based on major and status
  useEffect(() => {
    const filtered = reports.filter(report => {
      const matchesMajor = majorFilter === "All" || report.major === majorFilter;
      const matchesStatus = statusFilter === "All" || report.status === statusFilter;
      const matchesSearch = searchTerm === "" || 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesMajor && matchesStatus && matchesSearch;
    });
    
    setFilteredReports(filtered);
  }, [majorFilter, statusFilter, searchTerm, reports]);

  useEffect(() => {
    // Initialize filtered reports on component mount
    setFilteredReports(reports);
  }, []);

  const downloadAsPDF = (report) => {
    const element = document.createElement("a");
    const file = new Blob([report.content], { type: "application/pdf" });
    element.href = URL.createObjectURL(file);
    element.download = `${report.title}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Toggle report content visibility individually
  const toggleReportContent = (reportId) => {
    setShowContent(prev => ({
      ...prev,
      [reportId]: !prev[reportId]
    }));
  };

  // Toggle clarification form visibility
  const toggleClarificationForm = (reportId) => {
    setShowClarificationForm(prev => ({
      ...prev,
      [reportId]: !prev[reportId]
    }));
  };

  // Handle clarification text changes
  const handleClarificationChange = (reportId, value) => {
    setClarifications(prev => ({
      ...prev,
      [reportId]: value
    }));
  };

  // Submit clarification comment
  const submitClarification = (reportId) => {
    // In a real application, you would save this to your backend
    alert(`Clarification submitted for Report #${reportId}`);
    // Close the form after submission
    setShowClarificationForm(prev => ({
      ...prev,
      [reportId]: false
    }));
  };

  // Check if report needs clarification (flagged or rejected)
  const needsClarification = (status) => {
    return status === "Flagged" || status === "Rejected";
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
 
      <div className="main-container">
       
        {/* Main Content Area */}
        <main className="content-area">
          <div className="main-content">
            <div className="content-wrapper">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Reports</h2>
                  <div className="filter-container">
                    
                    <select 
                      value={statusFilter} 
                      onChange={handleStatusFilter} 
                      className="industry-filter"
                    >
                      <option value="" disabled>Status</option>
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>

                    <select 
                      value={majorFilter} 
                      onChange={handleMajorFilter} 
                      className="industry-filter"
                    >
                      <option value="" disabled>Major</option>
                      {majors.map(major => (
                        <option key={major} value={major}>{major}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="card-body">
                  <ul className="reports-list">
                    {filteredReports.map((report) => (
                      <li key={report.id} className="report-item">
                        <div className="report-info">
                          <h3 className="report-title">{report.title}</h3>
                          <p className="report-submitter">Submitted by: {report.submittedBy}</p>
                          <p className="report-submitter">Major: {report.major}</p>
                          <p className="report-submitter">
                            Status: <span className={`status-badge status-${report.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {report.status}
                            </span>
                          </p>
                          
                          {/* Display clarification comment if it exists */}
                          {clarifications[report.id] && (
                            <div className="clarification-comment">
                              <p><strong>Clarification Comment:</strong></p>
                              <p>{clarifications[report.id]}</p>
                            </div>
                          )}
                        </div>

                        <div className="report-actions">
                          <button
                            onClick={() => downloadAsPDF(report)}
                            className="action-button"
                          >
                            Download PDF
                          </button>
                          <button
                            onClick={() => toggleReportContent(report.id)}
                            className="action-button"
                          >
                            {showContent[report.id] ? "Hide details" : "View details"}
                          </button>
                          
                          {/* Add clarification button for flagged or rejected reports */}
                          {needsClarification(report.status) && (
                            <button
                              onClick={() => toggleClarificationForm(report.id)}
                              className="action-button clarification-button"
                            >
                              {showClarificationForm[report.id] ? "Cancel" : 
                               clarifications[report.id] ? "Edit Clarification" : "Add Clarification"}
                            </button>
                          )}
                          
                          {/* Clarification Form */}
                          {showClarificationForm[report.id] && (
                            <div className="clarification-form">
                              <h4>Submit Clarification</h4>
                              <p>Please explain why this report was {report.status.toLowerCase()}:</p>
                              <textarea
                                value={clarifications[report.id] || ''}
                                onChange={(e) => handleClarificationChange(report.id, e.target.value)}
                                placeholder="Enter your clarification comments here..."
                                rows="4"
                                className="clarification-textarea"
                              />
                              <div className="form-actions">
                                <button
                                  onClick={() => submitClarification(report.id)}
                                  className="submit-button"
                                >
                                  Submit Clarification
                                </button>
                              </div>
                            </div>
                          )}
                          
                          <div className={`accordion ${showContent[report.id] ? "open" : ""}`}>
                            <p className="report-submitter">Content: {report.content}</p>
                            <p className="report-submitter">Submitted by: {report.submittedBy}</p>
                            <p className="report-submitter">Status: {report.status}</p>
                            <p className="report-submitter">Company: {report.Company}</p>
                            <p className="report-submitter">Major: {report.major}</p>
                            <p className="report-submitter">GPA: {report.GPA}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Reports;