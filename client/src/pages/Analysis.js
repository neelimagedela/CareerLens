import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Analysis.css";
import { roleSkills, allSkills } from "../data/skillsData";

/* ---------------- HELPERS ---------------- */
const smartClean = (text) => {
  return text
    .replace(/[\r\n]+/g, " ")
    .replace(/[^\w\s.,:+#]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
};

const normalize = (s) => s.toLowerCase().trim();

const escapeRegex = (text) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const extractSkillsSection = (text) => {
  const match = text.match(
    /(technical skills|skills|core skills|key skills|tech stack|expertise)[\s\S]{0,2000}/i
  );
  return match ? match[0] : "";
};

const detectSkills = (source) => {
  return allSkills.filter((skill) => {
    const safeSkill = escapeRegex(skill.toLowerCase().trim());
    const regex = new RegExp(`\\b${safeSkill}\\b`, "i");
    return regex.test(source);
  });
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function Analysis() {

  const navigate = useNavigate();
  const location = useLocation();

  const [detectedSkills, setDetectedSkills] = useState([]);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [extraSkills, setExtraSkills] = useState([]);
  const [score, setScore] = useState(0);
  const [role, setRole] = useState("");

  // ✅ ADDED LINE (YOUR REQUIREMENT)
  const isUploaded = localStorage.getItem("resumeUploaded");

  useEffect(() => {

    // 🚨 BLOCK ACCESS IF NOT UPLOADED
    if (!isUploaded) {
      alert("Please upload resume first");
      navigate("/upload");
      return;
    }

    const runAnalysis = async () => {

      const data = JSON.parse(localStorage.getItem("resumeData"));
      const selectedRole =
        location.state?.role ||
        data?.role ||
        "Frontend Developer";

      const file = window.selectedFile;

      if (!file || !selectedRole) {
        alert("Missing file or role");
        return;
      }

      setRole(selectedRole);

      const required = (roleSkills[selectedRole] || []).map(normalize);
      setRequiredSkills(required);

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(file);
      });

      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileData: base64 })
      });

      const result = await res.json();
      const text = smartClean(result.text || "");

      const skillsSection = extractSkillsSection(text);

      let detectedFromSkills = detectSkills(skillsSection);

      if (detectedFromSkills.length === 0) {
        detectedFromSkills = detectSkills(text);
      }

      const detected = [...new Set(detectedFromSkills.map(normalize))];
      setDetectedSkills(detected);

      const matched = required.filter(skill =>
        detected.includes(skill)
      );

      const missing = required.filter(skill =>
        !detected.includes(skill)
      );

      setMissingSkills(missing);

      const calculatedScore =
        required.length === 0
          ? 0
          : Math.round((matched.length / required.length) * 100);

      setScore(calculatedScore);

      localStorage.setItem("resumeScore", calculatedScore);
      localStorage.setItem("missingSkills", JSON.stringify(missing));
      localStorage.setItem("role", selectedRole);

      const extra = detected.filter(skill =>
        !required.includes(skill)
      );

      setExtraSkills(extra);

      /* AI SUGGESTIONS */
      const finalScore = calculatedScore;

      try {
        const suggestionRes = await fetch(
          "http://localhost:5000/api/suggestions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              role: selectedRole,
              finalScore: finalScore,
              missingSkills: missing
            })
          }
        );

        const suggestionData = await suggestionRes.json();

        localStorage.setItem(
          "aiSuggestions",
          suggestionData.response
        );

      } catch (err) {
        console.log("Suggestion API error:", err);
      }

    };

    runAnalysis();
  }, [location, isUploaded,navigate]);

  return (
    <div className="analysis-page">

      <h1 className="heading">Resume Analysis</h1>

      <div className="role-box">
        Target Role: <span>{role}</span>
      </div>

      <div className="score-box">
        ⭐ Score: <span>{score}</span>/100
      </div>

      <div className="section">
        <h2>✔ Detected Skills</h2>
        <div className="skills">
          {detectedSkills.map((s, i) => (
            <span key={i} className="tag success">{s}</span>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>📌 Required Skills</h2>
        <div className="skills">
          {requiredSkills.map((s, i) => (
            <span key={i} className="tag">{s}</span>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>❌ Skill Gap</h2>
        <div className="skills">
          {missingSkills.map((s, i) => (
            <span key={i} className="tag danger">{s}</span>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>✨ Additional Skills Found</h2>
        <div className="skills">
          {extraSkills.map((s, i) => (
            <span key={i} className="tag">{s}</span>
          ))}
        </div>
      </div>

      <button
        style={{
          marginTop: "30px",
          padding: "14px 24px",
          fontSize: "16px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
        onClick={() =>
          navigate("/test", {
            state: { role: role }
          })
        }
      >
        Start Skill Test
      </button>

    </div>
  );
} 