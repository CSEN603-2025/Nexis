import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ReportsPage.css";
function Evaluations() {
     const reports = [
    {
      id: 1,
      title: "Evaluation 1",
      submittedBy: "Student A",
     
      major: "MET",
     
      GPA: 3.5,
      Company: "Tech Corp",

     mainsuperviser: "John Doe",
     startDate: "2023-01-01",
      endDate: "2023-06-01",
      
    },
    {
      id: 2,
      title: "Evaluation 2",
      submittedBy: "Student B",
     
      major: "IET",
     
      GPA: 3.8,
      Company: "Web Solutions",
        mainsuperviser: "Jane Smith",
    startDate: "2023-02-01",
      endDate: "2023-07-01",
      
    },
    {
      id: 3,
      title: "Evaluation 3",
      submittedBy: "Student C",
    
      major: "Law",
     
      GPA: 3.2,
      Company: "Legal Inc.",
        mainsuperviser: "Emily Davis",
    startDate: "2023-03-01",
      endDate: "2023-08-01",
    },
    {
      id: 4,
      title: "Evaluation 4",
      submittedBy: "Student D",
      
      major: "EMS",
      status: "Flagged",
      GPA: 3.9,
      Company: "Health Inc.",
        mainsuperviser: "Michael Brown",
      startDate: "2023-04-01",
      endDate: "2023-09-01",
    },
  ];
   const [Evaluations, setEvaluations] = useState(reports);
    const [showContent, setShowContent] = useState({});
   const toggleReportContent = (reportId) => {
    setShowContent(prev => ({
      ...prev,
      [reportId]: !prev[reportId]
    }));
  };
  return(
    <div className="main-container">
       
        {/* Main Content Area */}
        <main className="content-area">
          <div className="main-content">
            <div className="content-wrapper">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Evaluation Reports</h2>
                   <div className="card-body">
                  <ul className="reports-list">
                    {Evaluations.map((report) => (
                      <li key={report.id} className="report-item">
                        <div className="report-info">
                          <h3 className="report-title">{report.title}</h3>
                          <p className="report-submitter">Name: {report.submittedBy}</p>
                          <p className="report-submitter">Major: {report.major}</p>
                           <p className="report-submitter">GPA: {report.GPA}</p>
                            <p className="report-submitter">Company: {report.Company}</p>
                            <div className="report-actions">
                                 <button
                            onClick={() => toggleReportContent(report.id)}
                            className="action-button"
                          >
                            {showContent[report.id] ? "Hide details" : "View details"}
                          </button>

                          </div>
                           <div className={`accordion ${showContent[report.id] ? "open" : ""}`}>
                            <p className="report-submitter">Name: {report.submittedBy}</p>
                            <p className="report-submitter">Major: {report.major}</p>
                            <p className="report-submitter">GPA: {report.GPA}</p>
                            <p className="report-submitter">Company: {report.Company}</p>
                            <p className="report-submitter">Main Supervisor: {report.mainsuperviser}</p>
                            <p className="report-submitter">Start Date: {report.startDate}</p>
                            <p className="report-submitter">End Date: {report.endDate}</p>
                           
                          </div>
                           
                        </div>
                        </li>

                    ))}
                    </ul>
                </div>
                </div>
            </div>
            </div>
            </div>
        </main>
        </div>
    );}
export default Evaluations;