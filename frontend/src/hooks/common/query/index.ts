import axios, { AxiosResponse } from "axios";
import { QueryClient } from "react-query";
import { CONSTANTS } from "../../../constants";
import { QueryKeys } from "../constants";
import { Axios } from "../types";

export type AxiosGetWrapper = Axios & {
  onError?: () => void;
  onSuccess?: () => void;
};

export const axiosGetWrapper = async ({
  path,
  config,
  onError,
  onSuccess,
}: AxiosGetWrapper) => {
  const url = `${CONSTANTS.BASE_URL}${path}`;
  try {
    const { data }: AxiosResponse = await axios.get(url, config);
    if (onSuccess) onSuccess();
    return data;
  } catch (e) {
    if (onError) onError();
  }
};

export const invalidateQueriesWrapper = (
  queryClient: QueryClient,
  queryKey: QueryKeys
) =>
  queryClient.invalidateQueries({
    queryKey,
  });
