import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageStackParamList } from "../../types";
import { useAuth } from "../../hooks/auth/useAuth";
import { useQueryMe } from "../../hooks/sellers/query";
import { SellerDetailTemplate } from "../../components/templates/sellerDetail";

type Props = NativeStackScreenProps<MyPageStackParamList, "SellerDetail">;

export const SellerDetail: React.VFC<Props> = ({ navigation }) => {
  const { token } = useAuth();
  const { data: seller } = useQueryMe(token);
  const itemNavigationHandler = React.useCallback(
    (itemId: string, itemName: string) => {
      navigation.navigate("ItemDetail", { itemId: itemId, itemName: itemName });
    },
    []
  );

  return (
    <SellerDetailTemplate
      seller={seller}
      itemNavigationHandler={itemNavigationHandler}
    />
  );
};
