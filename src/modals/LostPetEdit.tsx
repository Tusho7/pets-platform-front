import React, { useState } from "react";
import { LostPet, LostPetEditModalProps } from "../types/LostPetProps";
import { useTranslation } from "react-i18next";
import { updateLostPetByUserId } from "../services/lost_pet";
import { useUser } from "../contexts/UseUser";
import Swal from "sweetalert2";

const LostPetEditModal: React.FC<LostPetEditModalProps> = ({
  pet,
  onClose,
  onUpdate,
}) => {
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
  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const newErrors: string[] = [];

    if (!petName.trim())
      newErrors.push(t("lostPetModal.errors.pet_nameRequired"));
    if (!breed.trim()) newErrors.push(t("lostPetModal.errors.breedRequired"));
    if (isNaN(age) || age <= 0)
      newErrors.push(t("lostPetModal.errors.ageInvalid"));
    if (!description.trim())
      newErrors.push(t("lostPetModal.errors.descriptionRequired"));
    if (!location.trim())
      newErrors.push(t("lostPetModal.errors.locationRequired"));

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors([]);

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
      setErrors([t("lostPetPage.updateError")]);
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {t("lostPetPage.editButton")}
        </h2>

        {errors.length > 0 && (
          <div className="mb-4">
            {errors.map((error, index) => (
              <p key={index} className="text-red-500">
                {error}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="petName">
              {t("lostPetPage.name")}
            </label>
            <input
              id="petName"
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="breed">
              {t("lostPetPage.breed")}
            </label>
            <input
              id="breed"
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="age">
              {t("lostPetPage.age")}
            </label>
            <input
              id="age"
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="status">
              {t("lostPetPage.status")}
            </label>
            <select
              id="status"
              className="w-full px-3 py-2 border rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="lost">{t("lostPetPage.lost")}</option>
              <option value="found">{t("lostPetPage.found")}</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="gender">
              {t("lostPetPage.gender")}
            </label>
            <select
              id="gender"
              className="w-full px-3 py-2 border rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">{t("lostPetPage.male")}</option>
              <option value="female">{t("lostPetPage.female")}</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="description"
            >
              {t("lostPetPage.description")}
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border rounded resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="location">
              {t("lostPetPage.location")}
            </label>
            <input
              id="location"
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="aggresive">
              {t("lostPetPage.aggressive")}
            </label>
            <input
              id="aggresive"
              type="checkbox"
              className="mr-2"
              checked={aggresive}
              onChange={(e) => setAggresive(e.target.checked)}
            />
            <span>{t("lostPetPage.aggresiveDescription")}</span>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              {t("lostPetPage.cancelButton")}
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? t("lostPetPage.saving") : t("lostPetPage.saveButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LostPetEditModal;
