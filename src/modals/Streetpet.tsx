import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UseUser";
import { containsIncorrectLanguage } from "../utils/languageValidator";
import Swal from "sweetalert2";
import { StreetPetModalProps } from "../types/StreetPetProps";
import { createStreetPet } from "../services/street_pet";

const Streetpet = ({ onClose, onUpdate }: StreetPetModalProps) => {
  const { t, i18n } = useTranslation();
  const { user } = useUser();

  const userId = user?.id;
  const [formData, setFormData] = useState({
    breed: "",
    age: "",
    gender: "male",
    description: "",
    pet_name: "",
    help: false,
    account_number: [""],
    location: "",
    aggresive: false,
    status: "help",
  });

  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const fileArray = Array.from(files || []);
    if (name === "images") {
      setImages((prevImages) => [...prevImages, ...fileArray]);
    } else if (name === "videos") {
      setVideos((prevVideos) => [...prevVideos, ...fileArray]);
    }
  };

  const handleRemoveFile = (type: string, index: number) => {
    if (type === "image") {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else if (type === "video") {
      setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
    }
  };

  const handleAccountNumberChange = (index: number, value: string) => {
    const updatedAccountNumbers = [...formData.account_number];
    updatedAccountNumbers[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      account_number: updatedAccountNumbers,
    }));
  };

  const addAccountNumberField = () => {
    setFormData((prevData) => ({
      ...prevData,
      account_number: [...prevData.account_number, ""],
    }));
  };

  const removeAccountNumberField = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      account_number: prevData.account_number.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.pet_name)
      newErrors.push(t("streetPetModal.errors.pet_nameRequired"));
    if (!formData.breed)
      newErrors.push(t("streetPetModal.errors.breedRequired"));
    if (!formData.age || isNaN(Number(formData.age)))
      newErrors.push(t("streetPetModal.errors.ageInvalid"));
    if (!formData.description)
      newErrors.push(t("streetPetModal.errors.descriptionRequired"));
    if (!formData.location)
      newErrors.push(t("streetPetModal.errors.locationRequired"));

    if (images.length === 0 && videos.length === 0) {
      newErrors.push(t("streetPetModal.errors.mediaRequired"));
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateLanguage = (): boolean => {
    const language = i18n.language;
    const newErrors: string[] = [];
    if (containsIncorrectLanguage(formData.pet_name, language)) {
      newErrors.push(t("streetPetPage.errors.incorrectLanguagePetName"));
    }
    if (containsIncorrectLanguage(formData.breed, language)) {
      newErrors.push(t("streetPetPage.errors.incorrectLanguageBreed"));
    }
    if (containsIncorrectLanguage(formData.description, language)) {
      newErrors.push(t("streetPetPage.errors.incorrectLanguageDescription"));
    }
    if (containsIncorrectLanguage(formData.location, language)) {
      newErrors.push(t("streetPetPage.errors.incorrectLanguageLocation"));
    }

    if (newErrors.length > 0) {
      setError(newErrors.join(", "));
      setLoading(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "error",
        title: t("userIsRequired.title"),
        text: t("userIsRequired.text"),
      });
    }

    if (!userId) {
      console.error("User id is required");
      return;
    }

    if (!validateForm()) return;
    if (!validateLanguage()) {
      return;
    }

    const data = new FormData();
    data.append("breed", formData.breed);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("description", formData.description);
    data.append("pet_name", formData.pet_name);
    data.append("account_number", formData.account_number.join(", "));
    data.append("location", formData.location);
    data.append("aggresive", formData.aggresive.toString());
    data.append("status", formData.status);
    data.append("userId", userId.toString());
    data.append("languageCode", i18n.language);

    images.forEach((file) => {
      data.append("images", file);
    });

    videos.forEach((file) => {
      data.append("videos", file);
    });

    try {
      createStreetPet(data);
      Swal.fire({
        icon: "success",
        title: t("streetPetModal.success"),
        text: t("streetPetModal.successMessage"),
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to create street pet:", error);
      Swal.fire({
        icon: "error",
        title: t("streetPetModal.error"),
        text: t("streetPetModal.errorMessage"),
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900"
          aria-label={t("streetPetModal.buttons.close")}
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
          {t("streetPetModal.title")}
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {errors.length > 0 && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800">
                {t("streetPetModal.fields.pet_name")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="pet_name"
                value={formData.pet_name}
                onChange={handleChange}
                className="block w-full p-2.5 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-900"
                placeholder={t("streetPetModal.placeholders.pet_name")}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800">
                {t("streetPetModal.fields.breed")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className="block w-full p-2.5 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-900"
                placeholder={t("streetPetModal.placeholders.breed")}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800">
                {t("streetPetModal.fields.age")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="block w-full p-2.5 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-900"
                placeholder={t("streetPetModal.placeholders.age")}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800">
                {t("streetPetModal.fields.gender")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-full p-2.5 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-900"
              >
                <option value="male">
                  {t("streetPetModal.fields.genderMale")}
                </option>
                <option value="female">
                  {t("streetPetModal.fields.genderFemale")}
                </option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-800">
                {t("streetPetModal.fields.description")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full p-2.5 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-900 resize-none"
                placeholder={t("streetPetModal.placeholders.description")}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800">
                {t("streetPetModal.fields.status")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full p-2.5 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-900"
              >
                <option value="help">
                  {t("streetPetModal.fields.statusHelp")}
                </option>
                <option value="giveaway">
                  {t("streetPetModal.fields.statusGiveAway")}
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-medium text-gray-800">
                <input
                  type="checkbox"
                  name="help"
                  checked={formData.help}
                  onChange={handleChange}
                  className="mr-2"
                />
                {t("streetPetModal.fields.help")}
              </label>
            </div>
            {formData.help && (
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-800">
                  {t("streetPetModal.fields.accountNumber")}
                </label>
                {formData.account_number.map((account, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={account}
                      onChange={(e) =>
                        handleAccountNumberChange(index, e.target.value)
                      }
                      className="block w-full p-2.5 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => removeAccountNumberField(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                      disabled={formData.account_number.length === 1}
                      aria-label={t(
                        "streetPetModal.buttons.removeAccountNumber"
                      )}
                    >
                      &minus;
                    </button>
                    {index === formData.account_number.length - 1 && (
                      <button
                        type="button"
                        onClick={addAccountNumberField}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                        aria-label={t(
                          "streetPetModal.buttons.addAccountNumber"
                        )}
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-800">
                {t("streetPetModal.fields.location")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="block w-full p-2.5 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-900"
                placeholder={t("streetPetModal.placeholders.location")}
              />
            </div>
            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                name="aggresive"
                checked={formData.aggresive}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-800">
                {t("streetPetModal.fields.aggresive")}
              </span>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-800">
                {t("streetPetModal.fields.images")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full p-2.5 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-900"
                multiple
              />
              <div className="mt-2">
                {images.map((file, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="w-16 h-16 object-cover mr-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile("image", index)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={t("streetPetModal.buttons.remove")}
                    >
                      {t("streetPetModal.buttons.remove")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-800">
                {t("streetPetModal.fields.videos")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                name="videos"
                accept="video/*"
                onChange={handleFileChange}
                className="block w-full p-2.5 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-900"
                multiple
              />
              <div className="mt-2">
                {videos.map((file, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      className="w-16 h-16 object-cover mr-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile("video", index)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={t("streetPetModal.buttons.remove")}
                    >
                      {t("streetPetModal.buttons.remove")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 focus:ring-blue-500 focus:ring-2"
            >
              {loading ? t("loading") : t("streetPetPage.saveButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Streetpet;
