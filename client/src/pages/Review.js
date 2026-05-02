import { useState } from "react";
import "./Review.css";

export default function Review() {

  const questions = [
    "Confidence in core skills?",
    "Real-world projects experience?",
    "Coding interview preparation?",
    "GitHub/Profile strength?",
    "Consistency in practice?"
  ];

  const [answers, setAnswers] = useState(Array(5).fill(0));
  const [result, setResult] = useState(null);

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = Number(val);
    setAnswers(updated);
  };

  const calculate = () => {
    const total = answers.reduce((a, b) => a + b, 0);
    const max = 10;

    const rating = ((total / max) * 5).toFixed(1);
    const percent = Math.round((total / max) * 100);

    let feedback = "";
    if (percent >= 80) feedback = "🚀 Excellent! You are job ready";
    else if (percent >= 60) feedback = "⚡ Good, improve some areas";
    else feedback = "❌ Need more preparation";

    setResult({ rating, percent, feedback });
  };

  return (
    <div className="review-page">

      <div className="review-card">

        <h1>Self Review</h1>

        {questions.map((q, i) => (
          <div key={i} className="q-box">
            <p>{q}</p>

            <select onChange={(e) => handleChange(i, e.target.value)}>
              <option value="0">Select</option>
              <option value="2">Good</option>
              <option value="1">Average</option>
              <option value="0">Poor</option>
            </select>
          </div>
        ))}

        <button onClick={calculate}>Generate Rating</button>

        {result && (
          <div className="result-box">

            <h2>⭐ {result.rating} / 5</h2>
            <p>{result.percent}% Hiring Chance</p>
            <p>{result.feedback}</p>

            <p style={{ marginTop: "10px" }}>
              📈 Improvement Needed:
              {result.percent < 60 ? " High" :
               result.percent < 80 ? " Medium" : " Low"}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}