import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = ``;
    setToken("");
    navigate("/");
  };
  return (
    <>
      <div className="flex justify-between items-center py-2 px-4 h-[70px] sm:px-12 border-b border-gray-300">
        <img
          src={assets.logo}
          onClick={() => navigate("/")}
          alt="logo"
          className="w-32 sm:w-40 cursor-pointer"
        />
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
