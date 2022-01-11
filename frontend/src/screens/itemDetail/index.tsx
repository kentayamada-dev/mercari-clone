import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ItemDetailTemplate } from "../../components/templates/detail";
import { useQueryItem } from "../../hooks/items/query";
import { ItemDetailStackParamList } from "../../types";

type Props = NativeStackScreenProps<ItemDetailStackParamList, "ItemDetail">;

export const ItemDetail: React.VFC<Props> = ({
  route: {
    params: { itemId },
  },
}) => {
  const { data: item } = useQueryItem(itemId);

  return <ItemDetailTemplate item={item} />;
};
