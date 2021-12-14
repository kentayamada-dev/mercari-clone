import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Detail } from "../../screens/detail";
import { Home } from "../../screens/home";
import { Todo } from "../../screens/todo";
import { HomeStackParamList } from "../../types";

const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.VFC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Detail" component={Detail} />
      <HomeStack.Screen name="Todo" component={Todo} />
    </HomeStack.Navigator>
  );
};
