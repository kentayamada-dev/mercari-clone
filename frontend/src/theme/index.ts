import type { ColorModeOptions } from "native-base";
import { extendTheme } from "native-base";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import type { Theme } from "@react-navigation/native";

const config: ColorModeOptions = {
  useSystemColorMode: true,
};

export const customTheme = extendTheme({
  colors: {
    buttonDark: {
      50: "#ffe6ea",
      100: "#f8bdc4",
      200: "#ec939d",
      300: "#e36877",
      400: "#da3e50",
      500: "#c12537",
      600: "#971c2b",
      700: "#6c121d",
      800: "#430810",
      900: "#1d0003",
    },
    buttonLight: {
      50: "#ffe1e5",
      100: "#ffb1b5",
      200: "#ff7f86",
      300: "#ff4c56",
      400: "#ff1a27",
      500: "#e6000d",
      600: "#b40009",
      700: "#810005",
      800: "#500001",
      900: "#210000",
    },
    brand: {
      primary: {
        light: "#ff333f",
        dark: "#da3e50",
      },
      secondary: {
        light: "#fff",
        dark: "#222",
      },
      tertiary: {
        light: "#30b2ff",
        dark: "#0073cc",
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
