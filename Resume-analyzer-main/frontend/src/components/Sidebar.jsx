import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaBriefcase,
  FaMicrophone,
  FaLinkedin,
  FaRoad,
  FaChartLine,
  FaEnvelopeOpenText,
  FaCog,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    title: "Resume Analyzer",
    icon: <FaFileAlt />,
    path: "/resume",
  },
  {
    title: "Live Jobs",
    icon: <FaBriefcase />,
    path: "/jobs",
  },
  {
    title: "Mock Interview",
    icon: <FaMicrophone />,
    path: "/mock-interview",
  },
  {
    title: "LinkedIn Optimizer",
    icon: <FaLinkedin />,
    path: "/linkedin",
  },
  {
    title: "Career Roadmap",
    icon: <FaRoad />,
    path: "/career-roadmap",
  },
  {
    title: "Skill Gap Analysis",
    icon: <FaChartLine />,
    path: "/skill-gap",
  },
  {
    title: "Cover Letter",
    icon: <FaEnvelopeOpenText />,
    path: "/cover-letter",
  },
  {
    title: "Settings",
    icon: <FaCog />,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Navigation</div>

      {menuItems.map((item) => (
        <NavLink
          key={item.title}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <span className="sidebar-icon">{item.icon}</span>
          <span>{item.title}</span>
        </NavLink>
      ))}

      <div className="upgrade-card">
        <div className="upgrade-card-header">
          <h3>Career Pro</h3>
          <span className="pro-badge">PRO</span>
        </div>

        <p>
          Unlock unlimited AI scans, personalized coaching and real-time ATS match diagnostics.
        </p>

        <button>Upgrade Plan</button>
      </div>
    </aside>
  );
}