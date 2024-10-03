import React, { useState } from "react";
import { LostPetVideosModalProps } from "../types/LostPetProps";
import { FaEdit } from "react-icons/fa";
import { t } from "i18next";
import Swal from "sweetalert2";
import { useUser } from "../contexts/UseUser";
import {
  deleteLostPetVideoById,
  updateLostPetVideos,
} from "../services/lost_pet";

const LostPetVideosModal: React.FC<LostPetVideosModalProps> = ({
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
        title: t("lostPetVideoModal.deleteErrorMessages.title"),
        text: t("lostPetVideoModal.deleteErrorMessages.text"),
      });
      return;
    }

    const fullPath = videos[index];
    const filename = fullPath.split("/").pop();

    const result = await Swal.fire({
      title: t("lostPetVideoModal.areYouSure.title"),
      text: t("lostPetVideoModal.areYouSure.text"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: t("lostPetVideoModal.areYouSure.cancelButton"),
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("lostPetVideoModal.areYouSure.confirmButton"),
    });

    if (result.isConfirmed) {
      try {
        if (userId && filename) {
          await deleteLostPetVideoById(
            petId?.toString() || "",
            filename,
            userId
          );
          Swal.fire(
            t("lostPetVideoModal.deleteSuccessMessages.title"),
            t("lostPetVideoModal.deleteSuccessMessages.text"),
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
          t("lostPetVideoModal.deleteErrorMessages.title"),
          t("lostPetVideoModal.deleteErrorMessages.text"),
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

        await updateLostPetVideos(formData, petId.toString(), userId);

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
          t("lostPetVideoModal.uploadSuccessMessages.title"),
          t("lostPetVideoModal.uploadSuccessMessages.text"),
          "success"
        );
        window.location.reload();
      } catch (error) {
        console.error("Error uploading videos:", error);
        Swal.fire(
          t("lostPetVideoModal.uploadErrorMessages.title"),
          t("lostPetVideoModal.uploadErrorMessages.text"),
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
          <h3 className="text-lg font-semibold">
            {t("lostPetVideoModal.title")}
          </h3>
          <section className="flex gap-5 items-baseline">
            <button onClick={onClose}>{t("lostPetVideoModal.close")}</button>
            {fromProfile && (
              <button onClick={handleEditClick}>
                <FaEdit className="text-blue-500" />
              </button>
            )}
          </section>
        </div>

        <div
          className="grid grid-cols-2 gap-4 overflow-y-auto"
          style={{ maxHeight: "400px" }}
        >
          {videos.map((video, index) => (
            <div key={index} className="relative">
              <video
                controls
                className="w-full rounded-lg"
                style={{ height: "200px" }}
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
                  {t("lostPetVideoModal.delete")}
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
              {t("lostPetVideoModal.uploadButton")}
            </button>
          </div>
        )}
        {newVideos.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold">
              {t("lostPetVideoModal.newVideos")}
            </h4>
            <ul>
              {newVideos.map((video, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{video.name}</span>
                  <button
                    onClick={() => handleRemoveNewVideo(index)}
                    className="text-red-500"
                  >
                    {t("lostPetVideoModal.remove")}
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

export default LostPetVideosModal;
