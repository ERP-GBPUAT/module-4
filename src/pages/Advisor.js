import { useState, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BEGIN":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, advisee: action.payload };
    case "FETCH_AD_SUCCESS":
      return { ...state, loading: false, advisor: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
  }
};

const Advisor = ({advisorId} ) => {
  const navigate = useNavigate();
  // const[code, setCode] = useState('')
  const [year, setYear] = useState(0);
  // const [adviseesAPI, setAdviseesAPI] = useState([]);
  // const [advisees, setAdvisees] = useState([]);
  // const [advisor, setAdvisor] = useState({});
  const [{ loading, error,advisee,advisor }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    advisee: [],
    advisor:{}
  });
  // console.log('code', JSON.parse(localStorage.getItem('data')))
  // console.log('cccccccc',code)
  useEffect(() => {
    // const faculty = JSON.parse(localStorage.getItem('data')) || {}
    // setCode(faculty?.faculty?.id|| '')
    console.log("advisorId", advisorId)
    const getAdvisees = async () => {
      dispatch({type:'FETCH_BEGIN'})
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/student/getAdvisees`
        ,{
          method:"GET",
          headers:{
            "Content-type":"application/json",
            "token":localStorage.getItem("token")
          }
        });
        const json =  await res.json();
        if(json.msg==="success"){
          console.log(json.data);
          dispatch({type:'FETCH_SUCCESS',payload:json.data})
        }
        else{
          dispatch({type:'FETCH_FAIL',payload:json.error})
        }
        // setAdviseesAPI(data.data);
      } catch (err) {
        console.log(err);
        dispatch({type:'FETCH_FAIL',payload:error.message})
      }
    };
    const getAdvisorDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/faculty/getFaculty/${advisorId}`
        ,{
          method:"GET",
          headers:{
            "Content-type":"application/json",
            // "token":localStorage.getItem("token")
          }
        });
        const json = res.json();
        if(json.msg === "success"){
          console.log(json.data);
          dispatch({type:'FETCH_AD_SUCCESS',payload:json.data})
        }
        else{
          dispatch({type:'FETCH_FAIL',payload:json.error})
        }
        // setAdvisor(data.data);
      } catch (err) {
        dispatch({type:'FETCH_FAIL',payload:error.message})
        console.log(err);
      }
    };
    getAdvisees();
    getAdvisorDetails();
  }, []);

  if(loading) return <div>Loading...</div>
  return (
    <div className="p-8 advisor">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Advisees of {advisor?.user?.name}
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
      <h4 className="text-lg">Select year to filter</h4>
      <div className="flex mt-3 mb-5">
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
      </div>
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="border px-4 py-2">S.No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Batch</th>
            <th className="border px-4 py-2">Contact No.</th>
            <th className="border px-4 py-2">Parent's No.</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {advisee?.map((advise, index) => (
            <tr>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {advise?.Faculty?.name}
              </td>
              <td className="border px-4 py-2 text-center">
                {advise?.id}
              </td>
              <td className="border px-4 py-2 text-center">{advise?.batch}</td>
              <td className="border px-4 py-2 text-center">
                {advise?.User?.phoneNo}
              </td>
              <td className="border px-4 py-2 text-center">
                {advise?.parentPhone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Advisor;
