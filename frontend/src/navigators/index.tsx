import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute, Route } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { typedUseColorToken } from "../theme/modules";
import { RootParamList } from "../types";
import { HomeStackNavigator } from "./homeStack";
import { NotificationsStackNavigator } from "./notificationsStack";
import { SellingStackNavigator } from "./sellingStack";

const getTabBarStyle = (
  route: Partial<Route<string, object | undefined>>
): "flex" | "none" => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  if (routeName === "Detail") return "none";

  return "flex";
};

const Tab = createBottomTabNavigator<RootParamList>();

export const RootNavigator: React.VFC = () => {
  const { t } = useTranslation("common");
  const color = typedUseColorToken(
    "brand.secondary.dark",
    "brand.secondary.light"
  );
  const bgColor = typedUseColorToken(
    "brand.secondary.light",
    "brand.secondary.dark"
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: color,
        tabBarStyle: {
          backgroundColor: bgColor,
          borderTopColor: color,
        },
      }}
    >
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarStyle(route),
            backgroundColor: bgColor,
            borderTopColor: color,
          },
          tabBarLabel: t("home"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        })}
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
