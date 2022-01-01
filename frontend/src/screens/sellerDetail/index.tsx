import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageStackParamList } from "../../types";
import { Text } from "native-base";
import { useAuth } from "../../hooks/auth/useAuth";
import { useQueryMe } from "../../hooks/sellers/query";

type Props = NativeStackScreenProps<MyPageStackParamList, "SellerDetail">;

export const SellerDetail: React.VFC<Props> = ({}) => {
  const { token } = useAuth();
  const { data: seller } = useQueryMe(token);
  return <Text>{seller?.name}</Text>;
};
