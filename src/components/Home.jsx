import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToPastes, addToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { FaClipboard } from "react-icons/fa";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const savedPaste = allPastes.find((p) => p.id === pasteId);
      if (savedPaste) {
        setTitle(savedPaste.title);
        setValue(savedPaste.value);
      }
    }
  }, [pasteId, allPastes]);

  const handleCreateOrUpdate = () => {
    const pasteData = pasteId ? JSON.parse(localStorage.getItem(`paste-${pasteId}`)) : null;

    const paste = {
      ...pasteData,
      title,
      value,
      createdAt: pasteData?.createdAt || new Date().toISOString(),
      id: pasteData?.id || Date.now().toString(),
    };

    if (pasteId) {
      localStorage.setItem(`paste-${paste.id}`, JSON.stringify(paste));
      dispatch(updateToPastes(paste)); 
      navigate("/");
    } else {
      localStorage.setItem(`paste-${paste.id}`, JSON.stringify(paste));
      dispatch(addToPastes(paste));
      navigate(`?pasteId=${paste.id}`);
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => toast.success("Copied to clipboard!", { duration: 2000, position: "top-right" }))
      .catch(() => toast.error("Failed to copy!", { duration: 2000, position: "top-right" }));
  };

    return (
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-4 sm:p-6 rounded-2xl shadow-lg max-w-3xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            className="p-2 md:p-3 rounded-xl md:rounded-2xl w-full md:w-80 pl-3 md:pl-4 border border-gray-300 shadow-sm text-base md:text-lg"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-black text-white font-medium md:font-semibold text-base md:text-lg transition hover:bg-green-700"
            onClick={handleCreateOrUpdate}
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
  
        <div className="relative mt-4 md:mt-6">
          <textarea
            className="rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-300 shadow-sm w-full h-full text-base md:text-lg"
            value={value}
            placeholder="Enter the text here"
            onChange={(e) => setValue(e.target.value)}
            rows={8}
          />
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 md:top-3 md:right-3 bg-gray-900 text-white p-1.5 md:p-2 rounded-md md:rounded-lg text-xs md:text-sm flex items-center shadow-md hover:bg-gray-700 transition"
          >
            <FaClipboard size={12} className="mr-1" />
            Copy
          </button>
        </div>
      </div>
    );
  };

export default Home;
