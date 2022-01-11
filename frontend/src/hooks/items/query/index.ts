import { AxiosError } from "axios";
import { QueryClient, useQuery } from "react-query";
import { ItemInDatabase, ItemRead } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosGetWrapper } from "../../common/query";

export const useQueryItems = () =>
  useQuery<ItemRead[], AxiosError>({
    queryKey: BASE_PATH.ITEMS,
    queryFn: () =>
      axiosGetWrapper({
        path: BASE_PATH.ITEMS,
      }),
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

export const prefetchQueryItems = (queryClient: QueryClient) =>
  queryClient.prefetchQuery({
    queryKey: BASE_PATH.ITEMS,
    queryFn: () =>
      axiosGetWrapper({
        path: BASE_PATH.ITEMS,
      }),
  });
