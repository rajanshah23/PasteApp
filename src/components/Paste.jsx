import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaTrashAlt, FaCopy, FaShareAlt } from "react-icons/fa";

const colorClasses = {
  blue: "bg-blue-600 hover:bg-blue-700",
  green: "bg-green-600 hover:bg-green-700",
  red: "bg-red-600 hover:bg-red-700",
  purple: "bg-purple-600 hover:bg-purple-700",
  yellow: "bg-yellow-600 hover:bg-yellow-700",
};

const ActionButton = ({ label, onClick, bgColor, icon, iconSize = 20 }) => (
  <button
    className={`flex items-center text-white px-4 py-2 rounded-lg text-lg font-medium transition ${colorClasses[bgColor]}`}
    onClick={onClick}
  >
    {icon && React.createElement(icon, { size: iconSize, className: "mr-2" })}
    {label}
  </button>
);

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = Array.isArray(pastes)
    ? pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    
  };

  const handleCopy = (content) => {
    if (!content) return toast.error("No content to copy");
    navigator.clipboard
      .writeText(content)
      .then(() => toast.success("Copied to clipboard",{duration:2000, position: 'top-right'} ))
      .catch(() => toast.error("Failed to copy",{duration:2000, position: 'top-right'}));
  };

  const formatDate = (date) => {
    if (!date) return "Unknown";
    const d = new Date(date);
    return isNaN(d)
      ? "Invalid date"
      : d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  const handleShare = async (paste) => {
    try {
      if (navigator.share) {
        await navigator.share({ title: paste.title, text: paste.value });
        toast.success("Shared successfully",{duration:2000, position: 'top-right'});
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!",{duration:2000, position: 'top-right'});
      }
    } catch (error) {
      if (error.name !== "AbortError") toast.error("Sharing failed",{duration:2000, position: 'top-right'});
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-4 sm:p-6 rounded-2xl shadow-lg max-w-4xl mx-auto w-full">
      <input
        className="p-2 md:p-3 rounded-lg md:rounded-xl w-full border border-gray-300 shadow-sm text-sm sm:text-base md:text-lg focus:outline-none"
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-6">
        {filteredData.length === 0 ? (
          <div className="flex flex-col gap-3 md:gap-4 mt-4 md:mt-6">
            No pastes found matching your search
          </div>
        ) : (
          filteredData.map((paste) => (
            <div
              key={paste.id}
              className="bg-gray-100 border border-gray-200 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-md w-full"
            >
              <div className="font-medium md:font-semibold text-base md:text-lg text-black mb-2 md:mb-3">
                {paste.title}
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap justify-center sm:justify-start">
                <ActionButton
                  label="Edit"
                  className="text-xs sm:text-sm"
                iconSize={14}
                  onClick={() => navigate(`/?pasteId=${paste.id}`)}
                  bgColor="blue"
                  icon={FaEdit}
                />
                <ActionButton
                  label="View"
                  className="text-xs sm:text-sm"
                iconSize={14}
                  onClick={() => navigate(`/pastes/${paste.id}`)}
                  bgColor="green"
                  icon={FaEye}
                />
                <ActionButton
                  label="Delete"
                  className="text-xs sm:text-sm"
                iconSize={14}
                  onClick={() => handleDelete(paste.id)}
                  bgColor="red"
                  icon={FaTrashAlt}
                />
                <ActionButton
                  label="Copy"
                  className="text-xs sm:text-sm"
                iconSize={14}
                  onClick={() => handleCopy(paste.value)}
                  bgColor="purple"
                  icon={FaCopy}
                />
                <ActionButton
                  label="Share"
                  className="text-xs sm:text-sm"
                iconSize={14}
                  onClick={() => handleShare(paste)}
                  bgColor="blue"
                  icon={FaShareAlt}
                />
              </div>

              <div className="text-gray-500 text-xs md:text-sm mt-2 md:mt-3">
                Created on: {formatDate(paste.createdAt)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Paste;
