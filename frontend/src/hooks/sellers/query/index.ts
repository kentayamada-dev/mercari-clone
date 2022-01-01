import { AxiosError } from "axios";
import { QueryClient, useQuery } from "react-query";
import { Seller } from "../../../types/generated";
import { AxiosGetWrapper, axiosGetWrapper } from "../../modules/query";
import { BASE_PATH_ME } from "../constants";

type PrefetchQueryMe = Required<
  Pick<AxiosGetWrapper, "onError" | "onSuccess">
> & {
  userToken: string;
  queryClient: QueryClient;
};

export const useQueryMe = (userToken: string) =>
  useQuery<Seller, AxiosError>({
    queryKey: BASE_PATH_ME,
    queryFn: () =>
      axiosGetWrapper({
        path: BASE_PATH_ME,
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
    queryKey: BASE_PATH_ME,
    queryFn: () =>
      axiosGetWrapper({
        path: BASE_PATH_ME,
        config: {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
        onError,
        onSuccess,
      }),
  });
