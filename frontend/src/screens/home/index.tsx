import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { HomeTemplate } from "../../components/templates/home";
import { useItems } from "../../hooks/items/useItems";
import { useSavedQueries } from "../../hooks/savedQueries/useSavedQueries";
import { HomeStackParamList } from "../../types";

type HomeProps = NativeStackScreenProps<HomeStackParamList, "Home">;

export const Home: React.VFC<HomeProps> = ({ navigation: { navigate } }) => {
  const onSubmitQuery = React.useCallback((query: string) => {
    navigate("SearchResults", { query });
  }, []);

  const itemNavigationHandler = React.useCallback(
    (itemId: string, itemName: string) => {
      navigate("ItemDetailStackNavigator", {
        screen: "ItemDetail",
        params: { itemId: itemId, itemName: itemName },
      });
    },
    []
  );

  const todoNavigationHandler = React.useCallback(() => {
    navigate("Todo", { userId: "userId" });
  }, []);

  const savedQueriesNavigationHandler = React.useCallback(
    (savedQuery: string) => {
      navigate("SearchResults", { query: savedQuery });
    },
    []
  );

  const {
    isItemsRefetching,
    isNextItemsFetching,
    items,
    onFetchNextItems,
    onRefetchItems,
  } = useItems();

  const {
    isNextSavedQueriesFetching,
    isSavedQueriesRefetching,
    savedQueries,
    onFetchNextSavedQueries,
    onRefetchSavedQueries,
  } = useSavedQueries();

  return (
    <HomeTemplate
      isItemsRefetching={isItemsRefetching}
      isNextItemsFetching={isNextItemsFetching}
      items={items}
      savedQueries={savedQueries}
      isNextSavedQueriesFetching={isNextSavedQueriesFetching}
      isSavedQueriesRefetching={isSavedQueriesRefetching}
      savedQueriesNavigationHandler={savedQueriesNavigationHandler}
      onFetchNextSavedQueries={onFetchNextSavedQueries}
      onRefetchSavedQueries={onRefetchSavedQueries}
      onRefetchItems={onRefetchItems}
      onFetchNextItems={onFetchNextItems}
      itemNavigationHandler={itemNavigationHandler}
      todoNavigationHandler={todoNavigationHandler}
      onSubmitQuery={onSubmitQuery}
    />
  );
};
