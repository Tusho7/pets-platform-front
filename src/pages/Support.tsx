import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SupportPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-6 lg:p-12">
        <h1 className="text-3xl font-bold mb-6">{t("support.title")}</h1>
        <div className="space-y-8">
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {t("support.contactUs")}
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  {t("support.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-md p-3"
                  placeholder={t("support.namePlaceholder")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  {t("support.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md p-3"
                  placeholder={t("support.emailPlaceholder")}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  {t("support.message")}
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded-md p-3"
                  rows={5}
                  placeholder={t("support.messagePlaceholder")}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200"
              >
                {t("support.submit")}
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
