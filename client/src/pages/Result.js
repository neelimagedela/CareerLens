import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Result.css";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const resumeScore = location.state?.resumeScore || 0;
  const rawTestScore = location.state?.score || 0;

  const testScore = Math.min(100, Math.round(rawTestScore));

  const finalScore = Math.min(
    100,
    Math.round((resumeScore * 0.4) + (testScore * 0.6))
  );

  // eslint-disable-next-line no-unused-vars
  const isUploaded = localStorage.getItem("resumeUploaded");

  const [suggestions, setSuggestions] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("aiSuggestions");
    setSuggestions(data || "");
  }, []);

  const formatSuggestions = (text) => {
    if (!text) return null;

    const lines = text.split("\n");
    let roadmapStarted = false;

    return (
      <>
        {lines.map((line, index) => {
          if (line.includes("ROADMAP")) {
            roadmapStarted = true;
            return <h3 key={index}>🗺️ Roadmap</h3>;
          }

          if (!roadmapStarted) {
            if (line.includes("ROLE")) return <h3 key={index}>💼 {line}</h3>;
            if (line.includes("REASON")) return <h3 key={index}>📌 {line}</h3>;
            if (line.includes("SKILL")) return <h3 key={index}>🧠 {line}</h3>;
            if (line.includes("IMPROVEMENT")) return <h3 key={index}>🚀 {line}</h3>;
          }

          if (line.trim().startsWith("-") || line.startsWith("Step")) {
            return (
              <ul key={index}>
                <li>{line.replace("-", "")}</li>
              </ul>
            );
          }

          return <p key={index}>{line}</p>;
        })}
      </>
    );
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="header">
        <h1>Final Evaluation</h1>
        <p>Your performance summary & career insights</p>
      </div>

      {/* SCORE SECTION */}
      <div className="grid">

        <div className="card score-card">
          <p>📄 Resume Score</p>
          <h2>{resumeScore}%</h2>
        </div>

        <div className="card score-card">
          <p>📝 Test Score</p>
          <h2>{testScore}%</h2>
        </div>

        <div className="card final-card">
          <p>🎯 Final Score</p>
          <h1>{finalScore}%</h1>
          <span>Weighted (40% Resume + 60% Test)</span>
        </div>

      </div>

      {/* RESULT BADGE */}
      <div className={`result-box ${finalScore >= 70 ? "success" : "fail"}`}>
        {finalScore >= 70 ? "✅ You are Job Ready!" : "❌ Needs Improvement"}
      </div>

      {/* SUGGESTIONS */}
      <div className="card suggestions">
        <h2>💡 Suggestions</h2>

        <div className="suggestion-content">
          {formatSuggestions(suggestions)}
        </div>

        <button
          className="review-btn"
          onClick={() => navigate("/review")}
        >
          🧠 Continue to Self Review
        </button>

      </div>

    </div>
  );
}