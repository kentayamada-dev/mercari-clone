import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { ItemCreate, ItemInDatabase } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosPostWrapper } from "../../common/mutation";
import { UsePost } from "../../common/types";

type UsePostItem = UsePost<ItemInDatabase> & {
  sellerId: string;
};

export const usePostItem = ({ onSuccess, onError, sellerId }: UsePostItem) => {
  const path = `${BASE_PATH.SELLERS}/${sellerId}/${BASE_PATH.ITEMS}`;

  return useMutation<ItemInDatabase, AxiosError, ItemCreate>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto,
        path,
      }),
    onSuccess,
    onError,
  });
};
