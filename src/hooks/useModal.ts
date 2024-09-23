import { useState } from "react";

const useModal = () => {
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

  return {
    isLoginModalOpen,
    isRegistrationModalOpen,
    openLoginModal,
    closeLoginModal,
    openRegistrationModal,
    closeRegistrationModal,
  };
};

export default useModal;
