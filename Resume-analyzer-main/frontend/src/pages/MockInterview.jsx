import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";
import {
  FaMicrophone,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaSpinner,
  FaGraduationCap,
} from "react-icons/fa";

function MockInterview() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const startInterview = async () => {
    try {
      setLoading(true);
      setCompleted(false);

      const response = await fetch(`${API_URL}/interview/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          difficulty,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (Array.isArray(data) && data.length > 0) {
        setQuestions(data);
      } else {
        // Fallback default questions if backend is offline or empty
        setQuestions([
          { question: `Can you explain your core experience as a ${role} and how you architect scalable solutions?` },
          { question: `Describe a challenging technical problem you solved in your recent projects and how you evaluated trade-offs.` },
          { question: `How do you ensure optimal performance, security, and automated test coverage in production applications?` },
          { question: `Explain how you collaborate with cross-functional product, design, and engineering teams during sprint cycles.` },
        ]);
      }
      setCurrentQuestion(0);
    } catch (error) {
      console.error(error);
      // Friendly fallback so user can still test and interact
      setQuestions([
        { question: `Can you explain your core technical experience as a ${role} and how you architect scalable systems?` },
        { question: `Describe a challenging technical bug or bottleneck you diagnosed and resolved recently.` },
        { question: `How do you approach writing clean, maintainable code under tight project deadlines?` },
        { question: `What questions do you typically ask when onboarding to a new codebase or architecture?` },
      ]);
      setCurrentQuestion(0);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishInterview = () => {
    setCompleted(true);
  };

  const progressPercent = questions.length > 0 
    ? Math.round(((currentQuestion + 1) / questions.length) * 100) 
    : 0;

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <div className="page-header">
            <div className="page-badge">Gemini AI Simulator</div>
            <h1>AI Mock Interview Simulator</h1>
            <p className="subtitle">
              Simulate technical and behavioral interviews tailored to your exact target discipline and seniority.
            </p>
          </div>

          <div className="glass-card">
            <div className="card-title-row">
              <h2>Interview Parameters</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label>Target Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Java Developer</option>
                  <option>Python Developer</option>
                  <option>Data Analyst</option>
                  <option>Data Scientist</option>
                  <option>DevOps / Cloud Engineer</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label>Difficulty Tier</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            <button
              className="primary-btn"
              onClick={startInterview}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                  Synthesizing Interview Questions with AI...
                </>
              ) : (
                <>
                  <FaMicrophone /> {questions.length > 0 ? "Restart Interview Session" : "Begin Mock Interview"}
                </>
              )}
            </button>
          </div>

          {!loading && questions.length > 0 && !completed && (
            <div className="glass-card highlight">
              <div className="progress-indicator">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span style={{ color: "var(--crimson-primary)" }}>{progressPercent}% Complete</span>
              </div>

              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <div className="interview-box">
                <div style={{ fontSize: "0.75rem", color: "var(--crimson-primary)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                  Prompt #{currentQuestion + 1}
                </div>
                <div className="interview-question-text">
                  {questions[currentQuestion]?.question}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginTop: "24px" }}>
                <button
                  className="secondary-action-btn"
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  style={{ opacity: currentQuestion === 0 ? 0.4 : 1 }}
                >
                  <FaArrowLeft /> Previous
                </button>

                {currentQuestion === questions.length - 1 ? (
                  <button
                    className="primary-btn"
                    style={{ width: "auto", padding: "10px 24px" }}
                    onClick={finishInterview}
                  >
                    <FaCheck /> Conclude Session
                  </button>
                ) : (
                  <button
                    className="primary-btn"
                    style={{ width: "auto", padding: "10px 24px" }}
                    onClick={nextQuestion}
                  >
                    Next Prompt <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          )}

          {completed && (
            <div className="glass-card highlight" style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "var(--crimson-badge-bg)", border: "1px solid var(--border-crimson)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "var(--crimson-primary)", fontSize: "28px" }}>
                <FaGraduationCap />
              </div>
              <h2>Mock Session Complete</h2>
              <p style={{ maxWidth: "480px", margin: "8px auto 24px" }}>
                Great work! You have completed the practice prompts for <strong>{role}</strong> ({difficulty} tier). Review your key points and practice again to build delivery fluency.
              </p>
              <button
                className="primary-btn"
                style={{ width: "auto", margin: "0 auto" }}
                onClick={startInterview}
              >
                Practice Another Round
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MockInterview;