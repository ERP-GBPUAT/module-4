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
          `http://localhost:5000/api/advisor/${code}/list_of_advisees`
        );
        setAdvisees(data);
        setAdvisorName(data[0].advisor_name);
      } catch (err) {
        console.log(err);
      }
    };
    getAdvisees();
  }, []);

  return (
    <div className="p-8 advisor">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Advisees of{" "}
            {advisorName ? advisorName : "Mr. Vivek Vishwakarma Verma"}
          </h1>
          <button className="btn-secondary" onClick={() => navigate("/notice")}>
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
        <button
          className={`year-tab ${year === 1 && "active"}`}
          onClick={() => setYear(1)}
        >
          1st year
        </button>
        <button
          className={`year-tab ${year === 2 && "active"}`}
          onClick={() => setYear(2)}
        >
          2nd year
        </button>
        <button
          className={`year-tab ${year === 3 && "active"}`}
          onClick={() => setYear(3)}
        >
          3rd year
        </button>
        <button
          className={`year-tab ${year === 4 && "active"}`}
          onClick={() => setYear(4)}
        >
          4th year
        </button>
      </div>
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="border px-4 py-2">S.No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Contact No.</th>
            <th className="border px-4 py-2">Parent's No.</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border px-4 py-2 text-center">1</td>
            <td className="border px-4 py-2 text-center">Adam</td>
            <td className="border px-4 py-2 text-center">TITDEPT</td>
            <td className="border px-4 py-2 text-center">4</td>
            <td className="border px-4 py-2 text-center">+9175758658</td>
            <td className="border px-4 py-2 text-center">+91676567567</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-center">2</td>
            <td className="border px-4 py-2 text-center">Alice</td>
            <td className="border px-4 py-2 text-center">TITDEPT</td>
            <td className="border px-4 py-2 text-center">4</td>
            <td className="border px-4 py-2 text-center">+9175758658</td>
            <td className="border px-4 py-2 text-center">+91676567567</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-center">3</td>
            <td className="border px-4 py-2 text-center">Mango</td>
            <td className="border px-4 py-2 text-center">TITDEPT</td>
            <td className="border px-4 py-2 text-center">4</td>
            <td className="border px-4 py-2 text-center">+9175758658</td>
            <td className="border px-4 py-2 text-center">+91676567567</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-center">4</td>
            <td className="border px-4 py-2 text-center">Django</td>
            <td className="border px-4 py-2 text-center">TITDEPT</td>
            <td className="border px-4 py-2 text-center">4</td>
            <td className="border px-4 py-2 text-center">+9175758658</td>
            <td className="border px-4 py-2 text-center">+91676567567</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Advisor;
