import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadResume.css";

export default function UploadResume() {

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");

  const roles = [
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "AI/ML Engineer",
    "DevOps Engineer",
    "Cyber Security Analyst"
  ];

  const handleAnalyze = () => {
    if (!file || !role) {
      alert("Please upload resume and select role");
      return;
    }

    // ❌ existing file storage (unchanged)
    window.selectedFile = file;

    localStorage.setItem("resumeData", JSON.stringify({
      role
    }));

    // ✅ ADDED FIX (IMPORTANT)
    localStorage.setItem("resumeUploaded", "true");

    navigate("/analysis");
  };

  return (
    <div className="page">

      <div className="container">

        <h1 className="title">
          Resume Upload & Role Selection
        </h1>

        <p className="subtitle">
          Upload your resume and choose your target role for AI analysis.
          Get skill insights, gap detection, and career scoring instantly.
        </p>

        <div className="section">
          <label>Upload Resume</label>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <span className="hint">
            {file ? file.name : "No file selected"}
          </span>
        </div>

        <div className="section">
          <label>Select Target Role</label>

          <select
            className="dropdown"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Select Role --</option>

            {roles.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>

        </div>

        <button onClick={handleAnalyze}>
          Analyze Resume →
        </button>

      </div>

    </div>
  );
}