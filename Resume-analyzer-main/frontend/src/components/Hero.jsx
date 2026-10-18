import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCompass,
  FaFileAlt,
  FaCheckCircle,
  FaBolt,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      {/* LEFT SIDE */}
      <motion.div
        className="hero-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          <span>Next-Gen AI Career Copilot</span>
        </div>

        <h1>
          Accelerate Your <br />
          <span className="crimson-gradient-text">Career Trajectory</span> <br />
          with Precision AI
        </h1>

        <p>
          Diagnose resume ATS vulnerabilities, identify high-yield skill gaps,
          optimize your LinkedIn profile, and rehearse real-time mock interviews
          to secure top-tier roles.
        </p>

        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => navigate("/resume")}
          >
            Launch Resume Scan
            <FaArrowRight />
          </button>

          <button
            className="btn-secondary"
            onClick={scrollToFeatures}
          >
            <FaCompass />
            Explore Capabilities
          </button>
        </div>
      </motion.div>

      {/* RIGHT SIDE: MODERN ATS DIAGNOSTIC SHOWCASE */}
      <motion.div
        className="hero-right"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-preview-container">
          {/* Top Floating Badge */}
          <motion.div
            className="hero-floating-card-1"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <FaCheckCircle style={{ color: "#16a34a", fontSize: "18px" }} />
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--text-primary)" }}>
                ATS Match Verified
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                Optimized for Recruiter Systems
              </div>
            </div>
          </motion.div>

          {/* Main Card */}
          <div className="hero-main-card">
            <div className="hero-card-header">
              <div className="hero-card-user">
                <div className="hero-user-icon">
                  <FaFileAlt />
                </div>
                <div>
                  <div className="hero-user-title">Resume Diagnostic</div>
                  <div className="hero-user-subtitle">Target: Software Engineering</div>
                </div>
              </div>

              <div className="hero-live-badge">
                <span className="pulse-dot"></span>
                AI Active
              </div>
            </div>

            <div className="hero-metrics-row">
              <div className="hero-metric-tile">
                <div className="hero-metric-val">96%</div>
                <div className="hero-metric-name">ATS Score</div>
              </div>

              <div className="hero-metric-tile">
                <div className="hero-metric-val">92%</div>
                <div className="hero-metric-name">Role Match</div>
              </div>
            </div>

            <div className="hero-progress-section">
              <div className="hero-progress-label">
                <span>Keyword Density & Alignment</span>
                <span style={{ color: "var(--crimson-primary)" }}>Optimal</span>
              </div>
              <div className="hero-progress-track">
                <motion.div
                  className="hero-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "94%" }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                />
              </div>
            </div>

            <div style={{ fontSize: "0.78rem", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>
              Verified High-Impact Skills
            </div>

            <div className="hero-skills-row">
              <span className="hero-skill-pill matched">
                <FaBolt style={{ color: "var(--crimson-primary)", fontSize: "10px" }} /> React.js
              </span>
              <span className="hero-skill-pill matched">
                <FaBolt style={{ color: "var(--crimson-primary)", fontSize: "10px" }} /> TypeScript
              </span>
              <span className="hero-skill-pill matched">
                <FaBolt style={{ color: "var(--crimson-primary)", fontSize: "10px" }} /> System Design
              </span>
              <span className="hero-skill-pill matched">
                <FaBolt style={{ color: "var(--crimson-primary)", fontSize: "10px" }} /> Cloud APIs
              </span>
              <span className="hero-skill-pill matched">
                <FaBolt style={{ color: "var(--crimson-primary)", fontSize: "10px" }} /> CI/CD
              </span>
            </div>
          </div>

          {/* Bottom Floating Badge */}
          <motion.div
            className="hero-floating-card-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "var(--crimson-badge-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--crimson-primary)" }}>
              <FaChartLine />
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--text-primary)" }}>
                3.2x Interview Boost
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                High callback probability
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}