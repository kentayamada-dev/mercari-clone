import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageTemplate } from "../../components/templates/myPage";
import { useAuth } from "../../hooks/auth/useAuth";
import { useQueryMe } from "../../hooks/users/query";
import { MyPageStackParamList } from "../../types";

type Props = NativeStackScreenProps<MyPageStackParamList, "MyPage">;

export const MyPage: React.VFC<Props> = ({ navigation }) => {
  const { token } = useAuth();
  const { data: user } = useQueryMe(token);
  const signupNavigationHandler = () => {
    if (token) {
      navigation.navigate("UserDetail", { userName: user?.name });
    } else {
      navigation.navigate("AuthStackNavigator", {
        screen: "Signup",
      });
    }
  };

  return (
    <MyPageTemplate
      userName={user?.name}
      avaterUrl={user?.image_url}
      signupNavigationHandler={signupNavigationHandler}
    />
  );
};
