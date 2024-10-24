import { StreetPetMediaProps } from "../../../types/Admin/MediaProps";
import { useTranslation } from "react-i18next";

const StreetPetMedia: React.FC<StreetPetMediaProps> = ({
  selectedPet,
  closeModal,
}) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          {t("streetPetMedia.mediaTitle", { petName: selectedPet.pet_name })}
        </h2>

        {selectedPet?.images && selectedPet.images.length > 0 ? (
          <div className="mb-4">
            <h3 className="font-medium mb-2">
              {t("streetPetMedia.imagesTitle")}
            </h3>
            <div className="overflow-x-auto flex space-x-2 max-h-48">
              {selectedPet.images.slice(0, 3).map((image: string, index: number) => (
                <img
                  key={index}
                  src={import.meta.env.VITE_API_STORAGE + image}
                  alt={`Pet Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
              {selectedPet.images.length > 3 && (
                <button className="px-2 py-1 bg-blue-500 text-white rounded">
                  {t("streetPetMedia.showMore")}
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>{t("streetPetMedia.noImages")}</p>
        )}

        {selectedPet?.videos && selectedPet.videos.length > 0 ? (
          <div className="mb-4">
            <h3 className="font-medium mb-2">
              {t("streetPetMedia.videosTitle")}
            </h3>
            <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto">
              {selectedPet.videos.slice(0, 2).map((video: string, index: number) => (
                <video key={index} controls className="w-full rounded">
                  <source
                    src={import.meta.env.VITE_API_STORAGE + video}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
        ) : (
          <p>{t("streetPetMedia.noVideos")}</p>
        )}

        <div className="text-right">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {t("streetPetMedia.closeButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreetPetMedia;
