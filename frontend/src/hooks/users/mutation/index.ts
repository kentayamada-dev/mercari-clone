import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { AddUser, CreateUser } from "../../../types/generated";
import { BASE_PATH } from "../../common/constants";
import { axiosPostWrapper } from "../../common/mutation";
import { UsePost } from "../../common/types";

export const usePostUser = ({ onError }: UsePost<AddUser>) =>
  useMutation<AddUser, AxiosError, CreateUser>({
    mutationFn: (dto) =>
      axiosPostWrapper({
        dto,
        path: BASE_PATH.USERS,
      }),
    onError,
  });
