import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Advisor from "./pages/Advisor";
import Advisee from "./pages/Advisee";
import Notice from "./pages/Notice";
import "./App.css";
import HODPortal from "./pages/HODPortal";

function App() {
  useEffect(() => {
    const recMsg = (e) => {
      e.preventDefault();
      // if (
      //   localStorage.getItem("token") &&
      //   localStorage.getItem("token") != undefined
      // )
      //   return;
      console.log(e)
      console.log("data", e.data);
      if (!e.data.token) {
        return;
      }
      localStorage.setItem("token", e.data.token);
      localStorage.setItem("data", e.data.user);
    };
    window.addEventListener("message", recMsg);
    // return () => {
    //   window.removeEventListener("message", recMsg);
    // };
  }, []);
  console.log('user',localStorage.getItem('data'))

  const [advisorCode, setAdvisorCode] = useState();
  const [studentId, setStudentId] = useState();
  return (
    <BrowserRouter>
      <Header />
      <div className="page-template">
        <Routes>
          <Route
            path="/"
            element={
              <Home advisorCode={advisorCode} setAdvisorCode={setAdvisorCode} studentId={studentId} setStudentId={setStudentId} />
            }
          />
          <Route path="/advisor" element={<Advisor advisorCode={advisorCode} />} />
          <Route path="/advisor/notice" element={<Notice advisorCode={advisorCode} />} />
          <Route path="/advisee" element={<Advisee studentId={studentId} advisorCode={advisorCode} />} />
          <Route path="/hodPortal" element={<HODPortal studentId={studentId} advisorCode={advisorCode} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
