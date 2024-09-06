import React, { useState } from "react";
import { updateAdmin } from "../../services/api/adminAuth";
import { useAdmin } from "../../contexts/UseAdmin";
import Header from "./components/Header";
import { UpdateAdminData } from "../../types/Admin";
import { useTranslation } from "react-i18next";

const AdminSettings = () => {
  const { t } = useTranslation();
  const { admin } = useAdmin();
  const adminId = admin?.id;

  const initialFormData: UpdateAdminData = {
    email: admin?.email || "",
    firstName: admin?.firstName || "",
    lastName: admin?.lastName || "",
    password: "",
  };

  const [formData, setFormData] = useState<UpdateAdminData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!adminId) {
      setError(t("settings.errorAdminId"));
      setLoading(false);
      return;
    }

    const updatedFields: Partial<UpdateAdminData> = {};
    Object.keys(formData).forEach((key) => {
      const k = key as keyof UpdateAdminData;
      if (formData[k] !== initialFormData[k] && formData[k].trim() !== "") {
        updatedFields[k] = formData[k];
      }
    });

    try {
      await updateAdmin(adminId, updatedFields);
      setSuccess(t("settings.success"));
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError(t("settings.errorUpdate"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-[1200px] mt-20 x-full  mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6">{t("settings.title")}</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              {t("settings.email")}
            </label>
            <input
              type="text"
              name="email"
              placeholder={t("settings.emailPlaceholder")}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              {t("settings.firstName")}
            </label>
            <input
              type="text"
              name="firstName"
              placeholder={t("settings.firstNamePlaceholder")}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              {t("settings.lastName")}
            </label>
            <input
              type="text"
              name="lastName"
              placeholder={t("settings.lastNamePlaceholder")}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              {t("settings.password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            {loading ? t("settings.loading") : t("settings.save")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
