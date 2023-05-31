import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Advisor from "./pages/Advisor";
import Advisee from "./pages/Advisee";
import Notice from "./pages/Notice";
import "./App.css";
import HODPortal from "./pages/HODPortal";

function App() {
  // recieve token from iframe and store it in localstorage (login from module-0)
  useEffect(() => {
    const recMsg = (e) => {
      e.preventDefault();
      if (!e.data.token) {
        return;
      }
      localStorage.setItem("token", e.data.token);
      localStorage.setItem("data", e.data.user);
    };
    window.addEventListener("message", recMsg);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div className="page-template">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/advisor/notice" element={<Notice />} />
          <Route path="/advisee" element={<Advisee />} />
          <Route path="/hodPortal" element={<HODPortal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
