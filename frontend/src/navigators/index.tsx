import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootParamList } from "../types";
import { NotificationsStackNavigator } from "./notificationsStack";
import { Ionicons } from "@expo/vector-icons";
import { useColorModeValue } from "native-base";
import { useTranslation } from "react-i18next";
import { HomeStackNavigator } from "./homeStack";
import { SellingStackNavigator } from "./sellingStack";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<RootParamList>();

export const RootNavigator: React.VFC = () => {
  const { t } = useTranslation("common");

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: useColorModeValue("#222", "#fff"),
        tabBarStyle: {
          backgroundColor: useColorModeValue("#fff", "#222"),
          borderTopColor: useColorModeValue("#222", "#fff"),
        },
      }}
    >
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: t("home"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsStackNavigator"
        component={NotificationsStackNavigator}
        options={{
          tabBarLabel: t("notifications"),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name={focused ? "bell" : "bell-o"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SellingStackNavigator"
        component={SellingStackNavigator}
        options={{
          tabBarLabel: t("selling"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "camera-sharp" : "camera-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
