import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { CreateItem, AddItem } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosPostWrapper } from "../../common/mutation";
import { UsePost } from "../../common/types";

type UsePostItem = UsePost<AddItem> & {
  token: string;
};

export const usePostItem = ({ onSuccess, onError, token }: UsePostItem) => {
  const path = `${BASE_PATH.ITEMS}`;

  return useMutation<AddItem, AxiosError, CreateItem>({
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
