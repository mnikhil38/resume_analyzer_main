import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  FaFileUpload,
  FaFilePdf,
  FaCheckCircle,
  FaChartLine,
  FaRoad,
  FaLinkedin,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";

export default function ResumeAnalyzer() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Load previous analysis when page opens
  useEffect(() => {
    const saved = localStorage.getItem("resumeAnalysis");
    if (saved) {
      try {
        setResult(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cached analysis", e);
      }
    }
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setResume(file);
      } else {
        alert("Please upload a valid PDF document.");
      }
    }
  };

  const handleAnalyze = async () => {
    if (!resume) {
      alert("Please upload a resume (PDF).");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const response = await fetch(
        "https://resume-analyzer-w806.onrender.com/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze resume.");
      }

      const data = await response.json();
      console.log("Analysis Result:", data);

      setResult(data);
      localStorage.setItem("resumeAnalysis", JSON.stringify(data));
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Please ensure the backend is active or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <div className="page-header">
            <div className="page-badge">AI Diagnostic Engine</div>
            <h1>ATS Resume Analyzer</h1>
            <p className="subtitle">
              Upload your resume and compare against target job requirements for in-depth ATS diagnostics.
            </p>
          </div>

          <div className="glass-card">
            <div className="card-title-row">
              <h2>Upload & Configuration</h2>
            </div>

            <div className="form-group">
              <label>Resume File (PDF)</label>
              
              <div
                className={`dropzone-container ${dragActive ? "active" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("resume-input").click()}
              >
                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setResume(e.target.files[0]);
                    }
                  }}
                />

                <FaFileUpload className="dropzone-icon" />
                <div className="dropzone-text">
                  {resume ? "Replace Resume File" : "Drop your PDF resume here, or browse"}
                </div>
                <div className="dropzone-subtext">Supports PDF format (Max 10MB)</div>

                {resume && (
                  <div className="file-selected-badge" onClick={(e) => e.stopPropagation()}>
                    <FaFilePdf style={{ color: "var(--crimson-primary)", fontSize: "18px" }} />
                    <span>{resume.name}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                      ({(resume.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>
                Target Job Description <span className="label-helper">(Optional - for match scoring)</span>
              </label>
              <textarea
                rows="6"
                placeholder="Paste the target job description or requirements here to calculate precision match rate..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <button
              className="primary-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
                  Analyzing Resume with AI...
                </>
              ) : (
                <>
                  Run ATS Analysis <FaArrowRight />
                </>
              )}
            </button>
          </div>

          {result && (
            <div className="glass-card highlight" style={{ marginTop: "28px" }}>
              <div className="card-title-row">
                <h2>Analysis Results & Diagnostics</h2>
                <div className="page-badge">Verified Scan</div>
              </div>

              <div className="score-hero-grid">
                <div className="score-metric-box">
                  <div className="score-metric-val">
                    {result.resumeAnalysis?.atsScore ?? 0}%
                  </div>
                  <div className="score-metric-label">ATS Compatibility Score</div>
                </div>

                <div className="score-metric-box">
                  <div className="score-metric-val">
                    {result.resumeAnalysis?.jobMatchScore ?? 0}%
                  </div>
                  <div className="score-metric-label">Job Match Rate</div>
                </div>
              </div>

              <h3>Recommended Role Profile</h3>
              <p style={{ color: "var(--text-primary)", fontWeight: "600" }}>
                {result.resumeAnalysis?.recommendedRole || "General Technical Professional"}
              </p>

              <h3>Executive AI Summary</h3>
              <p>
                {result.resumeAnalysis?.summary || "Analysis completed successfully. Review suggestions below to optimize keyword density and formatting."}
              </p>

              <h3>Optimization Recommendations</h3>
              <ul>
                {(result.resumeAnalysis?.suggestions || []).map((item, index) => (
                  <li key={index}>
                    <FaCheckCircle style={{ color: "var(--crimson-primary)", marginTop: "3px", flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 style={{ marginTop: "28px" }}>Next Recommended Actions</h3>
              <div className="action-buttons-group">
                <button
                  className="secondary-action-btn"
                  onClick={() => navigate("/skill-gap", { state: result })}
                >
                  <FaChartLine style={{ color: "var(--crimson-primary)" }} />
                  Skill Gap Analysis
                </button>

                <button
                  className="secondary-action-btn"
                  onClick={() => navigate("/career-roadmap", { state: result })}
                >
                  <FaRoad style={{ color: "var(--crimson-primary)" }} />
                  Career Roadmap
                </button>

                <button
                  className="secondary-action-btn"
                  onClick={() => navigate("/linkedin", { state: result })}
                >
                  <FaLinkedin style={{ color: "var(--crimson-primary)" }} />
                  Optimize LinkedIn
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}