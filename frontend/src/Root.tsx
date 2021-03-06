import AsyncStorage from "@react-native-async-storage/async-storage";
import type { StorageManager } from "native-base";
import { ColorMode, NativeBaseProvider } from "native-base";
import React from "react";
import { LogBox, useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import { AuthProvider } from "./hooks/auth/useAuth";
import { customTheme } from "./theme";

LogBox.ignoreAllLogs();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const Root = () => {
  const colorScheme = useColorScheme();
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

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider
        theme={customTheme}
        colorModeManager={colorModeManager}
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};
