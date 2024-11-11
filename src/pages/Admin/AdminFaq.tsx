import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaqProps } from "../../types/Faq";
import Loading from "../../components/Loading";
import { deleteFaqById, getFaqs, updateFaq } from "../../services/admin/faq";
import Header from "./components/Header";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { containsIncorrectLanguage } from "../../utils/languageValidator";

const Faq = () => {
  const { t, i18n } = useTranslation();
  const [faqContent, setFaqContent] = useState<FaqProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [editFaqId, setEditFaqId] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState<string>("");
  const [editAnswer, setEditAnswer] = useState<string>("");

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const language = i18n.language;
        const response = await getFaqs(language);
        setFaqContent(response.data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [i18n.language]);

  const handleFaqClick = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleEditClick = (faq: FaqProps) => {
    setEditFaqId(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  const handleSaveClick = async () => {
    if (editFaqId !== null) {
      try {
        await updateFaq(editFaqId, {
          question: editQuestion,
          answer: editAnswer,
          languageCode: i18n.language,
        });
        const language = i18n.language;
        const response = await getFaqs(language);
        setFaqContent(response.data);
        setEditFaqId(null);
        setOpenFaq(null);
      } catch (error) {
        console.error("Error updating FAQ:", error);
      }
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (i18n.language === "ge" && containsIncorrectLanguage(value, "ge")) {
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
    setEditQuestion(value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (i18n.language === "ge" && containsIncorrectLanguage(value, "ge")) {
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
    setEditAnswer(value);
  };

  const handleDeleteClick = async (id: number) => {
    const result = await Swal.fire({
      title: t("deleteAlert.title"),
      text: t("deleteAlert.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("deleteAlert.confirm"),
      cancelButtonText: t("deleteAlert.cancel"),
    });

    if (result.isConfirmed) {
      try {
        await deleteFaqById(id);
        const language = i18n.language;
        const response = await getFaqs(language);
        setFaqContent(response.data);
        Swal.fire({
          icon: "success",
          title: t("deleteSuccess.title"),
          text: t("deleteSuccess.text"),
        });
      } catch (error) {
        console.error("Error deleting FAQ:", error);
        Swal.fire({
          icon: "error",
          title: t("error.title"),
          text: t("error.text"),
        });
      }
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditFaqId(null);
    setOpenFaq(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />

      <div className="max-w-[1200px] mx-auto bg-gray-100 pt-8 z-0">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {t("faq.title")}
        </h1>
        <div className="space-y-4">
          {faqContent.length > 0 ? (
            faqContent.map((faq) => (
              <div
                key={faq.id}
                className="bg-white shadow-md rounded-lg p-4 cursor-pointer relative"
                onClick={() => handleFaqClick(faq.id)}
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h2>

                  {editFaqId === faq.id && (
                    <button
                      onClick={handleCloseClick}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>

                {openFaq === faq.id || editFaqId === faq.id ? (
                  <div>
                    {editFaqId === faq.id ? (
                      <div>
                        <input
                          type="text"
                          value={editQuestion}
                          onChange={handleQuestionChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <textarea
                          value={editAnswer}
                          onChange={handleAnswerChange}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                        />
                        <button
                          onClick={handleSaveClick}
                          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
                        >
                          {t("faq.save")}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 mt-2">{faq.answer}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(faq);
                          }}
                          className="absolute top-4 right-16 text-gray-500 hover:text-gray-700"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(faq.id);
                          }}
                          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />{" "}
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <p>{t("noFaqs")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
