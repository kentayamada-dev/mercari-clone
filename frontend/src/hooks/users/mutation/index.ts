import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Secret, CreateUser } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosPostWrapper } from "../../common/mutation";
import { UsePost } from "../../common/types";

export const usePostUser = ({ onError, onSuccess }: UsePost<Secret>) =>
  useMutation<Secret, AxiosError, CreateUser>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto,
        path: BASE_PATH.USERS,
      }),
    onSuccess,
    onError,
  });
