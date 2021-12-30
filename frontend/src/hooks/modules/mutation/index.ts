import axios from "axios";
import { AxiosRequestConfig } from "axios";

export const axiosPostWrapper = <T>(
  path: string,
  dto: T,
  config?: AxiosRequestConfig
) =>
  axios
    .post(`http://localhost:8000/${path}`, dto, config)
    .then((data) => data.data);
