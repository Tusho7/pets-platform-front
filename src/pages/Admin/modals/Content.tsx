import { Link } from "react-router-dom";
import { ContentProps } from "../../../types/Admin/ContentProps";

const Content = ({ onClose }: ContentProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
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

        <Link to="/admin_about_us">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">About Us</h1>
        </Link>

        <Link to="/admin_faqs">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">FAQ</h2>
        </Link>
        <Link to="/admin_terms">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Terms</h2>
        </Link>
      </div>
    </div>
  );
};

export default Content;
