import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HODView = () => {
  const navigate = useNavigate();
  const advisor = JSON.parse(localStorage.getItem("data"));

  const [loading, setLoading] = useState(true);
  const [facultyList, setFacultyList] = useState([]);
  const [activeFacultyId, setActiveFacultyId] = useState("");

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

  const [advisees, setAdvisees] = useState([]);
  useEffect(() => {
    const getAdvisees = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/student/getAdviseesByCode/${activeFacultyId}`,
          {
            headers: {
              "Content-type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        if (data.error) console.log(data.error);
        else setAdvisees(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAdvisees();
  }, [activeFacultyId]);

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
                <tr
                  key={faculty.UserId}
                  onClick={() => setActiveFacultyId(faculty.id)}
                  className={
                    activeFacultyId === faculty.id ? "active cursor-default" : "cursor-pointer"
                  }
                >
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
      {activeFacultyId ? (
        <>
          <div className="text-lg mt-8 mb-2">
            Advisees of{" "}
            {facultyList.find((f) => f.id === activeFacultyId).User.name}
          </div>
          <table className="w-full">
            <thead>
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
              {advisees &&
                advisees.map((advisee, index) => (
                  <tr key={advisee.UserId}>
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {advisee.User.name}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {advisee.id}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {advisee.batch}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {advisee.User.phoneNo}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {advisee.parentPhone}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="mt-8">
          <h4 className="text-lg">Select faculty to view advisees</h4>
        </div>
      )}
    </div>
  );
};

export default HODView;
