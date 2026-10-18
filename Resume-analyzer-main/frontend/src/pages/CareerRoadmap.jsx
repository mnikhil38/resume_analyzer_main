import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";
import {
  FaRoad,
  FaCalendarAlt,
  FaChartLine,
  FaMicrophone,
  FaArrowRight,
} from "react-icons/fa";

export default function CareerRoadmap() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = state || JSON.parse(localStorage.getItem("resumeAnalysis") || "null");
  const roadmap = data?.careerRoadmap;

  const hasRoadmapData = roadmap && roadmap.weeks && roadmap.weeks.length > 0;

  if (!hasRoadmapData) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <Sidebar />

          <div className="page-content">
            <div className="page-header">
              <div className="page-badge">Learning Roadmap</div>
              <h1>AI Career Roadmap</h1>
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
                <FaRoad />
              </div>
              <h2>No Active Roadmap Found</h2>
              <p style={{ maxWidth: "440px", margin: "8px auto 24px" }}>
                Please run an ATS scan on your resume first. Our AI will automatically synthesize a tailored week-by-week learning curriculum.
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
            <div className="page-badge">Custom Curriculum</div>
            <h1>Personalized Career Roadmap</h1>
            <p className="subtitle">
              Structured step-by-step milestones to upgrade your technical foundation and ATS match score.
            </p>
          </div>

          <div className="glass-card highlight">
            <div className="card-title-row">
              <h2>Learning Plan Overview</h2>
              {roadmap.expectedATS ? (
                <div className="page-badge">Target ATS: {roadmap.expectedATS}%</div>
              ) : null}
            </div>

            <div className="score-hero-grid">
              <div className="score-metric-box">
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px", color: "var(--crimson-primary)", fontSize: "20px" }}>
                  <FaCalendarAlt />
                </div>
                <div className="score-metric-val" style={{ fontSize: "1.6rem" }}>
                  {roadmap.duration || "30 Days"}
                </div>
                <div className="score-metric-label">Estimated Timeline</div>
              </div>

              {roadmap.expectedATS ? (
                <div className="score-metric-box">
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px", color: "var(--crimson-primary)", fontSize: "20px" }}>
                    <FaChartLine />
                  </div>
                  <div className="score-metric-val" style={{ fontSize: "1.6rem" }}>
                    {roadmap.expectedATS}%
                  </div>
                  <div className="score-metric-label">Projected ATS Score</div>
                </div>
              ) : null}
            </div>

            {roadmap.summary && <p style={{ marginTop: "12px" }}>{roadmap.summary}</p>}
          </div>

          {roadmap.weeks.map((week, index) => (
            <div className="glass-card" key={index}>
              <div className="card-title-row">
                <h2>{week.week}: {week.title}</h2>
                <span style={{ fontSize: "0.78rem", color: "var(--crimson-dark)", fontWeight: "700", textTransform: "uppercase" }}>
                  Milestone #{index + 1}
                </span>
              </div>

              <ul>
                {(week.topics || []).map((topic, i) => (
                  <li key={i} style={{ alignItems: "center" }}>
                    <input
                      type="checkbox"
                      id={`topic-${index}-${i}`}
                      style={{
                        width: "18px",
                        height: "18px",
                        accentColor: "var(--crimson-primary)",
                        cursor: "pointer",
                        margin: 0,
                        flexShrink: 0,
                      }}
                    />
                    <label
                      htmlFor={`topic-${index}-${i}`}
                      style={{ margin: 0, cursor: "pointer", color: "inherit", fontWeight: "normal", fontSize: "0.9rem" }}
                    >
                      {topic}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="glass-card highlight" style={{ textAlign: "center", padding: "36px 20px" }}>
            <h2>Ready to Test Your Readiness?</h2>
            <p style={{ maxWidth: "480px", margin: "8px auto 20px" }}>
              Practice mock interview questions based on the concepts in your roadmap.
            </p>

            <button
              className="primary-btn"
              style={{ width: "auto", margin: "0 auto" }}
              onClick={() => navigate("/mock-interview")}
            >
              <FaMicrophone /> Start AI Mock Interview Session
            </button>
          </div>
        </div>
      </div>
    </>
  );
}