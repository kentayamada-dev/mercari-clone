import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { ItemCreate, ItemInDatabase } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosPostWrapper } from "../../common/mutation";
import { UsePost } from "../../common/types";

type UsePostItem = UsePost<ItemInDatabase> & {
  token: string;
};

export const usePostItem = ({ onSuccess, onError, token }: UsePostItem) => {
  const path = `${BASE_PATH.ITEMS}`;

  return useMutation<ItemInDatabase, AxiosError, ItemCreate>({
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
