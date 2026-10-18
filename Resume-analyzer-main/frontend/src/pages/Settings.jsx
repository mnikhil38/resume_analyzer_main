import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";
import {
  FaUser,
  FaBell,
  FaShieldAlt,
  FaCheck,
} from "react-icons/fa";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [notifications, setNotifications] = useState({
    jobMatches: true,
    roadmapReminders: true,
    interviewAlerts: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("userSettings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.name) setName(parsed.name);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.apiKey) setApiKey(parsed.apiKey);
        if (parsed.notifications) setNotifications(parsed.notifications);
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const settings = {
      name,
      email,
      apiKey,
      notifications,
    };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <div className="page-header">
            <div className="page-badge">Configuration</div>
            <h1>Workspace Settings</h1>
            <p className="subtitle">
              Manage your personal preferences, AI model configurations, and profile details.
            </p>
          </div>

          <form onSubmit={handleSave}>
            {/* Profile Information */}
            <div className="glass-card">
              <div className="card-title-row">
                <h2>
                  <FaUser style={{ color: "var(--crimson-primary)", marginRight: "8px" }} />
                  Profile Details
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* AI Model Settings */}
            <div className="glass-card">
              <div className="card-title-row">
                <h2>
                  <FaShieldAlt style={{ color: "var(--crimson-primary)", marginRight: "8px" }} />
                  AI Model Configuration
                </h2>
              </div>

              <div className="form-group">
                <label>Active Intelligence Engine</label>
                <select defaultValue="gemini-2.5-flash">
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra-Fast Response - Active)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep ATS Diagnostics)</option>
                  <option value="custom">Enterprise Custom Endpoint</option>
                </select>
              </div>

              <div className="form-group">
                <label>Custom Gemini API Key (Optional)</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="password"
                    placeholder="Optional: Enter custom Gemini API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                <span className="label-helper" style={{ display: "block", marginTop: "6px" }}>
                  Custom keys unlock higher rate limits and specialized domain fine-tuning.
                </span>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="glass-card">
              <div className="card-title-row">
                <h2>
                  <FaBell style={{ color: "var(--crimson-primary)", marginRight: "8px" }} />
                  Notifications & Alerts
                </h2>
              </div>

              <ul>
                <li style={{ alignItems: "center", justifyContent: "space-between" }}>
                  <span>Notify on verified job matches for my skill profile</span>
                  <input
                    type="checkbox"
                    checked={notifications.jobMatches}
                    onChange={(e) =>
                      setNotifications({ ...notifications, jobMatches: e.target.checked })
                    }
                    style={{ width: "18px", height: "18px", accentColor: "var(--crimson-primary)" }}
                  />
                </li>
                <li style={{ alignItems: "center", justifyContent: "space-between" }}>
                  <span>Weekly skill roadmap progress reminders</span>
                  <input
                    type="checkbox"
                    checked={notifications.roadmapReminders}
                    onChange={(e) =>
                      setNotifications({ ...notifications, roadmapReminders: e.target.checked })
                    }
                    style={{ width: "18px", height: "18px", accentColor: "var(--crimson-primary)" }}
                  />
                </li>
                <li style={{ alignItems: "center", justifyContent: "space-between" }}>
                  <span>New mock interview questions alerts</span>
                  <input
                    type="checkbox"
                    checked={notifications.interviewAlerts}
                    onChange={(e) =>
                      setNotifications({ ...notifications, interviewAlerts: e.target.checked })
                    }
                    style={{ width: "18px", height: "18px", accentColor: "var(--crimson-primary)" }}
                  />
                </li>
              </ul>

              <button
                type="submit"
                className="primary-btn"
                style={{ marginTop: "20px" }}
              >
                {saved ? (
                  <>
                    <FaCheck /> Preferences Saved Successfully!
                  </>
                ) : (
                  "Save Workspace Settings"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}