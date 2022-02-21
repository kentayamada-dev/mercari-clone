import React from "react";
import { useQueryClient } from "react-query";
import { wait } from "../../../modules";
import { BASE_PATH } from "../../common/constants";
import { useQueryUser } from "../query";

export const useUser = (userId: string) => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = React.useState(false);
  const { data: user, isFetching } = useQueryUser(userId);
  const isFetchingUser = refreshing || isFetching;
  const onRefetchUser = async () => {
    queryClient.invalidateQueries({
      queryKey: `${BASE_PATH.USERS}/${userId}`,
    });
    setRefreshing(true);
    await wait(1);
    setRefreshing(false);
  };

  return { user, isFetchingUser, onRefetchUser };
};
