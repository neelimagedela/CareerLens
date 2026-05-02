import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";

export default function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/CareerDashboard");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="checkmark-circle">
        <div className="checkmark">✔</div>
      </div>

      <h1>Login Successful 🎉</h1>
      <p>Redirecting to CareerDashboard...</p>

      {/* MANUAL OPTION (optional button) */}
      <button
        onClick={() => navigate("/CareerDashboard")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer"
        }}
      >
        Go to CareerDashboard
      </button>
    </div>
  );
}