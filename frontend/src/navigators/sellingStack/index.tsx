import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { HeaderBar } from "../../components/organisms/headerBar";
import { Selling } from "../../screens/selling";
import { SellingDetail } from "../../screens/sellingDetail";
import { SellingStackParamList } from "../../types";

const SellingStack = createStackNavigator<SellingStackParamList>();

export const SellingStackNavigator: React.VFC = () => {
  const { t } = useTranslation("common");

  return (
    <SellingStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: true,
      }}
    >
      <SellingStack.Screen
        name="Selling"
        component={Selling}
        options={({ route }) => ({
          animationEnabled: !route.params?.itemId && !route.params?.itemName,
          header: (props) => (
            <HeaderBar
              goBackHandler={props.back ? props.navigation.goBack : undefined}
              title={t("selling")}
            />
          ),
        })}
      />
      <SellingStack.Screen
        name="SellingDetail"
        component={SellingDetail}
        options={() => ({
          header: (props) => (
            <HeaderBar
              goBackHandler={props.navigation.goBack}
              title="商品の情報を入力"
            />
          ),
        })}
      />
    </SellingStack.Navigator>
  );
};
