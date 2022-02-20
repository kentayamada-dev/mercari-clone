import "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { RootComponet } from "./components";
import { useAuth } from "./hooks/auth/useAuth";
import "./i18n";
import { AnimatedAppLoader } from "./screens/splash";
import { prefetchInfiniteQueryItems } from "./hooks/items/query";
import { useQueryClient } from "react-query";
import { prefetchQueryMe } from "./hooks/users/query";
import { prefetchInfiniteSavedQueries } from "./hooks/savedQueries/query";

export const App = () => {
  const { setToken } = useAuth();
  const queryClient = useQueryClient();
  const prepare = React.useCallback(async () => {
    const userToken = (await SecureStore.getItemAsync("userToken")) || "";
    await prefetchInfiniteQueryItems(queryClient);
    await prefetchQueryMe({
      onSuccess: () => {
        setToken(userToken);
        prefetchInfiniteSavedQueries(userToken, queryClient);
      },
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
