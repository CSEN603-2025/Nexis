import React, { useState } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBriefcase,
  FaCalendar,
  FaUserGraduate,
  FaStar,
  FaComments,
  FaFileDownload,
  FaCheck,
  FaTimes,
  FaList,
  FaAward
} from 'react-icons/fa';
import './WorkshopsManagement.css';

const WorkshopsManagement = () => {
  // Workshop data state
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: 'Resume Writing Masterclass',
      description: 'Learn how to craft a professional resume that stands out',
      startDate: '2024-06-15T14:00',
      endDate: '2024-06-15T16:00',
      speaker: 'John Doe (Career Advisor)',
      speakerBio: '10+ years experience in HR at top tech companies',
      agenda: ['1. Resume Structure', '2. Action Verbs', '3. Tailoring Resumes'],
      attendees: 45,
      averageRating: 4.7,
      feedback: [
        { id: 1, student: 'Ahmed Mohamed', rating: 5, comment: 'Very helpful!' },
        { id: 2, student: 'Mariam Ali', rating: 4, comment: 'Great tips' }
      ]
    },
    {
      id: 2,
      title: 'Technical Interview Prep',
      description: 'Prepare for coding interviews at top tech companies',
      startDate: '2024-06-20T10:00',
      endDate: '2024-06-20T12:00',
      speaker: 'Sarah Johnson (Google Engineer)',
      speakerBio: 'Senior Software Engineer at Google',
      agenda: ['1. Problem Solving', '2. Whiteboarding', '3. System Design'],
      attendees: 78,
      averageRating: 4.9,
      feedback: [
        { id: 1, student: 'Omar Hassan', rating: 5, comment: 'Excellent content' }
      ]
    }
  ]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    speaker: '',
    speakerBio: '',
    agenda: ''
  });

  // UI state
  const [isEditing, setIsEditing] = useState(false);
  const [currentWorkshopId, setCurrentWorkshopId] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filters, setFilters] = useState({
    search: '',
    dateRange: 'all'
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle agenda input (convert string to array for display purposes)
  const handleAgendaChange = (e) => {
    setFormData(prev => ({
      ...prev,
      agenda: e.target.value
    }));
  };

  // Submit workshop (create or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert agenda string to array
    const agendaArray = formData.agenda
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');

    const workshopData = {
      ...formData,
      agenda: agendaArray
    };

    if (isEditing) {
      // Update existing workshop
      setWorkshops(prev =>
        prev.map(workshop =>
          workshop.id === currentWorkshopId
            ? { ...workshop, ...workshopData }
            : workshop
        )
      );
    } else {
      // Create new workshop
      const newWorkshop = {
        id: workshops.length + 1,
        ...workshopData,
        attendees: 0,
        averageRating: 0,
        feedback: []
      };
      setWorkshops(prev => [...prev, newWorkshop]);
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      speaker: '',
      speakerBio: '',
      agenda: ''
    });
    setIsEditing(false);
    setCurrentWorkshopId(null);
  };

  // Edit workshop
  const handleEdit = (workshop) => {
    setFormData({
      title: workshop.title,
      description: workshop.description,
      startDate: workshop.startDate,
      endDate: workshop.endDate,
      speaker: workshop.speaker,
      speakerBio: workshop.speakerBio,
      agenda: Array.isArray(workshop.agenda) ? workshop.agenda.join('\n') : ''
    });
    setIsEditing(true);
    setCurrentWorkshopId(workshop.id);
  };

  // Delete workshop
  const handleDelete = (id) => {
    setWorkshops(prev => prev.filter(workshop => workshop.id !== id));
  };

  // Filter workshops
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const now = new Date();
    const workshopDate = new Date(workshop.startDate);
    
    let matchesDate = true;
    if (filters.dateRange === 'upcoming') {
      matchesDate = workshopDate > now;
    } else if (filters.dateRange === 'past') {
      matchesDate = workshopDate <= now;
    }
    
    return matchesSearch && matchesDate;
  });

  // Generate statistics report
  const generateReport = (type) => {
    alert(`Generating ${type} report...`);
  };

  return (
    <div className="workshops-management">
      <header className="workshops-header">
        <h1><FaBriefcase className="header-icon" /> SCAD Office - Workshops</h1>
        <p>Manage career workshops for PRO students</p>
      </header>

      <div className="workshops-container">
        {/* Workshop Form */}
        <div className="workshop-form-section">
          <h2>{isEditing ? 'Edit Workshop' : 'Create Workshop'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label><FaBriefcase /> Workshop Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label><FaList /> Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label><FaCalendar /> Start Date & Time *</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label><FaCalendar /> End Date & Time *</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label><FaUserGraduate /> Speaker Name *</label>
              <input
                type="text"
                name="speaker"
                value={formData.speaker}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label><FaAward /> Speaker Bio *</label>
              <textarea
                name="speakerBio"
                value={formData.speakerBio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label><FaList /> Agenda (One item per line) *</label>
              <textarea
                name="agenda"
                value={formData.agenda}
                onChange={handleAgendaChange}
                placeholder="Enter each agenda item on a new line"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                <FaCheck /> {isEditing ? 'Update Workshop' : 'Create Workshop'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      title: '',
                      description: '',
                      startDate: '',
                      endDate: '',
                      speaker: '',
                      speakerBio: '',
                      agenda: ''
                    });
                  }}
                >
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Workshops List */}
        <div className="workshops-list-section">
          <div className="workshops-toolbar">
            <div className="search-filter">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search workshops..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <div className="filter-group">
              <label><FaCalendar /> Date Range:</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
              >
                <option value="all">All</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div className="report-actions">
              <button
                className="report-btn"
                onClick={() => generateReport('pdf')}
              >
                <FaFileDownload /> PDF
              </button>
              <button
                className="report-btn"
                onClick={() => generateReport('excel')}
              >
                <FaFileDownload /> Excel
              </button>
            </div>
          </div>

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <FaList /> Workshops
            </button>
            <button
              className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              <FaAward /> Statistics
            </button>
            <button
              className={`tab ${activeTab === 'feedback' ? 'active' : ''}`}
              onClick={() => setActiveTab('feedback')}
            >
              <FaComments /> Feedback
            </button>
          </div>

          {activeTab === 'upcoming' && (
            <div className="workshops-grid">
              {filteredWorkshops.length > 0 ? (
                filteredWorkshops.map(workshop => (
                  <div key={workshop.id} className="workshop-card">
                    <div className="workshop-header">
                      <div className="workshop-title-container">
                        <h3>{workshop.title}</h3>
                        <span className={`workshop-status ${
                          new Date(workshop.startDate) > new Date() ? 'status-upcoming' : 'status-past'
                        }`}>
                          {new Date(workshop.startDate) > new Date() ? 'Upcoming' : 'Past'}
                        </span>
                      </div>
                    </div>
                    <div className="workshop-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(workshop)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(workshop.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                    <p className="workshop-description">{workshop.description}</p>
                    <div className="workshop-details">
                      <div className="detail-item">
                        <FaCalendar className="detail-icon" />
                        <span>
                          {new Date(workshop.startDate).toLocaleString()} - {' '}
                          {new Date(workshop.endDate).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="detail-item">
                        <FaUserGraduate className="detail-icon" />
                        <span>{workshop.speaker}</span>
                      </div>
                      <div className="detail-item">
                        <FaList className="detail-icon" />
                        <div className="agenda-items">
                          {Array.isArray(workshop.agenda) && workshop.agenda.length > 0 ? (
                            workshop.agenda.map((item, index) => (
                              <span key={index}>{item}</span>
                            ))
                          ) : (
                            <span>No agenda items available</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="workshop-footer">
                      <span className="attendees">
                        <FaUserGraduate /> {workshop.attendees} attendees
                      </span>
                      <span className="rating">
                        <FaStar /> {workshop.averageRating.toFixed(1)}/5
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-workshops">
                  <FaSearch className="no-results-icon" />
                  <p>No workshops found</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className=" atmosphere-section">
              <h3><FaAward /> Workshop Statistics</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Total Workshops</h4>
                  <p className="stat-value">{workshops.length}</p>
                </div>
                <div className="stat-card">
                  <h4>Upcoming</h4>
                  <p className="stat-value">
                    {workshops.filter(w => new Date(w.startDate) > new Date()).length}
                  </p>
                </div>
                <div className="stat-card">
                  <h4>Average Attendance</h4>
                  <p className="stat-value">
                    {workshops.length > 0
                      ? Math.round(workshops.reduce((sum, w) => sum + w.attendees, 0) / workshops.length)
                      : 0}
                  </p>
                </div>
                <div className="stat-card">
                  <h4>Average Rating</h4>
                  <p className="stat-value">
                    {workshops.length > 0
                      ? (workshops.reduce((sum, w) => sum + w.averageRating, 0) / workshops.length).toFixed(1)
                      : 0}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="feedback-section">
              <h3><FaComments /> Workshop Feedback</h3>
              {workshops.filter(w => w.feedback.length > 0).length > 0 ? (
                workshops
                  .filter(w => w.feedback.length > 0)
                  .map(workshop => (
                    <div key={workshop.id} className="workshop-feedback">
                      <h4>{workshop.title}</h4>
                      <p className="feedback-meta">
                        <FaStar /> {workshop.averageRating.toFixed(1)}/5 • {' '}
                        {workshop.feedback.length} reviews
                      </p>
                      <div className="feedback-list">
                        {workshop.feedback.map(fb => (
                          <div key={fb.id} className="feedback-item">
                            <div className="feedback-header">
                              <span className="student-name">{fb.student}</span>
                              <span className="rating">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={i < fb.rating ? 'filled' : ''}
                                  />
                                ))}
                              </span>
                            </div>
                            <p className="feedback-comment">{fb.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="no-feedback">
                  <FaComments className="no-results-icon" />
                  <p>No feedback available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopsManagement;