import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UseUser";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user } = useUser();

  return (
    <header className="bg-gray-800  shadow-md">
      <div className="px-4 py-4 flex justify-between items-center xl:px-0 max-w-[1200px] mx-auto">
        <Link to="/home" className="text-2xl font-bold text-white">
          Pets Platform
        </Link>
        <nav className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="focus:outline-none"
          >
            <img
              src={`${import.meta.env.VITE_API_STORAGE}${user?.profilePicture}`}
              alt={`${user?.firstName}'s Profile Picture`}
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <div className="w-full bg-slate-600 h-[1px]"></div>
              <Link
                to="/home"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                მთავარი
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                პროფილი
              </Link>
              <Link
                to="/about_us"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                ჩვენ შესახებ
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                კონტაქტი
              </Link>
              <div className="relative">
                <Link
                  to="/new_recommendations"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                >
                  ახალი რეკომენდაციები
                </Link>
              </div>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-start">
                გამოსვლა
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
