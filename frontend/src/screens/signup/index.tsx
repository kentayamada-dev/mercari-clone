import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { AuthStackParamList } from "../../types";
import { useForm } from "react-hook-form";
import { SignupTemplate } from "../../components/templates/singup";
import { usePostToken, usePostImage } from "../../hooks/common/mutation";
import { usePostSeller } from "../../hooks/sellers/mutation";
import { SellerCreate } from "../../types/generated";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";
import { useToast } from "native-base";
import { CustomAlert } from "../../components/molecules/customAlert";
import { useTranslation } from "react-i18next";
import { getAlert } from "../../modules";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;

export const Signup: React.VFC<Props> = ({ navigation }) => {
  const randomString = React.useMemo(() => {
    return Math.random().toString(36).substring(2, 7);
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<SellerCreate>({
    mode: "onChange",
    defaultValues: {
      image_url: `https://avatars.dicebear.com/api/identicon/${randomString}.png`,
      name: undefined,
      email: undefined,
      password: undefined,
    },
  });
  const toast = useToast();
  const { t } = useTranslation("signup");

  const { mutateAsync: mutateAsyncSeller, isLoading: isLoadingSeller } =
    usePostSeller({
      onError: () =>
        getAlert(
          toast,
          <CustomAlert
            status="error"
            onPressCloseButton={() => toast.closeAll()}
            text={t("emailError")}
          />
        ),
    });

  const { mutateAsync: mutateAsyncSecret, isLoading: isLoadingSecret } =
    usePostToken({
      onSuccess: async (data) => {
        await SecureStore.setItemAsync("userToken", data.access_token);
        Updates.reloadAsync();
      },
      onError: () =>
        getAlert(
          toast,
          <CustomAlert
            status="error"
            onPressCloseButton={() => toast.closeAll()}
            text={t("tokenError")}
          />
        ),
    });

  const { mutateAsync: mutateAsyncImage, isLoading: isLoadingImage } =
    usePostImage({
      onSuccess: async (data) => {
        setValue("image_url", data.url);
      },
      onError: () =>
        getAlert(
          toast,
          <CustomAlert
            status="error"
            onPressCloseButton={() => toast.closeAll()}
            text={t("imageError")}
          />
        ),
    });

  const addSeller = handleSubmit(async (data) => {
    data.email = data.email.toLowerCase();
    await mutateAsyncSeller(data);
    await mutateAsyncSecret({
      password: data.password,
      username: data.email,
    });
  });

  const uploadImage = async (formData: FormData) => {
    await mutateAsyncImage(formData);
  };

  const signinNavigationHandler = () => navigation.navigate("Signin");

  return (
    <SignupTemplate
      isLoading={isLoadingSeller || isLoadingSecret}
      isLoadingImage={isLoadingImage}
      control={control}
      errors={errors}
      isValid={isValid}
      addSeller={addSeller}
      uploadImage={uploadImage}
      imageUrl={getValues("image_url")}
      signinNavigationHandler={signinNavigationHandler}
    />
  );
};
