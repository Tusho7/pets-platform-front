import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAboutUs, updateAboutUs } from "../../services/admin/about_us";
import Header from "./components/Header";
import { AboutUsData } from "../../types/AboutUs";
import PencilIcon from "/pencil-icon.png";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const containsIncorrectLanguage = (text: string, language: string): boolean => {
  const englishRegex = /[a-zA-Z]/;
  const georgianRegex = /[\u10A0-\u10FF]/;

  const containsEnglish = englishRegex.test(text);
  const containsGeorgian = georgianRegex.test(text);

  if (language === "en" && containsGeorgian) {
    return true;
  }
  if (language === "ge" && containsEnglish) {
    return true;
  }
  return false;
};

const AdminAboutUs = () => {
  const { t, i18n } = useTranslation();
  const [aboutUsContent, setAboutUsContent] = useState<AboutUsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<AboutUsData[]>([]);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const language = i18n.language;
        const response = await getAboutUs(language);
        setAboutUsContent(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
        setError("Failed to fetch About Us data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, [i18n.language]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const language = i18n.language;

    if (language === "ge" && containsIncorrectLanguage(value, "ge")) {
      Swal.fire({
        icon: "warning",
        title: t("languageAlert.title"),
        text: t("languageAlert.text"),
        confirmButtonText: t("languageAlert.button"),
      });
      return;
    } else if (
      i18n.language === "en" &&
      containsIncorrectLanguage(value, "en")
    ) {
      Swal.fire({
        icon: "warning",
        title: t("languageAlert.title"),
        text: t("languageAlert.text"),
        confirmButtonText: t("languageAlert.button"),
      });
      return;
    }

    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setFormData(updatedData);
  };

  const handleFeaturesChange = (index: number, value: string) => {
    const language = i18n.language;

    if (language === "ge" && containsIncorrectLanguage(value, "ge")) {
      Swal.fire({
        icon: "warning",
        title: t("languageAlert.title"),
        text: t("languageAlert.text"),
        confirmButtonText: t("languageAlert.button"),
      });
      return;
    } else if (
      i18n.language === "en" &&
      containsIncorrectLanguage(value, "en")
    ) {
      Swal.fire({
        icon: "warning",
        title: t("languageAlert.title"),
        text: t("languageAlert.text"),
        confirmButtonText: t("languageAlert.button"),
      });
      return;
    }
    const updatedData = [...formData];
    updatedData[index] = {
      ...updatedData[index],
      features: value.split(",").map((feature) => feature.trim()),
    };
    setFormData(updatedData);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      for (const item of formData) {
        if (
          !item.title ||
          !item.introductionOverview ||
          !item.missionStatement ||
          !item.historyBackground ||
          !item.foundingStory ||
          !item.features.length ||
          !item.howItWorks
        ) {
          Swal.fire({
            icon: "warning",
            title: t("warning.title"),
            text: t("about_us.validationError"),
            confirmButtonText: t("languageAlert.button"),
          });
          return;
        }

        await updateAboutUs(item.id, {
          title: item.title,
          introductionOverview: item.introductionOverview,
          missionStatement: item.missionStatement,
          historyBackground: item.historyBackground,
          foundingStory: item.foundingStory,
          features: item.features,
          howItWorks: item.howItWorks,
          languageCode: i18n.language,
        });
      }

      Swal.fire({
        icon: "success",
        title: t("success.title"),
        text: t("success.text"),
        confirmButtonText: t("success.button"),
      });

      setEditMode(false);
    } catch (error) {
      console.error("Error updating About Us data:", error);
      setError("Failed to update About Us data.");

      Swal.fire({
        icon: "error",
        title: t("error.title"),
        text: t("error.text"),
        confirmButtonText: t("error.button"),
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12">
          {aboutUsContent.length === 0 ? (
            <div className="text-center text-lg">
              No About Us data available.
            </div>
          ) : (
            aboutUsContent.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-8 mb-12 border border-gray-200"
              >
                <div className="flex gap-2 justify-between items-center mb-7">
                  <h1 className="text-4xl font-extrabold text-gray-900">
                    {item.title}
                  </h1>
                  <div className="flex gap-3 items-center justify-between">
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="ml-4 text-gray-600 hover:text-gray-800"
                    >
                      <img src={PencilIcon} className="w-8 h-10" alt="Edit" />
                    </button>
                    {editMode && (
                      <div className="flex justify-center py-4">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          {t("about_us.saveChanges")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-600 w-full h-[1px] mb-10"></div>

                {item.introductionOverview && (
                  <section className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                      {t("about_us.introductionOverview")}
                    </h2>
                    {editMode ? (
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                        rows={4}
                        value={formData[index].introductionOverview || ""}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "introductionOverview",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <p className="text-gray-700">
                        {item.introductionOverview}
                      </p>
                    )}
                  </section>
                )}

                {item.missionStatement && (
                  <section className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                      {t("about_us.missionStatement")}
                    </h2>
                    {editMode ? (
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                        rows={4}
                        value={formData[index].missionStatement || ""}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "missionStatement",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <p className="text-gray-700">{item.missionStatement}</p>
                    )}
                  </section>
                )}

                {item.historyBackground && (
                  <section className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                      {t("about_us.historyBackground")}
                    </h2>
                    {editMode ? (
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                        rows={4}
                        value={formData[index].historyBackground || ""}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "historyBackground",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <p className="text-gray-700">{item.historyBackground}</p>
                    )}
                  </section>
                )}

                {item.foundingStory && (
                  <section className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                      {t("about_us.foundingStory")}
                    </h2>
                    {editMode ? (
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                        rows={4}
                        value={formData[index].foundingStory || ""}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "foundingStory",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <p className="text-gray-700">{item.foundingStory}</p>
                    )}
                  </section>
                )}

                {item.features && (
                  <section className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                      {t("about_us.features")}
                    </h2>
                    {editMode ? (
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                        rows={4}
                        value={formData[index].features.join(", ") || ""}
                        onChange={(e) =>
                          handleFeaturesChange(index, e.target.value)
                        }
                      />
                    ) : (
                      <ul className="list-disc list-inside">
                        {item.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-gray-700">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                )}

                {item.howItWorks && (
                  <section className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                      {t("about_us.howItWorks")}
                    </h2>
                    {editMode ? (
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                        rows={4}
                        value={formData[index].howItWorks || ""}
                        onChange={(e) =>
                          handleInputChange(index, "howItWorks", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-gray-700">{item.howItWorks}</p>
                    )}
                  </section>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAboutUs;
