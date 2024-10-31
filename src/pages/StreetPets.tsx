import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LostPetImageModal from "../modals/LostPetImages";
import LostPetVideosModal from "../modals/LostPetVideos";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useModal from "../hooks/useModal";
import Login from "../modals/Login";
import Registration from "../modals/Registration";
import { getStreetPets } from "../services/street_pet";
import Streetpet from "../modals/Streetpet";
import { StreetPet } from "../types/StreetPetProps";

const StreetPets: React.FC = () => {
  const { t } = useTranslation();
  const [streetPetModalOpen, setStreetPetModalOpen] = useState<boolean>(false);
  const [streetPets, setStreetPets] = useState<StreetPet[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [currentPet, setCurrentPet] = useState<StreetPet | null>(null);

  const {
    openLoginModal,
    isLoginModalOpen,
    closeLoginModal,
    openRegistrationModal,
    closeRegistrationModal,
    isRegistrationModalOpen,
  } = useModal();

  useEffect(() => {
    const fetchStreetPets = async () => {
      try {
        const data = await getStreetPets();
        setStreetPets(data);
      } catch (error) {
        console.error("Error fetching street pets:", error);
      }
    };

    fetchStreetPets();
  }, []);

  const handleViewMoreImages = (pet: StreetPet) => {
    setCurrentPet(pet);
    setImageModalOpen(true);
  };

  const handleViewMoreVideos = (pet: StreetPet) => {
    setCurrentPet(pet);
    setVideoModalOpen(true);
  };

  const closeModal = () => {
    setImageModalOpen(false);
    setVideoModalOpen(false);
    setCurrentPet(null);
    setStreetPetModalOpen(false);
  };

  const handleUpdateLostPets = async () => {
    try {
      const data = await getStreetPets();
      setStreetPets(data);
    } catch (error) {
      console.error("Error updating street pets:", error);
    }
  };

  return (
    <main>
      <Header openLoginModal={openLoginModal} />

      <main className="p-4 pt-10 min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{t("streetPetPage.title")}</h1>
            <button
              onClick={() => setStreetPetModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              {t("streetPetPage.addStreetPetButton")}
            </button>
          </div>

          {streetPetModalOpen && (
            <Streetpet onClose={closeModal} onUpdate={handleUpdateLostPets} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {streetPets.length > 0 ? (
              streetPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <section className="h-[340px]">
                    <h3 className="text-gray-700">
                      <strong>{t("streetPetPage.name")}</strong> {pet.pet_name}
                    </h3>
                    <p className="text-gray-700">
                      <strong>{t("streetPetPage.breed")}</strong> {pet.breed}
                    </p>
                    <p className="text-gray-700">
                      <strong>{t("streetPetPage.age")}</strong> {pet.age}
                    </p>
                    <p className="text-gray-700">
                      <strong>{t("streetPetPage.gender")}</strong>{" "}
                      {pet.gender === "male"
                        ? t("streetPetPage.male")
                        : t("streetPetPage.female")}
                    </p>
                    <p className="text-gray-700">
                      <strong>{t("streetPetPage.description")}</strong>{" "}
                      {pet.description ||
                        t("lostPetModal.errors.descriptionRequired")}
                    </p>

                    <p className="text-gray-700">
                      <strong>{t("streetPetPage.location")}</strong>{" "}
                      {pet.location}
                    </p>
                    <p className="text-gray-700">
                      <strong>{t("streetPetPage.aggressive")}</strong>{" "}
                      {pet.aggresive
                        ? t("streetPetPage.isAggressive")
                        : t("streetPetPage.notAggressive")}
                    </p>
                    <p className="text-gray-700">
                      <strong>{t("streetPetPage.status")}</strong>{" "}
                      {pet.status === "help" ? t("streetPetPage.help") : t("streetPetPage.giveaway")}
                    </p>
                    <p className="text-gray-700">
                      <strong>{t("streetPetPage.accountNumbers")}</strong>{" "}
                      GE5872384TB321789
                    </p>
                    </section>
                   

                    <div className="mt-4 border-t border-gray-200 pt-4 h-[200px]">
                      <h4 className="text-gray-800 font-semibold">
                        {t("streetPetPage.userInfo.userInfo")}
                      </h4>
                      <p className="text-gray-600">
                        <strong>
                          {t("streetPetPage.userInfo.phoneNumber")}
                        </strong>{" "}
                        {pet?.User?.phoneNumber}
                      </p>
                      <p className="text-gray-600">
                        <strong>{t("streetPetPage.userInfo.firstName")}</strong>{" "}
                        {pet?.User?.firstName}
                      </p>
                      <p className="text-gray-600">
                        <strong>{t("streetPetPage.userInfo.lastName")}</strong>{" "}
                        {pet?.User?.lastName}
                      </p>

                      {pet.account_number && pet.account_number.length > 0 && (
                        <div className="text-gray-600">
                          <strong>
                            {t("streetPetPage.userInfo.accountNumbers")}
                          </strong>
                          <ul className="list-disc pl-5 mt-2">
                            {pet.account_number.map((account, index) => (
                              <li key={index} className="mt-1">
                                {account}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    {Array.isArray(pet.images) && pet.images.length > 0 && (
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
                          {t("streetPetPage.viewMoreImages")}
                        </button>
                      </div>
                    )}

                    {Array.isArray(pet.videos) && pet.videos.length > 0 && (
                      <div className="flex flex-col gap-3 items-start justify-start">
                        <video
                          src={import.meta.env.VITE_API_STORAGE + pet.videos[0]}
                          controls
                          className="w-full h-32 object-cover rounded-lg"
                          style={{ height: "150px" }}
                        />
                        <button
                          className="text-blue-500 mt-2"
                          onClick={() => handleViewMoreVideos(pet)}
                        >
                          {t("streetPetPage.viewMoreVideos")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-start text-gray-500">
                {t("streetPetPage.noLostPetsFound")}
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

export default StreetPets;
