import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { AuthStackParamList } from "../../types";
import { useForm } from "react-hook-form";
import { SignupTemplate } from "../../components/templates/singup";
import { usePostToken, usePostImage } from "../../hooks/modules/mutation";
import { usePostSeller } from "../../hooks/sellers/mutation";
import { SellerCreate } from "../../types/generated";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";
import { useToast } from "native-base";
import { CustomAlert } from "../../components/molecules/customAlert";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;

export const Signup: React.VFC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<SellerCreate>({
    mode: "onChange",
    defaultValues: {
      image_url: "https://ui-avatars.com/api/?background=random",
      name: "",
      email: "",
      password: "",
    },
  });
  const toast = useToast();
  const { t } = useTranslation("signup");

  const { mutateAsync: mutateAsyncSeller, isLoading: isLoadingSeller } =
    usePostSeller();

  const { mutateAsync: mutateAsyncSecret, isLoading: isLoadingSecret } =
    usePostToken({
      onSuccess: async (data) => {
        await SecureStore.setItemAsync("userToken", data.access_token);
        Updates.reloadAsync();
      },
      AlertComponent: (
        <CustomAlert
          onPressCloseButton={() => toast.closeAll()}
          text={t("tokenError")}
        />
      ),
      toast,
    });

  const { mutateAsync: mutateAsyncImage, isLoading: isLoadingImage } =
    usePostImage({
      onSuccess: async (data) => {
        setValue("image_url", data.url);
      },
      AlertComponent: (
        <CustomAlert
          onPressCloseButton={() => toast.closeAll()}
          text={t("imageError")}
        />
      ),
      toast,
    });

  const addSeller = handleSubmit(async (data) => {
    data.email = data.email.toLowerCase();
    await mutateAsyncSeller(data);
    await mutateAsyncSecret({
      password: data.password,
      username: data.email,
    });
  });

  const signinNavigationHandler = React.useCallback(() => {
    navigation.navigate("Signin");
  }, []);

  return (
    <SignupTemplate
      isLoading={isLoadingSeller || isLoadingSecret}
      isLoadingImage={isLoadingImage}
      control={control}
      errors={errors}
      isValid={isValid}
      addSeller={addSeller}
      mutateAsyncImage={mutateAsyncImage}
      imageUrl={getValues("image_url")}
      signinNavigationHandler={signinNavigationHandler}
    />
  );
};
