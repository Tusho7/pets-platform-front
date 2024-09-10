import { useState } from "react";
import Login from "../modals/Login";
import Registration from "../modals/Registration";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PetBackground from "/pet_background5.jpg";

const Home = () => {
  const { t } = useTranslation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegistrationModalOpen(false);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const openRegistrationModal = () => {
    setIsLoginModalOpen(false);
    setIsRegistrationModalOpen(true);
  };
  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center text-wh  relative  ">
      <Header openLoginModal={openLoginModal} />
      <main
        className="flex-grow flex flex-col items-center justify-start pt-40 text-center p-6 bg-no-repeat w-full bg-center bg-cover min-h-screen"
        style={{
          backgroundImage: `url(${PetBackground})`,
          backgroundPosition: `center`,
        }}
      >
        <div className="flex flex-col justify-center items-center ">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 animate-fade-in">
            {t("home.welcome")}
          </h2>
          <p className="text-lg md:text-xl max-w-md mx-auto mb-6">
            {t("home.description")}
          </p>
          <div className="flex gap-4 mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-3 rounded-full shadow-lg transition-all duration-300"
              onClick={() => {}}
            >
              {t("home.lostPets")}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-3 rounded-full shadow-lg transition-all duration-300"
              onClick={() => {}}
            >
              {t("home.streetPets")}
            </button>
          </div>
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
    </div>
  );
};

export default Home;
