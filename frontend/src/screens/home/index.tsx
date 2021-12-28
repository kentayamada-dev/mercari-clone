import React from "react";
import { HomeTemplate } from "../../components/templates/home";
import { useQueryItems } from "../../hooks/item";
import { useQueryClientWrapper } from "../../hooks/modules/query";
import { wait } from "../../modules";
import { HomeProps } from "./types";

export const Home: React.VFC<HomeProps> = ({ navigation }) => {
  const { invalidateQueries } = useQueryClientWrapper();
  const [refreshing, setRefreshing] = React.useState(false);
  const { data: items, isFetching } = useQueryItems();
  const itemNavigationHandler = React.useCallback(
    (itemId: string, itemName: string) => {
      navigation.navigate("ItemDetail", { itemId: itemId, itemName: itemName });
    },
    []
  );
  const todoNavigationHandler = React.useCallback(() => {
    navigation.navigate("Todo", { userId: "userId" });
  }, []);

  const onInvalidate = React.useCallback(async () => {
    invalidateQueries("items");
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
