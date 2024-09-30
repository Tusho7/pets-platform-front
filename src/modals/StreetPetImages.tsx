import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useUser } from "../contexts/UseUser";
import Swal from "sweetalert2";
import { t } from "i18next";
import { StreetPetImageModalProps } from "../types/StreetPetProps";
import {
  deleteStreetPetImageById,
  updateStreetPetImages,
} from "../services/street_pet";

const StreetPetImagesModal: React.FC<StreetPetImageModalProps> = ({
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
  const [newImages, setNewImages] = useState<File[]>([]);

  if (!isOpen || !images.length) return null;

  const handleEditClick = () => {
    setEditMode((prev) => !prev);
  };

  const handleDeleteImage = async (index: number) => {
    if (images.length <= 1) {
      Swal.fire({
        icon: "warning",
        title: t("streetPetImageModal.deleteErrorMessages.title"),
        text: t("streetPetImageModal.deleteErrorMessages.text"),
      });
      return;
    }

    const fullPath = images[index];
    const filename = fullPath.split("/").pop();

    const result = await Swal.fire({
      title: t("streetPetImageModal.areYouSure.title"),
      text: t("streetPetImageModal.areYouSure.text"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: t("streetPetImageModal.areYouSure.cancelButton"),
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("streetPetImageModal.areYouSure.confirmButton"),
    });

    if (result.isConfirmed) {
      try {
        if (userId) {
          if (filename) {
            await deleteStreetPetImageById(
              petId?.toString() || "",
              filename,
              userId
            );
          } else {
            throw new Error(t("streetPetImageModal.filenameError"));
          }
          Swal.fire(
            t("streetPetImageModal.deleteSuccessMessages.title"),
            t("streetPetImageModal.deleteSuccessMessages.text"),
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
          t("streetPetImageModal.deleteErrorMessages.title"),
          t("streetPetImageModal.deleteErrorMessages.text"),
          "error"
        );
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  const handleUploadImage = async () => {
    if (newImages && newImages?.length > 0 && userId && petId) {
      try {
        const formData = new FormData();
        newImages.forEach((image) => formData.append("images", image));

        await updateStreetPetImages(formData, petId.toString(), userId);

        const updatedImages = [
          ...images,
          ...newImages.map((file) => URL.createObjectURL(file)),
        ];
        if (onUpdate) {
          onUpdate(updatedImages);
        }

        setNewImages([]);
        onClose();

        Swal.fire(
          t("streetPetImageModal.uploadSuccessMessages.title"),
          t("streetPetImageModal.uploadSuccessMessages.text"),
          "success"
        );
        onClose();
        window.location.reload();
      } catch (error) {
        console.error("Error uploading image:", error);
        Swal.fire(
          t("streetPetImageModal.uploadErrorMessages.title"),
          t("streetPetImageModal.uploadErrorMessages.text"),
          "error"
        );
      }
    }
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {t("streetPetImageModal.title")}
          </h3>
          <section className="flex gap-5 items-baseline">
            <button onClick={onClose}> {t("streetPetImageModal.close")}</button>
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
                alt={`Street pet image ${index + 1}`}
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
          <div className="mt-10">
            <input
              type="file"
              name="images"
              multiple
              className="p-2 border border-gray-300 rounded-lg"
              onChange={handleFileChange}
            />
            <div className="flex gap-4 mt-4">
              {newImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New image ${index + 1}`}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleUploadImage}
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
            >
              {t("streetPetImageModal.uploadButton")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreetPetImagesModal;
