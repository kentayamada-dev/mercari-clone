import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderBar } from "../../components/organisms/headerBar";
import { Home } from "../../screens/home";
import { Todo } from "../../screens/todo";
import { HomeStackParamList } from "../../types";

const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.VFC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Todo"
        component={Todo}
        options={() => ({
          header: (props) => (
            <HeaderBar goBackHandler={props.navigation.goBack} title="Todo" />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};
