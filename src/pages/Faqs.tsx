import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getFaqs } from "../services/faqs";
import { FaqProps } from "../types/Faq";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Faqs = () => {
  const { t, i18n } = useTranslation();
  const [faqs, setFaqs] = useState<FaqProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFaqs, setOpenFaqs] = useState<number | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const language = i18n.language;
        const response = await getFaqs(language);
        setFaqs(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch FAQs.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [i18n.language]);

  const toggleFaq = (id: number) => {
    setOpenFaqs(openFaqs === id ? null : id);
  };

  if (loading) return <p className="text-center mt-8">Loading FAQs...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div>
      <Header />
      <div className="max-w-[1200px] mx-auto mt-20 min-h-screen">
        <ul className="space-y-6 p-4 xl:p-0">
          <h2 className="text-2xl font-semibold mb-4">{t("faq.title")}</h2>
          {faqs.map((faq) => (
            <li key={faq.id} className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaq(faq.id)}
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <FontAwesomeIcon
                  icon={openFaqs === faq.id ? faChevronUp : faChevronDown}
                  className="text-gray-500"
                />
              </div>
              {openFaqs === faq.id && <p className="mt-2">{faq.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Faqs;
