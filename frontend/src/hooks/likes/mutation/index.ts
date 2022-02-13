import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { AddLike, LikeCreate, Base } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosDeleteWrapper, axiosPostWrapper } from "../../common/mutation";
import { UsePost } from "../../common/types";

type UsePostLike = UsePost<AddLike> & {
  token: string;
};

export const usePostLike = ({ onSuccess, onError, token }: UsePostLike) => {
  const path = BASE_PATH.LIKES;

  return useMutation<AddLike, AxiosError, LikeCreate>({
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

type UseDeleteLike = UsePost<Base> & {
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

  return useMutation<Base, AxiosError>({
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
