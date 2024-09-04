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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative">
      <header className="bg-indigo-600 text-white p-4 w-full text-center">
        <h1 className="text-2xl font-bold">Pets Platform</h1>
        <button
          onClick={openLoginModal}
          className="mt-4 bg-white text-indigo-600 py-2 px-4 rounded-md hover:bg-gray-200"
        >
          Login
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <h2 className="text-xl font-semibold">Welcome to the Pets Platform</h2>
      </main>

      <footer className="bg-gray-800 text-white p-4 w-full text-center">
        <p>&copy; 2024 Pets Platform. All rights reserved.</p>
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
