import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { HeaderBar } from "../../components/organisms/headerBar";
import { Signin } from "../../screens/signin";
import { Signup } from "../../screens/signup";
import { AuthStackParamList } from "../../types";

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthStackNavigator: React.VFC = () => {
  const { t } = useTranslation(["common", "myPage"]);

  return (
    <AuthStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: true,
      }}
    >
      <AuthStack.Screen
        options={() => ({
          header: (props) => (
            <HeaderBar
              goBackHandler={props.back ? props.navigation.goBack : undefined}
              title={t("myPage:signup")}
            />
          ),
        })}
        name="Signup"
        component={Signup}
      />
      <AuthStack.Screen
        options={() => ({
          header: (props) => (
            <HeaderBar
              goBackHandler={props.back ? props.navigation.goBack : undefined}
              title={t("myPage:signin")}
            />
          ),
        })}
        name="Signin"
        component={Signin}
      />
    </AuthStack.Navigator>
  );
};
