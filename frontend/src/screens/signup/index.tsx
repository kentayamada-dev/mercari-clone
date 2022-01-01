import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MyPageStackParamList } from "../../types";
import { useForm } from "react-hook-form";
import { SignupTemplate } from "../../components/templates/singup";
import { usePostToken, usePostImage } from "../../hooks/modules/mutation";
import { usePostSeller } from "../../hooks/sellers/mutation";
import { SellerCreate } from "../../types/generated";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";

type Props = NativeStackScreenProps<MyPageStackParamList, "Signup">;

export const Signup: React.VFC<Props> = () => {
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

  const { mutateAsync: mutateAsyncSeller, isLoading: isLoadingSeller } =
    usePostSeller();

  const { mutateAsync: mutateAsyncSecret, isLoading: isLoadingSecret } =
    usePostToken({
      onSuccess: async (data) => {
        await SecureStore.setItemAsync("userToken", data.access_token);
        Updates.reloadAsync();
      },
    });

  const { mutateAsync: mutateAsyncImage, isLoading: isLoadingImage } =
    usePostImage({
      onSuccess: async (data) => {
        setValue("image_url", data.url);
      },
    });

  const addSeller = handleSubmit(async (data) => {
    await mutateAsyncSeller(data);
    await mutateAsyncSecret({
      password: data.password,
      username: data.email,
    });
  });

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
    />
  );
};
