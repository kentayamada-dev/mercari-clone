import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { RootParamList } from "../types";
import { AppStackNavigator } from "./appStack";
import { AuthStackNavigator } from "./authStack";
import { ItemDetailStackNavigator } from "./itemDetailStack";
import { UserDetailStackNavigator } from "./userDetailStack";

const RootStack = createStackNavigator<RootParamList>();

export const RootNavigator: React.VFC = () => {
  const { token } = useAuth();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen
        name="AppStackNavigator"
        component={AppStackNavigator}
      />
      <RootStack.Screen
        name="ItemDetailStackNavigator"
        component={ItemDetailStackNavigator}
      />
      <RootStack.Screen
        name="UserDetailStackNavigator"
        component={UserDetailStackNavigator}
      />
      {!token && (
        <RootStack.Screen
          name="AuthStackNavigator"
          component={AuthStackNavigator}
        />
      )}
    </RootStack.Navigator>
  );
};
