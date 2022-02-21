import { ExpoConfig } from "@expo/config";
import { NavigatorScreenParams } from "@react-navigation/native";

export type OverrideType<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};

export type HomeStackParamList = {
  AuthStackNavigator: NavigatorScreenParams<AuthStackParamList>;
  ItemDetailStackNavigator: NavigatorScreenParams<ItemDetailStackParamList>;
  Home: undefined;
  Todo: { userId: string };
  SearchResults: { query: string };
};

export type NotificationStackParamList = {
  Notification: undefined;
};

export type SellingStackParamList = {
  AuthStackNavigator: NavigatorScreenParams<AuthStackParamList>;
  Selling: { itemId: string; itemName: string } | undefined;
  SellingDetail: undefined;
  ItemDetailStackNavigator: NavigatorScreenParams<ItemDetailStackParamList>;
};

export type AuthStackParamList = {
  Signup: undefined;
  Signin: undefined;
};

export type MyPageStackParamList = {
  MyPage: undefined;
  AuthStackNavigator: NavigatorScreenParams<AuthStackParamList>;
  ItemDetailStackNavigator: NavigatorScreenParams<ItemDetailStackParamList>;
  UserDetailStackNavigator: NavigatorScreenParams<UserDetailStackParamList>;
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type ItemDetailStackParamList = {
  AuthStackNavigator: NavigatorScreenParams<AuthStackParamList>;
  ItemDetail: { itemId: string; itemName: string };
  UserDetail: { userName: string; userId: string };
  UserDetailStackNavigator: NavigatorScreenParams<UserDetailStackParamList>;
};

export type UserDetailStackParamList = {
  UserDetail: { userName: string; userId: string };
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
  ItemDetailStackNavigator: undefined;
  UserDetailStackNavigator: undefined;
};

export type Extra = {
  API_URL: string;
  NODE_ENV: "development" | "production" | "storybook";
};

export interface ExtendedExpoConfig extends ExpoConfig {
  extra: Extra;
}
