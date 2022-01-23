import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { HomeStackParamList } from "../../types";
import { useInfiniteQueryItems } from "../../hooks/items/query";
import { wait } from "../../modules";
import { SearchResultsTemplate } from "../../components/templates/searchResults";

type Props = NativeStackScreenProps<HomeStackParamList, "SearchResults">;

export const SearchResults: React.VFC<Props> = ({
  route: {
    params: { query },
  },
  navigation: { navigate, goBack },
}) => {
  const [searchQuery, setSearchQuery] = React.useState(query);
  const {
    data: items,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQueryItems(searchQuery);
  const [refeching, setRefetching] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(false);
  const isRefetching = isFetching && isFetchingNextPage ? false : true;
  const isItemsRefetching = refeching && isRefetching;
  const isNextItemsFetching = fetchingNext || isFetchingNextPage;

  const itemNavigationHandler = React.useCallback(
    (itemId: string, itemName: string) => {
      navigate("ItemDetailStackNavigator", {
        screen: "ItemDetail",
        params: { itemId: itemId, itemName: itemName },
      });
    },
    []
  );

  const goBackNavigationHandler = React.useCallback(() => goBack(), []);
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
    <SearchResultsTemplate
      onRefetchItems={onRefetchItems}
      onFetchNextItems={onFetchNextItems}
      isItemsRefetching={isItemsRefetching}
      isNextItemsFetching={isNextItemsFetching}
      items={items}
      itemNavigationHandler={itemNavigationHandler}
      setQuery={setSearchQuery}
      query={searchQuery}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};
