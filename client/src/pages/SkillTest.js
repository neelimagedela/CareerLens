import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { roleQuestions } from "../data/questions";

export default function SkillTest() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || "Frontend Developer";

  // ✅ ADDED LINE (AS YOU REQUESTED)
  const isUploaded = localStorage.getItem("resumeUploaded");

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 MIN

  const answersRef = useRef([]);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // 🚨 BLOCK ACCESS IF RESUME NOT UPLOADED (IMPORTANT FOR FLOW)
  useEffect(() => {
    if (!isUploaded) {
      alert("Please upload resume first");
      navigate("/upload");
    }
  }, [isUploaded, navigate]);

  // load questions
  useEffect(() => {
    const used = JSON.parse(localStorage.getItem(role)) || [];
    const all = roleQuestions[role] || [];

    const easy = all.filter(q => q.difficulty === "easy");
    const medium = all.filter(q => q.difficulty === "medium");
    const hard = all.filter(q => q.difficulty === "hard");

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    let selected = [
      ...shuffle(easy).slice(0, 3),
      ...shuffle(medium).slice(0, 4),
      ...shuffle(hard).slice(0, 3)
    ];

    selected = selected.filter(q => {
      const idx = all.findIndex(x => x.q === q.q);
      return !used.includes(idx);
    });

    if (selected.length < 7) {
      localStorage.removeItem(role);
      selected = shuffle(all).slice(0, 7);
    }

    const indexes = selected.map(q =>
      all.findIndex(x => x.q === q.q)
    );

    localStorage.setItem(role, JSON.stringify([...used, ...indexes]));

    setQuestions(shuffle(selected));
  }, [role]);

  const finishTest = useCallback((ans) => {
    let score = 0;

    ans.forEach((a, i) => {
      const q = questions[i];
      if (!q) return;

      let marks = 0;
      if (q.difficulty === "easy") marks = 1;
      else if (q.difficulty === "medium") marks = 2;
      else marks = 3;

      if (a === q.answer) score += marks;
    });

    const totalMarks = 20;

    const percentage = Math.round((score / totalMarks) * 100);

    navigate("/result", {
      state: {
        score: percentage,
        resumeScore: Number(localStorage.getItem("resumeScore")) || 0,
        role: role,
        missingSkills: JSON.parse(localStorage.getItem("missingSkills")) || []
      }
    });
  }, [questions, navigate, role]);

  // timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTest(answersRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finishTest]);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      finishTest(newAnswers);
    }
  };

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (questions.length === 0) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.role}>{role} Test</h2>
        <h3 style={styles.timer}>⏱ {formatTime()}</h3>
      </div>

      <p style={styles.progress}>
        Question {index + 1} of {questions.length}
      </p>

      <div style={{
        height: "8px",
        background: "#e5e7eb",
        borderRadius: "5px",
        marginBottom: "15px"
      }}>
        <div style={{
          width: `${((index + 1) / questions.length) * 100}%`,
          height: "100%",
          background: "#4f46e5",
          borderRadius: "5px"
        }} />
      </div>

      <h2 style={styles.question}>
        {questions[index]?.q}
      </h2>

      <div style={styles.options}>
        {questions[index]?.options?.map((opt) => (
          <button
            key={opt}
            style={styles.btn}
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "50px",
    textAlign: "center"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px"
  },
  role: {
    fontSize: "28px",
    color: "#0f172a",
    fontWeight: "bold"
  },
  timer: {
    fontSize: "22px",
    color: "#dc2626",
    fontWeight: "bold"
  },
  progress: {
    fontSize: "20px",
    color: "#2563eb",
    marginBottom: "20px",
    fontWeight: "600"
  },
  question: {
    fontSize: "26px",
    color: "#020617",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  options: {
    marginTop: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    alignItems: "center"
  },
  btn: {
    padding: "14px",
    width: "300px",
    fontSize: "18px",
    background: "#e0e7ff",
    border: "1px solid #6366f1",
    color: "#1e293b",
    fontWeight: "600",
    cursor: "pointer",
    borderRadius: "6px"
  }
}; 