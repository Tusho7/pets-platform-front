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
import Swal from "sweetalert2";
import {
  deleteStreetPetByUserId,
  getStreetPetsByUserId,
} from "../services/street_pet";
import StreetPetEdit from "../modals/StreetPetEdit";
import StreetPetImages from "../modals/StreetPetImages";
import StreetPetVideos from "../modals/StreetPetVideos";
import { StreetPet } from "../types/StreetPetProps";

const Profile = () => {
  const { user } = useUser();
  const userId = user?.id;
  const { t } = useTranslation();
  const [lostPets, setLostPets] = useState<LostPet[]>([]);
  const [streetPets, setStreetPets] = useState<StreetPet[]>([]);
  const [showLostPets, setShowLostPets] = useState<boolean>(true);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [streetEditModalOpen, setStreetEditModalOpen] =
    useState<boolean>(false);
  const [currentPet, setCurrentPet] = useState<LostPet | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [streetImageModalOpen, setStreetImageModalOpen] =
    useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [streetVideoModalOpen, setStreetVideoModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUserLostPets = async () => {
      try {
        const data = await getLostPetsByUserId(userId.toString());
        setLostPets(data);
      } catch (error) {
        console.error("Error fetching lost pets:", error);
      }
    };

    const fetchStreetPets = async () => {
      try {
        const data = await getStreetPetsByUserId(userId.toString());
        setStreetPets(data);
      } catch (error) {
        console.error("Error fetching street pets:", error);
      }
    };

    fetchUserLostPets();
    fetchStreetPets();
  }, [userId]);

  const handleEdit = (pet: LostPet) => {
    setCurrentPet(pet);
    if (showLostPets) {
      setEditModalOpen(true);
    } else {
      setStreetEditModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setStreetEditModalOpen(false);
    setCurrentPet(null);
  };

  const handleViewMoreImages = (pet: LostPet) => {
    setCurrentPet(pet);
    if (showLostPets) {
      setImageModalOpen(true);
    } else {
      setStreetImageModalOpen(true);
    }
  };

  const handleViewMoreVideos = (pet: LostPet) => {
    setCurrentPet(pet);
    if (showLostPets) {
      setVideoModalOpen(true);
    } else {
      setStreetVideoModalOpen(true);
    }
  };

  const handlePetUpdate = (updatedPet: LostPet | StreetPet) => {
    if (showLostPets) {
      setLostPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === updatedPet.id ? { ...pet, ...updatedPet } : pet
        )
      );
    } else {
      setStreetPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === updatedPet.id ? { ...pet, ...updatedPet } : pet
        )
      );
    }
  };

  const handleDelete = async (petId: number) => {
    Swal.fire({
      title: t("lostPetPage.confirmDeleteTitle"),
      text: t("lostPetPage.confirmDeleteText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("lostPetPage.confirmDeleteButton"),
      cancelButtonText: t("lostPetPage.cancelDeleteButton"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (userId) {
            if (showLostPets) {
              await deleteLostPetByUserId(userId.toString(), petId.toString());
            } else {
              await deleteStreetPetByUserId(
                userId.toString(),
                petId.toString()
              );
            }
          }
          setLostPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
          setStreetPets((prevPets) =>
            prevPets.filter((pet) => pet.id !== petId)
          );
          Swal.fire(
            t("lostPetPage.deleted"),
            t("lostPetPage.deleteSuccessMessage"),
            "success"
          );
        } catch (error) {
          console.error("Error deleting pet:", error);
          Swal.fire(
            t("lostPetPage.error"),
            t("lostPetPage.deleteErrorMessage"),
            "error"
          );
        }
      }
    });
  };

  const handleImageUpdate = (updatedImages: string[]) => {
    if (showLostPets) {
      setLostPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === currentPet?.id ? { ...pet, images: updatedImages } : pet
        )
      );
    } else {
      setStreetPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === currentPet?.id ? { ...pet, images: updatedImages } : pet
        )
      );
    }
  };

  const handleVideoUpdate = (updatedVideos: string[]) => {
    if (showLostPets) {
      setLostPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === currentPet?.id ? { ...pet, videos: updatedVideos } : pet
        )
      );
    } else {
      setStreetPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === currentPet?.id ? { ...pet, videos: updatedVideos } : pet
        )
      );
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main className="py-4 min-h-screen max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-bold mb-4 ">{t("profile.profile")}</h1>

        <div className="mb-4">
          <button
            onClick={() => setShowLostPets(true)}
            className={`py-2 px-4 rounded ${
              showLostPets ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            {t("lostPetPage.title")}
          </button>
          <button
            onClick={() => setShowLostPets(false)}
            className={`py-2 px-4 rounded ${
              !showLostPets ? "bg-blue-500" : "bg-gray-300"
            } ml-2`}
          >
            {t("streetPetPage.title")}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {(showLostPets ? lostPets : streetPets).length > 0 ? (
            (showLostPets ? lostPets : streetPets).map(
              (pet: StreetPet | LostPet) => (
                <div
                  key={pet.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
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
                      <strong>{t("lostPetPage.location")}</strong>{" "}
                      {pet.location}
                    </p>
                    <p className="text-gray-700">
                      <strong>{t("streetPetPage.aggressive")}</strong>{" "}
                      {pet.aggresive
                        ? t("streetPetPage.isAggressive")
                        : t("streetPetPage.notAggressive")}
                    </p>
                    {"account_number" in pet && !showLostPets && (
                      <p className="text-gray-700">
                        <strong>{t("streetPetPage.accountNumbers")}</strong>{" "}
                        GE5872384TB321789
                      </p>
                    )}

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
                      <div className="mb-4 flex flex-col gap-3 items-start justify-start">
                        <img
                          src={import.meta.env.VITE_API_STORAGE + pet.images[0]}
                          alt={t("lostPetModal.fields.images")}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer"
                          onClick={() => handleViewMoreImages(pet)}
                        />
                        <button
                          className="text-blue-500 mt-2"
                          onClick={() => handleViewMoreImages(pet)}
                        >
                          {t("lostPetPage.viewMoreImages")}
                        </button>
                      </div>
                    ) : null}

                    {pet.videos && pet.videos.length > 0 && (
                      <div className="flex flex-col gap-3 items-start justify-start">
                        <video
                          src={import.meta.env.VITE_API_STORAGE + pet.videos[0]}
                          controls
                          className="w-full h-32 object-cover rounded-lg"
                          style={{ height: "150px" }}
                          onClick={() => handleViewMoreVideos(pet)}
                        />

                        <button
                          className="text-blue-500 mt-2"
                          onClick={() => handleViewMoreVideos(pet)}
                        >
                          {t("lostPetPage.viewMoreVideos")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-start text-gray-500">
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

        {streetEditModalOpen && currentPet && (
          <StreetPetEdit
            pet={currentPet as StreetPet}
            onClose={handleCloseModal}
            onUpdate={handlePetUpdate}
          />
        )}

        {imageModalOpen && currentPet && (
          <LostPetImageModal
            isOpen={imageModalOpen}
            onUpdate={handleImageUpdate}
            images={currentPet.images || []}
            onClose={() => setImageModalOpen(false)}
            fromProfile={true}
            petId={currentPet.id}
          />
        )}

        {streetImageModalOpen && currentPet && (
          <StreetPetImages
            isOpen={streetImageModalOpen}
            onUpdate={handleImageUpdate}
            images={currentPet.images || []}
            onClose={() => setStreetImageModalOpen(false)}
            fromProfile={true}
            petId={currentPet.id}
          />
        )}

        {videoModalOpen && currentPet && (
          <LostPetVideosModal
            isOpen={videoModalOpen}
            videos={currentPet.videos || []}
            onUpdate={handleVideoUpdate}
            petId={currentPet.id}
            onClose={() => setVideoModalOpen(false)}
            fromProfile={true}
          />
        )}

        {streetVideoModalOpen && currentPet && (
          <StreetPetVideos
            isOpen={streetVideoModalOpen}
            videos={currentPet.videos || []}
            onUpdate={handleVideoUpdate}
            petId={currentPet.id}
            onClose={() => setStreetVideoModalOpen(false)}
            fromProfile={true}
          />
        )}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
