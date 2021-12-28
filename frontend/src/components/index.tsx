import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Box, useColorModeValue } from "native-base";
import React from "react";
import { RootNavigator } from "../navigators";
import { NavigationThemeDark, NavigationThemeLight } from "../theme";
import { typedUseColorModeValue } from "../theme/modules";

export const RootComponet: React.VFC = () => {
  const bgColor = typedUseColorModeValue(
    "brand.secondary.light",
    "brand.secondary.dark"
  );

  return (
    <NavigationContainer
      theme={useColorModeValue(NavigationThemeLight, NavigationThemeDark)}
    >
      <StatusBar style={useColorModeValue("dark", "light")} />
      <Box flex={1} safeAreaTop bgColor={bgColor}>
        <RootNavigator />
      </Box>
    </NavigationContainer>
  );
};
