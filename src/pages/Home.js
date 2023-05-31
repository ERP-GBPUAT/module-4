import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    let token = localStorage.getItem("token");
    // if no data in localstorage, return to login page
    if (
      data === null ||
      token === null ||
      data === undefined ||
      token === undefined
    )
      window.location.href = "../login";
    const isStudent = data.user.isStudent || false;
    const isFaculty = data.user.isFaculty || false;
    if (isFaculty) {
      if (!!data.faculty.hodOfDepartment || !!data.faculty.deanOfCollege)
        navigate("/hodPortal");
      else navigate("/advisor");
    } else if (isStudent) navigate("/advisee");
    else navigate("/login");
  }, []);

  return <div>Loading...</div>;
};

export default Home;
