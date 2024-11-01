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
  const [filteredPets, setFilteredPets] = useState<StreetPet[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [currentPet, setCurrentPet] = useState<StreetPet | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

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
        setFilteredPets(data);
      } catch (error) {
        console.error("Error fetching street pets:", error);
      }
    };

    fetchStreetPets();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setSelectedStatus(status);

    if (status === "") {
      setFilteredPets(streetPets);
    } else {
      setFilteredPets(streetPets.filter((pet) => pet.status === status));
    }
  };

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
      setFilteredPets(data);
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
            <div>
              <button
                onClick={() => setStreetPetModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                {t("streetPetPage.addStreetPetButton")}
              </button>

              <select
                value={selectedStatus}
                onChange={handleFilterChange}
                className="ml-4 p-2 border rounded"
              >
                <option value="">{t("streetPetPage.selectStatus")}</option>
                <option value="help">{t("streetPetPage.help")}</option>
                <option value="giveaway">{t("streetPetPage.giveaway")}</option>
              </select>
            </div>
          </div>

          {streetPetModalOpen && (
            <Streetpet onClose={closeModal} onUpdate={handleUpdateLostPets} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white rounded-lg overflow-hidden  shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
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
                        <strong>{t("streetPetPage.status")}</strong>{" "}
                        {pet.status === "help"
                          ? t("streetPetPage.help")
                          : t("streetPetPage.giveaway")}
                      </p>
                      <p className="text-gray-700">
                        <strong>{t("streetPetPage.accountNumbers")}</strong>{" "}
                        GE5872384TB321789
                      </p>
                    </section>

                    <div className="mt-4 border-t border-gray-200 pt-2">
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
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>{t("streetPetPage.noPetsFound")}</p>
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

      <Footer />
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
    </main>
  );
};

export default StreetPets;
