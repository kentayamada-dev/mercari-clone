import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { HeaderBar } from "../../components/organisms/headerBar";
import { Settings } from "../../screens/settings";
import { SettingsStackParamList } from "../../types";

const SettingsStack = createStackNavigator<SettingsStackParamList>();

export const SettingsStackNavigator: React.VFC = () => {
  const { t } = useTranslation("common");

  return (
    <SettingsStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: true,
      }}
    >
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={() => ({
          header: (props) => (
            <HeaderBar
              goBackHandler={props.back ? props.navigation.goBack : undefined}
              title={t("settings")}
            />
          ),
        })}
      />
    </SettingsStack.Navigator>
  );
};
