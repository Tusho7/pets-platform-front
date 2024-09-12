import React, { useState } from "react";
import { LostPet, LostPetEditModalProps } from "../types/LostPetProps";
import { useTranslation } from "react-i18next";
import { updateLostPetByUserId } from "../services/lost_pet";
import { useUser } from "../contexts/UseUser";
import Swal from "sweetalert2";
import { containsIncorrectLanguage } from "../utils/languageValidator";

const LostPetEditModal: React.FC<LostPetEditModalProps> = ({
  pet,
  onClose,
  onUpdate,
}) => {
  const { i18n } = useTranslation();
  const { user } = useUser();
  const userId = user?.id;
  const { t } = useTranslation();
  const [petName, setPetName] = useState<string>(pet.pet_name || "");
  const [breed, setBreed] = useState<string>(pet.breed || "");
  const [age, setAge] = useState<number>(pet.age || 0);
  const [gender, setGender] = useState<string>(pet.gender || "");
  const [status, setStatus] = useState<string>(pet.status || "");
  const [description, setDescription] = useState<string>(pet.description || "");
  const [location, setLocation] = useState<string>(pet.location || "");
  const [aggresive, setAggresive] = useState<boolean>(pet.aggresive || false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const language = i18n.language;
    const newErrors: string[] = [];

    if (containsIncorrectLanguage(petName, language)) {
      newErrors.push(t("lostPetPage.errors.incorrectLanguagePetName"));
    }
    if (containsIncorrectLanguage(breed, language)) {
      newErrors.push(t("lostPetPage.errors.incorrectLanguageBreed"));
    }
    if (containsIncorrectLanguage(description, language)) {
      newErrors.push(t("lostPetPage.errors.incorrectLanguageDescription"));
    }
    if (containsIncorrectLanguage(location, language)) {
      newErrors.push(t("lostPetPage.errors.incorrectLanguageLocation"));
    }

    if (newErrors.length > 0) {
      setError(newErrors.join(", "));
      setLoading(false);
      return;
    }

    const updatedPet: LostPet = {
      id: pet.id,
      pet_name: petName,
      breed,
      age,
      gender,
      status,
      description,
      location,
      aggresive,
    };

    try {
      await updateLostPetByUserId(updatedPet, userId!);
      onUpdate(updatedPet);
      Swal.fire({
        title: t("success.title"),
        text: t("success.text"),
        icon: "success",
        confirmButtonText: t("success.button"),
      });
      onClose();
    } catch (err) {
      setError(t("lostPetPage.updateError"));
      Swal.fire({
        title: t("error.title"),
        text: t("error.text"),
        icon: "error",
        confirmButtonText: t("error.button"),
      });
      console.error("Failed to update the pet:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {t("lostPetPage.editButton")}
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium" htmlFor="petName">
                {t("lostPetPage.name")}
              </label>
              <input
                id="petName"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="breed">
                {t("lostPetPage.breed")}
              </label>
              <input
                id="breed"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="age">
                {t("lostPetPage.age")}
              </label>
              <input
                id="age"
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="gender">
                {t("lostPetPage.gender")}
              </label>
              <select
                id="gender"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="male">{t("lostPetPage.male")}</option>
                <option value="female">{t("lostPetPage.female")}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="status">
                {t("lostPetPage.status")}
              </label>
              <select
                id="status"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="lost">{t("lostPetPage.lost")}</option>
                <option value="found">{t("lostPetPage.found")}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="description">
              {t("lostPetPage.description")}
            </label>
            <textarea
              id="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="location">
              {t("lostPetPage.location")}
            </label>
            <input
              id="location"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="aggresive"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={aggresive}
              onChange={(e) => setAggresive(e.target.checked)}
            />
            <label htmlFor="aggresive" className="ml-2 text-sm">
              {t("lostPetPage.aggresiveDescription")}
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {t("lostPetPage.cancelButton")}
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? t("loading") : t("lostPetPage.saveButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LostPetEditModal;
