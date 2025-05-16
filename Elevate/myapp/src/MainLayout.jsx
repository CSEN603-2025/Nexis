import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './scadDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

<FontAwesomeIcon icon={faRightFromBracket} />
  const navItems = [
    { icon: "fa-home", label: "Dashboard" ,path: "/scaddashboard"},
    { icon: "fa-briefcase", label: "Internships",path: "/internships" },
    { icon: "fa-file-alt", label: "Reports",path: "/reports" },
    { icon: "fa-clipboard-list", label: "Evaluations" ,path: "/EvaluationForms"},
    { icon: "fa-building", label: "Students" ,path: "/students"},
    { icon: "fa-book", label: "Workshops",path: "/workshopsManagement" },
   { icon: "fas fa-right-from-bracket", label: "Log Out", path: "/reg" }
  ];

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    if (currentItem) setActiveItem(currentItem.label);
  }, [location.pathname]);

  const handleNavigation = (item) => {
    if (location.pathname !== item.path) {
      navigate(item.path);
    }
    setActiveItem(item.label);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="scad-container">
        <div className="header-left">
            <button onClick={toggleSidebar} className="sidebar-toggle">
              <i className="fas fa-bars"></i>
            </button>
            </div>

      <div className="main-container">
     
        <aside className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
          <nav className="sidebar-nav">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  onClick={() => handleNavigation(item)}
                  className={`nav-item ${activeItem === item.label ? "active" : ""}`}
                >
                  <div className="nav-link">
                    <i className={`fas ${item.icon} nav-icon`}></i>
                    {!isSidebarCollapsed && <span className="nav-label">{item.label}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
