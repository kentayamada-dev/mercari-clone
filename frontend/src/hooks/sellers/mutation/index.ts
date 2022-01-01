import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Seller, SellerCreate } from "../../../types/generated";
import { axiosPostWrapper } from "../../modules/mutation";
import { BASE_PATH_SELLERS } from "../constants";

export const usePostSeller = () =>
  useMutation<Seller, AxiosError, SellerCreate>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto,
        path: BASE_PATH_SELLERS,
      }),
  });
