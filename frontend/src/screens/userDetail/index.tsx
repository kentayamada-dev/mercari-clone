import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageStackParamList } from "../../types";
import { UserDetailTemplate } from "../../components/templates/userDetail";
import { useMe } from "../../hooks/users/useMe";

type Props = NativeStackScreenProps<MyPageStackParamList, "UserDetail">;

export const UserDetail: React.VFC<Props> = ({ navigation: { navigate } }) => {
  const itemNavigationHandler = React.useCallback(
    (itemId: string, itemName: string) => {
      navigate("ItemDetailStackNavigator", {
        screen: "ItemDetail",
        params: { itemId: itemId, itemName: itemName },
      });
    },
    []
  );
  const { me, isFetchingMe, onRefetchMe } = useMe();

  return (
    <UserDetailTemplate
      user={me}
      itemNavigationHandler={itemNavigationHandler}
      refetchUser={onRefetchMe}
      isUserFetching={isFetchingMe}
    />
  );
};
