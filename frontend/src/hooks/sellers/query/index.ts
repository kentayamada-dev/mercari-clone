import { AxiosError } from "axios";
import { QueryClient, useQuery } from "react-query";
import { SellerRead } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { AxiosGetWrapper, axiosGetWrapper } from "../../common/query";

type PrefetchQueryMe = Required<
  Pick<AxiosGetWrapper, "onError" | "onSuccess">
> & {
  userToken: string;
  queryClient: QueryClient;
};

export const useQueryMe = (userToken: string) =>
  useQuery<SellerRead, AxiosError>({
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
        onError,
        onSuccess,
      }),
  });
