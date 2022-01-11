import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageStackParamList } from "../../types";
import { useAuth } from "../../hooks/auth/useAuth";
import { useQueryMe } from "../../hooks/sellers/query";
import { SellerDetailTemplate } from "../../components/templates/sellerDetail";
import { useQueryClient } from "react-query";
import { wait } from "../../modules";
import { invalidateQueriesWrapper } from "../../hooks/common/query";

type Props = NativeStackScreenProps<MyPageStackParamList, "SellerDetail">;

export const SellerDetail: React.VFC<Props> = ({ navigation }) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = React.useState(false);
  const { data: seller, isFetching: isSellerFetching } = useQueryMe(token);
  const itemNavigationHandler = React.useCallback(
    (itemId: string, itemName: string) => {
      navigation.navigate("ItemDetailStackNavigator", {
        screen: "ItemDetail",
        params: { itemId: itemId, itemName: itemName },
      });
    },
    []
  );

  const onInvalidate = async () => {
    invalidateQueriesWrapper(queryClient, "sellers/me/");
    setRefreshing(true);
    await wait(1);
    setRefreshing(false);
  };

  return (
    <SellerDetailTemplate
      seller={seller}
      itemNavigationHandler={itemNavigationHandler}
      refetchSeller={onInvalidate}
      isSellerFetching={refreshing || isSellerFetching}
    />
  );
};
