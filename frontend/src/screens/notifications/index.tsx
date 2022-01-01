import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "native-base";
import { HomeStackParamList } from "../../types";
import React from "react";

type Props = NativeStackScreenProps<HomeStackParamList, "Notifications">;

export const Notifications: React.VFC<Props> = () => {
  return <Text>notification</Text>;
};
