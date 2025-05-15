import React, { useState, useEffect } from 'react';
import { usePDF } from 'react-to-pdf';
import './Evaluate.css';

const Evaluate = () => {
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState('');
  const [evaluation, setEvaluation] = useState({
    rating: 0,
    recommendation: '',
    pros: '',
    cons: '',
    suggestions: '',
    wouldRecommend: null,
    skillsGained: [],
    mentorshipQuality: 0,
    workEnvironment: 0,
    compensation: 0,
    projectDetails: '',
    challengesFaced: '',
    careerImpact: ''
  });
  
  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  
  const { toPDF, targetRef } = usePDF({
    filename: 'internship-evaluation.pdf',
    page: { orientation: 'portrait', format: 'a4' }
  });

  // Mock data - in a real app, this would come from API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock completed internships
        setInternships([
          { 
            id: '1', 
            company: 'Tech Corp', 
            position: 'Software Developer', 
            date: 'Summer 2023',
            duration: '3 months',
            location: 'San Francisco, CA',
            supervisor: 'John Smith',
            department: 'Engineering'
          },
          { 
            id: '2', 
            company: 'Data Solutions', 
            position: 'Data Analyst', 
            date: 'Fall 2023',
            duration: '4 months',
            location: 'Remote',
            supervisor: 'Sarah Johnson',
            department: 'Data Science'
          }
        ]);
        
        // Mock courses
        setCourses([
          { id: 'cs101', name: 'Introduction to Programming', code: 'CS101', department: 'Computer Science' },
          { id: 'cs201', name: 'Data Structures', code: 'CS201', department: 'Computer Science' },
          { id: 'cs301', name: 'Database Systems', code: 'CS301', department: 'Computer Science' },
          { id: 'cs401', name: 'Software Engineering', code: 'CS401', department: 'Computer Science' },
          { id: 'cs501', name: 'Web Development', code: 'CS501', department: 'Computer Science' },
          { id: 'math202', name: 'Statistics', code: 'MATH202', department: 'Mathematics' },
          { id: 'bus301', name: 'Business Communication', code: 'BUS301', department: 'Business' }
        ]);
        
        // Mock skills
        setSkills([
          { id: 'python', name: 'Python' },
          { id: 'java', name: 'Java' },
          { id: 'sql', name: 'SQL' },
          { id: 'react', name: 'React' },
          { id: 'data-analysis', name: 'Data Analysis' },
          { id: 'teamwork', name: 'Teamwork' },
          { id: 'presentation', name: 'Presentation Skills' },
          { id: 'project-management', name: 'Project Management' }
        ]);
        
        // Check if evaluation exists (mock)
        const existingEvaluation = localStorage.getItem('companyEvaluation');
        if (existingEvaluation) {
          setEvaluation(JSON.parse(existingEvaluation));
          setIsSubmitted(true);
        }
        
        const existingCourses = localStorage.getItem('selectedCourses');
        if (existingCourses) {
          setSelectedCourses(JSON.parse(existingCourses));
        }
        
        const existingSkills = localStorage.getItem('selectedSkills');
        if (existingSkills) {
          setSelectedSkills(JSON.parse(existingSkills));
        }
        
      } catch (error) {
        setFeedback({ message: 'Failed to load data. Please try again.', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleInternshipChange = (e) => {
    setSelectedInternship(e.target.value);
    // Reset evaluation when changing internship
    if (isSubmitted) {
      setEvaluation({
        rating: 0,
        recommendation: '',
        pros: '',
        cons: '',
        suggestions: '',
        wouldRecommend: null,
        skillsGained: [],
        mentorshipQuality: 0,
        workEnvironment: 0,
        compensation: 0,
        projectDetails: '',
        challengesFaced: '',
        careerImpact: ''
      });
      setIsSubmitted(false);
    }
  };

  const handleEvaluationChange = (e) => {
    const { name, value } = e.target;
    setEvaluation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseSelection = (courseId) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  const handleSkillSelection = (skillId) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  const submitEvaluation = (e) => {
    e.preventDefault();
    try {
      // In a real app, this would be an API call
      localStorage.setItem('companyEvaluation', JSON.stringify(evaluation));
      localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
      localStorage.setItem('selectedSkills', JSON.stringify(selectedSkills));
      setIsSubmitted(true);
      setEditMode(false);
      setFeedback({ message: 'Evaluation submitted successfully!', type: 'success' });
    } catch (error) {
      setFeedback({ message: 'Failed to submit evaluation. Please try again.', type: 'error' });
    }
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const getSelectedCourseNames = () => {
    return selectedCourses.map(courseId => {
      const course = courses.find(c => c.id === courseId);
      return course ? `${course.code}: ${course.name}` : '';
    }).filter(name => name !== '');
  };

  const getSelectedSkillNames = () => {
    return selectedSkills.map(skillId => {
      const skill = skills.find(s => s.id === skillId);
      return skill ? skill.name : '';
    }).filter(name => name !== '');
  };

  const getSelectedInternshipDetails = () => {
    return internships.find(internship => internship.id === selectedInternship) || {};
  };

  const renderRatingStars = (rating) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={star <= rating ? 'star filled' : 'star'}
            onClick={() => !isSubmitted || editMode ? setEvaluation(prev => ({ ...prev, rating: star })) : null}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderEvaluationForm = () => (
    <form onSubmit={submitEvaluation} className="evaluation-form">
      <div className="form-section">
        <h3>Overall Experience</h3>
        
        <div className="form-group">
          <label>Overall Rating:</label>
          {renderRatingStars(evaluation.rating)}
          <input type="hidden" name="rating" value={evaluation.rating} />
        </div>
        
        <div className="form-group">
          <label>Would you recommend this company to other students?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="wouldRecommend"
                checked={evaluation.wouldRecommend === true}
                onChange={() => handleEvaluationChange({ target: { name: 'wouldRecommend', value: true } })}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="wouldRecommend"
                checked={evaluation.wouldRecommend === false}
                onChange={() => handleEvaluationChange({ target: { name: 'wouldRecommend', value: false } })}
              />
              No
            </label>
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3>Specific Ratings</h3>
        
        <div className="form-group">
          <label>Mentorship Quality:</label>
          {renderRatingStars(evaluation.mentorshipQuality)}
          <input type="hidden" name="mentorshipQuality" value={evaluation.mentorshipQuality} />
        </div>
        
        <div className="form-group">
          <label>Work Environment:</label>
          {renderRatingStars(evaluation.workEnvironment)}
          <input type="hidden" name="workEnvironment" value={evaluation.workEnvironment} />
        </div>
        
        <div className="form-group">
          <label>Compensation (if applicable):</label>
          {renderRatingStars(evaluation.compensation)}
          <input type="hidden" name="compensation" value={evaluation.compensation} />
        </div>
      </div>
      
      <div className="form-section">
        <h3>Experience Details</h3>
        
        <div className="form-group">
          <label>Key Projects and Responsibilities:</label>
          <textarea
            name="projectDetails"
            value={evaluation.projectDetails}
            onChange={handleEvaluationChange}
            placeholder="Describe the projects you worked on and your responsibilities"
            required
          />
        </div>
        
        <div className="form-group">
          <label>What did you like about the internship?</label>
          <textarea
            name="pros"
            value={evaluation.pros}
            onChange={handleEvaluationChange}
            placeholder="Positive aspects of your experience"
            required
          />
        </div>
        
        <div className="form-group">
          <label>What could be improved?</label>
          <textarea
            name="cons"
            value={evaluation.cons}
            onChange={handleEvaluationChange}
            placeholder="Areas for improvement"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Challenges you faced:</label>
          <textarea
            name="challengesFaced"
            value={evaluation.challengesFaced}
            onChange={handleEvaluationChange}
            placeholder="Describe any challenges and how you overcame them"
          />
        </div>
        
        <div className="form-group">
          <label>How has this internship impacted your career goals?</label>
          <textarea
            name="careerImpact"
            value={evaluation.careerImpact}
            onChange={handleEvaluationChange}
            placeholder="Describe how this experience has influenced your career path"
          />
        </div>
        
        <div className="form-group">
          <label>Suggestions for future interns:</label>
          <textarea
            name="suggestions"
            value={evaluation.suggestions}
            onChange={handleEvaluationChange}
            placeholder="Advice for students who might intern at this company"
          />
        </div>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-button">
          {isSubmitted ? 'Update Evaluation' : 'Submit Evaluation'}
        </button>
        <button 
          type="button" 
          className="cancel-button"
          onClick={() => editMode ? setEditMode(false) : setEvaluation({
            rating: 0,
            recommendation: '',
            pros: '',
            cons: '',
            suggestions: '',
            wouldRecommend: null,
            skillsGained: [],
            mentorshipQuality: 0,
            workEnvironment: 0,
            compensation: 0,
            projectDetails: '',
            challengesFaced: '',
            careerImpact: ''
          })}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderEvaluationSummary = () => (
    <div className="evaluation-summary" ref={targetRef}>
      <div className="summary-section">
        <h3>Internship Evaluation Summary</h3>
        
        <div className="internship-details">
          <h4>Internship Details</h4>
          <p><strong>Company:</strong> {getSelectedInternshipDetails().company}</p>
          <p><strong>Position:</strong> {getSelectedInternshipDetails().position}</p>
          <p><strong>Duration:</strong> {getSelectedInternshipDetails().duration}</p>
          <p><strong>Location:</strong> {getSelectedInternshipDetails().location}</p>
          <p><strong>Supervisor:</strong> {getSelectedInternshipDetails().supervisor}</p>
          <p><strong>Department:</strong> {getSelectedInternshipDetails().department}</p>
        </div>
        
        <div className="summary-item">
          <h4>Overall Rating</h4>
          {renderRatingStars(evaluation.rating)}
          <p>{evaluation.rating}/5</p>
        </div>
        
        <div className="summary-item">
          <h4>Recommendation</h4>
          <p>{evaluation.wouldRecommend ? 'Yes, I would recommend this company' : 'No, I would not recommend this company'}</p>
        </div>
        
        <div className="summary-item">
          <h4>Specific Ratings</h4>
          <p><strong>Mentorship Quality:</strong> {evaluation.mentorshipQuality}/5</p>
          <p><strong>Work Environment:</strong> {evaluation.workEnvironment}/5</p>
          <p><strong>Compensation:</strong> {evaluation.compensation}/5</p>
        </div>
        
        <div className="summary-item">
          <h4>Key Projects and Responsibilities</h4>
          <p>{evaluation.projectDetails || 'Not provided'}</p>
        </div>
        
        <div className="summary-item">
          <h4>Positive Aspects</h4>
          <p>{evaluation.pros || 'Not provided'}</p>
        </div>
        
        <div className="summary-item">
          <h4>Areas for Improvement</h4>
          <p>{evaluation.cons || 'Not provided'}</p>
        </div>
        
        <div className="summary-item">
          <h4>Challenges Faced</h4>
          <p>{evaluation.challengesFaced || 'Not provided'}</p>
        </div>
        
        <div className="summary-item">
          <h4>Career Impact</h4>
          <p>{evaluation.careerImpact || 'Not provided'}</p>
        </div>
        
        <div className="summary-item">
          <h4>Suggestions for Future Interns</h4>
          <p>{evaluation.suggestions || 'Not provided'}</p>
        </div>
        
        {selectedCourses.length > 0 && (
          <div className="summary-item">
            <h4>Relevant Courses</h4>
            <ul>
              {getSelectedCourseNames().map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        )}
        
        {selectedSkills.length > 0 && (
          <div className="summary-item">
            <h4>Skills Developed</h4>
            <div className="skills-list">
              {getSelectedSkillNames().map((name, index) => (
                <span key={index} className="skill-badge">{name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="summary-actions">
        <button className="edit-button" onClick={toggleEdit}>
          Edit Evaluation
        </button>
        <button 
          className="download-button"
          onClick={() => toPDF()}
        >
          Download as PDF
        </button>
      </div>
    </div>
  );

  const renderCoursesSection = () => (
    <div className="section">
      <h2>Relevant Courses</h2>
      <p>Select courses that helped you during your internship:</p>
      
      <div className="filter-controls">
        <select className="department-filter">
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Business">Business</option>
        </select>
        <input 
          type="text" 
          placeholder="Search courses..." 
          className="course-search"
        />
      </div>
      
      <div className="courses-list">
        {courses.map(course => (
          <div key={course.id} className="course-item">
            <label>
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.id)}
                onChange={() => handleCourseSelection(course.id)}
                disabled={isSubmitted && !editMode}
              />
              <span className="course-code">{course.code}</span>
              <span className="course-name">{course.name}</span>
              <span className="course-dept">{course.department}</span>
            </label>
          </div>
        ))}
      </div>
      
      {selectedCourses.length > 0 && (
        <div className="selected-courses">
          <h4>Selected Courses:</h4>
          <ul>
            {getSelectedCourseNames().map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderSkillsSection = () => (
    <div className="section">
      <h2>Skills Gained</h2>
      <p>Select skills you developed during your internship:</p>
      
      <div className="skills-cloud">
        {skills.map(skill => (
          <span 
            key={skill.id}
            className={`skill-tag ${selectedSkills.includes(skill.id) ? 'selected' : ''}`}
            onClick={() => (isSubmitted && !editMode) ? null : handleSkillSelection(skill.id)}
          >
            {skill.name}
          </span>
        ))}
      </div>
      
      {selectedSkills.length > 0 && (
        <div className="selected-skills">
          <h4>Selected Skills:</h4>
          <div className="skills-list">
            {getSelectedSkillNames().map((name, index) => (
              <span key={index} className="skill-badge">{name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-spinner">Loading...</div>;
    }
    
    if (!selectedInternship) {
      return (
        <div className="section">
          <h2>Select Your Internship</h2>
          <select 
            className="internship-select"
            value={selectedInternship}
            onChange={handleInternshipChange}
          >
            <option value="">-- Select an internship --</option>
            {internships.map(internship => (
              <option key={internship.id} value={internship.id}>
                {internship.company} - {internship.position} ({internship.date})
              </option>
            ))}
          </select>
        </div>
      );
    }
    
    return (
      <>
        <div className="section">
          <h2>Internship Details</h2>
          <div className="internship-details-card">
            <h3>{getSelectedInternshipDetails().company}</h3>
            <p><strong>Position:</strong> {getSelectedInternshipDetails().position}</p>
            <p><strong>Duration:</strong> {getSelectedInternshipDetails().duration}</p>
            <p><strong>Location:</strong> {getSelectedInternshipDetails().location}</p>
            <p><strong>Supervisor:</strong> {getSelectedInternshipDetails().supervisor}</p>
            <p><strong>Department:</strong> {getSelectedInternshipDetails().department}</p>
          </div>
        </div>
        
        {(editMode || !isSubmitted) ? renderEvaluationForm() : renderEvaluationSummary()}
        
        {renderCoursesSection()}
        {renderSkillsSection()}
      </>
    );
  };

  return (
    <div className="evaluation-container">
      <header className="evaluation-header">
        <h1>Internship Evaluation Portal</h1>
        <p>Share your experience to help future students</p>
      </header>
      
      {feedback.message && (
        <div className={`feedback-message ${feedback.type}`}>
          {feedback.message}
          <button onClick={() => setFeedback({ message: '', type: '' })}>×</button>
        </div>
      )}
      
      <main className="evaluation-content">
        {renderContent()}
      </main>
      
      <footer className="evaluation-footer">
        <p>© {new Date().getFullYear()} University Internship Program. All rights reserved.</p>
        <p>For assistance, please contact the Career Services Office.</p>
      </footer>
    </div>
  );
};

export default Evaluate;