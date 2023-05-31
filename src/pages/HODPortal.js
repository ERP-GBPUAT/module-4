import React,{useReducer,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BEGIN":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, faculties: action.payload };
    case "FETCH_AD_SUCCESS":
      return { ...state, loading: false, advisor: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
  }
};

const HODPortal = () => {
  const navigate = useNavigate()
  const [{ loading, error, faculties,advisor }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    faculties: [],
    advisor:{}
  });

  useEffect(() => {
    // const faculty = JSON.parse(localStorage.getItem('data')) || {}
    // setCode(faculty?.faculty?.id|| '')
    const getAllFaculties = async () => {
      dispatch({ type: "FETCH_BEGIN" });
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/faculty/getDeptFaculty`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        const json = await res.json();
        if (json.msg === "success") {
          dispatch({ type: "FETCH_SUCCESS", payload: json.data });
          dispatch({type:"FETCH_AD_SUCCESS",payload:JSON.parse(localStorage.getItem("data"))})
        } else {
          dispatch({ type: "FETCH_FAIL", payload: json.error });
        }
        // setAdviseesAPI(data.data);
      } catch (err) {
        console.log(err);
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    getAllFaculties();
    // getAdvisorDetails();
  }, []);
  if(loading)return <div>Loading...</div>
  return (
    <div className="p-8 advisor">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Head of Department, {advisor?.faculty?.department}
          </h1>
          <button
            className="btn-secondary"
            onClick={() => navigate("/advisor/notice")}
          >
            Send Notice
          </button>
        </div>
        <div className="">
          {advisor?.faculty?.designation}, Department of Information Technology
        </div>
      </div>
      {/* <h4 className="text-lg">Select year to filter</h4> */}
      {/* <div className="flex mt-3 mb-5">
        <button
          className={`year-tab ${year === 0 && "active"}`}
          onClick={() => setYear(0)}
        >
          All
        </button>
        {[1, 2, 3, 4].map((item) => (
          <button
            className={`year-tab ${year === item && "active"}`}
            onClick={() => setYear(item)}
          >
            {new Date().getFullYear() - item}
          </button>
        ))}
      </div> */}
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="border px-4 py-2">S.No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Designation</th>
            <th className="border px-4 py-2">Contact No.</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {faculties?.map((advise, index) => (
            <tr>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {advise?.User?.name}
              </td>
              <td className="border px-4 py-2 text-center">{advise?.id}</td>
              <td className="border px-4 py-2 text-center">{advise?.designation}</td>
              <td className="border px-4 py-2 text-center">
                {advise?.User?.phoneNo}
              </td>
              <td className="border px-4 py-2 text-center">
                {advise?.User?.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HODPortal;
