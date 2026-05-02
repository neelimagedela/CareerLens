import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import CareerDashboard from "./pages/CareerDashboard";
import Dashboard from "./pages/Dashboard";
import Result from "./pages/Result";
import SuccessPage from "./pages/SuccessPage";   // ✅ NEW ADD
import UploadResume from "./pages/UploadResume";
import Analysis from "./pages/Analysis";
import SkillTest from "./pages/SkillTest";
import Suggestions from "./pages/Suggestions";
import Review from "./pages/Review";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* EXISTING ROUTES */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CareerDashboard" element={<CareerDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/result" element={<Result />} />

        {/* NEW SUCCESS PAGE ROUTE */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/test" element={<SkillTest />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;