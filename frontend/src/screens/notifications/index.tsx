import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { SignupTemplate } from "../../components/templates/singup";
import { useAuth } from "../../hooks/auth/useAuth";
import { axiosPostWrapper } from "../../hooks/modules/mutation";
import { HomeStackParamList } from "../../types";
import {
  BodyCreateTokenTokenPost,
  ImageModel,
  Secret,
  Seller,
  SellerCreate,
} from "../../types/generated";

type Props = NativeStackScreenProps<HomeStackParamList, "Notifications">;

export const Notifications: React.VFC<Props> = () => {
  const { dispatch } = useAuth();
  const {
    control,
    handleSubmit,
    watch,
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
    useMutation<Seller, Error, SellerCreate>((data) =>
      axiosPostWrapper<SellerCreate>("sellers", data)
    );

  const { mutateAsync: mutateAsyncSecret, isLoading: isLoadingSecret } =
    useMutation<Secret, Error, BodyCreateTokenTokenPost>(
      (data) =>
        axiosPostWrapper<string>(
          "token",
          `grant_type=&username=${data.username}&password=${data.password}&scope=&client_id=&client_secret=`
        ),
      {
        onSuccess: async (data) => {
          await SecureStore.setItemAsync("userToken", data.access_token);
          dispatch({ type: "SIGN_IN", token: data.access_token });
        },
      }
    );

  const { mutateAsync: mutateAsyncImage, isLoading: isLoadingImage } =
    useMutation<ImageModel, Error, FormData>(
      (data) =>
        axiosPostWrapper<FormData>("image/upload", data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }),
      {
        onSuccess: async (data) => {
          setValue("image_url", data.url);
        },
      }
    );

  const addSeller = handleSubmit(async (data) => {
    await mutateAsyncSeller(data);
    await mutateAsyncSecret({
      password: data.password,
      username: data.email,
    });
  });

  const watchAllFields = watch();
  console.log(watchAllFields);

  return (
    <SignupTemplate
      isLoading={isLoadingSeller || isLoadingSecret}
      control={control}
      errors={errors}
      isValid={isValid}
      addSeller={addSeller}
      mutateAsyncImage={mutateAsyncImage}
      imageUrl={getValues("image_url")}
    />
  );
};
