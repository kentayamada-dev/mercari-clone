import { Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../../theme/modules";
import { RecommendTab } from "./recommend";
import { SavedTab } from "./saved";
import { HomeTabsProps } from "./types";

export const HomeTabs: React.VFC<HomeTabsProps> = ({
  onFetchNextSavedQueries,
  onRefetchSavedQueries,
  savedQueriesNavigationHandler,
  savedQueries,
  isSavedQueriesRefetching,
  isNextSavedQueriesFetching,
  ...recommendTabProps
}) => {
  const { t } = useTranslation(["common", "home"]);
  const { width } = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "recommendTab" },
    { key: "savedTab" },
  ]);
  const color = typedUseColorToken("brand.primary.light", "brand.primary.dark");
  const bgColor = typedUseColorToken(
    "brand.secondary.light",
    "brand.secondary.dark"
  );
  const inactiveColor = typedUseColorModeValue("#666", "#9c9c9c");

  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{
            borderBottomWidth: 3,
            borderBottomColor: color,
          }}
          style={{ backgroundColor: bgColor }}
          renderLabel={({ route, color }) => (
            <Text style={{ color: color, fontWeight: "bold" }}>
              {route.key === "recommendTab"
                ? t("home:recommends")
                : t("home:savedQueries")}
            </Text>
          )}
          activeColor={color}
          inactiveColor={`${inactiveColor}`}
          pressColor={"transparent"}
        />
      )}
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        return route.key === "recommendTab" ? (
          <RecommendTab {...recommendTabProps} />
        ) : route.key === "savedTab" ? (
          <SavedTab
            savedQueries={savedQueries}
            isSavedQueriesRefetching={isSavedQueriesRefetching}
            isNextSavedQueriesFetching={isNextSavedQueriesFetching}
            onFetchNextSavedQueries={onFetchNextSavedQueries}
            onRefetchSavedQueries={onRefetchSavedQueries}
            savedQueriesNavigationHandler={savedQueriesNavigationHandler}
          />
        ) : null;
      }}
      onIndexChange={setIndex}
      initialLayout={{ width: width }}
      style={{
        width: "100%",
      }}
    />
  );
};
