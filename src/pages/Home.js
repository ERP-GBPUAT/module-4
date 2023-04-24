import { useNavigate } from "react-router-dom";

const Home = ({ code, setCode, id, setId }) => {
  const navigate = useNavigate();

  return (
    <div className="px-8 home">
      <h1 className="text-4xl text-center font-bold py-5 pt-10">
        Advisor / Advisee Details
      </h1>
      <h3 className="text-lg text-center">Select Role</h3>
      <div className="my-4 mx-12 flex justify-center">
        <div className="card mr-8">
          <div>
            <div className="card-img">
              <img
                src="https://www.edukim.org/wp-content/uploads/2021/02/teacher-teachers-icon-11553430311nml7fxq6db-300x300.png"
                alt="advisor"
              />
            </div>
            <div className="card-body">
              <div className="card-title" onClick={() => navigate("/advisor")}>
                {code ? `Advisor Code - ${code}` : "Enter as Advisor"}
              </div>
              <div className="card-subtitle">
                View your advisees and their details. Send official notices and
                more.
              </div>
            </div>
          </div>
          <div className="card-footer">Click here to edit advisor code</div>
        </div>
        <div className="card ml-8">
          <div>
            <div className="card-img">
              <img
                src="https://vectorified.com/images/admin-logo-icon-6.png"
                alt="advisee"
              />
            </div>
            <div className="card-body">
              <div className="card-title" onClick={() => navigate("/advisee")}>
                {id ? `Advisee Code - ${id}` : "Enter as Advisee"}
              </div>
              <div className="card-subtitle">
                View your advisor and his/her details. View other advisees,
                official notices, performance and more.
              </div>
            </div>
          </div>
          <div className="card-footer">Click here to edit student code</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
