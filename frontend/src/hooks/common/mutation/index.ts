import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { CONSTANTS } from "../../../constants";
import {
  BodyCreateTokenTokenPost,
  ImageModel,
  Secret,
} from "../../../types/generated";
import { Axios, UsePost } from "../types";

export const axiosPostWrapper = async ({
  path,
  config,
  dto,
}: Axios & {
  dto: unknown;
}) => {
  const url = `${CONSTANTS.BASE_URL}${path}`;
  const { data }: AxiosResponse = await axios.post(url, dto, config);

  return data;
};

export const usePostImage = ({ onSuccess, onError }: UsePost<ImageModel>) =>
  useMutation<ImageModel, AxiosError, FormData>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto,
        path: "image/upload",
        config: {
          headers: {
            "content-type": "multipart/form-data",
          },
        },
      }),
    onSuccess,
    onError,
  });

export const usePostToken = ({ onSuccess, onError }: UsePost<Secret>) =>
  useMutation<Secret, AxiosError, BodyCreateTokenTokenPost>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto: `grant_type=&username=${dto.username}&password=${dto.password}&scope=&client_id=&client_secret=`,
        path: "token",
      }),
    onSuccess,
    onError,
  });
