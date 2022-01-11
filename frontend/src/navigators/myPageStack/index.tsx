import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { HeaderBar } from "../../components/organisms/headerBar";
import { MyPage } from "../../screens/myPage";
import { SellerDetail } from "../../screens/sellerDetail";
import { MyPageStackParamList } from "../../types";

const MyPageStack = createStackNavigator<MyPageStackParamList>();

export const MyPageStackNavigator: React.VFC = () => {
  const { t } = useTranslation(["common", "myPage"]);

  return (
    <MyPageStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: true,
      }}
    >
      <MyPageStack.Screen
        options={() => ({
          header: (props) => (
            <HeaderBar
              goBackHandler={props.back ? props.navigation.goBack : undefined}
              title={t("common:myPage")}
            />
          ),
        })}
        name="MyPage"
        component={MyPage}
      />
      <MyPageStack.Screen
        options={({ route }) => ({
          header: (props) => (
            <HeaderBar
              goBackHandler={props.back ? props.navigation.goBack : undefined}
              title={route.params.sellerName || ""}
            />
          ),
        })}
        name="SellerDetail"
        component={SellerDetail}
      />
    </MyPageStack.Navigator>
  );
};
