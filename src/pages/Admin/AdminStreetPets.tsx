import { useState, useEffect } from "react";
import { getStreetPets } from "../../services/street_pet";
import { StreetPet } from "../../types/StreetPetProps";
import Header from "./components/Header";
import StreetPetMedia from "./modals/StreetPetMedia";
import { useTranslation } from "react-i18next";

const AdminStreetPets = () => {
  const { t } = useTranslation();
  const [streetPets, setStreetPets] = useState<StreetPet[]>([]);
  const [selectedPet, setSelectedPet] = useState<StreetPet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (pet: StreetPet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="py-4 min-h-screen max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{t("streetPetMediaAdmin.title")}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-2 border-r">{t("streetPetMediaAdmin.id")}</th>
                <th className="text-left p-2 border-r">{t("streetPetMediaAdmin.pet_name")}</th>
                <th className="text-left p-2 border-r">{t("streetPetMediaAdmin.age")}</th>
                <th className="text-left p-2 border-r">{t("streetPetMediaAdmin.breed")}</th>
                <th className="text-left p-2 border-r">{t("streetPetMediaAdmin.description")}</th>
                <th className="text-left p-2">{t("streetPetMediaAdmin.location")}</th>
                <th className="text-left p-2">{t("streetPetMediaAdmin.media")}</th>
              </tr>
            </thead>
            <tbody>
              {streetPets.length > 0 ? (
                streetPets.map((pet) => (
                  <tr key={pet.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 border-r">{pet.id}</td>
                    <td className="p-2 border-r">{pet.pet_name}</td>
                    <td className="p-2 border-r">{pet.age}</td>
                    <td className="p-2 border-r">{pet.breed}</td>
                    <td className="p-2 border-r">{pet.description}</td>
                    <td className="p-2">{pet.location}</td>
                    <td className="p-2">
                      <button
                        onClick={() => openModal(pet)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        {t("streetPetMediaAdmin.viewMedia")}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    {t("streetPetMediaAdmin.noStreetPetFound")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedPet && (
        <StreetPetMedia selectedPet={selectedPet} closeModal={closeModal} />
      )}
    </main>
  );
};

export default AdminStreetPets;
