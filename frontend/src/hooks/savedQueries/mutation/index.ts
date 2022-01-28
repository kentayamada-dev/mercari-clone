import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { QueryCreate, QueryInDatabase } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosPostWrapper } from "../../common/mutation";
import { UsePost } from "../../common/types";

type UsePostQuery = UsePost<QueryInDatabase> & {
  token: string;
};

export const usePostQuery = ({ onSuccess, onError, token }: UsePostQuery) => {
  const path = BASE_PATH.QUERIES;

  return useMutation<QueryInDatabase, AxiosError, QueryCreate>({
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
