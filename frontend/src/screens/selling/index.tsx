import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SellingTemplate } from "../../components/templates/selling";
import { useAuth } from "../../hooks/auth/useAuth";
import { SellingStackParamList } from "../../types";

type Props = NativeStackScreenProps<SellingStackParamList, "Selling">;

export const Selling: React.VFC<Props> = ({ navigation }) => {
  const { token } = useAuth();
  const sellingDetailNavigationHandler = React.useCallback(() => {
    if (token) {
      navigation.navigate("SellingDetail");
    } else {
      navigation.navigate("AuthStackNavigator", {
        screen: "Signup",
      });
    }
  }, []);

  return (
    <SellingTemplate
      sellingDetailNavigationHandler={sellingDetailNavigationHandler}
    />
  );
};
