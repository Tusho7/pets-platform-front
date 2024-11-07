import React, { useState, useEffect } from "react";
import {
  getTerms,
  updateTerm,
  deleteTermById,
} from "../../services/admin/terms";
import Loading from "../../components/Loading";
import { TermsProps } from "../../types/Terms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import { containsIncorrectLanguage } from "../../utils/languageValidator";

const AdminTerms = () => {
  const { t, i18n } = useTranslation();
  const [terms, setTerms] = useState<TermsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editTermId, setEditTermId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await getTerms(i18n.language);
        setTerms(response.data);
      } catch (error) {
        console.error("Error fetching terms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, [i18n.language]);

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const language = i18n.language;

    if (language === "ge" && containsIncorrectLanguage(value, "ge")) {
      Swal.fire({
        icon: "warning",
        title: t("languageAlert.title"),
        text: t("languageAlert.text"),
        confirmButtonText: t("languageAlert.button"),
      });
      return;
    } else if (language === "en" && containsIncorrectLanguage(value, "en")) {
      Swal.fire({
        icon: "warning",
        title: t("languageAlert.title"),
        text: t("languageAlert.text"),
        confirmButtonText: t("languageAlert.button"),
      });
      return;
    }

    setter(value);
  };

  const handleEditClick = (term: TermsProps) => {
    setEditTermId(term.id);
    setEditTitle(term.title);
    setEditContent(term.content);
  };

  const handleSaveClick = async () => {
    if (editTermId !== null) {
      try {
        await updateTerm(editTermId, {
          title: editTitle,
          content: editContent,
          languageCode: i18n.language,
        });
        const response = await getTerms(i18n.language);
        setTerms(response.data);
        setEditTermId(null);
        Swal.fire({
          icon: "success",
          title: t("success.title"),
          text: t("success.text"),
          confirmButtonText: t("success.button"),
        });
      } catch (error) {
        console.error("Error updating term:", error);
        Swal.fire({
          icon: "error",
          title: t("error.title"),
          text: t("error.text"),
        });
      }
    }
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
        await deleteTermById(id);
        const response = await getTerms(i18n.language);
        setTerms(response.data);
        Swal.fire({
          icon: "success",
          title: t("deleteSuccess.title"),
          text: t("deleteSuccess.text"),
        });
      } catch (error) {
        console.error("Error deleting term:", error);
        Swal.fire({
          icon: "error",
          title: t("error.title"),
          text: t("error.text"),
        });
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className="max-w-[1200px] mx-auto bg-gray-100 pt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {t("terms.title")}
        </h1>
        <div className="space-y-4">
          {terms.length > 0 ? (
            terms.map((term) => (
              <div
                key={term.id}
                className="bg-white shadow-md rounded-lg p-4 relative"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {term.title}
                </h2>

                {editTermId === term.id ? (
                  <div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) =>
                        handleInputChange(e.target.value, setEditTitle)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) =>
                        handleInputChange(e.target.value, setEditContent)
                      }
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <button
                      onClick={handleSaveClick}
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      {t("terms.save")}
                    </button>
                    <button
                      onClick={() => setEditTermId(null)}
                      className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700">{term.content}</p>
                    <button
                      onClick={() => handleEditClick(term)}
                      className="absolute top-4 right-16 text-gray-500 hover:text-gray-700"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(term.id)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>{t("terms.noTerms")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTerms;
