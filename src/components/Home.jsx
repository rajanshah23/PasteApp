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
      console.log("Editing Paste:", savedPaste);
      if (savedPaste) {
        setTitle(savedPaste.title);
        setValue(savedPaste.value);
      }
    }
  }, [pasteId, allPastes]);

  const handleCreateOrUpdate = () => {
    const pasteData = pasteId
      ? JSON.parse(localStorage.getItem(`paste-${pasteId}`))
      : null;

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
      .then(() => toast.success("Copied to clipboard!",{duration:2000, position: 'top-right'}))
      .catch(() => toast.error("Failed to copy!",{duration:2000, position: 'top-right'}));
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <div className="flex flex-row gap-7 justify-between">
        <input
          className="p-3 rounded-2xl w-80 pl-4 border border-gray-300 shadow-sm text-lg"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="p-3 rounded-2xl bg-black-600 text-white font-semibold text-lg transition hover:bg-green-700"
          onClick={handleCreateOrUpdate}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="relative mt-6">
        <textarea
          className="rounded-2xl min-w-[500px] p-4 border border-gray-300 shadow-sm w-full h-full text-lg"
          value={value}
          placeholder="Enter the text here"
          onChange={(e) => setValue(e.target.value)}
          rows={10}
        />
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 bg-gray-900 text-white p-2 rounded-lg text-sm flex items-center justify-center shadow-md hover:bg-gray-700 transition"
        >
          <FaClipboard size={15} className="mr-1" />
          Copy
        </button>
      </div>
    </div>
  );
};

export default Home;
