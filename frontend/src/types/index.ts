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
  Selling: undefined;
};

export type MyPageStackParamList = {
  MyPage: undefined;
  Signup: undefined;
  SellerDetail: { sellerName?: string };
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type RootParamList = {
  HomeStackNavigator: undefined;
  NotificationsStackNavigator: undefined;
  SellingStackNavigator: undefined;
  MyPageStackNavigator: undefined;
  SettingsStackNavigator: undefined;
};

export type Extra = {
  API_URL: string;
  NODE_ENV: "development" | "production" | "storybook";
};

export interface ExtendedExpoConfig extends ExpoConfig {
  extra: Extra;
}
