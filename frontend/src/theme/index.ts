import type { ColorModeOptions } from "native-base";
import { extendTheme } from "native-base";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import type { Theme } from "@react-navigation/native";

const config: ColorModeOptions = {
  useSystemColorMode: true,
};

export const customTheme = extendTheme({
  colors: {
    brand: {
      primary: {
        light: "#ff333f",
        dark: "#da3e50",
      },
      secondary: {
        light: "#fff",
        dark: "#222",
      },
    },
  },
  components: {},
  config: config,
});

type CustomThemeType = typeof customTheme;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}

export const NavigationThemeDark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#fff",
    background: "#222",
  },
};

export const NavigationThemeLight: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#222",
    background: "#fff",
  },
};
