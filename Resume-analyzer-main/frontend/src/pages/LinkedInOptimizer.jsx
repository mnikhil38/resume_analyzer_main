import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";
import {
  FaLinkedin,
  FaCopy,
  FaCheck,
  FaLightbulb,
  FaCode,
  FaTag,
  FaArrowRight,
} from "react-icons/fa";

export default function LinkedInOptimizer() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [copiedSection, setCopiedSection] = useState(null);

  // Get analysis from navigation OR localStorage
  const data = state || JSON.parse(localStorage.getItem("resumeAnalysis") || "null");
  const linkedin = data?.linkedin;

  const copyToClipboard = (text, sectionName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const hasLinkedInData = linkedin && (linkedin.headline || linkedin.about || (linkedin.skills && linkedin.skills.length > 0));

  // If no analysis exists
  if (!hasLinkedInData) {
    return (
      <>
        <Navbar />

        <div className="dashboard-container">
          <Sidebar />

          <div className="page-content">
            <div className="page-header">
              <div className="page-badge">Profile Optimization</div>
              <h1>LinkedIn Optimizer</h1>
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
                <FaLinkedin />
              </div>
              <h2>No Resume Diagnostic Found</h2>
              <p style={{ maxWidth: "440px", margin: "8px auto 24px" }}>
                Please run an ATS scan on your resume first. Our AI will automatically synthesize optimized LinkedIn content tailored to your target roles.
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
            <div className="page-badge">Recruiter Visibility</div>
            <h1>LinkedIn Profile Optimizer</h1>
            <p className="subtitle">
              AI-generated profile positioning, recruiter search keywords, and high-impact copy.
            </p>
          </div>

          {/* Headline */}
          {linkedin.headline && (
            <div className="glass-card">
              <div className="card-title-row">
                <h2>Targeted Professional Headline</h2>
                <button
                  className="copy-btn"
                  style={{ margin: 0 }}
                  onClick={() => copyToClipboard(linkedin.headline, "headline")}
                >
                  {copiedSection === "headline" ? (
                    <>
                      <FaCheck /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy Headline
                    </>
                  )}
                </button>
              </div>

              <p style={{ color: "var(--text-primary)", fontSize: "0.98rem", fontWeight: "600", marginTop: "10px" }}>
                {linkedin.headline}
              </p>
            </div>
          )}

          {/* About */}
          {linkedin.about && (
            <div className="glass-card">
              <div className="card-title-row">
                <h2>About / Summary Section</h2>
                <button
                  className="copy-btn"
                  style={{ margin: 0 }}
                  onClick={() => copyToClipboard(linkedin.about, "about")}
                >
                  {copiedSection === "about" ? (
                    <>
                      <FaCheck /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy About
                    </>
                  )}
                </button>
              </div>

              <p style={{ whiteSpace: "pre-wrap", marginTop: "10px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                {linkedin.about}
              </p>
            </div>
          )}

          {/* Keywords */}
          {linkedin.keywords && linkedin.keywords.length > 0 && (
            <div className="glass-card">
              <div className="card-title-row">
                <h2>
                  <FaTag style={{ color: "var(--crimson-primary)", marginRight: "8px" }} />
                  Recruiter Search Keywords
                </h2>
              </div>
              <p style={{ fontSize: "0.85rem", marginBottom: "12px" }}>
                Include these keywords naturally in your skills, headline, and about sections to rank higher in recruiter Boolean searches:
              </p>

              <div className="tag-cloud">
                {linkedin.keywords.map((item, index) => (
                  <span key={index} className="tag-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {linkedin.skills && linkedin.skills.length > 0 && (
            <div className="glass-card">
              <div className="card-title-row">
                <h2>Featured Skills & Competencies</h2>
              </div>

              <ul>
                {linkedin.skills.map((skill, index) => (
                  <li key={index}>
                    <FaCheck style={{ color: "var(--crimson-primary)", marginTop: "2px" }} />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {linkedin.projects && linkedin.projects.length > 0 && (
            <div className="glass-card">
              <div className="card-title-row">
                <h2>
                  <FaCode style={{ color: "var(--crimson-primary)", marginRight: "8px" }} />
                  Recommended Project Highlights
                </h2>
              </div>

              <ul>
                {linkedin.projects.map((project, index) => (
                  <li key={index}>
                    <span style={{ color: "var(--crimson-primary)", fontWeight: "700" }}>★</span>
                    <span>{project}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          {linkedin.experienceTips && linkedin.experienceTips.length > 0 && (
            <div className="glass-card">
              <div className="card-title-row">
                <h2>
                  <FaLightbulb style={{ color: "var(--crimson-primary)", marginRight: "8px" }} />
                  Experience Section Enhancement Tips
                </h2>
              </div>

              <ul>
                {linkedin.experienceTips.map((tip, index) => (
                  <li key={index}>
                    <span style={{ color: "var(--crimson-primary)", fontWeight: "700" }}>👉</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Copy Everything Card */}
          <div className="glass-card" style={{ background: "linear-gradient(145deg, #ffffff 0%, #fff1f2 100%)", borderColor: "var(--border-crimson)" }}>
            <button
              className="primary-btn"
              onClick={() => {
                const fullText = `HEADLINE:\n${linkedin.headline || ""}\n\nABOUT:\n${linkedin.about || ""}\n\nTOP SKILLS:\n${(linkedin.skills || []).join(", ")}\n\nKEYWORDS:\n${(linkedin.keywords || []).join(", ")}\n\nPROJECT RECOMMENDATIONS:\n${(linkedin.projects || []).join("\n")}`;
                copyToClipboard(fullText, "all");
              }}
            >
              {copiedSection === "all" ? (
                <>
                  <FaCheck /> Complete Profile Copied to Clipboard!
                </>
              ) : (
                <>
                  <FaCopy /> Copy Complete Profile Package
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}