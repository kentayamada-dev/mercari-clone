import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { AuthStackParamList } from "../../types";
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
  const toast = useToast();
  const { t } = useTranslation("signup");
  const [imageUrl, setImageUrl] = React.useState("");

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
      onSuccess: async (data) => setImageUrl(data.url),
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

  const addSeller = React.useCallback(async (data: SellerCreate) => {
    data.email = data.email.toLowerCase();
    await mutateAsyncSeller(data);
    await mutateAsyncSecret({
      password: data.password,
      username: data.email,
    });
  }, []);

  const uploadImage = React.useCallback(async (formData: FormData) => {
    await mutateAsyncImage(formData);
  }, []);

  const signinNavigationHandler = React.useCallback(
    () => navigation.navigate("Signin"),
    []
  );

  return (
    <SignupTemplate
      isLoading={isLoadingSeller || isLoadingSecret}
      isLoadingImage={isLoadingImage}
      imageUrl={imageUrl}
      addSeller={addSeller}
      uploadImage={uploadImage}
      signinNavigationHandler={signinNavigationHandler}
    />
  );
};
