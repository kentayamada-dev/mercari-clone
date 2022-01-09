import { ExpoConfig } from "@expo/config";

export type HomeStackParamList = {
  Home: undefined;
  ItemDetail: { itemId: string; itemName: string };
  Todo: { userId: string };
  Notifications: undefined;
  Selling: undefined;
  MyPage: undefined;
  Settings: undefined;
};

export type NotificationStackParamList = {
  Notification: undefined;
};

export type SellingStackParamList = {
  AuthStackNavigator: {
    screen: "Signup";
  };
  Selling: undefined;
  SellingDetail: undefined;
};

export type AuthStackParamList = {
  Signup: undefined;
  Signin: undefined;
};

export type MyPageStackParamList = {
  MyPage: undefined;
  AuthStackNavigator: {
    screen: "Signup";
  };
  SellerDetail: { sellerName?: string };
  ItemDetail: { itemId: string; itemName: string };
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type AppStackParamList = {
  HomeStackNavigator: undefined;
  NotificationsStackNavigator: undefined;
  SellingStackNavigator: undefined;
  MyPageStackNavigator: undefined;
  SettingsStackNavigator: undefined;
};

export type RootParamList = {
  AppStackNavigator: undefined;
  AuthStackNavigator: undefined;
};

export type Extra = {
  API_URL: string;
  NODE_ENV: "development" | "production" | "storybook";
};

export interface ExtendedExpoConfig extends ExpoConfig {
  extra: Extra;
}
