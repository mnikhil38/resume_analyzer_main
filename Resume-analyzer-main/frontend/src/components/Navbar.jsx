import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaBell, FaRobot } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="navbar"
    >
      <Link to="/" className="logo">
        <FaRobot className="logo-icon" />
        <div>
          <h2>Career Ascent AI</h2>
          <span>AI Intelligence Suite</span>
        </div>
      </Link>

      <div className="nav-links">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
          Dashboard
        </Link>
        <Link to="/resume" className={location.pathname === "/resume" ? "active" : ""}>
          Resume Analyzer
        </Link>
        <Link to="/jobs" className={location.pathname === "/jobs" ? "active" : ""}>
          Live Jobs
        </Link>
        <Link to="/mock-interview" className={location.pathname === "/mock-interview" ? "active" : ""}>
          Mock Interview
        </Link>
      </div>

      <div className="nav-right">
        <button className="nav-icon-btn" title="Notifications">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <Link to="/settings" className="profile-btn">
          <div className="profile-avatar">CA</div>
          <span className="profile-name">Workspace</span>
        </Link>
      </div>
    </motion.nav>
  );
}