import React from "react";
import "react-native-gesture-handler";
import { RootComponet } from "./components";
import { useQueryClientWrapper } from "./hooks/modules";
import "./i18n";
import { AnimatedAppLoader } from "./screens/splash";

export const App = () => {
  const { prefetchQuery } = useQueryClientWrapper();
  const prepare = React.useCallback(async () => {
    await prefetchQuery("items");
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
