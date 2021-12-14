import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "native-base";
import React from "react";
import { HomeStackParamList } from "../../types";

type Props = NativeStackScreenProps<HomeStackParamList, "Detail">;

export const Detail: React.VFC<Props> = ({ route }) => {
  return <Text>Detail: {route.params.itemId}</Text>;
};
