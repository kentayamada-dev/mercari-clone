import { useInfiniteQueryItems } from "../query";
import React from "react";
import { wait } from "../../../modules";

export const useItems = (query?: string) => {
  const {
    data: items,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQueryItems(query);
  const [refeching, setRefetching] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(false);
  const isItemsRefetching =
    refeching && (isFetching && isFetchingNextPage ? false : true);
  const isNextItemsFetching = fetchingNext || isFetchingNextPage;
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

  return {
    items,
    isItemsRefetching,
    isNextItemsFetching,
    onRefetchItems,
    onFetchNextItems,
  };
};
