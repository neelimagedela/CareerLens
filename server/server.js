require("dotenv").config();

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const cors = require("cors");

const app = express();

/* ===============================
   MIDDLEWARE
================================*/
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });

/* ===============================
   SKILLS DATABASE
================================*/
const SKILLS_DB = [
  "html","css","javascript","react","redux",
  "node.js","nodejs","express","mongodb","mysql",
  "sql","python","java","c","c++",
  "excel","power bi","tableau",
  "machine learning","deep learning","tensorflow","keras","nlp",
  "pandas","numpy","git","github","docker","aws","api","rest api"
];

/* ===============================
   ROLE SKILLS
================================*/
const ROLE_SKILLS = {
  "Frontend Developer": ["html","css","javascript","react"],
  "Backend Developer": ["node.js","express","mongodb","sql"],
  "Full Stack Developer": ["html","css","javascript","react","node.js","mongodb"],
  "Data Analyst": ["python","sql","excel","power bi"],
  "AI/ML Engineer": ["python","machine learning","deep learning","tensorflow","nlp"]
};

/* ===============================
   HELPERS
================================*/
const clean = (txt = "") =>
  txt.toLowerCase().replace(/\s+/g, " ");

const detectSkills = (text = "") => {
  const lower = clean(text);
  return SKILLS_DB.filter(skill =>
    lower.includes(skill.toLowerCase())
  );
};

const calculateResumeScore = (skills, role) => {
  const required = ROLE_SKILLS[role] || [];
  if (required.length === 0) return 0;

  const matched = required.filter(skill =>
    skills.includes(skill)
  );

  return Math.round((matched.length / required.length) * 100);
};

/* ===============================
   ROOT
================================*/
app.get("/", (req, res) => {
  res.send("CareerLens Server Running 🚀");
});

/* ===============================
   ANALYZE PDF
================================*/
app.post("/analyze", async (req, res) => {
  try {
    const { fileData } = req.body;

    const buffer = Buffer.from(fileData, "base64");
    const pdf = await pdfParse(buffer);

    res.json({ text: pdf.text || "" });

  } catch (err) {
    res.status(500).json({ error: "PDF parsing failed" });
  }
});

/* ===============================
   UPLOAD RESUME
================================*/
app.post("/api/upload", upload.single("resume"), async (req, res) => {
  try {
    const role = req.body.role || "Frontend Developer";

    const buffer = fs.readFileSync(req.file.path);
    const pdf = await pdfParse(buffer);

    const text = pdf.text || "";
    const skills = detectSkills(text);

    const required = ROLE_SKILLS[role] || [];

    const gap = required.filter(skill => !skills.includes(skill));

    const score = calculateResumeScore(skills, role);

    fs.unlinkSync(req.file.path);

    res.json({
      score,
      detectedSkills: skills,
      requiredSkills: required,
      skillGap: gap
    });

  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

/* ===============================
   FINAL RULE-BASED SUGGESTIONS (NO AI)
================================*/
app.post("/api/suggestions", (req, res) => {
  try {
    const {
      role = "Unknown Role",
      finalScore = 0,
      missingSkills = []
    } = req.body;

    const isFit = finalScore >= 60;

    const reason = isFit
      ? "Good technical + test performance."
      : "Needs improvement in core skills.";

    const improvementPlan = [
      "Practice missing skills daily",
      "Build real-world projects",
      "Improve GitHub profile",
      "Prepare for interviews"
    ];

    const roadmap = [
      "Step 1: Learn fundamentals",
      "Step 2: Practice coding",
      "Step 3: Build projects",
      "Step 4: Mock interviews",
      "Step 5: Apply for jobs"
    ];

    const output = `

ROLE: ${role}

REASON: ${reason}

SKILL GAPS: ${missingSkills.length ? missingSkills.join(", ") : "None"}

IMPROVEMENT PLAN:
- ${improvementPlan.join("\n- ")}

ROADMAP:
- ${roadmap.join("\n- ")}

MOTIVATION:
Stay consistent — success will come 🚀  
You are very close to success 💪  
Keep improving daily 🔥
`;

    res.json({
      response: output,
      isFit
    });

  } catch (err) {
    res.json({ response: "Error generating suggestions" });
  }
});

/* ===============================
   START SERVER
================================*/
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});