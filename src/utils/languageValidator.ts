export const containsIncorrectLanguage = (
  text: string,
  language: string
): boolean => {
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
