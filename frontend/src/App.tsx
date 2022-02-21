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
import { GetUserById } from "./types/generated";
import { BASE_PATH } from "./hooks/common/constants";

export const App = () => {
  const { setToken } = useAuth();
  const queryClient = useQueryClient();
  const prepare = React.useCallback(async () => {
    const userToken = (await SecureStore.getItemAsync("userToken")) || "";
    await prefetchInfiniteQueryItems(queryClient);
    await prefetchQueryMe({
      onSuccess: (data) => {
        queryClient.setQueryData<GetUserById>(`${BASE_PATH.USERS}/${data.id}`, {
          ...data,
        });
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
