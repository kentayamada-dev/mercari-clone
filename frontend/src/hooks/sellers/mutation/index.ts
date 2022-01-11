import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Seller, SellerCreate } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosPostWrapper } from "../../common/mutation";
import { UsePost } from "../../common/types";

export const usePostSeller = ({ onError }: UsePost<Seller>) =>
  useMutation<Seller, AxiosError, SellerCreate>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto,
        path: BASE_PATH.SELLERS,
      }),
    onError,
  });
