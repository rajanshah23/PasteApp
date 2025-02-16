import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  console.log("Pastes:", pastes);
  console.log("Paste ID from URL:", id);

  const paste = pastes.find((p) => p.id === id);

  if (!paste) {
    return (
      <p className="text-red-500 text-xl text-center mt-10">Paste not found</p>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <div className="flex flex-row gap-7 justify-between">
        <input
          className="p-4 rounded-2xl w-full border border-blue-300 text-black font-medium bg-blue-50 opacity-90 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
      </div>

      <div className="mt-4">
        <textarea
          className="rounded-2xl w-full p-4 border border-blue-300 text-black font-medium bg-blue-50 opacity-90 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={paste.value}
          placeholder="Enter the text here"
          disabled
          rows={12}
        />
      </div>
      <div className="mt-4 text-white">
        <small>Created at: {paste.createdAt}</small>
      </div>
    </div>
  );
};

export default ViewPaste;
