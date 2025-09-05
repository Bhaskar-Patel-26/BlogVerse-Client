import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [blogs, setBlog] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get("/api/blogs/all");
      data.success ? setBlog(data.blogs) : toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  const vlaue = {
    axios, navigate, token, setToken, blogs, setBlog, input, setInput
  };

  return ( 
    <AppContext.Provider value={vlaue}>
        {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => {
  return useContext(AppContext);
};
 