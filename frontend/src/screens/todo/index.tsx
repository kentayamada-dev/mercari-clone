import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { HomeStackParamList } from "../../types";
import { Text } from "native-base";

type Props = NativeStackScreenProps<HomeStackParamList, "Todo">;

export const Todo: React.VFC<Props> = () => {
  return <Text>Todo</Text>;
};
