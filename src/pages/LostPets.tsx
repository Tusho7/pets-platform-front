import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Lostpet from "../modals/Lostpet";
import { getLostPets } from "../services/lost_pet";
import LostPetImageModal from "../modals/LostPetImages";
import LostPetVideosModal from "../modals/LostPetVideos";
import { LostPet } from "../types/LostPetProps";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useModal from "../hooks/useModal";
import Login from "../modals/Login";
import Registration from "../modals/Registration";

const LostPets: React.FC = () => {
  const { t } = useTranslation();
  const [lostPetModalOpen, setLostPetModalOpen] = useState<boolean>(false);
  const [lostPets, setLostPets] = useState<LostPet[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [currentPet, setCurrentPet] = useState<LostPet | null>(null);

  const {
    openLoginModal,
    isLoginModalOpen,
    closeLoginModal,
    openRegistrationModal,
    closeRegistrationModal,
    isRegistrationModalOpen,
  } = useModal();

  useEffect(() => {
    const fetchLostPets = async () => {
      try {
        const data = await getLostPets();
        setLostPets(data);
      } catch (error) {
        console.error("Error fetching lost pets:", error);
      }
    };

    fetchLostPets();
  }, []);

  const handleViewMoreImages = (pet: LostPet) => {
    setCurrentPet(pet);
    setImageModalOpen(true);
  };

  const handleViewMoreVideos = (pet: LostPet) => {
    setCurrentPet(pet);
    setVideoModalOpen(true);
  };

  const closeModal = () => {
    setImageModalOpen(false);
    setVideoModalOpen(false);
    setCurrentPet(null);
    setLostPetModalOpen(false);
  };

  const handleUpdateLostPets = async () => {
    try {
      const data = await getLostPets();
      setLostPets(data);
    } catch (error) {
      console.error("Error updating lost pets:", error);
    }
  };

  return (
    <main>
      <Header openLoginModal={openLoginModal} />

      <main className="p-4 pt-10 min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{t("lostPetPage.title")}</h1>
            <button
              onClick={() => setLostPetModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              {t("lostPetPage.addLostPetButton")}
            </button>
          </div>

          {lostPetModalOpen && (
            <Lostpet onClose={closeModal} onUpdate={handleUpdateLostPets} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lostPets.length > 0 ? (
              lostPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
                >
                  {Array.isArray(pet.images) && pet.images.length > 0 && (
                    <div
                      className="relative hover:cursor-pointer"
                      onClick={() => handleViewMoreImages(pet)}
                    >
                      <img
                        src={import.meta.env.VITE_API_STORAGE + pet.images[0]}
                        alt={t("lostPetModal.fields.images")}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black opacity-30"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-lg font-semibold">
                          {pet.pet_name}
                        </h3>
                      </div>
                    </div>
                  )}

                  {Array.isArray(pet.videos) && pet.videos.length > 0 && (
                    <div className="p-4">
                      <button
                        onClick={() => handleViewMoreVideos(pet)}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      >
                        {t("streetPetPage.viewMoreVideos")}
                      </button>
                    </div>
                  )}

                  <div className="p-4">
                    <section className="h-auto overflow-y-auto">
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
                        {pet.description ||
                          t("lostPetModal.errors.descriptionRequired")}
                      </p>
                      <p className="text-gray-700">
                        <strong>{t("lostPetPage.location")}</strong>{" "}
                        {pet.location}
                      </p>
                      <p className="text-gray-700">
                        <strong>{t("lostPetPage.aggressive")}</strong>{" "}
                        {pet.aggresive
                          ? t("lostPetPage.isAggressive")
                          : t("lostPetPage.notAggressive")}
                      </p>
                      <p className="text-gray-700">
                        <strong>{t("lostPetPage.status")}</strong>{" "}
                        {pet.status === "lost"
                          ? t("lostPetPage.lost")
                          : t("lostPetPage.found")}
                      </p>
                    </section>

                    <div className="mt-4 border-t border-gray-200 pt-2">
                      <h4 className="text-gray-800 font-semibold">
                        {t("lostPetPage.userInfo.userInfo")}
                      </h4>
                      <p className="text-gray-600">
                        <strong>{t("lostPetPage.userInfo.phoneNumber")}</strong>{" "}
                        {pet?.User?.phoneNumber}
                      </p>
                      <p className="text-gray-600">
                        <strong>{t("lostPetPage.userInfo.firstName")}</strong>{" "}
                        {pet?.User?.firstName}
                      </p>
                      <p className="text-gray-600">
                        <strong>{t("lostPetPage.userInfo.lastName")}</strong>{" "}
                        {pet?.User?.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-start text-gray-500">
                {t("lostPetPage.noLostPetsFound")}
              </p>
            )}
          </div>

          <LostPetImageModal
            isOpen={imageModalOpen}
            images={currentPet?.images || []}
            onClose={closeModal}
          />

          <LostPetVideosModal
            isOpen={videoModalOpen}
            videos={currentPet?.videos || []}
            onClose={closeModal}
          />
        </div>
      </main>

      {isLoginModalOpen && (
        <Login
          onOpenRegistration={openRegistrationModal}
          onClose={closeLoginModal}
        />
      )}

      {isRegistrationModalOpen && (
        <Registration
          onClose={closeRegistrationModal}
          openLogin={openLoginModal}
        />
      )}

      <Footer />
    </main>
  );
};

export default LostPets;
