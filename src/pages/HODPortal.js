import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HODView = () => {
  const navigate = useNavigate();
  const advisor = JSON.parse(localStorage.getItem("data"));

  const [loading, setLoading] = useState(true);
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    const getAllFaculty = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/faculty/getAllFaculty`,
          {
            headers: {
              "Content-type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        if (data.error) console.log(data.error);
        else setFacultyList(data.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getAllFaculty();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-8 advisor">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{advisor?.user?.name}</h1>
        <div>Head of Department of Information Technology</div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">S.No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Designation</th>
            <th className="border px-4 py-2">Qualification</th>
            <th className="border px-4 py-2">Contact No.</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {facultyList &&
            facultyList
              .filter((f) => !f.hodOfDepartment)
              .map((faculty, index) => (
                <tr key={faculty.UserId}>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">
                    {faculty?.User?.name || faculty.id}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {faculty.designation}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {faculty.qualification}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {faculty?.User?.phoneNo}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {faculty?.User?.email}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default HODView;
