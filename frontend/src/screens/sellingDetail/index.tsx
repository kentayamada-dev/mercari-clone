import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SellingDetailTemplate } from "../../components/templates/sellingDetail";
import { SellingStackParamList } from "../../types";

type Props = NativeStackScreenProps<SellingStackParamList, "SellingDetail">;

export const SellingDetail: React.VFC<Props> = ({}) => {
  return <SellingDetailTemplate />;
};
