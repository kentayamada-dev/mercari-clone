import { AxiosRequestConfig } from "axios";

export type Axios = {
  path: string;
  config?: AxiosRequestConfig;
};

export type UsePost<T> = {
  onSuccess?: (data: T) => void;
  onError?: () => void;
};
