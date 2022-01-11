import React from "react";
import { useQueryClient } from "react-query";
import { HomeTemplate } from "../../components/templates/home";
import { invalidateQueriesWrapper } from "../../hooks/common/query";
import { useQueryItems } from "../../hooks/items/query";
import { wait } from "../../modules";
import { HomeProps } from "./types";

export const Home: React.VFC<HomeProps> = ({ navigation }) => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = React.useState(false);
  const { data: items, isFetching } = useQueryItems();
  const itemNavigationHandler = React.useCallback(
    (itemId: string, itemName: string) => {
      navigation.navigate("ItemDetailStackNavigator", {
        screen: "ItemDetail",
        params: { itemId: itemId, itemName: itemName },
      });
    },
    []
  );
  const todoNavigationHandler = React.useCallback(() => {
    navigation.navigate("Todo", { userId: "userId" });
  }, []);

  const onInvalidate = React.useCallback(async () => {
    invalidateQueriesWrapper(queryClient, "items");
    setRefreshing(true);
    await wait(1);
    setRefreshing(false);
  }, []);

  return (
    <HomeTemplate
      refetchItems={onInvalidate}
      isItemsFetching={refreshing || isFetching}
      items={items}
      itemNavigationHandler={itemNavigationHandler}
      todoNavigationHandler={todoNavigationHandler}
    />
  );
};
