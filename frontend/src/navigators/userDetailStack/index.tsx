import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderBar } from "../../components/organisms/headerBar";
import { UserDetail } from "../../screens/userDetail";
import { UserDetailStackParamList } from "../../types";

const UserDetailStack = createStackNavigator<UserDetailStackParamList>();

export const UserDetailStackNavigator: React.VFC = () => {
  return (
    <UserDetailStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: true,
      }}
    >
      <UserDetailStack.Screen
        options={({ route }) => ({
          header: (props) => (
            <HeaderBar
              goBackHandler={props.back ? props.navigation.goBack : undefined}
              title={route.params.userName}
            />
          ),
        })}
        name="UserDetail"
        component={UserDetail}
      />
    </UserDetailStack.Navigator>
  );
};
