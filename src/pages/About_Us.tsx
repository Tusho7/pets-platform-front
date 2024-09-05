import { useState, useEffect } from "react";
import { getAboutUs } from "../services/about_us";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { AboutUsData } from "../types/AboutUs";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [aboutData, setAboutData] = useState<AboutUsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const language = i18n.language;
        const response = await getAboutUs(language);
        setAboutData(response.data);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
        setError("Failed to fetch About Us data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, [i18n.language]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12">
          {aboutData.length === 0 ? (
            <div className="text-center text-lg">
              No About Us data available.
            </div>
          ) : (
            aboutData.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-8 mb-12 border border-gray-200"
              >
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                  {item.title}
                </h1>
                <div className="bg-gray-600 w-full h-[1px] mb-10"></div>
                <section className="mb-8">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                    {t("about_us.introductionOverview")}
                  </h2>
                  <p className="text-gray-700">{item.introductionOverview}</p>
                </section>
                <section className="mb-8">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                    {t("about_us.missionStatement")}
                  </h2>
                  <p className="text-gray-700">{item.missionStatement}</p>
                </section>
                <section className="mb-8">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                    {t("about_us.historyBackground")}
                  </h2>
                  <p className="text-gray-700">{item.historyBackground}</p>
                </section>
                <section className="mb-8">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                    {t("about_us.foundingStory")}
                  </h2>
                  <p className="text-gray-700">{item.foundingStory}</p>
                </section>
                <section className="mb-8">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                    {t("about_us.features")}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                    {t("about_us.howItWorks")}
                  </h2>
                  <p className="text-gray-700">{item.howItWorks}</p>
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

export default AboutUs;
