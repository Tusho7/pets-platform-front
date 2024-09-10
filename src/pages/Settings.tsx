import React, { useState, useEffect } from "react";
import { updateUser } from "../services/api/auth";
import { useUser } from "../contexts/UseUser";
import Header from "../components/Header";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

const Settings = () => {
  const { t } = useTranslation();
  const { user, setUser } = useUser();
  const id = user?.id;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setProfilePicture(null);
    setProfilePicturePreview(null);
    const fileInput = document.getElementById(
      "profilePicture"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const hasChanges = () => {
    return (
      email !== user?.email ||
      firstName !== user.firstName ||
      lastName !== user.lastName ||
      phoneNumber !== user.phoneNumber ||
      profilePicture !== null ||
      password !== ""
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!hasChanges()) {
      Swal.fire({
        icon: "error",
        title: t("updateUser.ops"),
        text: t("updateUser.noChanges"),
      });
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNumber);
    if (profilePicture) {
      formData.append("profile-pictures", profilePicture);
    }
    formData.append("password", password);

    try {
      if (id) {
        const updatedUser = await updateUser(id, formData);
        Swal.fire({
          icon: "success",
          title: t("updateUser.success"),
        });
        setUser(updatedUser.updatedUser);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: t("updateUser.error"),
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-6 md:p-10">
        <div className="max-w-[800px] mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {t("updateUser.updateDetails")}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("updateUser.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("updateUser.firstName")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("updateUser.lastName")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("updateUser.phoneNumber")}
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("updateUser.profilePicture")}
              </label>
              <input
                id="profilePicture"
                name="profile-pictures"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-md p-2 bg-gray-50"
              />
              {profilePicturePreview && (
                <div className="mt-4 flex items-center">
                  <img
                    src={profilePicturePreview}
                    alt="Profile Preview"
                    className="w-24 h-24 object-cover rounded-md border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="ml-4 text-red-600 hover:text-red-800 transition duration-200"
                  >
                    {t("updateUser.removeFile")}
                  </button>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("updateUser.password")}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              {t("updateUser.button")}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
