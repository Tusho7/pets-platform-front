import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { getTerms } from "../services/terms";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { TermsProps } from "../types/Terms";

const Terms = () => {
  const { t, i18n } = useTranslation();
  const [termsData, setTermsData] = useState<TermsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const language = i18n.language;
        const response = await getTerms(language);
        setTermsData(response.data);
      } catch (error) {
        console.error("Error fetching Terms data:", error);
        setError("Failed to fetch Terms data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, [i18n.language]);

  if (loading)
    return (
      <div className="text-center py-12">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-12 text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-6">
        <div className="max-w-[1200px] mx-auto py-12">
          {termsData.length === 0 ? (
            <div className="text-center text-lg text-gray-700">
              {t("terms.noTerms")}
            </div>
          ) : (
            termsData.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-8 mb-12 border border-gray-200 hover:shadow-xl transition-shadow duration-200"
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {item.title}
                </h1>
                <div className="bg-gray-200 w-full h-[2px] mb-6"></div>
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {t("about_us.introductionOverview")}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {item.content}
                  </p>
                </section>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
