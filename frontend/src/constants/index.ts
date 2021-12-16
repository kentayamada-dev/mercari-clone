import Constants from "expo-constants";
import { Platform } from "react-native";
import { Extra } from "../types";

const ENV = Constants.manifest?.extra as Extra;

const BASE_URL =
  Platform.OS === "android" && ENV.NODE_ENV === "development"
    ? ENV.API_URL.replace("localhost", "10.0.2.2")
    : ENV.API_URL;

export const CONSTANTS = {
  ENV: ENV,
  BASE_URL: BASE_URL,
};
