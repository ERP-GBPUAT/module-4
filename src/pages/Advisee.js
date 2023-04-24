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
          `${process.env.REACT_APP_BACKEND_URL}/faculty/getFaculty/${code}`
        );
        setAdvisor(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getAdvisees = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/student/getAdvisees/${code}`
        );
        setAdvisees(data.data);
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
            <div>{advisor.User?.name}</div>
            <div>{code}</div>
            <div>{advisor.User?.phoneNo}</div>
            <div>{advisor.designation}</div>
            <div>{advisor.qualification}</div>
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
          {advisees.map((student, index) => (
            <tr>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {student.User?.name}
              </td>
              <td className="border px-4 py-2 text-center">
                {student.studentId}
              </td>
              <td className="border px-4 py-2 text-center">
                {student.User?.phoneNo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Advisee;
