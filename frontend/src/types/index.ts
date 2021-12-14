import { ExpoConfig } from "@expo/config";

export type HomeStackParamList = {
  Home: undefined;
  Detail: { itemId: string };
  Todo: { userId: string };
  Notifications: undefined;
  Selling: undefined;
};

export type NotificationStackParamList = {
  Notification: undefined;
};

export type SellingStackParamList = {
  Selling: undefined;
};

export type RootParamList = {
  HomeStackNavigator: undefined;
  NotificationsStackNavigator: undefined;
  SellingStackNavigator: undefined;
};

export type Extra = {
  API_URL: string;
  NODE_ENV: "development" | "production" | "storybook";
};

export interface ExtendedExpoConfig extends ExpoConfig {
  extra: Extra;
}
