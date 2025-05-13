import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaEye,
  FaEdit,
  FaFileAlt,
  FaUserGraduate,
  FaBuilding,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaPaperclip,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import './EvaluationForms.css';

const EvaluationForms = () => {
  // User role (would normally come from auth context)
  const [userRole, setUserRole] = useState('faculty'); // 'scad' or 'faculty'
  
  // Evaluation data state
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      studentName: 'Alaa Mostafa Saeed',
      studentId: '58-1170',
      companyName: 'TechGlobal',
      internshipTitle: 'Software Engineering Intern',
      dates: '2024-06-01 to 2024-08-30',
      submissionDate: '2024-09-05',
      status: 'pending',
      studentReport: 'report1.pdf',
      companyEvaluation: 'eval1.pdf',
      missingFields: [],
      plagiarismScore: 0.15,
      dateConflict: false,
      companyBlacklisted: false,
      supervisorVerified: true,
      facultyAssigned: 'Dr. Ahmed Mohamed',
      evaluationScore: null,
      facultyFeedback: '',
      isFlagged: false
    },
    {
      id: 2,
      studentName: 'Menna Ashraf Khaled',
      studentId: '58-1027',
      companyName: 'DesignHub',
      internshipTitle: 'UX Design Intern',
      dates: '2024-01-15 to 2024-04-15',
      submissionDate: '2024-04-20',
      status: 'rejected',
      studentReport: 'report2.pdf',
      companyEvaluation: 'eval2.pdf',
      missingFields: ['companyStamp', 'supervisorSignature'],
      plagiarismScore: 0.45,
      dateConflict: false,
      companyBlacklisted: false,
      supervisorVerified: true,
      facultyAssigned: 'Dr. Ahmed Mohamed',
      evaluationScore: 2,
      facultyFeedback: 'Missing required company stamp and supervisor signature. Report lacks detail in tasks performed.',
      isFlagged: true
    },
    {
      id: 3,
      studentName: 'Sevine Hossam Farouk',
      studentId: '58-6406',
      companyName: 'AnalyticsPro',
      internshipTitle: 'Data Science Intern',
      dates: '2024-09-01 to 2024-12-15',
      submissionDate: '2024-12-18',
      status: 'approved',
      studentReport: 'report3.pdf',
      companyEvaluation: 'eval3.pdf',
      missingFields: [],
      plagiarismScore: 0.08,
      dateConflict: false,
      companyBlacklisted: false,
      supervisorVerified: true,
      facultyAssigned: 'Dr. Sara Mahmoud',
      evaluationScore: 5,
      facultyFeedback: 'Excellent report demonstrating strong analytical skills and significant contribution to company projects.',
      isFlagged: false
    },{
      id: 4,
      studentName: 'Lama Hossam Abdeldayem',
      studentId: '58-2085',
      companyName: 'InnovateTech',
      internshipTitle: 'Web Development Intern',
      dates: '2024-07-01 to 2024-09-30',
      submissionDate: '2024-10-05',
      status: 'pending',
      studentReport: 'report4.pdf',
      companyEvaluation: 'eval4.pdf',
      missingFields: [],
      plagiarismScore: 0.12,
      dateConflict: false,
      companyBlacklisted: false,
      supervisorVerified: true,
      facultyAssigned: 'Dr. Omar Hassan',
      evaluationScore: null,
      facultyFeedback: '',
      isFlagged: false
    }
  ]);

  // Filters state
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    dateRange: 'all',
    missingFields: false,
    plagiarism: false,
    dateConflict: false
  });

  // Expanded view state
  const [expandedId, setExpandedId] = useState(null);

  // Faculty evaluation form state
  const [evaluationForm, setEvaluationForm] = useState({
    decision: '',
    score: '',
    feedback: '',
    requiresResubmission: false
  });

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Toggle expanded view
  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle evaluation form changes
  const handleEvaluationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvaluationForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Submit faculty evaluation
  const submitEvaluation = (evaluationId) => {
    setEvaluations(prev =>
      prev.map(evaluation =>
        evaluation.id === evaluationId
          ? {
              ...evaluation,
              status: evaluationForm.decision,
              evaluationScore: evaluationForm.score,
              facultyFeedback: evaluationForm.feedback,
              isFlagged: evaluationForm.requiresResubmission
            }
          : evaluation
      )
    );
    setExpandedId(null);
    setEvaluationForm({
      decision: '',
      score: '',
      feedback: '',
      requiresResubmission: false
    });
  };

  // Assign to faculty (SCAD office action)
  const assignToFaculty = (evaluationId, facultyName) => {
    setEvaluations(prev =>
      prev.map(evaluation =>
        evaluation.id === evaluationId
          ? { ...evaluation, facultyAssigned: facultyName }
          : evaluation
      )
    );
  };

  // Filter evaluations based on current filters
  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesStatus = filters.status === 'all' || evaluation.status === filters.status;
    const matchesSearch = evaluation.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         evaluation.studentId.toLowerCase().includes(filters.search.toLowerCase()) ||
                         evaluation.companyName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesMissingFields = !filters.missingFields || evaluation.missingFields.length > 0;
    const matchesPlagiarism = !filters.plagiarism || evaluation.plagiarismScore > 0.3;
    const matchesDateConflict = !filters.dateConflict || evaluation.dateConflict;
    
    return matchesStatus && matchesSearch && matchesMissingFields && matchesPlagiarism && matchesDateConflict;
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

  // Status badge component
  const StatusBadge = ({ status }) => {
    switch(status) {
      case 'approved':
        return <span className="status-badge approved"><FaCheckCircle /> Approved</span>;
      case 'rejected':
        return <span className="status-badge rejected"><FaTimesCircle /> Rejected</span>;
      case 'pending':
        return <span className="status-badge pending"><FaClock /> Pending</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="evaluation-forms-container">
      <div className="evaluation-header">
        <h1>Evaluation Forms</h1>
        <div className="role-badge">
          {userRole === 'scad' ? 'SCAD Office' : 'Faculty Academic'}
        </div>
      </div>

      {/* SCAD Office Features */}
      {userRole === 'scad' && (
        <div className="scad-features">
          <div className="feature-card">
            <h3>Pending Assignments</h3>
            <p>Assign evaluations to faculty members</p>
            <div className="assignment-stats">
              <span className="stat">{evaluations.filter(e => e.status === 'pending' && !e.facultyAssigned).length} unassigned</span>
              <span className="stat">{evaluations.filter(e => e.status === 'pending').length} total pending</span>
            </div>
          </div>

          <div className="feature-card">
            <h3>Automated Checks</h3>
            <p>Review system-detected issues</p>
            <div className="issue-stats">
              <span className="stat warning">
                <FaExclamationTriangle /> {evaluations.filter(e => e.missingFields.length > 0).length} missing fields
              </span>
              <span className="stat danger">
                <FaExclamationTriangle /> {evaluations.filter(e => e.plagiarismScore > 0.3).length} plagiarism risks
              </span>
              <span className="stat danger">
                <FaExclamationTriangle /> {evaluations.filter(e => e.dateConflict).length} date conflicts
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="evaluation-filters">
        <div className="search-filter">
          <FaSearch />
          <input
            type="text"
            placeholder="Search evaluations..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {userRole === 'scad' && (
          <>
            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  checked={filters.missingFields}
                  onChange={(e) => handleFilterChange('missingFields', e.target.checked)}
                />
                Missing Fields
              </label>
            </div>

            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  checked={filters.plagiarism}
                  onChange={(e) => handleFilterChange('plagiarism', e.target.checked)}
                />
                Plagiarism Risk
              </label>
            </div>

            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  checked={filters.dateConflict}
                  onChange={(e) => handleFilterChange('dateConflict', e.target.checked)}
                />
                Date Conflicts
              </label>
            </div>
          </>
        )}
      </div>

      {/* Evaluations List */}
      <div className="evaluations-list">
        {filteredEvaluations.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Company</th>
                <th>Internship</th>
                <th>Dates</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvaluations.map(evaluation => (
                <React.Fragment key={evaluation.id}>
                  <tr>
                    <td>
                      <div className="student-info">
                        <FaUserGraduate />
                        <div>
                          <div className="student-name">{evaluation.studentName}</div>
                          <div className="student-id">{evaluation.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="company-info">
                        <FaBuilding />
                        <span>{evaluation.companyName}</span>
                      </div>
                    </td>
                    <td>{evaluation.internshipTitle}</td>
                    <td>
                      <div className="date-info">
                        <FaCalendarAlt />
                        <span>{evaluation.dates}</span>
                      </div>
                    </td>
                    <td>{new Date(evaluation.submissionDate).toLocaleDateString()}</td>
                    <td><StatusBadge status={evaluation.status} /></td>
                    <td>
                      <button 
                        className="view-details-btn"
                        onClick={() => toggleExpanded(evaluation.id)}
                      >
                        {expandedId === evaluation.id ? <FaChevronUp /> : <FaChevronDown />}
                        Details
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded View */}
                  {expandedId === evaluation.id && (
                    <tr className="expanded-view">
                      <td colSpan="7">
                        <div className="expanded-content">
                          {/* Documents Section */}
                          <div className="documents-section">
                            <h4>Documents</h4>
                            <div className="document-list">
                              <div className="document-item">
                                {getFileIcon(evaluation.studentReport)}
                                <span>Student Report: {evaluation.studentReport}</span>
                                <button className="view-btn">
                                  <FaEye /> View
                                </button>
                              </div>
                              <div className="document-item">
                                {getFileIcon(evaluation.companyEvaluation)}
                                <span>Company Evaluation: {evaluation.companyEvaluation}</span>
                                <button className="view-btn">
                                  <FaEye /> View
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Automated Checks Section */}
                          <div className="checks-section">
                            <h4>Automated Checks</h4>
                            <div className="check-results">
                              {evaluation.missingFields.length > 0 && (
                                <div className="check-result warning">
                                  <FaExclamationTriangle /> Missing fields: {evaluation.missingFields.join(', ')}
                                </div>
                              )}
                              {evaluation.plagiarismScore > 0.3 && (
                                <div className="check-result danger">
                                  <FaExclamationTriangle /> Potential plagiarism detected ({Math.round(evaluation.plagiarismScore * 100)}% similarity)
                                </div>
                              )}
                              {evaluation.dateConflict && (
                                <div className="check-result danger">
                                  <FaExclamationTriangle /> Internship dates conflict with academic semester
                                </div>
                              )}
                              {evaluation.companyBlacklisted && (
                                <div className="check-result danger">
                                  <FaExclamationTriangle /> Company is on blacklist
                                </div>
                              )}
                              {!evaluation.supervisorVerified && (
                                <div className="check-result warning">
                                  <FaExclamationTriangle /> Supervisor contact not verified
                                </div>
                              )}
                              {evaluation.missingFields.length === 0 &&
                                evaluation.plagiarismScore <= 0.3 &&
                                !evaluation.dateConflict &&
                                !evaluation.companyBlacklisted &&
                                evaluation.supervisorVerified && (
                                  <div className="check-result success">
                                    <FaCheckCircle /> All automated checks passed
                                  </div>
                                )}
                            </div>
                          </div>

                          {/* Faculty Assignment (SCAD Office) */}
                          {userRole === 'scad' && (
                            <div className="assignment-section">
                              <h4>Faculty Assignment</h4>
                              <div className="assignment-form">
                                <label>Assign to:</label>
                                <select
                                  value={evaluation.facultyAssigned || ''}
                                  onChange={(e) => assignToFaculty(evaluation.id, e.target.value)}
                                >
                                  <option value="">Select Faculty</option>
                                  <option value="Dr. Ahmed Mohamed">Dr. Ahmed Mohamed</option>
                                  <option value="Dr. Sara Mahmoud">Dr. Sara Mahmoud</option>
                                  <option value="Dr. Omar Hassan">Dr. Omar Hassan</option>
                                </select>
                                <button 
                                  className="assign-btn"
                                  disabled={!evaluation.facultyAssigned}
                                >
                                  Confirm Assignment
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Faculty Evaluation Form */}
                          {userRole === 'faculty' && evaluation.status === 'pending' && (
                            <div className="evaluation-form-section">
                              <h4>Faculty Evaluation</h4>
                              <div className="evaluation-form">
                                <div className="form-group">
                                  <label>Decision:</label>
                                  <select
                                    name="decision"
                                    value={evaluationForm.decision}
                                    onChange={handleEvaluationChange}
                                  >
                                    <option value="">Select Decision</option>
                                    <option value="approved">Approve</option>
                                    <option value="rejected">Reject</option>
                                    <option value="flagged">Flag for Improvement</option>
                                  </select>
                                </div>

                                <div className="form-group">
                                  <label>Score (1-5):</label>
                                  <select
                                    name="score"
                                    value={evaluationForm.score}
                                    onChange={handleEvaluationChange}
                                  >
                                    <option value="">Select Score</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Below Average</option>
                                    <option value="3">3 - Satisfactory</option>
                                    <option value="4">4 - Good</option>
                                    <option value="5">5 - Excellent</option>
                                  </select>
                                </div>

                                <div className="form-group">
                                  <label>Feedback:</label>
                                  <textarea
                                    name="feedback"
                                    value={evaluationForm.feedback}
                                    onChange={handleEvaluationChange}
                                    placeholder="Provide detailed feedback for the student..."
                                  />
                                </div>

                                <div className="form-group checkbox">
                                  <label>
                                    <input
                                      type="checkbox"
                                      name="requiresResubmission"
                                      checked={evaluationForm.requiresResubmission}
                                      onChange={handleEvaluationChange}
                                    />
                                    Requires resubmission
                                  </label>
                                </div>

                                <button
                                  className="submit-evaluation-btn"
                                  onClick={() => submitEvaluation(evaluation.id)}
                                  disabled={!evaluationForm.decision || !evaluationForm.score}
                                >
                                  Submit Evaluation
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Previous Faculty Evaluation */}
                          {(userRole === 'faculty' || userRole === 'scad') && evaluation.status !== 'pending' && (
                            <div className="previous-evaluation">
                              <h4>Evaluation Details</h4>
                              <div className="evaluation-details">
                                <p><strong>Faculty:</strong> {evaluation.facultyAssigned}</p>
                                <p><strong>Decision:</strong> <StatusBadge status={evaluation.status} /></p>
                                {evaluation.evaluationScore && (
                                  <p><strong>Score:</strong> {evaluation.evaluationScore}/5</p>
                                )}
                                {evaluation.facultyFeedback && (
                                  <div className="feedback">
                                    <strong>Feedback:</strong>
                                    <p>{evaluation.facultyFeedback}</p>
                                  </div>
                                )}
                                {evaluation.isFlagged && (
                                  <div className="flagged-notice">
                                    <FaExclamationTriangle /> This evaluation has been flagged for improvement
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">
            <p>No evaluations found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationForms;