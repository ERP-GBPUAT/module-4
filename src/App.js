import { useState } from "react";
import Home from "./pages/Home";
import Advisor from "./pages/Advisor";
import Advisee from "./pages/Advisee";
import "./App.css";
import Notice from "./pages/Notice";
import Header from "./components/Header";

function App() {
  const [page, setPage] = useState("home");
  const [code, setCode] = useState("TITV");
  const [id, setId] = useState("55444");
  return (
    <>
      <Header setPage={setPage} />
      <div className="page-template">
        {page === "home" && (
          <Home
            setPage={setPage}
            code={code}
            setCode={setCode}
            id={id}
            setId={setId}
          />
        )}
        {page === "advisor" && <Advisor code={code} setPage={setPage} />}
        {page === "advisee" && <Advisee id={id} code={code} />}
        {page === "notice" && <Notice code={code} />}
      </div>
    </>
  );
}

export default App;
