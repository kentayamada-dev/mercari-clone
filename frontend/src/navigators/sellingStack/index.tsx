import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { HeaderBar } from "../../components/organisms/headerBar";
import { Selling } from "../../screens/selling";
import { SellingDetail } from "../../screens/sellingDetail";
import { SellingStackParamList } from "../../types";

const SellingStack = createStackNavigator<SellingStackParamList>();

export const SellingStackNavigator: React.VFC = () => {
  const { t } = useTranslation(["common", "sellingDetail"]);

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
              title={t("common:selling")}
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
              title={t("sellingDetail:inputItemDetail")}
            />
          ),
        })}
      />
    </SellingStack.Navigator>
  );
};
