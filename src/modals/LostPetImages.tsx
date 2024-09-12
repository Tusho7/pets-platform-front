import React from "react";
import { LostPetImageModalProps } from "../types/LostPetProps";
import { FaEdit } from "react-icons/fa";

const LostPetImageModal: React.FC<LostPetImageModalProps> = ({
  isOpen,
  images,
  onClose,
  fromProfile,
}) => {
  if (!isOpen || !images.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg max-w-3xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold mb-4">All Images</h3>
          <section className="flex gap-5 items-baseline justify-center">
            <button onClick={onClose}>Close</button>
            {fromProfile && (
              <button onClick={() => console.log("Edit image")}>
                <FaEdit className="text-blue-500" />
              </button>
            )}
          </section>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={import.meta.env.VITE_API_STORAGE + image}
                alt={`Lost pet image ${index + 1}`}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostPetImageModal;
