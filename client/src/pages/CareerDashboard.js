import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CareerDashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  return (
    <div style={styles.page}>

      {/* TOP NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>CareerLens</h2>

        <div style={styles.navBtns}>
          <button style={styles.dashboardBtn}>Dashboard</button>
        </div>
      </div>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>👋 Hi Developer, Welcome to CareerLens 🚀</h1>
        <p>
          Track your career growth step by step with AI-powered insights ✨
        </p>
      </div>

      {/* CARDS FLOW */}
      <div style={styles.grid}>

        {/* 1 */}
        <div style={styles.wrapper}>
          <div
            style={styles.card}
            onClick={() => navigate("/upload")}
          >
            <span style={styles.number}>01</span>

            <div style={styles.iconBox}>📄</div>

            <h2 style={styles.cardTitle}>Upload Resume</h2>

            <p style={styles.cardText}>
              Upload your resume and let system extract your skills.
            </p>
          </div>

          <div style={styles.arrow}>➜</div>
        </div>

        {/* 2 */}
        <div style={styles.wrapper}>
          <div
            style={styles.card}
            onClick={() => navigate("/analysis")}
          >
            <span style={styles.number}>02</span>

            <div style={styles.iconBox}>📊</div>

            <h2 style={styles.cardTitle}>Resume Analysis</h2>

            <p style={styles.cardText}>
              See detected skills, required skills and skill gap.
            </p>
          </div>

          <div style={styles.arrow}>➜</div>
        </div>

        {/* 3 */}
        <div style={styles.wrapper}>
          <div
            style={styles.card}
            onClick={() => navigate("/test")}
          >
            <span style={styles.number}>03</span>

            <div style={styles.iconBox}>🧠</div>

            <h2 style={styles.cardTitle}>Mini Skill Test</h2>

            <p style={styles.cardText}>
              Test your knowledge with MCQ based questions.
            </p>
          </div>

          <div style={styles.arrow}>➜</div>
        </div>

        {/* 4 */}
        <div style={styles.wrapper}>
          <div
            style={styles.card}
            onClick={() => navigate("/result")}
          >
            <span style={styles.number}>04</span>

            <div style={styles.iconBox}>🏆</div>

            <h2 style={styles.cardTitle}>Final Performance</h2>

            <p style={styles.cardText}>
              Combined Resume + Test Score + AI Career Roadmap.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#edf3ff",
    fontFamily: "Arial"
  },

  navbar: {
    height: "80px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)"
  },

  logo: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827"
  },

  navBtns: {
    display: "flex"
  },

  dashboardBtn: {
    padding: "10px 24px",
    borderRadius: "30px",
    border: "none",
    background: "#111827",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer"
  },

  header: {
    textAlign: "center",
    padding: "55px 20px 35px",
    color: "#0f172a"
  },

  grid: {
    width: "92%",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    paddingBottom: "50px"
  },

  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  card: {
    flex: 1,
    background: "#ffffff",
    padding: "26px 22px",
    borderRadius: "22px",
    boxShadow: "0 12px 28px rgba(37,99,235,0.10)",
    cursor: "pointer",
    position: "relative",
    minHeight: "270px",
    border: "1px solid #dbeafe",
    transition: "0.3s"
  },

  number: {
    position: "absolute",
    top: "16px",
    left: "18px",
    fontSize: "52px",
    fontWeight: "800",
    color: "#94a3b8"
  },

  iconBox: {
    width: "66px",
    height: "66px",
    borderRadius: "16px",
    background: "linear-gradient(135deg,#2f5bff,#4f46e5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    color: "#fff",
    marginTop: "52px",
    marginBottom: "18px"
  },

  cardTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "10px"
  },

  cardText: {
    fontSize: "18px",
    color: "#475569",
    lineHeight: "1.6"
  },

  arrow: {
    fontSize: "32px",
    color: "#3b82f6",
    fontWeight: "bold"
  }
}; 