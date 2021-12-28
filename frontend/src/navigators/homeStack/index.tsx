import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderBar } from "../../components/organisms/headerBar";
import { ItemDetail } from "../../screens/itemDetail";
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
        name="ItemDetail"
        component={ItemDetail}
        options={({ route }) => ({
          header: (props) => (
            <HeaderBar
              goBackHandler={props.navigation.goBack}
              title={route.params.itemName}
            />
          ),
        })}
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
