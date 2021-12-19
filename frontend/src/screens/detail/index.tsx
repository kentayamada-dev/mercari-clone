import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { DetailTemplate } from "../../components/templates/detail";
import { useQueryItem } from "../../hooks/item";
import { HomeStackParamList } from "../../types";

type Props = NativeStackScreenProps<HomeStackParamList, "Detail">;

export const Detail: React.VFC<Props> = ({
  route: {
    params: { itemId },
  },
}) => {
  const { data: item } = useQueryItem(itemId);

  return <DetailTemplate item={item} />;
};
