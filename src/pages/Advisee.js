import { useEffect, useState } from "react";
import axios from "axios";
import { HiUserCircle } from "react-icons/hi";

const Advisee = ({ code, id }) => {
  const [advisor, setAdvisor] = useState({});
  const [advisees, setAdvisees] = useState([]);

  useEffect(() => {
    const getAdvisorDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/advisor/${code}`
        );
        setAdvisor(data);
      } catch (err) {
        console.log(err);
      }
    };
    const getAdvisees = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/advisor/${code}/list_of_advisees`
        );
        setAdvisees(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAdvisorDetails();
    getAdvisees();
  }, []);

  return (
    <div className="p-8 advisee">
      <h1 className="text-2xl font-bold mb-4">Advisor Details</h1>
      <div className="flex">
        <div className="advisor-img">
          <HiUserCircle />
        </div>
        <div className="bg-white p-4 rounded-md flex items-center w-full">
          <div className="w-28">
            <div className="font-bold">Name:</div>
            <div className="font-bold">Advisor Code:</div>
            <div className="font-bold">Contact No.:</div>
            <div className="font-bold">Designation:</div>
            <div className="font-bold">Qualification:</div>
          </div>
          <div>
            <div>XYZ</div>
            <div>{code}</div>
            <div>+9176576547</div>
            <div>Prof</div>
            <div>Ph.D</div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold my-4">Classmate Advisees</h1>
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="border px-4 py-2">S.No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Contact No.</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border px-4 py-2 text-center">1</td>
            <td className="border px-4 py-2 text-center">Adam</td>
            <td className="border px-4 py-2 text-center">TITDEPT</td>
            <td className="border px-4 py-2 text-center">+9178687586</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-center">2</td>
            <td className="border px-4 py-2 text-center">Alice</td>
            <td className="border px-4 py-2 text-center">TITDEPT</td>
            <td className="border px-4 py-2 text-center">+9178687586</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-center">3</td>
            <td className="border px-4 py-2 text-center">Mango</td>
            <td className="border px-4 py-2 text-center">TITDEPT</td>
            <td className="border px-4 py-2 text-center">+9178687586</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-center">4</td>
            <td className="border px-4 py-2 text-center">Ramesh</td>
            <td className="border px-4 py-2 text-center">TITDEPT</td>
            <td className="border px-4 py-2 text-center">+9178687586</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Advisee;
