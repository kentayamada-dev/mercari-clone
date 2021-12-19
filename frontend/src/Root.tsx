import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import type { StorageManager } from "native-base";
import { ColorMode, NativeBaseProvider } from "native-base";
import React from "react";
import { LogBox, useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import { CONSTANTS } from "./constants";
import { customTheme } from "./theme";

LogBox.ignoreLogs(["Setting a timer", "NativeBase: The contrast ratio of"]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      queryFn: async ({ queryKey: [path, id] }) => {
        let url = `${CONSTANTS.BASE_URL}${path}`;
        if (id) {
          url = url.concat(`/${id}`);
        }
        const { data } = await axios.get(url);
        return data;
      },
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
        <App />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};
