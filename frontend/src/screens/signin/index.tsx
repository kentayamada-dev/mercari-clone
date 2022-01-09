import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { AuthStackParamList } from "../../types";
import { useForm } from "react-hook-form";
import { usePostToken } from "../../hooks/modules/mutation";
import { BodyCreateTokenTokenPost } from "../../types/generated";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";
import { SigninTemplate } from "../../components/templates/singin";
import { useToast } from "native-base";
import { CustomAlert } from "../../components/molecules/customAlert";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<AuthStackParamList, "Signin">;

export const Signin: React.VFC<Props> = () => {
  const toast = useToast();
  const { t } = useTranslation("signin");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BodyCreateTokenTokenPost>({
    mode: "onChange",
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const { mutateAsync: mutateAsyncSecret, isLoading: isLoadingSecret } =
    usePostToken({
      onSuccess: async (data) => {
        await SecureStore.setItemAsync("userToken", data.access_token);
        Updates.reloadAsync();
      },
      AlertComponent: (
        <CustomAlert
          onPressCloseButton={() => toast.closeAll()}
          text={t("signinError")}
        />
      ),
      toast,
    });

  const addSeller = handleSubmit(async (data) => {
    await mutateAsyncSecret({
      password: data.password,
      username: data.username.toLowerCase(),
    });
  });

  return (
    <SigninTemplate
      isLoading={isLoadingSecret}
      control={control}
      errors={errors}
      isValid={isValid}
      addSeller={addSeller}
    />
  );
};
