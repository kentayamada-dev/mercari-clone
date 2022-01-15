import React from "react";
import { HomeTemplate } from "../../components/templates/home";
import { wait } from "../../modules";
import { HomeProps } from "./types";
import { useInfiniteQueryItems } from "../../hooks/items/query";

export const Home: React.VFC<HomeProps> = ({ navigation }) => {
  const {
    data: items,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQueryItems();
  const [refeching, setRefetching] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(false);
  const isRefetching = isFetching && isFetchingNextPage ? false : true;
  const isItemsRefetching = refeching && isRefetching;
  const isNextItemsFetching = fetchingNext || isFetchingNextPage;

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

  const onRefetchItems = React.useCallback(async () => {
    setRefetching(true);
    await wait(2);
    refetch({ refetchPage: (_, index) => index === 0 });
    setRefetching(false);
  }, []);

  const onFetchNextItems = React.useCallback(async () => {
    if (hasNextPage) {
      setFetchingNext(true);
      await wait(2);
      fetchNextPage();
      setFetchingNext(false);
    }
  }, [hasNextPage]);

  return (
    <HomeTemplate
      onRefetchItems={onRefetchItems}
      onFetchNextItems={onFetchNextItems}
      isItemsRefetching={isItemsRefetching}
      isNextItemsFetching={isNextItemsFetching}
      items={items}
      itemNavigationHandler={itemNavigationHandler}
      todoNavigationHandler={todoNavigationHandler}
    />
  );
};
