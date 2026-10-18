import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";
import {
  FaEnvelopeOpenText,
  FaCopy,
  FaCheck,
  FaMagic,
  FaSpinner,
} from "react-icons/fa";

export default function CoverLetter() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!company || !role) {
      alert("Please enter the company name and role title.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const sample = `Dear Hiring Team at ${company},

I am writing to express my strong enthusiasm for the ${role} position at ${company}. With my background in software development, full-stack architecture, and building user-centric digital products, I am confident in my ability to deliver immediate value to your engineering team.

${keyPoints ? `Throughout my career, I have focused on: ${keyPoints}.` : "In my recent projects, I have specialized in building highly performant applications, optimizing application performance, and designing intuitive user interfaces with modern tech stacks."}

What excites me most about ${company} is your commitment to engineering excellence and innovation. I am eager to bring my problem-solving skills, collaborative mindset, and technical background to help scale your products.

Thank you for your time and consideration. I welcome the opportunity to discuss how my skill set aligns with your goals in an interview.

Sincerely,
Candidate`;

      setGeneratedLetter(sample);
      setLoading(false);
    }, 900);
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <div className="page-header">
            <div className="page-badge">AI Writing Copilot</div>
            <h1>AI Cover Letter Generator</h1>
            <p className="subtitle">
              Generate tailored, persuasive cover letters designed for specific job applications.
            </p>
          </div>

          <div className="glass-card">
            <div className="card-title-row">
              <h2>Application Details</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "16px" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label>Target Company</label>
                <input
                  type="text"
                  placeholder="e.g. Google, Stripe, Microsoft"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label>Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Key Highlights / Projects to Emphasize (Optional)</label>
              <textarea
                rows="3"
                placeholder="Mention specific metrics, technologies, or achievements you'd like highlighted..."
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
              />
            </div>

            <button
              className="primary-btn"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                  Synthesizing Personalized Letter...
                </>
              ) : (
                <>
                  <FaMagic /> Generate Targeted Cover Letter
                </>
              )}
            </button>
          </div>

          {generatedLetter && (
            <div className="glass-card highlight" style={{ marginTop: "24px" }}>
              <div className="card-title-row">
                <h2>
                  <FaEnvelopeOpenText style={{ color: "var(--crimson-primary)", marginRight: "8px" }} />
                  Generated Cover Letter
                </h2>

                <button className="copy-btn" style={{ margin: 0 }} onClick={handleCopy}>
                  {copied ? (
                    <>
                      <FaCheck /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy Letter
                    </>
                  )}
                </button>
              </div>

              <div style={{ background: "#f8fafc", border: "1px solid var(--border-subtle)", borderRadius: "8px", padding: "20px", whiteSpace: "pre-wrap", color: "var(--text-primary)", fontSize: "0.92rem", lineHeight: "1.7" }}>
                {generatedLetter}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}