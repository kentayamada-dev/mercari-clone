import { AxiosError } from "axios";
import { QueryClient, useQuery } from "react-query";
import { GetUserById } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { AxiosGetWrapper, axiosGetWrapper } from "../../common/query";

type PrefetchQueryMe = Omit<AxiosGetWrapper<GetUserById>, "path" | "config"> & {
  userToken: string;
  queryClient: QueryClient;
};

export const useQueryMe = (userToken: string) =>
  useQuery<GetUserById, AxiosError>({
    queryKey: BASE_PATH.ME,
    queryFn: () =>
      axiosGetWrapper({
        path: BASE_PATH.ME,
        config: {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      }),
  });

export const prefetchQueryMe = ({
  onError,
  onSuccess,
  queryClient,
  userToken,
}: PrefetchQueryMe) =>
  queryClient.prefetchQuery({
    queryKey: BASE_PATH.ME,
    queryFn: () =>
      axiosGetWrapper({
        path: BASE_PATH.ME,
        config: {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
        onSuccess,
        onError,
      }),
  });

export const useQueryUser = (userId: string) => {
  const path = BASE_PATH.USERS.concat(`/${userId}`);

  return useQuery<GetUserById, AxiosError>({
    queryKey: path,
    queryFn: () =>
      axiosGetWrapper({
        path,
      }),
  });
};
