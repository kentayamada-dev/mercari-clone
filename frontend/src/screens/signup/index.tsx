import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageStackParamList } from "../../types";
import { Text } from "native-base";

type Props = NativeStackScreenProps<MyPageStackParamList, "Signup">;

export const Signup: React.VFC<Props> = () => {
  return <Text>Signup</Text>;
};
