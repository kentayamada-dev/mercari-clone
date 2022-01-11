import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { RootParamList } from "../types";
import { AppStackNavigator } from "./appStack";
import { AuthStackNavigator } from "./authStack";
import { ItemDetailStackNavigator } from "./itemDetailStack";

const Tab = createStackNavigator<RootParamList>();

export const RootNavigator: React.VFC = () => {
  const { token } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="AppStackNavigator" component={AppStackNavigator} />
      <Tab.Screen
        name="ItemDetailStackNavigator"
        component={ItemDetailStackNavigator}
      />
      {!token && (
        <Tab.Screen name="AuthStackNavigator" component={AuthStackNavigator} />
      )}
    </Tab.Navigator>
  );
};
