import { InvalidateQueryFilters, useQuery, useQueryClient } from "react-query";
import React from "react";
import { CustomQueryKey } from "../../../types";
import { AxiosError } from "axios";

export const useQueryWrapper = <T>(
  queryKey: CustomQueryKey,
  id?: string,
  token?: string
) => useQuery<T, AxiosError>(id || token ? [queryKey, id, token] : queryKey);

export const useQueryClientWrapper = (): {
  invalidateQueries: (
    queryKey: [CustomQueryKey, string] | CustomQueryKey,
    filters?: InvalidateQueryFilters
  ) => void;
  prefetchQuery: (
    queryKey: CustomQueryKey,
    id?: string,
    token?: string
  ) => Promise<void>;
} => {
  const queryClient = useQueryClient();
  const invalidateQueries = React.useCallback(
    (
      queryKey: [CustomQueryKey, string] | CustomQueryKey,
      filters?: InvalidateQueryFilters
    ) =>
      queryClient.invalidateQueries(
        !queryKey[1] ? queryKey[0] : queryKey,
        filters
      ),
    [queryClient]
  );
  const prefetchQuery = React.useCallback(
    async (queryKey: CustomQueryKey, id?: string, token?: string) =>
      await queryClient.prefetchQuery(
        id || token ? [queryKey, id, token] : queryKey
      ),
    [queryClient]
  );

  return { invalidateQueries, prefetchQuery } as const;
};
