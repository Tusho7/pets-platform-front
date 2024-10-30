import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getStreetPets } from "../../services/street_pet";
import { StreetPet } from "../../types/StreetPetProps";
import Header from "./components/Header";
import StreetPetMedia from "./modals/StreetPetMedia";
import { useTranslation } from "react-i18next";
import { deleteStreetPetById } from "../../services/admin/street_pets";
import { FaEye, FaTrash } from "react-icons/fa";

const AdminStreetPets = () => {
  const { t } = useTranslation();
  const [streetPets, setStreetPets] = useState<StreetPet[]>([]);
  const [selectedPet, setSelectedPet] = useState<StreetPet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPetId, setExpandedPetId] = useState<number | null>(null);

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

  const handleDelete = async (petId: number) => {
    const { isConfirmed } = await Swal.fire({
      title: t("streetPetMediaAdmin.confirmDeleteTitle"),
      text: t("streetPetMediaAdmin.confirmDeleteText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("streetPetMediaAdmin.confirm"),
      cancelButtonText: t("streetPetMediaAdmin.cancel"),
    });

    if (isConfirmed) {
      try {
        await deleteStreetPetById(petId);
        setStreetPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
        Swal.fire(
          t("streetPetMediaAdmin.deleted"),
          t("streetPetMediaAdmin.deleteSuccessText"),
          "success"
        );
      } catch (error) {
        console.error("Error deleting street pet:", error);
        Swal.fire(
          t("streetPetMediaAdmin.error"),
          t("streetPetMediaAdmin.deleteErrorText"),
          "error"
        );
      }
    }
  };

  const toggleExpand = (petId: number) => {
    setExpandedPetId(expandedPetId === petId ? null : petId);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <div className="py-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
            {t("streetPetMediaAdmin.title")}
          </h2>
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-200 text-gray-700 sticky top-0">
                <tr>
                  {["id", "pet_name", "age", "breed", "description", "location", "media", "actions"].map((header, index) => (
                    <th key={index} className="p-4 border-b text-left text-sm font-medium">
                      {t(`streetPetMediaAdmin.${header}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {streetPets.length > 0 ? (
                  streetPets.map((pet, index) => (
                    <tr
                      key={pet.id}
                      className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="p-4">{pet.id}</td>
                      <td className="p-4">{pet.pet_name}</td>
                      <td className="p-4">{pet.age}</td>
                      <td className="p-4">{pet.breed}</td>
                      <td className="p-4 max-w-[500px]">
                        <div className="relative">
                          <p className={`overflow-hidden transition-all duration-300 ${expandedPetId === pet.id ? "max-h-none" : "max-h-12"}`}>
                            {pet.description}
                          </p>
                          <button
                            onClick={() => toggleExpand(pet.id)}
                            className="text-blue-500 hover:underline mt-1"
                          >
                            {expandedPetId === pet.id ? t("streetPetMediaAdmin.readLess") : t("streetPetMediaAdmin.readMore")}
                          </button>
                        </div>
                      </td>
                      <td className="p-4">{pet.location}</td>
                      <td className="p-4">
                        <button
                          onClick={() => openModal(pet)}
                          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          <FaEye className="inline-block mr-1" /> {t("streetPetMediaAdmin.viewMedia")}
                        </button>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(pet.id)}
                          className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          <FaTrash className="inline-block mr-1" /> {t("streetPetMediaAdmin.delete")}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      {t("streetPetMediaAdmin.noStreetPetFound")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && selectedPet && (
        <StreetPetMedia selectedPet={selectedPet} closeModal={closeModal} />
      )}
    </main>
  );
};

export default AdminStreetPets;
