import { InvalidateQueryFilters, useQuery, useQueryClient } from "react-query";
import React from "react";
import { CustomQueryKey } from "../../types";

export const useQueryWrapper = <T>(queryKey: CustomQueryKey, id?: string) => {
  if (id) {
    return useQuery<T, Error>([queryKey, id]);
  }
  return useQuery<T, Error>(queryKey);
};

export const useQueryClientWrapper = (): {
  invalidateQueries: (
    queryKey: [CustomQueryKey, string] | CustomQueryKey,
    filters?: InvalidateQueryFilters
  ) => void;
  prefetchQuery: (queryKey: CustomQueryKey) => Promise<void>;
} => {
  const queryClient = useQueryClient();
  const invalidateQueries = React.useCallback(
    (
      queryKey: [CustomQueryKey, string] | CustomQueryKey,
      filters?: InvalidateQueryFilters
    ) => {
      if (!queryKey[1]) queryClient.invalidateQueries(queryKey[0], filters);
      queryClient.invalidateQueries(queryKey, filters);
    },
    [queryClient]
  );
  const prefetchQuery = React.useCallback(
    async (queryKey: CustomQueryKey) => {
      await queryClient.prefetchQuery(queryKey);
    },
    [queryClient]
  );

  return { invalidateQueries, prefetchQuery } as const;
};
