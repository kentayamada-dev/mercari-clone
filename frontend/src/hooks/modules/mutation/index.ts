import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { CONSTANTS } from "../../../constants";

export const axiosPostWrapper = <T>(
  path: string,
  dto: T,
  config?: AxiosRequestConfig
) =>
  axios
    .post(`${CONSTANTS.BASE_URL}${path}`, dto, config)
    .then((data) => data.data);
