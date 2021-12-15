import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "native-base";
import React from "react";
import { HomeStackParamList } from "../../types";

type Props = NativeStackScreenProps<HomeStackParamList, "Notifications">;

export const Notifications: React.VFC<Props> = () => {
  return <Text>Notification</Text>;
};
