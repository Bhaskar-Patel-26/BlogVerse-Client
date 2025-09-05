import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { parse } from 'marked';

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      const blog = {
        title,
        subTitle: subtitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blogs/add", formData);
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubtitle("");
        setCategory("Startup");
        setIsPublished(false);
        setIsAdding(false);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
        setIsAdding(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const generateContent = async () => {
    if(!title) return toast.error('Please enter title');
    try {
      setLoading(true);
      const { data } = await axios.post("/api/blogs/generate", { prompt: title });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!quillRef.current && editorRef.current) {
        quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={submithandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          onChange={(e) => setTitle(e.target.value)} value={title}
          type="text"
          placeholder="Blog Title"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Blog Subtitle</p>
        <input
          onChange={(e) => setSubtitle(e.target.value)} value={subtitle}
          type="text"
          placeholder="Blog Subtitle"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Blog Description</p>
        <div className="relative max-w-lg h-74 pb-16 sm:pb-10 pt-2">
            <div ref={editorRef}></div>
            {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader />
                </div>
            )}
            <button type="button" onClick={generateContent} className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer">Generate with AI</button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)} value={category} name="category"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
            <p>Publish Now</p>
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="scale-125 cursor-pointer" />
        </div>

        <button disabled={isAdding} type="submit" className="bg-primary mt-8 h-10 w-40 text-white rounded hover:scale-105 transition-all cursor-pointer">{isAdding ? "Adding..." : "Add Blog"}</button>
      </div>
    </form>
  );
};

export default AddBlog;
