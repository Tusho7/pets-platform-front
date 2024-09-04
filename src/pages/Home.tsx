import { useState } from "react";
import Login from "../modals/Login";
import Registration from "../modals/Registration";

const Home = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white relative">
      <header className="absolute top-0 left-0 w-full p-6 bg-transparent flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide">Pets Platform</h1>
        <div>
          <button
            onClick={openLoginModal}
            className="mx-2 bg-white text-indigo-600 py-2 px-6 rounded-full shadow-lg hover:bg-indigo-100 transition-all duration-300"
          >
            Login
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-semibold mb-4 animate-fade-in">
          Welcome to the Pets Platform
        </h2>
        <p className="text-lg max-w-md mx-auto mb-6">
          Your ultimate destination to connect with pet lovers and find the
          perfect companion.
        </p>
        <div className="flex space-x-4 mt-6">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            onClick={() => {}}
          >
            Lost Pets
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            onClick={() => {}}
          >
            Street Pets
          </button>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 w-full p-6 bg-transparent text-center">
        <p className="text-sm opacity-75">
          &copy; 2024 Pets Platform. All rights reserved.
        </p>
      </footer>

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
