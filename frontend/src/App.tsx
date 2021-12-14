import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { StorageManager } from "native-base";
import { ColorMode, NativeBaseProvider } from "native-base";
import React from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { RootComponet } from "./components";
import { store } from "./store";
import { customTheme } from "./theme";
import "./utils/i18n";

export const App = () => {
  const colorScheme = useColorScheme();
  const colorModeManager: StorageManager = {
    get: async () => {
      const val = await AsyncStorage.getItem("@colorMode");
      if (!val) {
        return colorScheme;
      }
      return val === "dark" ? "dark" : "light";
    },
    set: async (value: ColorMode) => {
      await AsyncStorage.setItem("@colorMode", value || "");
    },
  };

  return (
    <Provider store={store}>
      <NativeBaseProvider
        theme={customTheme}
        colorModeManager={colorModeManager}
      >
        <RootComponet />
      </NativeBaseProvider>
    </Provider>
  );
};
