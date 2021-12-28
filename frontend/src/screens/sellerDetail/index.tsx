import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageStackParamList } from "../../types";
import { Text } from "native-base";

type Props = NativeStackScreenProps<MyPageStackParamList, "SellerDetail">;

export const SellerDetail: React.VFC<Props> = ({}) => {
  return <Text>SellerDetail</Text>;
};
