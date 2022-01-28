import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageStackParamList } from "../../types";
import { SellerDetailTemplate } from "../../components/templates/sellerDetail";
import { useMe } from "../../hooks/sellers/useMe";

type Props = NativeStackScreenProps<MyPageStackParamList, "SellerDetail">;

export const SellerDetail: React.VFC<Props> = ({ navigation }) => {
  const itemNavigationHandler = React.useCallback(
    (itemId: string, itemName: string) => {
      navigation.navigate("ItemDetailStackNavigator", {
        screen: "ItemDetail",
        params: { itemId: itemId, itemName: itemName },
      });
    },
    []
  );
  const { me, isFetchingMe, onRefetchMe } = useMe();

  return (
    <SellerDetailTemplate
      seller={me}
      itemNavigationHandler={itemNavigationHandler}
      refetchSeller={onRefetchMe}
      isSellerFetching={isFetchingMe}
    />
  );
};
