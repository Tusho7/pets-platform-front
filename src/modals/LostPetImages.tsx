import React from "react";
import { LostPetImageModalProps } from "../types/LostPetProps";

const LostPetImageModal: React.FC<LostPetImageModalProps> = ({
  isOpen,
  images,
  onClose,
}) => {
  if (!isOpen || !images.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg max-w-3xl">
        <h3 className="text-lg font-semibold mb-4">All Images</h3>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={import.meta.env.VITE_API_STORAGE + image}
              alt={`Lost pet image ${index + 1}`}
              className="w-full h-auto rounded-lg object-cover"
            />
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

export default LostPetImageModal;
