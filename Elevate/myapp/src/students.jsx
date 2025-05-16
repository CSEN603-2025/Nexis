import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
 // Importing Feather Icons
import './students.css'; // Import your CSS file for styling

// Mock data for students
const mockStudents = [
  { id: 1, name: "Emma Johnson", email: "emma.j@student.scad.edu", major: "MET", year: "Junior", status: "Current intern" },
  { id: 2, name: "Marcus Lee", email: "m.lee@student.scad.edu", major: "IET", year: "Sophomore", status: "Internship complete" },
  { id: 3, name: "Sofia Patel", email: "sofia.p@student.scad.edu", major: "EMS", year: "Senior", status:  "Internship complete" },
  { id: 4, name: "Jackson Smith", email: "j.smith@student.scad.edu", major: "MET", year: "Freshman", status: "Current intern" },
  { id: 5, name: "Olivia Garcia", email: "o.garcia@student.scad.edu", major: "IET", year: "Senior", status: "Current intern" },
  { id: 6, name: "Ethan Williams", email: "e.williams@student.scad.edu", major: "IET", year: "Junior", status: "Internship complete"},
  { id: 7, name: "Ava Rodriguez", email: "a.rodriguez@student.scad.edu", major: "Law", year: "Sophomore", status:"Internship complete"},
  { id: 8, name: "Noah Chen", email: "n.chen@student.scad.edu", major: "Business", year: "Senior", status:"Current intern" },
  { id: 9, name: "Mia Taylor", email: "m.taylor@student.scad.edu", major: "Law", year: "Freshman", status: "Internship complete"},
  { id: 10, name: "Liam Brown", email: "l.brown@student.scad.edu", major: "Business", year: "Junior", status: "Internship complete" },
];

// The main component
export default function StudentList() {
  const [students, setStudents] = useState(mockStudents); // Initialize with mock data
  const [selectedMajor, setSelectedMajor] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('Students'); // state to track the active item

  const handleNavigation = (item) => {
    setActiveItem(item.label); // visually highlight the clicked item
    navigate(item.path);       // go to the route
  };
const handleRowClick = (id) => {
  navigate(`/students/${id}`);
};

  useEffect(() => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    if (currentItem) setActiveItem(currentItem.label);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleStatusFilter = (e) => setStatusFilter(e.target.value);

  // Filter students based on status filter
  const filteredStudents = students.filter(student => {
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesStatus;
  });

  // Get unique statuses for filter dropdown
  const statuses = ['All', ...new Set(students.map(student => student.status))];

  const navItems = [
    { icon: "fa-home", label: "Dashboard", path: "/dashboard" },
    { icon: "fa-briefcase", label: "Internships", path: "/internships" },
    { icon: "fa-file-alt", label: "Reports", path: "/reports" },
    { icon: "fa-clipboard-list", label: "Evaluations", path: "/evaluations" },
    { icon: "fa-building", label: "Students", path: "/students" },
    { icon: "fa-book", label: "Resources", path: "/resources" },
    { icon: "fa-cog", label: "Settings", path: "/settings" },
  ];

  return (
    <div className="scad-container">
      {/* Top Navigation Bar */}
     

      <div className="main-container">
        {/* Sidebar */}
        

        {/* Main content */}
        <main className="content">
         
          <div className="companies-container">
            <div className="card companies-card">
              <div className="card-header">
                 <button 
      className="back-to-dashboard"
      onClick={() => window.location.href = '/scaddashboard'}
    >
      Back to Dashboard
    </button>
                <h2 className="card-title">Students List</h2>
                <div className="filter-controls">
                  <select value={statusFilter} onChange={handleStatusFilter} className="industry-filter">
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="card-body">
                <table className="companies-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Major</th>
                      <th>Year</th>
                      <th>Internship Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr
                        key={student.id}
                        onClick={() => handleRowClick(student.id)}
                        className={selectedCompanyId === student.id ? "selected-row" : ""}
                      >
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.major}</td>
                        <td>{student.year}</td>
                        <td>
                            <span className={`status-badge status-${student.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {student.status}
                            </span>
                          </td>
                           <td>
        <button
          onClick={() => navigate(`/students/${student.id}`)}
          className="view-profile-button"
        >
          View Profile
        </button>
      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}