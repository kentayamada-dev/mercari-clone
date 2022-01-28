import { AxiosError } from "axios";
import { QueryClient, useInfiniteQuery } from "react-query";
import { ReadQueries } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosGetWrapper } from "../../common/query";

export const useInfiniteSavedQueries = (token: string, query?: string) => {
  const queryKey = query
    ? BASE_PATH.QUERIES.concat(`/${query}`)
    : BASE_PATH.QUERIES;

  return useInfiniteQuery<ReadQueries, AxiosError>({
    queryKey,
    queryFn: ({ pageParam = 0 }) => {
      const url = query
        ? `?skip=${pageParam}&limit=21&query=${query}`
        : `?skip=${pageParam}&limit=21`;
      const path = BASE_PATH.QUERIES.concat(url);
      return axiosGetWrapper({
        path,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    },
    getNextPageParam: (lastPage) => (lastPage && lastPage.skip) ?? false,
  });
};

export const prefetchInfiniteSavedQueries = (
  token: string,
  queryClient: QueryClient
) => {
  const queryKey = BASE_PATH.QUERIES;
  return queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: () => {
      const path = queryKey.concat("?skip=0&limit=21");
      return axiosGetWrapper({
        path,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    },
  });
};
