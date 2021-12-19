import "dotenv/config";
import { ConfigContext } from "@expo/config";
import { ExtendedExpoConfig } from "./src/types";

export default ({ config }: ConfigContext): ExtendedExpoConfig => ({
  ...config,
  name: "mercari-clone",
  slug: "mercari-clone",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  privacy: "public",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: "automatic",
    bundleIdentifier: "com.kenta-yamada.mercari-clone",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
    },
    userInterfaceStyle: "automatic",
    package: "com.kenta_yamada.mercari_clone",
  },
  extra: {
    API_URL: process.env.API_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
});
