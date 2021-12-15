import React from "react";
import { HomeTemplate } from "../../components/templates/home";
import { useGetItemsQuery } from "../../services/itemsApi";
import { HomeProps } from "./types";

export const Home: React.VFC<HomeProps> = ({ navigation }) => {
  const { data: items, isFetching, refetch } = useGetItemsQuery();
  const itemNavigationHandler = React.useCallback((itemId: string) => {
    navigation.navigate("Detail", { itemId: itemId });
  }, []);
  const todoNavigationHandler = React.useCallback(() => {
    navigation.navigate("Todo", { userId: "userId" });
  }, []);

  return (
    <HomeTemplate
      refetchItems={refetch}
      isItemsFetching={isFetching}
      items={items}
      itemNavigationHandler={itemNavigationHandler}
      todoNavigationHandler={todoNavigationHandler}
    />
  );
};
