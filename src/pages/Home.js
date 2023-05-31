import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
// import { redirect } from "react-router-dom";

const Home = ({ setAdvisorCode, advisorCode, studentId, setStudentId }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState("");
  // const [isStudent, setIsStudent] = useState(false)
  // const [isFaculty, setIsFaculty] = useState(false)
  const [temp, setTemp] = useState("");
  // console.log('user',localStorage.getItem('data'))

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data") || {});
    // user = user?.user;
    console.log("user", data?.user);
    const isStudent = data.user.isStudent || false;
    const isFaculty = data.user.isFaculty || false;
    let isHod = false;
    // console.log('isStudent',isStudent)
    // console.log('isFaculty',isFaculty)
    if (isFaculty) {
      let faculty = data?.faculty;
      isHod = faculty?.hodOfDepartment;
      console.log(faculty.id)
      setAdvisorCode(faculty.id);
    }
    if (isHod) navigate("/hodProtal");
    else if (isFaculty) navigate("/advisor");
    else if (isStudent) {
      let student = data?.student;
      console.log(student.FacultyId)
      setAdvisorCode(student.FacultyId);
      navigate("/advisee");
    }
  }, []);
  if (!localStorage.getItem("token")) return <div>Please Login</div>;
  return (
    <>
      <div className="px-8 home">
        <h1 className="text-4xl text-center font-bold py-5 pt-10">
          Advisor / Advisee Details
        </h1>
        <h3 className="text-lg text-center">Select Role</h3>
        <div className="my-4 mx-12 flex justify-center">
          <div className="card mr-8">
            <div>
              <div className="card-img">
                <img
                  src="https://www.edukim.org/wp-content/uploads/2021/02/teacher-teachers-icon-11553430311nml7fxq6db-300x300.png"
                  alt="advisor"
                />
              </div>
              <div className="card-body">
                <div
                  className="card-title"
                  onClick={() => navigate("/advisor")}
                >
                  {advisorCode
                    ? `Advisor Code - ${advisorCode}`
                    : "Enter as Advisor"}
                </div>
                <div className="card-subtitle">
                  View your advisees and their details. Send official notices
                  and more.
                </div>
              </div>
            </div>
            <div
              className="card-footer"
              onClick={() => setShowModal("advisor")}
            >
              Click here to edit advisor code
            </div>
          </div>
          <div className="card ml-8">
            <div>
              <div className="card-img">
                <img
                  src="https://vectorified.com/images/admin-logo-icon-6.png"
                  alt="advisee"
                />
              </div>
              <div className="card-body">
                <div
                  className="card-title"
                  onClick={() => navigate("/advisee")}
                >
                  {studentId
                    ? `Advisee Code - ${studentId}`
                    : "Enter as Advisee"}
                </div>
                <div className="card-subtitle">
                  View your advisor and his/her details. View other advisees,
                  official notices, performance and more.
                </div>
              </div>
            </div>
            <div
              className="card-footer"
              onClick={() => setShowModal("advisee")}
            >
              Click here to edit student code
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          title={
            showModal === "advisor" ? "Enter Advisor Code" : "Enter Advisee Id"
          }
          content={
            <div>
              <input
                type="text"
                className="w-full"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                placeholder="Enter new value"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="btn btn-secondary mr-4"
                  onClick={() => {
                    setShowModal("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (showModal === "advisor") setAdvisorCode(temp);
                    else setStudentId(temp);
                    setShowModal("");
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          }
          closeModal={() => setShowModal("")}
          required={false}
        />
      )}
    </>
  );
};

export default Home;
