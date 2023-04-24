import { useState, useEffect } from "react";
import axios from "axios";

const Notice = ({ code }) => {
  const [year, setYear] = useState("all");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [checkboxParents, setCheckboxParents] = useState(false);
  const sendNotice = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/faculty/sendNotice?faculty_code=${code}`
      );
      alert("successfully sent");
    } catch (e) {
      console.log(e);
      // alert("some error occured, try again later");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-8 font-bold">Send Notice to Advisees</h1>
      <div className="bg-white p-4 rounded-md w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendNotice();
          }}
        >
          <div className="flex items-center">
            <div className="w-20">Year:</div>
            <div className="flex my-2 w-full">
              <button
                className={`year-tab ${year === 0 && "active"}`}
                onClick={() => setYear(0)}
                type="button"
              >
                All
              </button>
              <button
                className={`year-tab ${year === 1 && "active"}`}
                type="button"
                onClick={() => setYear(1)}
              >
                1st year
              </button>
              <button
                className={`year-tab ${year === 2 && "active"}`}
                type="button"
                onClick={() => setYear(2)}
              >
                2nd year
              </button>
              <button
                className={`year-tab ${year === 3 && "active"}`}
                type="button"
                onClick={() => setYear(3)}
              >
                3rd year
              </button>
              <button
                className={`year-tab ${year === 4 && "active"}`}
                type="button"
                onClick={() => setYear(4)}
              >
                4th year
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-20">Subject:</div>
            <input
              type="text"
              className="w-full my-2"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter title of notice"
              required
            />
          </div>
          <div className="flex">
            <div className="w-20">Body:</div>
            <textarea
              className="w-full my-2"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter contents of the notice"
              rows={8}
              required
            />
          </div>
          <div className="flex">
            <div className="mr-2">Also send to parents:</div>
            <input
              type="checkbox"
              checked={checkboxParents}
              onChange={(e) => setCheckboxParents(e.target.checked)}
            />
          </div>
          <div className="flex justify-end">
            <button className="btn-primary" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notice;
