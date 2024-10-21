import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaDog, FaPaw } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { PostsProps } from "../../../types/Admin/PostsProps";

const Content = ({ onClose }: PostsProps) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl relative z-10"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
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

        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
          {t("adminDashboard.managePostsTitle")}
        </h1>

        <div className="space-y-6">
          <Link
            to="/admin_street_pets"
            className="group flex items-center justify-between bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            <span className="text-lg font-semibold group-hover:scale-105 transition-transform duration-200 ease-in-out">
              {t("adminDashboard.streetPets")}
            </span>
            <FaDog className="text-2xl group-hover:rotate-12 transition-transform duration-200 ease-in-out" />{" "}
          </Link>

          <Link
            to="/admin_lost_pets"
            className="group flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            <span className="text-lg font-semibold group-hover:scale-105 transition-transform duration-200 ease-in-out">
              {t("adminDashboard.lostPets")}
            </span>
            <FaPaw className="text-2xl group-hover:rotate-12 transition-transform duration-200 ease-in-out" />{" "}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Content;
