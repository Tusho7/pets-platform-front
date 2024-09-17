import React, { useState } from "react";
import { LostPetImageModalProps } from "../types/LostPetProps";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useUser } from "../contexts/UseUser";
import Swal from "sweetalert2";
import { deleteLostPetImageById } from "../services/lost_pet";
import { t } from "i18next";

const LostPetImageModal: React.FC<LostPetImageModalProps> = ({
  isOpen,
  images,
  onClose,
  fromProfile,
  petId,
  onUpdate,
}) => {
  const { user } = useUser();
  const userId = user?.id;
  const [editMode, setEditMode] = useState<boolean>(false);

  if (!isOpen || !images.length) return null;

  const handleEditClick = () => {
    setEditMode((prev) => !prev);
  };

  const handleDeleteImage = async (index: number) => {
    if (images.length <= 1) {
      Swal.fire({
        icon: "warning",
        title: t("lostPetImageModal.deleteErrorMessages.title"),
        text: t("lostPetImageModal.deleteErrorMessages.text"),
      });
      return;
    }

    const fullPath = images[index];
    const filename = fullPath.split("/").pop();

    const result = await Swal.fire({
      title: t("lostPetImageModal.areYouSure.title"),
      text: t("lostPetImageModal.areYouSure.text"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: t("lostPetImageModal.areYouSure.cancelButton"),
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("lostPetImageModal.areYouSure.confirmButton"),
    });

    if (result.isConfirmed) {
      try {
        if (userId) {
          if (filename) {
            await deleteLostPetImageById(
              petId?.toString() || "",
              filename,
              userId
            );
          } else {
            throw new Error(t("lostPetImageModal.filenameError"));
          }
          Swal.fire(
            t("lostPetImageModal.deleteSuccessMessages.title"),
            t("lostPetImageModal.deleteSuccessMessages.text"),
            "success"
          );

          const updatedImages = images.filter((_, i) => i !== index);
          if (onUpdate) {
            onUpdate(updatedImages);
          }
          onClose();
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        Swal.fire(
          t("lostPetImageModal.deleteErrorMessages.title"),
          t("lostPetImageModal.deleteErrorMessages.text"),
          "error"
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {t("lostPetImageModal.title")}
          </h3>
          <section className="flex gap-5 items-baseline">
            <button onClick={onClose}> {t("lostPetImageModal.close")}</button>
            {fromProfile && (
              <button onClick={handleEditClick}>
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
                className="w-full h-28 rounded-lg object-cover"
              />
              {editMode && images.length > 1 && (
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTrashAlt />
                </button>
              )}
            </div>
          ))}
        </div>
        {editMode && (
          <input
            type="file"
            className="p-2 border border-gray-300 rounded-lg mt-10"
          />
        )}
      </div>
    </div>
  );
};

export default LostPetImageModal;
