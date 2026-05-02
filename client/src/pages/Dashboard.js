import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("Frontend Developer");
  const nav = useNavigate();

  const analyze = async () => {
    if (!file) {
      alert("Please upload resume");
      return;
    }

    const fd = new FormData();
    fd.append("resume", file);
    fd.append("role", role);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        fd
      );

      console.log("SUCCESS:", res.data);

      nav("/test", { state: res.data });

    } catch (err) {
      console.log("ERROR:", err);
      alert("Analyze failed");
    }
  };

  return (
    <div className="center">
      <h2>Upload Resume</h2>

      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />

      <br /><br />

      <select onChange={e => setRole(e.target.value)}>
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
        <option>Full Stack Developer</option>
        <option>Data Analyst</option>
      </select>

      <br /><br />

      <button onClick={analyze}>Analyze</button>
    </div>
  );
}