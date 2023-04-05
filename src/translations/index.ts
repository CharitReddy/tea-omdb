import { translations } from "translations/en";

//Translation function to support multiple languages.
export type Translations = {
  [key: string]: string;
};

export default function t(key: string): string {
  const translation = translations[key];
  return translation || `Missing translation: ${key}`;
}
