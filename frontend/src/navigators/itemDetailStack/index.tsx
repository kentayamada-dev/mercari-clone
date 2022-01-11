import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderBar } from "../../components/organisms/headerBar";
import { ItemDetail } from "../../screens/itemDetail";
import { ItemDetailStackParamList } from "../../types";

const ItemDetailStack = createStackNavigator<ItemDetailStackParamList>();

export const ItemDetailStackNavigator: React.VFC = () => {
  return (
    <ItemDetailStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: true,
      }}
    >
      <ItemDetailStack.Screen
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
    </ItemDetailStack.Navigator>
  );
};
