import React from "react";
import { useQueryClient } from "react-query";
import { wait } from "../../../modules";
import { useAuth } from "../../auth/useAuth";
import { BASE_PATH } from "../../common/constants";
import { invalidateQueriesWrapper } from "../../common/query";
import { useQueryMe } from "../query";

export const useMe = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = React.useState(false);
  const { data: me, isFetching } = useQueryMe(token);
  const isFetchingMe = refreshing || isFetching;
  const onRefetchMe = async () => {
    invalidateQueriesWrapper(queryClient, BASE_PATH.ME);
    setRefreshing(true);
    await wait(1);
    setRefreshing(false);
  };

  return { me, isFetchingMe, onRefetchMe };
};
