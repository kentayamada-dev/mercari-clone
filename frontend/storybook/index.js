import { NavigationContainer } from "@react-navigation/native";
import { select, withKnobs } from "@storybook/addon-knobs";
import {
  addDecorator,
  configure,
  getStorybookUI,
} from "@storybook/react-native";
import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import React from "react";
import {
  customTheme,
  NavigationThemeDark,
  NavigationThemeLight,
} from "../src/theme";
import "./rn-addons";
import { loadStories } from "./storyLoader";

addDecorator(withKnobs);
addDecorator((story) => {
  const colorScheme = select("Color Scheme", ["light", "dark"], "light");
  const colorModeManager = {
    get: () => {
      return colorScheme;
    },
    set: () => {},
  };
  return (
    <NativeBaseProvider theme={customTheme} colorModeManager={colorModeManager}>
      <NavigationContainer
        theme={
          colorScheme === "light" ? NavigationThemeLight : NavigationThemeDark
        }
      >
        <StatusBar style="dark" />
        <Box
          height="full"
          _light={{
            bgColor: "brand.secondary.light",
          }}
          _dark={{
            bgColor: "brand.secondary.dark",
          }}
        >
          {story()}
        </Box>
      </NavigationContainer>
    </NativeBaseProvider>
  );
});

configure(() => {
  loadStories();
}, module);

export const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});
