import React from "react";
import { LostPetVideosModalProps } from "../types/LostPetProps";

const LostPetVideosModal: React.FC<LostPetVideosModalProps> = ({
  isOpen,
  videos,
  onClose,
}) => {
  if (!isOpen || !videos.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg max-w-3xl">
        <h3 className="text-lg font-semibold mb-4">All Videos</h3>
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
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 bg-white rounded-full p-2 shadow-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default LostPetVideosModal;
