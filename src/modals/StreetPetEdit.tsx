import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UseUser";
import Swal from "sweetalert2";
import { containsIncorrectLanguage } from "../utils/languageValidator";
import { StreetPet, StreetPetEditModalProps } from "../types/StreetPetProps";
import { updateStreetPetByUserId } from "../services/street_pet";

const StreetPetEdit: React.FC<StreetPetEditModalProps> = ({
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
  const [account_number, setAccount_number] = useState<string[]>(
    pet.account_number || []
  );
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
      newErrors.push(t("streetPetPage.errors.incorrectLanguagePetName"));
    }
    if (containsIncorrectLanguage(breed, language)) {
      newErrors.push(t("streetPetPage.errors.incorrectLanguageBreed"));
    }
    if (containsIncorrectLanguage(description, language)) {
      newErrors.push(t("streetPetPage.errors.incorrectLanguageDescription"));
    }
    if (containsIncorrectLanguage(location, language)) {
      newErrors.push(t("streetPetPage.errors.incorrectLanguageLocation"));
    }

    if (newErrors.length > 0) {
      setError(newErrors.join(", "));
      setLoading(false);
      return;
    }

    const updatedPet: StreetPet = {
      id: pet.id,
      pet_name: petName,
      breed,
      age,
      gender,
      status,
      account_number,
      description,
      location,
      aggresive,
    };

    try {
      await updateStreetPetByUserId(updatedPet, userId!);
      onUpdate(updatedPet);
      Swal.fire({
        title: t("success.title"),
        text: t("success.text"),
        icon: "success",
        confirmButtonText: t("success.button"),
      });
      onClose();
    } catch (err) {
      setError(t("streetPetPage.updateError"));
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
          {t("streetPetPage.editButton")}
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium" htmlFor="petName">
                {t("streetPetPage.name")}
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
                {t("streetPetPage.breed")}
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
                {t("streetPetPage.age")}
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
                {t("streetPetPage.gender")}
              </label>
              <select
                id="gender"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="male">{t("streetPetPage.male")}</option>
                <option value="female">{t("streetPetPage.female")}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="status">
                {t("streetPetPage.status")}
              </label>
              <select
                id="status"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="help">{t("streetPetPage.help")}</option>
                <option value="giveaway">{t("streetPetPage.giveaway")}</option>
              </select>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium"
              htmlFor="accountNumbers"
            >
              {t("streetPetPage.accountNumbers")}
            </label>
            {account_number.map((number, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={number}
                  onChange={(e) => {
                    const newAccountNumbers = [...account_number];
                    newAccountNumbers[index] = e.target.value;
                    setAccount_number(newAccountNumbers);
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    const newAccountNumbers = account_number.filter(
                      (_, i) => i !== index
                    );
                    setAccount_number(newAccountNumbers);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setAccount_number([...account_number, ""])}
              className="text-blue-600 hover:text-blue-800"
            >
              {t("streetPetPage.addAccountNumber")}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="description">
              {t("streetPetPage.description")}
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
              {t("streetPetPage.location")}
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
              {t("streetPetPage.aggresiveDescription")}
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {t("streetPetPage.cancelButton")}
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? t("loading") : t("streetPetPage.saveButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StreetPetEdit;
