import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { loginAdmin } from "../../services/api/adminAuth";
import { getAdmin } from "../../services/api/getAdmin";
import { useAdmin } from "../../contexts/UseAdmin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAdmin } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginAdmin(username, password);
      localStorage.setItem("isAdminLogin", "true");
      const { data } = await getAdmin();
      setAdmin(data);
      navigate("/admin_dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {loading && <Loading />}
        <div className="px-6 py-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            შესვლა
          </h2>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                ელ-ფოსტა
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="შეიყვანეთ ელ-ფოსტა"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                პაროლი
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="შეიყვანეთ პაროლი"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                შესვლა
              </button>
            </div>
          </form>
          {/* <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
