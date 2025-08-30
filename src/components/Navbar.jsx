import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nevigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => nevigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-40"
      />
      <button
        onClick={() => nevigate("/admin")}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Admin Login <img src={assets.arrow} alt="arrow" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;
