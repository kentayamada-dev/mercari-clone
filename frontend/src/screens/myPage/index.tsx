import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageTemplate } from "../../components/templates/myPage";
import { useAuth } from "../../hooks/auth/useAuth";
import { useQueryMe } from "../../hooks/seller";
import { MyPageStackParamList } from "../../types";

type Props = NativeStackScreenProps<MyPageStackParamList, "MyPage">;

export const MyPage: React.VFC<Props> = ({ navigation }) => {
  const { state } = useAuth();
  const { data: seller, error } = useQueryMe(state.userToken);
  const signupNavigationHandler = React.useCallback(() => {
    navigation.navigate(state.userToken ? "SellerDetail" : "Signup");
  }, []);

  console.log(seller);

  return <MyPageTemplate signupNavigationHandler={signupNavigationHandler} />;
};
