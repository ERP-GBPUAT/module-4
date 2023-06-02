import { useState, useEffect } from "react";
import axios from "axios";

const HODView = () => {
  const advisor = JSON.parse(localStorage.getItem("data"));

  const [loading, setLoading] = useState(true);
  const [facultyList, setFacultyList] = useState([]);
  const [activeFacultyId, setActiveFacultyId] = useState("");

  useEffect(() => {
    const getAllFaculty = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/faculty/getDeptFaculty`,
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
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/student/getAdvisees`,
          {
            facultyId: activeFacultyId,
          },
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
    if (activeFacultyId) getAdvisees();
  }, [activeFacultyId]);

  const [tab, setTab] = useState(0);
  console.log(advisor)

  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-8 advisor">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{advisor?.user?.name}</h1>
        <div>Head of Department, {advisor?.faculty?.department}</div>
      </div>
      <div className="flex mt-3 mb-5">
        <button
          className={`year-tab ${tab === 0 && "active"}`}
          onClick={() => setTab(0)}
        >
          View faculties
        </button>
        <button
          className={`year-tab ${tab === 1 && "active"}
            ${!advisor.faculty.isAdvisor && "opacity-50 cursor-not-allowed"}
            `}
          onClick={() => {
            if (advisor.faculty.isAdvisor) setTab(1);
          }}
        >
          View advisees
        </button>
      </div>
      {tab === 0 ? (
        <>
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
                facultyList.map((faculty, index) => (
                  <tr
                    key={faculty.UserId}
                    onClick={() => setActiveFacultyId(faculty.id)}
                    className={
                      activeFacultyId === faculty.id
                        ? "active cursor-default"
                        : "cursor-pointer"
                    }
                  >
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
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
              {facultyList && facultyList.length === 0 && (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan="6">
                    No faculty found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {activeFacultyId ? (
            <>
              <div className="text-lg mt-8 mb-2">
                Advisees of{" "}
                {facultyList.find((f) => f.id === activeFacultyId).User.name} -
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
                  {advisees && advisees.length === 0 && (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="6">
                        No advisees found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <div className="mt-8">
              <h4 className="text-lg">Select faculty to view advisees</h4>
            </div>
          )}
        </>
      ) : (
        <Advisees advCode={advisor.faculty.id} />
      )}
    </div>
  );
};

const Advisees = ({ advCode }) => {
  const [loading, setLoading] = useState(true);
  const [adviseesAPI, setAdviseesAPI] = useState([]);
  const [advisees, setAdvisees] = useState([]);
  const [year, setYear] = useState(0);

  useEffect(() => {
    const getAdvisees = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/student/getAdvisees`,
          {
            facultyId: advCode,
          },
          {
            headers: {
              "Content-type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        if (data.error) console.log(data.error);
        else {
          setAdviseesAPI(data.data);
          setAdvisees(data.data);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getAdvisees();
  }, []);

  useEffect(() => {
    if (year === 0) {
      setAdvisees(adviseesAPI);
    } else {
      setAdvisees(
        adviseesAPI.filter((advisee) => {
          return new Date().getFullYear() - parseInt(advisee.batch) === year;
        })
      );
    }
  }, [year]);
  if (loading) return <div>Loading...</div>;

  return (
    <div>
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
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  {advisee.User.name}
                </td>
                <td className="border px-4 py-2 text-center">{advisee.id}</td>
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
          {advisees && advisees.length === 0 && (
            <tr>
              <td className="border px-4 py-2 text-center" colSpan="6">
                No advisees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HODView;
