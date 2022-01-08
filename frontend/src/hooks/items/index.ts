import { AxiosError } from "axios";
import { QueryClient, useQuery } from "react-query";
import { ItemInDatabase, ItemRead } from "../../types/generated";
import { axiosGetWrapper } from "../modules/query";

const BASE_PATH = "items";

export const useQueryItems = () =>
  useQuery<ItemRead[], AxiosError>({
    queryKey: BASE_PATH,
    queryFn: () =>
      axiosGetWrapper({
        path: BASE_PATH,
      }),
  });

export const useQueryItem = (itemId: string) => {
  const path = BASE_PATH.concat(`/${itemId}`);

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
    queryKey: BASE_PATH,
    queryFn: () =>
      axiosGetWrapper({
        path: BASE_PATH,
      }),
  });

export const invalidateQueriesItems = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({
    queryKey: BASE_PATH,
  });
