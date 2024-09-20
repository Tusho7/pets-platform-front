import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { registerUser } from "../services/api/auth";
import { ErrorResponse } from "../types/Error";
import Loading from "../components/Loading";
import { RegisterProps } from "../types/Login-Register";
import { useTranslation } from "react-i18next";

const Registration = ({ onClose, openLogin }: RegisterProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber);

      if (file) {
        formData.append("profile-pictures", file);
      }

      await registerUser(formData);
      Swal.fire({
        icon: "success",
        title: "წარმატება",
        text: "რეგისტრაცია წარმატებით დასრულდა.",
        timer: 2000,
      });
      onClose();
      openLogin();
    } catch (error: unknown) {
      console.error("Registration failed:", error);
      const errorMessage =
        (error as ErrorResponse)?.response?.data?.message ||
        "რეგისტრაცია ვერ მოხერხდა";

      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: errorMessage,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileURL(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileURL(null);
    (document.getElementById("profilePicture") as HTMLInputElement).value = "";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {loading && <Loading />}
        <h2 className="text-3xl text-gray-900 text-center mb-6">
          {t("registration.title")}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="sr-only">
              {t("registration.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={t("registration.emailPlaceholder")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="sr-only">
              {t("registration.phoneNumber")}
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="phoneNumber"
              autoComplete="phoneNumber"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={t("registration.phoneNumberPlaceholder")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="sr-only">
              {t("registration.password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={t("registration.passwordPlaceholder")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="firstName" className="sr-only">
              {t("registration.firstName")}
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={t("registration.firstNamePlaceholder")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="sr-only">
              {t("registration.lastName")}
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={t("registration.lastNamePlaceholder")}
            />
          </div>

          {fileURL ? (
            <div className="relative w-24 h-24">
              <img
                src={fileURL}
                alt={t("registration.profilePicture")}
                className="w-full h-full object-cover rounded-full border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute top-1 right-1 bg-white text-red-600 hover:text-red-800 rounded-full p-1 shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium text-gray-700"
              >
                {t("registration.profilePicture")}
              </label>
              <input
                id="profilePicture"
                name="profile-pictures"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t("registration.submitButton")}
          </button>
          <div className="mt-4 text-sm text-center">
            <button
              onClick={openLogin}
              className="font-medium text-indigo-600 hover:text-indigo-500"
              type="button"
            >
              {t("registration.haveAccount")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
