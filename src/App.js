import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Advisor from "./pages/Advisor";
import Advisee from "./pages/Advisee";
import Notice from "./pages/Notice";
import "./App.css";

function App() {
  const [code, setCode] = useState("TITV");
  const [id, setId] = useState("55444");
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
          <Route path="/advisee" element={<Advisee id={id} code={code} />} />
          <Route path="/notice" element={<Notice code={code} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
