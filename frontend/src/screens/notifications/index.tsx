import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "native-base";
import { NotificationStackParamList } from "../../types";
import React from "react";

type Props = NativeStackScreenProps<NotificationStackParamList, "Notification">;

export const Notifications: React.VFC<Props> = () => {
  return <Text>notification</Text>;
};
