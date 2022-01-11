import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageTemplate } from "../../components/templates/myPage";
import { useAuth } from "../../hooks/auth/useAuth";
import { useQueryMe } from "../../hooks/sellers/query";
import { MyPageStackParamList } from "../../types";

type Props = NativeStackScreenProps<MyPageStackParamList, "MyPage">;

export const MyPage: React.VFC<Props> = ({ navigation }) => {
  const { token } = useAuth();
  const { data: seller } = useQueryMe(token);
  const signupNavigationHandler = () => {
    if (token) {
      navigation.navigate("SellerDetail", { sellerName: seller?.name });
    } else {
      navigation.navigate("AuthStackNavigator", {
        screen: "Signup",
      });
    }
  };

  return (
    <MyPageTemplate
      sellerName={seller?.name}
      avaterUrl={seller?.image_url}
      signupNavigationHandler={signupNavigationHandler}
    />
  );
};
