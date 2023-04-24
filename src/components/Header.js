import { useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header flex justify-between items-center px-6 bg-white">
      <div
        className="flex items-center py-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="./logo.webp" alt="logo" className="w-10 h-10 mr-4" />
        <h1 className="text-xl font-medium">ERP Systems</h1>
      </div>
      <div className="p-2 cursor-pointer user-icon-parent">
        <HiUserCircle className="user-icon" />
      </div>
    </div>
  );
};

export default Header;
