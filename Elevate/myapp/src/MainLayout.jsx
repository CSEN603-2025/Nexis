import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './pages/scadDashboard.css';

  const navItems = [
    { icon: "fa-home", label: "Dashboard" ,path: "/scaddashboard"},
    { icon: "fa-briefcase", label: "Internships",path: "/internships" },
    { icon: "fa-file-alt", label: "Reports",path: "/reports" },
    { icon: "fa-clipboard-list", label: "Evaluations" },
    { icon: "fa-building", label: "Students" ,path: "/students"},
    { icon: "fa-book", label: "Resources" },
    { icon: "fa-cog", label: "Settings" },
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
    <div className="app-container">
      <header className="top-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={toggleSidebar} className="sidebar-toggle">
              <i className="fas fa-bars"></i>
            </button>
            <img src="/api/placeholder/120/40" alt="Logo" className="logo" />
          </div>
          <div className="header-right">
            <button className="icon-button"><i className="fas fa-bell"></i></button>
            <button className="icon-button"><i className="fas fa-moon"></i></button>
            <div className="avatar">SO</div>
          </div>
        </div>
      </header>

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
