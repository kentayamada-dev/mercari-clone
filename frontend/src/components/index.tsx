import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Box, useColorModeValue } from "native-base";
import React from "react";
import { RootNavigator } from "../navigators";
import { NavigationThemeDark, NavigationThemeLight } from "../theme";

export const RootComponet: React.VFC = () => {
  return (
    <NavigationContainer
      theme={useColorModeValue(NavigationThemeLight, NavigationThemeDark)}
    >
      <StatusBar style={useColorModeValue("dark", "light")} />
      <Box
        height="full"
        safeAreaTop
        _light={{
          bgColor: "brand.secondary.light",
        }}
        _dark={{
          bgColor: "brand.secondary.dark",
        }}
      >
        <RootNavigator />
      </Box>
    </NavigationContainer>
  );
};
