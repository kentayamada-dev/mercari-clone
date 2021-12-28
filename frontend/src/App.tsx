import "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { RootComponet } from "./components";
import { useAuth } from "./hooks/auth/useAuth";
import { useQueryClientWrapper } from "./hooks/modules/query";
import "./i18n";
import { AnimatedAppLoader } from "./screens/splash";

export const App = () => {
  const { prefetchQuery } = useQueryClientWrapper();
  const { dispatch } = useAuth();

  const prepare = React.useCallback(async () => {
    const userToken = (await SecureStore.getItemAsync("userToken")) || "";
    dispatch({ type: "RESTORE_TOKEN", token: userToken });
    await prefetchQuery("items");
    await prefetchQuery("sellers/me/", undefined, userToken);
  }, []);

  return (
    <AnimatedAppLoader
      image={require("../assets/splash.png")}
      prepare={prepare}
    >
      <RootComponet />
    </AnimatedAppLoader>
  );
};
