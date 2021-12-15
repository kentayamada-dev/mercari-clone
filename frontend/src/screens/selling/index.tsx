import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "native-base";
import React from "react";
import { HomeStackParamList } from "../../types";

type Props = NativeStackScreenProps<HomeStackParamList, "Selling">;

export const Selling: React.VFC<Props> = () => {
  return <Text>Selling</Text>;
};
