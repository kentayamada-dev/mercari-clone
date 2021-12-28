import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { SignupTemplate } from "../../components/templates/singup";
import { axiosPostWrapper } from "../../hooks/modules/mutation";
import { HomeStackParamList } from "../../types";
import {
  BodyCreateTokenTokenPost,
  Secret,
  Seller,
  SellerCreate,
} from "../../types/generated";

type Props = NativeStackScreenProps<HomeStackParamList, "Notifications">;

export const Notifications: React.VFC<Props> = () => {
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
        },
      }
    );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
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
      control={control}
      errors={errors}
      isValid={isValid}
      addSeller={addSeller}
    />
  );
};
