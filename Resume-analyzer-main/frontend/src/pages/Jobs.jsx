import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaExternalLinkAlt,
  FaSpinner,
} from "react-icons/fa";

function Jobs() {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchJobs = async () => {
    if (!role || !location) {
      alert("Please enter both role and location.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setJobs([]);

      const response = await fetch(import.meta.env.VITE_API_URL + "/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch jobs at this time.");
      }

      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to connect to job search service.");
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
            <div className="page-badge">Live Market Opportunities</div>
            <h1>Verified Job Search</h1>
            <p className="subtitle">
              Search verified live job openings and internships tailored to your target position and location.
            </p>
          </div>

          <div className="glass-card">
            <div className="card-title-row">
              <h2>Job Search Criteria</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "16px" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label>Target Role / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Engineer, Full Stack, Data Analyst"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label>Preferred Location</label>
                <input
                  type="text"
                  placeholder="e.g. Remote, New York, Bangalore, London"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <button
              className="primary-btn"
              onClick={searchJobs}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                  Scanning Live Job Boards...
                </>
              ) : (
                <>
                  <FaSearch /> Search Verified Jobs
                </>
              )}
            </button>

            {error && (
              <div style={{ marginTop: "16px", padding: "12px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--border-crimson)", borderRadius: "8px", color: "#ff808d", fontSize: "0.88rem" }}>
                {error}
              </div>
            )}
          </div>

          {!loading && jobs.length > 0 && (
            <div style={{ marginTop: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2>Matching Opportunities ({jobs.length})</h2>
              </div>

              {jobs.map((job, index) => (
                <div key={index} className="job-item-card">
                  <div className="job-header">
                    <div>
                      <div className="job-title">{job.title || "Software Engineering Role"}</div>
                      <div className="job-company">{job.company || "Leading Tech Firm"}</div>
                    </div>

                    <a
                      href={job.applyLink || "#"}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <button className="primary-btn" style={{ width: "auto", padding: "8px 16px", fontSize: "0.82rem" }}>
                        Apply Now <FaExternalLinkAlt style={{ fontSize: "11px" }} />
                      </button>
                    </a>
                  </div>

                  <div className="job-meta-row">
                    <div className="job-meta-item">
                      <FaMapMarkerAlt style={{ color: "var(--crimson-primary)" }} />
                      <span>{job.location || location || "Remote / Hybrid"}</span>
                    </div>

                    <div className="job-meta-item">
                      <FaMoneyBillWave style={{ color: "var(--crimson-primary)" }} />
                      <span>{job.salary || "Competitive / Undisclosed"}</span>
                    </div>

                    <div className="job-meta-item">
                      <FaBriefcase style={{ color: "var(--crimson-primary)" }} />
                      <span>{job.type || "Full-Time"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Jobs;