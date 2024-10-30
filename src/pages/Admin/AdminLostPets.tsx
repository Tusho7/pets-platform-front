import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Header from "./components/Header";
import { useTranslation } from "react-i18next";
import { FaEye, FaTrash } from "react-icons/fa";
import { LostPet } from "../../types/LostPetProps";
import { getLostPets } from "../../services/lost_pet";
import { deleteLostPetById } from "../../services/admin/lost_pets";
import LostPetMedia from "./modals/LostPetMedia";

const AdminLostPets = () => {
  const { t } = useTranslation();
  const [lostPets, setLostPets] = useState<LostPet[]>([]);
  const [selectedPet, setSelectedPet] = useState<LostPet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPetId, setExpandedPetId] = useState<number | null>(null);

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

  const openModal = (pet: LostPet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (petId: number) => {
    const { isConfirmed } = await Swal.fire({
      title: t("lostPetMediaAdmin.confirmDeleteTitle"),
      text: t("lostPetMediaAdmin.confirmDeleteText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("lostPetMediaAdmin.confirm"),
      cancelButtonText: t("lostPetMediaAdmin.cancel"),
    });

    if (isConfirmed) {
      try {
        await deleteLostPetById(petId);
        setLostPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
        Swal.fire(
          t("lostPetMediaAdmin.deleted"),
          t("lostPetMediaAdmin.deleteSuccessText"),
          "success"
        );
      } catch (error) {
        console.error("Error deleting lost pet:", error);
        Swal.fire(
          t("lostPetMediaAdmin.error"),
          t("lostPetMediaAdmin.deleteErrorText"),
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
            {t("lostPetMediaAdmin.title")}
          </h2>
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-200 text-gray-700 sticky top-0">
                <tr>
                  {["id", "pet_name", "age", "breed", "description", "location", "media", "actions"].map((header, index) => (
                    <th key={index} className="p-4 border-b text-left text-sm font-medium">
                      {t(`lostPetMediaAdmin.${header}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lostPets.length > 0 ? (
                  lostPets.map((pet, index) => (
                    <tr
                      key={pet.id}
                      className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="p-4">{pet.id}</td>
                      <td className="p-4">{pet.pet_name}</td>
                      <td className="p-4">{pet.age}</td>
                      <td className="p-4">{pet.breed}</td>
                      <td className="p-4">
                        <div className="relative">
                          <p className={`overflow-hidden transition-all duration-300 ${expandedPetId === pet.id ? "max-h-none" : "max-h-12"}`}>
                            {pet.description}
                          </p>
                          <button
                            onClick={() => toggleExpand(pet.id)}
                            className="text-blue-500 hover:underline mt-1"
                          >
                            {expandedPetId === pet.id ? t("lostPetMediaAdmin.readLess") : t("lostPetMediaAdmin.readMore")}
                          </button>
                        </div>
                      </td>
                      <td className="p-4">{pet.location}</td>
                      <td className="p-4">
                        <button
                          onClick={() => openModal(pet)}
                          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          <FaEye className="inline-block mr-1" /> {t("lostPetMediaAdmin.viewMedia")}
                        </button>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(pet.id)}
                          className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          <FaTrash className="inline-block mr-1" /> {t("lostPetMediaAdmin.delete")}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      {t("lostPetMediaAdmin.noLostPetFound")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && selectedPet && (
        <LostPetMedia selectedPet={selectedPet} closeModal={closeModal} />
      )}
    </main>
  );
};

export default AdminLostPets;
