import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ItemDetailTemplate } from "../../components/templates/detail";
import { useQueryItem } from "../../hooks/items";
import { HomeStackParamList } from "../../types";

type Props = NativeStackScreenProps<HomeStackParamList, "ItemDetail">;

export const ItemDetail: React.VFC<Props> = ({
  route: {
    params: { itemId },
  },
}) => {
  const { data: item, error } = useQueryItem(itemId);

  return <ItemDetailTemplate item={item} />;
};
