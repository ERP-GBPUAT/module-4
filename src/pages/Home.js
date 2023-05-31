import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    let token = localStorage.getItem("token");
    // if no data in localstorage, return to login page
    if (!data || !token) navigate("/login");

    const isStudent = data.user.isStudent || false;
    const isFaculty = data.user.isFaculty || false;
    const isHod = false;
    if (isHod) navigate("/hodProtal");
    else if (isFaculty) navigate("/advisor");
    else if (isStudent) navigate("/advisee");
  }, []);

  return <div>Loading...</div>;
};

export default Home;
