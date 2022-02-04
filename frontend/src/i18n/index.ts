import AsyncStorage from "@react-native-async-storage/async-storage";
import { locale } from "expo-localization";
import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import ja from "./translations/ja.json";

export const defaultNS = "common";
export const resources = {
  en,
  ja,
} as const;

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async (fallback) => {
    const val = await AsyncStorage.getItem("@locale");
    if (val === "en") {
      return fallback("en");
    } else if (val === "ja") {
      return fallback("ja");
    }
    return fallback(locale);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: () => {
      if (locale === "en" || locale.startsWith("en-")) {
        return "en";
      } else if (locale === "ja" || locale.startsWith("ja-")) {
        return "ja";
      }
      return "en";
    },
    defaultNS,
    ns: [
      "common",
      "home",
      "settings",
      "signup",
      "myPage",
      "userDetail",
      "itemDetail",
      "signin",
      "selling",
      "sellingDetail",
      "searchResults",
    ],
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    compatibilityJSON: "v3",
  });
