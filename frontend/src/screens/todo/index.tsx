import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { locale } from "expo-localization";
import { Box, HStack, Text, useColorMode } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { ColorSchemeName, useColorScheme } from "react-native";
import { ToggleButtonGroup } from "../../components/organisms/toggleButtonGroup";
import { typedUseColorToken } from "../../theme/modules";
import { HomeStackParamList } from "../../types";

type Props = NativeStackScreenProps<HomeStackParamList, "Todo">;

type Locale = "ja" | "en" | null;

export const Todo: React.VFC<Props> = () => {
  const { i18n } = useTranslation("common");
  const { t: translation } = useTranslation("settings");
  const { setColorMode } = useColorMode();
  const [colorModeState, setColorModeState] =
    React.useState<ColorSchemeName>(null);
  const [localeState, setLocaleState] = React.useState<Locale>(null);
  const colorScheme = useColorScheme();
  const secondaryColor = typedUseColorToken(
    "brand.secondary.dark",
    "brand.secondary.light"
  );

  React.useEffect(() => {
    const getData = async () => {
      const colorMode = await AsyncStorage.getItem("@colorMode");
      setColorModeState(colorMode as ColorSchemeName);
      const locale = await AsyncStorage.getItem("@locale");
      setLocaleState(locale as Locale);
    };
    getData();
  }, []);

  const LeftButtonContentOnColorChange: React.VFC = React.useCallback(
    () => (
      <HStack alignItems="center" space={2}>
        <Ionicons name="md-moon-outline" size={24} color={secondaryColor} />
        <Text fontSize="md" fontWeight="bold">
          {translation("darkTheme")}
        </Text>
      </HStack>
    ),
    [translation, secondaryColor]
  );

  const MiddleButtonContentOnColorChange: React.VFC = React.useCallback(
    () => (
      <HStack alignItems="center" space={2}>
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={24}
          color={secondaryColor}
        />
        <Text fontSize="md" fontWeight="bold">
          {translation("systemTheme")}
        </Text>
      </HStack>
    ),
    [translation, secondaryColor]
  );

  const RightButtonContentOnColorChange: React.VFC = React.useCallback(
    () => (
      <HStack alignItems="center" space={2}>
        <Ionicons name="sunny" size={24} color={secondaryColor} />
        <Text fontSize="md" fontWeight="bold">
          {translation("lightTheme")}
        </Text>
      </HStack>
    ),
    [translation, secondaryColor]
  );

  const leftButtonHandlerOnColorChange = React.useCallback(async () => {
    await AsyncStorage.setItem("@colorMode", "dark");
    setColorMode("dark");
    setColorModeState("dark");
  }, []);

  const middleButtonHandlerOnColorChange = React.useCallback(async () => {
    setColorMode(colorScheme);
    setColorModeState(null);
    await AsyncStorage.removeItem("@colorMode");
  }, []);

  const rightButtonHandlerOnColorChange = React.useCallback(async () => {
    await AsyncStorage.setItem("@colorMode", "light");
    setColorMode("light");
    setColorModeState("light");
  }, []);

  const LeftButtonContentOnLocaleChange: React.VFC = React.useCallback(
    () => (
      <Text fontSize="md" fontWeight="bold">
        日本語
      </Text>
    ),
    [secondaryColor]
  );

  const MiddleButtonContentOnLocaleChange: React.VFC = React.useCallback(
    () => (
      <HStack alignItems="center" space={2}>
        <Ionicons name="ios-language" size={24} color={secondaryColor} />
        <Text fontSize="md" fontWeight="bold">
          System
        </Text>
      </HStack>
    ),
    [secondaryColor]
  );

  const RightButtonContentOnLocaleChange: React.VFC = React.useCallback(
    () => (
      <Text fontSize="md" fontWeight="bold">
        English
      </Text>
    ),
    [secondaryColor]
  );

  const leftButtonHandlerOnLocaleChange = React.useCallback(async () => {
    await AsyncStorage.setItem("@locale", "ja");
    i18n.changeLanguage("ja");
    setLocaleState("ja");
  }, []);

  const middleButtonHandlerOnLocaleChange = React.useCallback(async () => {
    i18n.changeLanguage(locale);
    setLocaleState(null);
    await AsyncStorage.removeItem("@locale");
  }, []);

  const rightButtonHandlerOnLocaleChange = React.useCallback(async () => {
    await AsyncStorage.setItem("@locale", "en");
    i18n.changeLanguage("en");
    setLocaleState("en");
  }, []);

  return (
    <>
      <ToggleButtonGroup
        isLeftButtoFocused={colorModeState === "dark"}
        isMiddleButtoFocused={colorModeState === null}
        isRightButtoFocused={colorModeState === "light"}
        leftButtonHandler={leftButtonHandlerOnColorChange}
        middleButtonHandler={middleButtonHandlerOnColorChange}
        rightButtonHandler={rightButtonHandlerOnColorChange}
        LeftButtonContent={LeftButtonContentOnColorChange}
        MiddleButtonContent={MiddleButtonContentOnColorChange}
        RightButtonContent={RightButtonContentOnColorChange}
      />
      <Box height="2" />
      <ToggleButtonGroup
        isLeftButtoFocused={localeState === "ja"}
        isMiddleButtoFocused={localeState === null}
        isRightButtoFocused={localeState === "en"}
        leftButtonHandler={leftButtonHandlerOnLocaleChange}
        middleButtonHandler={middleButtonHandlerOnLocaleChange}
        rightButtonHandler={rightButtonHandlerOnLocaleChange}
        LeftButtonContent={LeftButtonContentOnLocaleChange}
        MiddleButtonContent={MiddleButtonContentOnLocaleChange}
        RightButtonContent={RightButtonContentOnLocaleChange}
      />
    </>
  );
};
