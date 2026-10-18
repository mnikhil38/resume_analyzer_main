import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import StatsCard from "../components/StatsCard";

import {
  FaFileAlt,
  FaBriefcase,
  FaMicrophone,
  FaLinkedin,
  FaRoad,
  FaChartLine,
  FaEnvelopeOpenText,
  FaCog,
} from "react-icons/fa";

export default function Dashboard() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("resumeAnalysis");
    if (saved) {
      try {
        setAnalysis(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cached analysis", e);
      }
    }
  }, []);

  const hasAnalysis = Boolean(analysis && analysis.resumeAnalysis);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Workspace Overview</h1>
            <p>Real-time AI diagnostic center and career tools</p>
          </div>

          <div className="stats-grid">
            {hasAnalysis ? (
              <>
                <StatsCard
                  value={`${analysis.resumeAnalysis?.atsScore ?? 0}%`}
                  title="Latest ATS Score"
                />
                <StatsCard
                  value={`${analysis.resumeAnalysis?.jobMatchScore ?? 0}%`}
                  title="Target Match Rate"
                />
                <StatsCard
                  value={`${analysis.skillGap?.matchedSkills?.length ?? 0} Skills`}
                  title="Verified Matched Skills"
                />
                <StatsCard
                  value={analysis.resumeAnalysis?.recommendedRole || "Active"}
                  title="Recommended Profile"
                />
              </>
            ) : (
              <>
                <StatsCard value="Ready" title="ATS Diagnostic Engine" />
                <StatsCard value="Active" title="Gemini AI Intelligence" />
                <StatsCard value="Live" title="Job & Skill Sync" />
                <StatsCard value="Unlocked" title="Workspace Tools" />
              </>
            )}
          </div>

          <div className="cards-grid">
            <DashboardCard
              title="Resume Analyzer"
              description="Extract ATS score, analyze job match probability and highlight vulnerabilities."
              icon={<FaFileAlt />}
              path="/resume"
            />

            <DashboardCard
              title="Live Job Search"
              description="Discover verified job and internship openings matched to your background."
              icon={<FaBriefcase />}
              path="/jobs"
            />

            <DashboardCard
              title="AI Mock Interview"
              description="Simulate real technical and behavioral interview scenarios powered by Gemini AI."
              icon={<FaMicrophone />}
              path="/mock-interview"
            />

            <DashboardCard
              title="LinkedIn Optimizer"
              description="Elevate profile visibility, recruiter keywords, and craft high-impact summaries."
              icon={<FaLinkedin />}
              path="/linkedin"
            />

            <DashboardCard
              title="Career Roadmap"
              description="Generate structured week-by-week curriculum tailored for target tech roles."
              icon={<FaRoad />}
              path="/career-roadmap"
            />

            <DashboardCard
              title="Skill Gap Analysis"
              description="Detect missing competencies and get prioritized recommendations to close them."
              icon={<FaChartLine />}
              path="/skill-gap"
            />

            <DashboardCard
              title="Cover Letter AI"
              description="Generate personalized, targeted cover letters for specific job postings."
              icon={<FaEnvelopeOpenText />}
              path="/cover-letter"
            />

            <DashboardCard
              title="Account Settings"
              description="Manage profile information, workspace preferences, and AI integrations."
              icon={<FaCog />}
              path="/settings"
            />
          </div>
        </div>
      </div>
    </>
  );
}