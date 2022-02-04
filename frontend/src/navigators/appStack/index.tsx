import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute, Route } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { typedUseColorToken } from "../../theme/modules";
import { AppStackParamList } from "../../types";
import { HomeStackNavigator } from "../homeStack";
import { MyPageStackNavigator } from "../myPageStack";
import { NotificationsStackNavigator } from "../notificationsStack";
import { SellingStackNavigator } from "../sellingStack";
import { SettingsStackNavigator } from "../settingsStack";

const getTabBarStyle = (
  route: Partial<Route<string, object | undefined>>
): "flex" | "none" => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  if (
    routeName === "ItemDetail" ||
    routeName === "UserDetail" ||
    routeName === "SearchResults"
  )
    return "none";

  return "flex";
};

const Tab = createBottomTabNavigator<AppStackParamList>();

export const AppStackNavigator: React.VFC = () => {
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
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
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
            borderTopWidth: 0,
            elevation: 0,
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
      <Tab.Screen
        name="MyPageStackNavigator"
        component={MyPageStackNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarStyle(route),
            backgroundColor: bgColor,
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarLabel: t("myPage"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name="SettingsStackNavigator"
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: t("settings"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
