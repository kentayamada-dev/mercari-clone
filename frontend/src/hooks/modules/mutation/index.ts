import axios, { AxiosError, AxiosResponse } from "axios";
import { IToastService } from "native-base/lib/typescript/components/composites/Toast";
import React from "react";
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
  AlertComponent: React.ReactNode;
  toast: IToastService;
};

const POST_IMAGE_PATH = "image/upload";
const POST_TOKEN_PATH = "token";
const TOAST_ID = "toast";

export const axiosPostWrapper = async ({
  path,
  config,
  dto,
}: AxiosPostWrapper) => {
  const url = `${CONSTANTS.BASE_URL}${path}`;
  const { data }: AxiosResponse = await axios.post(url, dto, config);

  return data;
};

export const usePostImage = ({
  onSuccess,
  toast,
  AlertComponent,
}: UsePost<ImageModel>) =>
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
    onError: () => {
      if (!toast.isActive(TOAST_ID)) {
        toast.show({
          id: TOAST_ID,
          duration: 10000,
          render: () => AlertComponent,
        });
      }
    },
  });

export const usePostToken = ({
  onSuccess,
  toast,
  AlertComponent,
}: UsePost<Secret>) =>
  useMutation<Secret, AxiosError, BodyCreateTokenTokenPost>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto: `grant_type=&username=${dto.username}&password=${dto.password}&scope=&client_id=&client_secret=`,
        path: POST_TOKEN_PATH,
      }),
    onSuccess,
    onError: () => {
      if (!toast.isActive(TOAST_ID)) {
        toast.show({
          id: TOAST_ID,
          duration: 10000,
          render: () => AlertComponent,
        });
      }
    },
  });
