import { Text, useColorModeValue, useToken } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, useWindowDimensions } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { Item } from "../../../../generated/Api";
import { RecommendTab } from "./recommend";
import { SavedTab } from "./saved";

type Props = {
  isItemsFetching: boolean;
  items: Item[];
  itemNavigationHandler: (itemId: string) => void;
  refetchItems: () => void;
};

export const HomeTabs: React.VFC<Props> = ({
  isItemsFetching,
  refetchItems,
  ...recommendTabProps
}) => {
  const { t } = useTranslation(["common", "home"]);
  const [lightBg, darkBg] = useToken("colors", [
    "brand.primary.light",
    "brand.primary.dark",
  ]);
  const { width } = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "recommendTab" },
    { key: "savedTab" },
  ]);

  const bg = useColorModeValue("#222", "#fff");

  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{
            borderBottomWidth: 3,
            borderBottomColor: useColorModeValue(lightBg, darkBg),
          }}
          style={{ backgroundColor: useColorModeValue("#fff", "#222") }}
          renderLabel={({ route, color }) => (
            <Text style={{ color: color, fontWeight: "bold" }}>
              {route.key === "recommendTab"
                ? t("home:recommends")
                : t("home:savedQueries")}
            </Text>
          )}
          activeColor={useColorModeValue(lightBg, darkBg)}
          inactiveColor={useColorModeValue("#666", "#9c9c9c")}
        />
      )}
      navigationState={{ index, routes }}
      renderScene={({ route }) => (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isItemsFetching}
              onRefresh={refetchItems}
              tintColor={bg}
            />
          }
        >
          {route.key === "recommendTab" ? (
            <RecommendTab {...recommendTabProps} />
          ) : route.key === "savedTab" ? (
            <SavedTab />
          ) : null}
        </ScrollView>
      )}
      onIndexChange={setIndex}
      initialLayout={{ width: width }}
      style={{
        width: "100%",
      }}
    />
  );
};
