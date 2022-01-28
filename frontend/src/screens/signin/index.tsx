import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { AuthStackParamList } from "../../types";
import { usePostToken } from "../../hooks/common/mutation";
import { BodyCreateTokenTokenPost } from "../../types/generated";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";
import { SigninTemplate } from "../../components/templates/singin";
import { useToast } from "native-base";
import { CustomAlert } from "../../components/molecules/customAlert";
import { useTranslation } from "react-i18next";
import { getAlert } from "../../modules";

type Props = NativeStackScreenProps<AuthStackParamList, "Signin">;

export const Signin: React.VFC<Props> = () => {
  const toast = useToast();
  const { t } = useTranslation("signin");

  const { mutateAsync: mutateAsyncSecret, isLoading: isLoadingSecret } =
    usePostToken({
      onSuccess: (data) => {
        SecureStore.setItemAsync("userToken", data.access_token);
        Updates.reloadAsync();
      },
      onError: () =>
        getAlert(
          toast,
          <CustomAlert
            status="error"
            onPressCloseButton={() => toast.closeAll()}
            text={t("signinError")}
          />
        ),
    });

  const addSeller = React.useCallback(
    async (data: BodyCreateTokenTokenPost) => {
      await mutateAsyncSecret({
        password: data.password,
        username: data.username.toLowerCase(),
      });
    },
    []
  );

  return <SigninTemplate isLoading={isLoadingSecret} addSeller={addSeller} />;
};
