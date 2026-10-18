import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";
import {
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFire,
  FaRobot,
  FaArrowRight,
  FaRoad,
} from "react-icons/fa";

export default function SkillGap() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = state || JSON.parse(localStorage.getItem("resumeAnalysis") || "null");
  const skillGap = data?.skillGap;

  const hasSkillGapData =
    skillGap &&
    (skillGap.overallMatch > 0 ||
      (skillGap.matchedSkills && skillGap.matchedSkills.length > 0) ||
      (skillGap.missingSkills && skillGap.missingSkills.length > 0));

  if (!hasSkillGapData) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <Sidebar />

          <div className="page-content">
            <div className="page-header">
              <div className="page-badge">Gap Analysis</div>
              <h1>Skill Gap Analysis</h1>
            </div>

            <div className="glass-card" style={{ textAlign: "center", padding: "50px 20px" }}>
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "12px",
                  background: "var(--crimson-badge-bg)",
                  border: "1px solid var(--border-crimson)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "var(--crimson-primary)",
                  fontSize: "24px",
                }}
              >
                <FaChartLine />
              </div>
              <h2>No Diagnostic Data Found</h2>
              <p style={{ maxWidth: "440px", margin: "8px auto 24px" }}>
                Please run an ATS scan on your resume first. Our AI will compute your skill match percentage and identify missing technical competencies.
              </p>

              <button
                className="primary-btn"
                style={{ width: "auto", margin: "0 auto" }}
                onClick={() => navigate("/resume")}
              >
                Scan Resume Now <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <div className="page-header">
            <div className="page-badge">Competency Diagnostics</div>
            <h1>Skill Gap Analysis</h1>
            <p className="subtitle">
              Comprehensive breakdown of verified skills versus target role requirements.
            </p>
          </div>

          {/* Overall Match */}
          <div className="glass-card highlight">
            <div className="card-title-row">
              <h2>Overall Skill Match Rating</h2>
              <div className="page-badge">Precision AI Diagnostic</div>
            </div>

            <div className="score-hero-grid" style={{ gridTemplateColumns: "1fr" }}>
              <div className="score-metric-box">
                <div className="score-metric-val" style={{ fontSize: "3rem" }}>
                  {skillGap.overallMatch || 0}%
                </div>
                <div className="score-metric-label">Role Competency Alignment</div>
              </div>
            </div>
          </div>

          {/* Matched vs Missing Skills Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {/* Matched Skills */}
            <div className="glass-card">
              <div className="card-title-row">
                <h2>
                  <FaCheckCircle style={{ color: "var(--success)", marginRight: "8px" }} />
                  Verified Matched Skills
                </h2>
              </div>

              <ul>
                {(skillGap.matchedSkills || []).map((skill, index) => (
                  <li key={index} className="success-item">
                    <span style={{ color: "var(--success)", fontWeight: "700" }}>✓</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Skills */}
            <div className="glass-card">
              <div className="card-title-row">
                <h2>
                  <FaExclamationTriangle style={{ color: "var(--crimson-primary)", marginRight: "8px" }} />
                  Missing Required Skills
                </h2>
              </div>

              <ul>
                {(skillGap.missingSkills || []).map((skill, index) => (
                  <li key={index}>
                    <span style={{ color: "var(--crimson-primary)", fontWeight: "700" }}>✕</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* High Priority Skills */}
          {skillGap.highPrioritySkills && skillGap.highPrioritySkills.length > 0 && (
            <div className="glass-card">
              <div className="card-title-row">
                <h2>
                  <FaFire style={{ color: "var(--crimson-primary)", marginRight: "8px" }} />
                  High Priority Skills to Acquire
                </h2>
              </div>
              <p style={{ fontSize: "0.85rem", marginBottom: "14px" }}>
                Mastering these skills delivers the highest ROI on your ATS pass rates:
              </p>

              <div className="tag-cloud">
                {skillGap.highPrioritySkills.map((item, index) => (
                  <span key={index} className="tag-chip">
                    🔥 {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strengths & Weaknesses */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {skillGap.strengths && skillGap.strengths.length > 0 && (
              <div className="glass-card">
                <div className="card-title-row">
                  <h2>Core Profile Strengths</h2>
                </div>
                <ul>
                  {skillGap.strengths.map((item, index) => (
                    <li key={index} className="success-item">
                      <span>★</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {skillGap.weaknesses && skillGap.weaknesses.length > 0 && (
              <div className="glass-card">
                <div className="card-title-row">
                  <h2>Vulnerabilities / Areas to Improve</h2>
                </div>
                <ul>
                  {skillGap.weaknesses.map((item, index) => (
                    <li key={index}>
                      <span>▲</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* AI Recommendation */}
          {skillGap.recommendation && (
            <div className="glass-card highlight">
              <div className="card-title-row">
                <h2>
                  <FaRobot style={{ color: "var(--crimson-primary)", marginRight: "8px" }} />
                  AI Career Strategist Advice
                </h2>
              </div>
              <p style={{ color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: "1.7" }}>
                {skillGap.recommendation}
              </p>

              <button
                className="primary-btn"
                style={{ marginTop: "24px" }}
                onClick={() => navigate("/career-roadmap", { state: data })}
              >
                <FaRoad /> Generate Tailored Learning Roadmap
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}