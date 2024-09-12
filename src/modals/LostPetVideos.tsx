import React from "react";
import { LostPetVideosModalProps } from "../types/LostPetProps";
import { FaEdit } from "react-icons/fa";

const LostPetVideosModal: React.FC<LostPetVideosModalProps> = ({
  isOpen,
  videos,
  onClose,
  fromProfile,
}) => {
  if (!isOpen || !videos.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg max-w-3xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold mb-4">All Videos</h3>
          <section className="flex gap-5 items-baseline justify-center">
            <button onClick={onClose}>Close</button>
            {fromProfile && (
              <button onClick={() => console.log("Edit image")}>
                <FaEdit className="text-blue-500" />
              </button>
            )}
          </section>
        </div>
        <div className="space-y-4">
          {videos.map((video, index) => (
            <video
              key={index}
              controls
              className="w-full rounded-lg"
              style={{ height: "300px" }}
            >
              <source
                src={import.meta.env.VITE_API_STORAGE + video}
                type="video/mp4"
              />
            </video>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostPetVideosModal;
