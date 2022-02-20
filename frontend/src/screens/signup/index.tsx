import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { AuthStackParamList } from "../../types";
import { SignupTemplate } from "../../components/templates/singup";
import { usePostImage } from "../../hooks/common/mutation";
import { usePostUser } from "../../hooks/users/mutation";
import { CreateUser } from "../../types/generated";
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

  const { mutateAsync: mutateAsyncUser, isLoading: isLoadingUser } =
    usePostUser({
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
            text={t("emailError")}
          />
        ),
    });

  const { mutateAsync: mutateAsyncImage, isLoading: isLoadingImage } =
    usePostImage({
      onSuccess: (data) => setImageUrl(data.url),
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

  const addUser = React.useCallback(async (data: CreateUser) => {
    data.email = data.email.toLowerCase();
    await mutateAsyncUser(data);
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
      isLoading={isLoadingUser}
      isLoadingImage={isLoadingImage}
      imageUrl={imageUrl}
      addUser={addUser}
      uploadImage={uploadImage}
      signinNavigationHandler={signinNavigationHandler}
    />
  );
};
