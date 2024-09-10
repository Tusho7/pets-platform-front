import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import Loading from "./Loading";
import { forgotPassword } from "../services/api/auth";

interface ForgotPasswordProps {
  onSuccess: () => void;
}

const ForgotPassword = ({ onSuccess }: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword(email);
      Swal.fire({
        icon: "success",
        title: "წარმატება",
        text: "პაროლის აღდგენის ბმული გაიგზავნა თქვენს ელ-ფოსტაზე.",
      });
      setEmail("");
      onSuccess();
    } catch (error) {
      console.error("Failed to send reset email:", error);
      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: "შეცდომა მოხდა, სცადეთ თავიდან.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {loading && <Loading />}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl  text-gray-900 text-center mb-6">
          დაგავიწყდა პაროლი?
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="sr-only">
              ელ-ფოსტა
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="ელ-ფოსტა"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            გაგზავნა
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <span
            onClick={onSuccess}
            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer hover:underline"
          >
            უკან დაბრუნება
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
