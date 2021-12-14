import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Selling } from "../../screens/selling";
import { SellingStackParamList } from "../../types";

const SellingStack = createStackNavigator<SellingStackParamList>();

export const SellingStackNavigator: React.VFC = () => {
  return (
    <SellingStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <SellingStack.Screen name="Selling" component={Selling} />
    </SellingStack.Navigator>
  );
};
