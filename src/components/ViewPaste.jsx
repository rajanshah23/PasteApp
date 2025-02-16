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
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-4 sm:p-6 rounded-2xl shadow-lg max-w-3xl mx-auto w-full">
      <div className="flex flex-col gap-4">
        <input
          className="p-2 md:p-4 rounded-xl md:rounded-2xl w-full border border-blue-300 text-black font-normal md:font-medium bg-blue-50 opacity-90 cursor-not-allowed text-sm md:text-base"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
      </div>

      <div className="mt-3 md:mt-4">
        <textarea
          className="rounded-xl md:rounded-2xl w-full p-2 md:p-4 border border-blue-300 text-black font-normal md:font-medium bg-blue-50 opacity-90 cursor-not-allowed text-sm md:text-base"
          value={paste.value}
          placeholder="Enter the text here"
          disabled
          rows={12}
        />
      </div>
      <div className="mt-3 md:mt-4 text-white text-xs md:text-sm">
        <small>Created at: {paste.createdAt}</small>
      </div>
    </div>
  );
};

export default ViewPaste;
