import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { CONSTANTS } from "../../../constants";
import {
  BodyCreateTokenTokenPost,
  ImageModel,
  Secret,
} from "../../../types/generated";
import { Axios } from "../types";

type AxiosPostWrapper = Axios & {
  dto: unknown;
};

type UsePost<T> = {
  onSuccess: (data: T) => Promise<void>;
};

const POST_IMAGE_PATH = "image/upload";
const POST_TOKEN_PATH = "token";

export const axiosPostWrapper = async ({
  path,
  config,
  dto,
}: AxiosPostWrapper) => {
  const url = `${CONSTANTS.BASE_URL}${path}`;
  const { data }: AxiosResponse = await axios.post(url, dto, config);

  return data;
};

export const usePostImage = ({ onSuccess }: UsePost<ImageModel>) =>
  useMutation<ImageModel, AxiosError, FormData>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto,
        path: POST_IMAGE_PATH,
        config: {
          headers: {
            "content-type": "multipart/form-data",
          },
        },
      }),
    onSuccess,
  });

export const usePostToken = ({ onSuccess }: UsePost<Secret>) =>
  useMutation<Secret, AxiosError, BodyCreateTokenTokenPost>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto: `grant_type=&username=${dto.username}&password=${dto.password}&scope=&client_id=&client_secret=`,
        path: POST_TOKEN_PATH,
      }),
    onSuccess,
  });
