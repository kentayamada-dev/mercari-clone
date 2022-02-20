import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { LikeResponse, LikeCreate } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosDeleteWrapper, axiosPostWrapper } from "../../common/mutation";
import { UsePost } from "../../common/types";

type UsePostLike = UsePost<LikeResponse> & {
  token: string;
};

export const usePostLike = ({ onSuccess, onError, token }: UsePostLike) => {
  const path = BASE_PATH.LIKES;

  return useMutation<LikeResponse, AxiosError, LikeCreate>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto,
        path,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    onSuccess,
    onError,
  });
};

type UseDeleteLike = UsePost<LikeResponse> & {
  token: string;
  itemId: string;
};
export const useDeleteLike = ({
  onSuccess,
  onError,
  itemId,
  token,
}: UseDeleteLike) => {
  const path = `${BASE_PATH.LIKES}/${itemId}`;

  return useMutation<LikeResponse, AxiosError>({
    mutationFn: () =>
      axiosDeleteWrapper({
        path,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    onSuccess,
    onError,
  });
};
