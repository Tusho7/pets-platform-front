import React, { useEffect, useState } from "react";
import {
  getLostPetsByUserId,
  deleteLostPetByUserId,
} from "../services/lost_pet";
import { useTranslation } from "react-i18next";
import { LostPet } from "../types/LostPetProps";
import LostPetEditModal from "../modals/LostPetEdit";
import { useUser } from "../contexts/UseUser";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LostPetImageModal from "../modals/LostPetImages";
import LostPetVideosModal from "../modals/LostPetVideos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user } = useUser();
  const userId = user?.id;
  const { t } = useTranslation();
  const [lostPets, setLostPets] = useState<LostPet[]>([]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [currentPet, setCurrentPet] = useState<LostPet | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) return;
    const fetchUserLostPets = async () => {
      try {
        const data = await getLostPetsByUserId(userId.toString());
        setLostPets(data);
      } catch (error) {
        console.error("Error fetching user lost pets:", error);
      }
    };

    fetchUserLostPets();
  }, [userId]);

  const handleEdit = (pet: LostPet) => {
    setCurrentPet(pet);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setCurrentPet(null);
  };

  const handleViewMoreImages = (pet: LostPet) => {
    setCurrentPet(pet);
    setImageModalOpen(true);
  };

  const handleViewMoreVideos = (pet: LostPet) => {
    setCurrentPet(pet);
    setVideoModalOpen(true);
  };

  const handlePetUpdate = (updatedPet: LostPet) => {
    setLostPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === updatedPet.id ? { ...pet, ...updatedPet } : pet
      )
    );
  };

  const handleDelete = async (petId: number) => {
    try {
      if (userId) {
        await deleteLostPetByUserId(userId.toString(), petId.toString());
      }
      setLostPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.error("Error deleting lost pet:", error);
    }
  };

  const handleImageUpdate = (updatedImages: string[]) => {
    setLostPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === currentPet?.id ? { ...pet, images: updatedImages } : pet
      )
    );
  };

  return (
    <React.Fragment>
      <Header />
      <main className="p-4 min-h-screen  ">
        <h1 className="text-2xl font-bold mb-4 max-w-[1200px] mx-auto">
          {t("profile.profile")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {lostPets.length > 0 ? (
            lostPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden "
              >
                <div className="p-4">
                  <h3 className="text-gray-700">
                    <strong>{t("lostPetPage.name")}</strong> {pet.pet_name}
                  </h3>
                  <p className="text-gray-700">
                    <strong>{t("lostPetPage.breed")}</strong> {pet.breed}
                  </p>
                  <p className="text-gray-700">
                    <strong>{t("lostPetPage.age")}</strong> {pet.age}
                  </p>
                  <p className="text-gray-700">
                    <strong>{t("lostPetPage.gender")}</strong>{" "}
                    {pet.gender === "male"
                      ? t("lostPetPage.male")
                      : t("lostPetPage.female")}
                  </p>
                  <p className="text-gray-700">
                    <strong>{t("lostPetPage.description")}</strong>{" "}
                    {pet.description}
                  </p>
                  <p className="text-gray-700">
                    <strong>{t("lostPetPage.location")}</strong> {pet.location}
                  </p>

                  <button
                    onClick={() => handleEdit(pet)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    {t("lostPetPage.editButton")}
                  </button>

                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="text-red-500 ml-4"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />{" "}
                    {t("lostPetPage.deleteButton")}
                  </button>
                </div>
                <div className="p-4">
                  {pet.images && pet.images.length > 0 ? (
                    <div className="mb-4">
                      <img
                        src={import.meta.env.VITE_API_STORAGE + pet.images[0]}
                        alt={t("lostPetModal.fields.images")}
                        className="w-full h-32 object-cover rounded-lg cursor-pointer"
                        onClick={() => handleViewMoreImages(pet)}
                      />
                      {pet.images.length > 1 && (
                        <button
                          className="text-blue-500 mt-2"
                          onClick={() => handleViewMoreImages(pet)}
                        >
                          {t("lostPetPage.viewMoreImages")}
                        </button>
                      )}
                    </div>
                  ) : null}

                  {pet.videos && pet.videos.length > 0 ? (
                    <div>
                      <video
                        src={import.meta.env.VITE_API_STORAGE + pet.videos[0]}
                        controls
                        className="w-full h-32 object-cover rounded-lg"
                        style={{ height: "150px" }}
                      />
                      {pet.videos.length > 1 && (
                        <button
                          className="text-blue-500 mt-2"
                          onClick={() => handleViewMoreVideos(pet)}
                        >
                          {t("lostPetPage.viewMoreVideos")}
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              {t("lostPetPage.noLostPetsFound")}
            </p>
          )}
        </div>

        {editModalOpen && currentPet && (
          <LostPetEditModal
            pet={currentPet}
            onClose={handleCloseModal}
            onUpdate={handlePetUpdate}
          />
        )}

        {imageModalOpen &&
          currentPet &&
          currentPet.images &&
          currentPet.images.length > 0 && (
            <LostPetImageModal
              isOpen={imageModalOpen}
              onUpdate={handleImageUpdate}
              images={currentPet.images}
              onClose={() => setImageModalOpen(false)}
              fromProfile={true}
              petId={currentPet.id}
            />
          )}

        {videoModalOpen &&
          currentPet &&
          currentPet.videos &&
          currentPet.videos.length > 0 && (
            <LostPetVideosModal
              isOpen={videoModalOpen}
              videos={currentPet.videos}
              onClose={() => setVideoModalOpen(false)}
              fromProfile={true}
            />
          )}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
