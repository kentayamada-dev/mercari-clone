import { AxiosError } from "axios";
import { QueryClient, useInfiniteQuery, useQuery } from "react-query";
import { ItemInDatabase, ReadItems } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosGetWrapper } from "../../common/query";

export const useInfiniteQueryItems = () =>
  useInfiniteQuery<ReadItems, AxiosError>({
    queryKey: BASE_PATH.ITEMS,
    queryFn: ({ pageParam = 0 }) => {
      const path = BASE_PATH.ITEMS.concat(`?skip=${pageParam}&limit=21`);
      return axiosGetWrapper({
        path,
      });
    },
    getNextPageParam: (lastPage) => lastPage.skip ?? false,
  });

export const useQueryItem = (itemId: string) => {
  const path = BASE_PATH.ITEMS.concat(`/${itemId}`);

  return useQuery<ItemInDatabase, AxiosError>({
    queryKey: path,
    queryFn: () =>
      axiosGetWrapper({
        path,
      }),
  });
};

export const prefetchInfiniteQueryItems = (queryClient: QueryClient) =>
  queryClient.prefetchInfiniteQuery({
    queryKey: BASE_PATH.ITEMS,
    queryFn: () => {
      const path = BASE_PATH.ITEMS.concat("?skip=0&limit=21");
      return axiosGetWrapper({
        path,
      });
    },
  });
