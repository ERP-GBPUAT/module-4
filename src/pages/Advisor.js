import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Advisor = ({ code }) => {
  const navigate = useNavigate();
  const [year, setYear] = useState(0);
  const [advisees, setAdvisees] = useState([]);
  const [advisorName, setAdvisorName] = useState("");
  useEffect(() => {
    const getAdvisees = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/student/getAdvisees?faculty_code=${code}`
        );
        setAdvisees(data);
        setAdvisorName(data[0].advisor_name);
      } catch (err) {
        console.log(err);
      }
    };
    getAdvisees();
  }, []);

  useEffect(() => {
    setAdvisees(
      advisees.filter((a) => a.batch === new Date().getFullYear() - year)
    );
  }, [year]);

  return (
    <div className="p-8 advisor">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Advisees of{" "}
            {advisorName ? advisorName : "Mr. Vivek Vishwakarma Verma"}
          </h1>
          <button
            className="btn-secondary"
            onClick={() => navigate("advisor/notice")}
          >
            Send Notice
          </button>
        </div>
        <div className="">
          Assistant Professor, Department of Information Technology
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
          {advisees.map((advisee, index) => (
            <tr>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {advisee.User?.name}
              </td>
              <td className="border px-4 py-2 text-center">
                {advisee.studentId}
              </td>
              <td className="border px-4 py-2 text-center">
                {advisee.batch}
              </td>
              <td className="border px-4 py-2 text-center">
                {advisee.User?.phoneNo}
              </td>
              <td className="border px-4 py-2 text-center">
                {advisee.parentPhone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Advisor;
