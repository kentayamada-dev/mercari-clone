import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Notifications } from "../../screens/notifications";
import { NotificationStackParamList } from "../../types";

const NotificationStack = createStackNavigator<NotificationStackParamList>();

export const NotificationsStackNavigator: React.VFC = () => {
  return (
    <NotificationStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <NotificationStack.Screen name="Notification" component={Notifications} />
    </NotificationStack.Navigator>
  );
};
