import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { getUser } from "../services/api/getUser";
import { useUser } from "../contexts/UseUser";
import { loginUser } from "../services/api/auth";
import Loading from "../components/Loading";
import { LoginProps } from "../types/Login-Register";

const Login = ({ onOpenRegistration, onClose }: LoginProps) => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const { setUser } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const email = target.username.value;
    const password = target.password.value;

    try {
      await loginUser(email, password);
      localStorage.setItem("isLogin", "true");
      const { data } = await getUser();
      setUser(data);
      onClose();
    } catch (error) {
      console.log(error);
      setError(t("login.error") || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
        <h2 className="text-3xl font-bold text-center text-gray-900">
          {t("login.title")}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              {t("login.email")}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={t("login.emailPlaceholder")}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("login.password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={t("login.passwordPlaceholder")}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t("login.submitButton")}
          </button>
        </form>

        <div className="relative mt-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{t("login.or")}</span>
          </div>
        </div>
        <div className="text-center">
          <p
            className="text-indigo-600 hover:underline cursor-pointer text-sm mt-4"
            onClick={onOpenRegistration}
          >
            {t("login.register")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
