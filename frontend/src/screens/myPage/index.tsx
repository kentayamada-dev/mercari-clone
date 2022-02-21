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
  const signupNavigationHandler = React.useCallback(() => {
    if (token && user) {
      navigation.navigate("UserDetailStackNavigator", {
        screen: "UserDetail",
        params: { userId: user.id, userName: user.name },
      });
    } else {
      navigation.navigate("AuthStackNavigator", {
        screen: "Signup",
      });
    }
  }, [token, user]);

  return (
    <MyPageTemplate
      userName={user?.name}
      avaterUrl={user?.image_url}
      signupNavigationHandler={signupNavigationHandler}
    />
  );
};
