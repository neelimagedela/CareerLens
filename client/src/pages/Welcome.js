import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">

      <p className="welcome-text">
        Welcome to <span>CareerLens AI</span>
      </p>

      <h1 className="main-title">
        Career<span>Lens</span>
      </h1>

      <p className="tagline shiny-text">
        Analyze. Improve. Get Placed.
      </p>

      <div className="dots-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  );
}