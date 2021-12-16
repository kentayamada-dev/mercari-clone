import { InvalidateQueryFilters, useQuery, useQueryClient } from "react-query";
import React from "react";
import { CustomQueryKey } from "../../types";

export const useQueryWrapper = <T>(queryKey: CustomQueryKey) =>
  useQuery<T, Error>({
    queryKey,
  });

export const useQueryClientWrapper = (): {
  invalidateQueries: (
    queryKey: CustomQueryKey,
    filters?: InvalidateQueryFilters
  ) => void;
  prefetchQuery: (queryKey: CustomQueryKey) => Promise<void>;
} => {
  const queryClient = useQueryClient();
  const invalidateQueries = React.useCallback(
    (queryKey: CustomQueryKey, filters?: InvalidateQueryFilters) => {
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
