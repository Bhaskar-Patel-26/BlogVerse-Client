import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const submithandler = (e) => {
    e.preventDefault();
  };

  const generateContent = () => {
    console.log('image, title, subtitle, category, isPublished');
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

        <button type="submit" className="bg-primary mt-8 h-10 w-40 text-white rounded hover:scale-105 transition-all cursor-pointer">Add Blog</button>
      </div>
    </form>
  );
};

export default AddBlog;
