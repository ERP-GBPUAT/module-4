import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { RxDotsVertical } from "react-icons/rx";

const Header = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  return (
    <div className="header flex justify-between items-center px-6 bg-white">
      <div
        className="flex items-center py-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="./logo.webp" alt="logo" className="w-10 h-10 mr-4" />
        <h1 className="text-xl font-medium">ERP Systems</h1>
      </div>
      <div className="flex items-center">
        <select
          className="mr-4"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
        <div className="p-2 cursor-pointer menu-icon-parent mr-4">
          <RxDotsVertical className="menu-icon" />
        </div>
        <div className="p-2 cursor-pointer user-icon-parent">
          <HiUserCircle className="user-icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
