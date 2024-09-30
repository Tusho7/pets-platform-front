import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { StreetPetVideosModalProps } from "../types/StreetPetProps";
import { useUser } from "../contexts/UseUser";
import Swal from "sweetalert2";
import { t } from "i18next";
import {
  deleteStreetPetVideoById,
  updateStreetPetVideos,
} from "../services/street_pet";

const StreetPetVideos: React.FC<StreetPetVideosModalProps> = ({
  isOpen,
  videos,
  onClose,
  petId,
  fromProfile,
  onUpdate,
}) => {
  const { user } = useUser();
  const userId = user?.id;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newVideos, setNewVideos] = useState<File[]>([]);

  if (!isOpen || !videos.length) return null;

  const handleEditClick = () => {
    setEditMode((prev) => !prev);
  };

  const handleDeleteVideo = async (index: number) => {
    if (videos.length < 1) {
      Swal.fire({
        icon: "warning",
        title: t("streetPetImageModal.deleteErrorMessages.title"),
        text: t("streetPetImageModal.deleteErrorMessages.text"),
      });
      return;
    }

    const fullPath = videos[index];
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
        if (userId && filename) {
          await deleteStreetPetVideoById(
            petId?.toString() || "",
            filename,
            userId
          );
          Swal.fire(
            t("streetPetImageModal.deleteSuccessMessages.title"),
            t("streetPetImageModal.deleteSuccessMessages.text"),
            "success"
          );

          const updatedVideos = videos.filter((_, i) => i !== index);
          if (onUpdate) {
            onUpdate(updatedVideos);
          }
          onClose();
        }
      } catch (error) {
        console.error("Error deleting video:", error);
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
    setNewVideos((prevVideos) => [...prevVideos, ...files]);
  };

  const handleUploadVideos = async () => {
    if (newVideos.length > 0 && userId && petId) {
      try {
        const formData = new FormData();
        newVideos.forEach((video) => formData.append("videos", video));

        console.log(newVideos);
        await updateStreetPetVideos(formData, petId.toString(), userId);

        const updatedVideos = [
          ...videos,
          ...newVideos.map((file) => URL.createObjectURL(file)),
        ];
        if (onUpdate) {
          onUpdate(updatedVideos);
        }

        setNewVideos([]);
        onClose();

        Swal.fire(
          t("streetPetImageModal.uploadSuccessMessages.title"),
          t("streetPetImageModal.uploadSuccessMessages.text"),
          "success"
        );
        window.location.reload();
      } catch (error) {
        console.error("Error uploading videos:", error);
        Swal.fire(
          t("streetPetImageModal.uploadErrorMessages.title"),
          t("streetPetImageModal.uploadErrorMessages.text"),
          "error"
        );
      }
    }
  };

  const handleRemoveNewVideo = (index: number) => {
    setNewVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">All Videos</h3>
          <section className="flex gap-5 items-baseline">
            <button onClick={onClose}>Close</button>
            {fromProfile && (
              <button onClick={handleEditClick}>
                <FaEdit className="text-blue-500" />
              </button>
            )}
          </section>
        </div>
        <div className="space-y-4 flex ">
          {videos.map((video, index) => (
            <div key={index} className="relative">
              <video
                controls
                className="w-full rounded-lg"
                style={{ height: "300px" }}
              >
                <source
                  src={import.meta.env.VITE_API_STORAGE + video}
                  type="video/mp4"
                />
              </video>
              {editMode && (
                <button
                  onClick={() => handleDeleteVideo(index)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
        {editMode && (
          <div className="mt-4">
            <input
              type="file"
              name="videos"
              accept="video/*"
              multiple
              onChange={handleFileChange}
            />
            <button onClick={handleUploadVideos} className="ml-2">
              Upload Videos
            </button>
          </div>
        )}
        {newVideos.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold">New Videos:</h4>
            <ul>
              {newVideos.map((video, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{video.name}</span>
                  <button
                    onClick={() => handleRemoveNewVideo(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreetPetVideos;
