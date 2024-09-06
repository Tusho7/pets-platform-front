export type FaqProps = {
  id: number;
  question: string;
  answer: string;
};

export type FaqPropsForUpdate = {
  question: string;
  answer: string;
  languageCode: string;
};
