import axios, { AxiosError, AxiosResponse } from "axios";
import { QueryClient } from "react-query";
import { CONSTANTS } from "../../../constants";
import { QueryKeys } from "../constants";
import { Axios } from "../types";

export type AxiosGetWrapper<T> = Axios & {
  onError?: (error: AxiosError) => void;
  onSuccess?: (data: T) => void;
};

export const axiosGetWrapper = async <T>({
  path,
  config,
  onError,
  onSuccess,
}: AxiosGetWrapper<T>) => {
  const url = `${CONSTANTS.BASE_URL}${path}`;
  try {
    const { data }: AxiosResponse = await axios.get(url, config);
    if (onSuccess) onSuccess(data);
    return data;
  } catch (error) {
    if (onError && axios.isAxiosError(error)) onError(error);
  }
};

export const invalidateQueriesWrapper = (
  queryClient: QueryClient,
  queryKey: QueryKeys
) =>
  queryClient.invalidateQueries({
    queryKey,
  });
