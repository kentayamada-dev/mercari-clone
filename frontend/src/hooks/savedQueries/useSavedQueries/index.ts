import { useInfiniteSavedQueries } from "../query";
import React from "react";
import { wait } from "../../../modules";
import { useAuth } from "../../auth/useAuth";

export const useSavedQueries = (query?: string) => {
  const { token } = useAuth();
  const {
    data: savedQueries,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteSavedQueries(token, query);
  const [refeching, setRefetching] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(false);
  const isSavedQueriesRefetching =
    refeching && (isFetching && isFetchingNextPage ? false : true);
  const isNextSavedQueriesFetching = fetchingNext || isFetchingNextPage;
  const onRefetchSavedQueries = React.useCallback(async () => {
    setRefetching(true);
    await wait(2);
    refetch({ refetchPage: (_, index) => index === 0 });
    setRefetching(false);
  }, []);

  const onFetchNextSavedQueries = React.useCallback(async () => {
    if (hasNextPage) {
      setFetchingNext(true);
      await wait(2);
      fetchNextPage();
      setFetchingNext(false);
    }
  }, [hasNextPage]);

  return {
    savedQueries,
    isSavedQueriesRefetching,
    isNextSavedQueriesFetching,
    onRefetchSavedQueries,
    onFetchNextSavedQueries,
  };
};
