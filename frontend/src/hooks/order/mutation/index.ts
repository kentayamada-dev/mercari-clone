import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { AddOrder, OrderCreate } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosPostWrapper } from "../../common/mutation";
import { UsePost } from "../../common/types";

type UsePostOrder = UsePost<AddOrder> & {
  token: string;
};

export const usePostOrder = ({ onSuccess, onError, token }: UsePostOrder) => {
  const path = BASE_PATH.ORDERS;

  return useMutation<AddOrder, AxiosError, OrderCreate>({
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
