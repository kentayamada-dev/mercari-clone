import AsyncStorage from "@react-native-async-storage/async-storage";
import type { StorageManager } from "native-base";
import { ColorMode, NativeBaseProvider } from "native-base";
import React from "react";
import { useColorScheme } from "react-native";
import "react-native-gesture-handler";
import { RootComponet } from "./components";
import { useQueryClientWrapper } from "./hooks/modules";
import "./i18n";
import { AnimatedAppLoader } from "./screens/splash";
import { customTheme } from "./theme";

export const App = () => {
  const colorScheme = useColorScheme();
  const { prefetchQuery } = useQueryClientWrapper();
  const colorModeManager: StorageManager = {
    get: async () => {
      const colorMode = await AsyncStorage.getItem("@colorMode");
      if (!colorMode) {
        return colorScheme;
      }
      return colorMode === "dark" ? "dark" : "light";
    },
    set: async (value: ColorMode) => {
      await AsyncStorage.setItem("@colorMode", value || "");
    },
  };

  const prepare = React.useCallback(async () => {
    await prefetchQuery("items");
  }, []);

  return (
    <AnimatedAppLoader
      image={require("../assets/splash.png")}
      prepare={prepare}
    >
      <NativeBaseProvider
        theme={customTheme}
        colorModeManager={colorModeManager}
      >
        <RootComponet />
      </NativeBaseProvider>
    </AnimatedAppLoader>
  );
};
