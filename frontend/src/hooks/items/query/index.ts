import { AxiosError } from "axios";
import { QueryClient, useInfiniteQuery, useQuery } from "react-query";
import { GetItemById, ReadItems } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosGetWrapper } from "../../common/query";

export const useInfiniteQueryItems = (query?: string) => {
  const queryKey = query
    ? BASE_PATH.ITEMS.concat(`/${query}`)
    : BASE_PATH.ITEMS;

  return useInfiniteQuery<ReadItems, AxiosError>({
    queryKey,
    queryFn: ({ pageParam = 0 }) => {
      const url = query
        ? `?skip=${pageParam}&limit=21&query=${query}`
        : `?skip=${pageParam}&limit=21`;
      const path = BASE_PATH.ITEMS.concat(url);
      return axiosGetWrapper({
        path,
      });
    },
    getNextPageParam: (lastPage) => lastPage.skip ?? false,
  });
};

export const useQueryItem = (itemId: string) => {
  const path = BASE_PATH.ITEMS.concat(`/${itemId}`);

  return useQuery<GetItemById, AxiosError>({
    queryKey: path,
    queryFn: () =>
      axiosGetWrapper({
        path,
      }),
  });
};

export const prefetchInfiniteQueryItems = (queryClient: QueryClient) => {
  const queryKey = BASE_PATH.ITEMS;

  return queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: () => {
      const path = queryKey.concat("?skip=0&limit=21");
      return axiosGetWrapper({
        path,
      });
    },
  });
};
