import "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { RootComponet } from "./components";
import { useAuth } from "./hooks/auth/useAuth";
import "./i18n";
import { AnimatedAppLoader } from "./screens/splash";
import { prefetchQueryItems } from "./hooks/items/query";
import { useQueryClient } from "react-query";
import { prefetchQueryMe } from "./hooks/sellers/query";

export const App = () => {
  const { setToken } = useAuth();
  const queryClient = useQueryClient();
  const prepare = React.useCallback(async () => {
    const userToken = (await SecureStore.getItemAsync("userToken")) || "";
    await prefetchQueryItems(queryClient);
    await prefetchQueryMe({
      onError: () => setToken(""),
      onSuccess: () => setToken(userToken),
      queryClient,
      userToken,
    });
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
