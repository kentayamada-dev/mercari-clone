import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ItemDetailStackParamList } from "../../types";
import { UserDetailTemplate } from "../../components/templates/userDetail";
import { useUser } from "../../hooks/users/useUser";
import { StackActions } from "@react-navigation/native";

type Props = NativeStackScreenProps<ItemDetailStackParamList, "UserDetail">;

export const UserDetail: React.VFC<Props> = ({
  navigation: { dispatch },
  route: {
    params: { userId },
  },
}) => {
  const { user, isFetchingUser, onRefetchUser } = useUser(userId);

  const itemNavigationHandler = React.useCallback(
    (itemId: string, itemName: string) => {
      dispatch(
        StackActions.push("ItemDetailStackNavigator", {
          screen: "ItemDetail",
          params: { itemId, itemName },
        })
      );
    },
    []
  );

  return (
    <UserDetailTemplate
      user={user}
      isUserFetching={isFetchingUser}
      itemNavigationHandler={itemNavigationHandler}
      refetchUser={onRefetchUser}
    />
  );
};
