import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Advisor from "./pages/Advisor";
import Advisee from "./pages/Advisee";
import Notice from "./pages/Notice";
import "./App.css";

function App() {
  useEffect(() => {
    const recMsg = (e) => {
      e.preventDefault();
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("token") != undefined
      )
        return;
      console.log("data", e.data);
      if (!e.data.token) {
        return;
      }
      localStorage.setItem("token", e.data.token);
      localStorage.setItem("data", e.data.user);
    };
    window.addEventListener("message", recMsg);
    return () => {
      window.removeEventListener("message", recMsg);
    };
  }, []);
  console.log('user',localStorage.getItem('data'))

  const [code, setCode] = useState();
  const [id, setId] = useState("55088");
  return (
    <BrowserRouter>
      <Header />
      <div className="page-template">
        <Routes>
          <Route
            path="/"
            element={
              <Home code={code} setCode={setCode} id={id} setId={setId} />
            }
          />
          <Route path="/advisor" element={<Advisor code={code} />} />
          <Route path="/advisor/notice" element={<Notice code={code} />} />
          <Route path="/advisee" element={<Advisee id={id} code={code} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
