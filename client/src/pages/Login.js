import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/login.png";
import "./Login.css";

export default function Login() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  /* DARK MODE STATE */
  const [darkMode, setDarkMode] = useState(false);

  /* LOAD SAVED THEME */
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  /* TOGGLE DARK MODE */
  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));
    navigate("/success");
  };

  return (
    <div className="login-page">

      {/* DARK MODE TOGGLE BUTTON (ONLY ADDITION) */}
      <button className="theme-btn" onClick={toggleTheme}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* LEFT SIDE */}
      <div className="left">
        <div className="card">

          <h1>CareerLens AI</h1>
          <p className="sub">AI Powered Placement Readiness Analyzer</p>

          <div className="features">
            <p>✔ Resume Analysis</p>
            <p>✔ Skill Gap Detection</p>
            <p>✔ AI Career Suggestions</p>
            <p>✔ Placement Readiness Score</p>
          </div>

          <div className="divider"></div>

          <input type="text" name="name" placeholder="Full Name" onChange={handleChange}/>
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange}/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange}/>

          <button onClick={handleLogin}>Get Started 🚀</button>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <img src={img} alt="AI" />
      </div>

    </div>
  );
}