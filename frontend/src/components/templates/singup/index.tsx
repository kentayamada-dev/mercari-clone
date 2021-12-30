import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  useColorModeValue,
  VStack,
  Avatar,
} from "native-base";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../theme/modules";
import { SignupTemplateProps } from "./types";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export const SignupTemplate: React.VFC<SignupTemplateProps> = ({
  isLoading,
  errors,
  control,
  isValid,
  addSeller,
  mutateAsyncImage,
  imageUrl,
}) => {
  const [isVisibile, setIsVisibile] = React.useState(false);
  const backgroundColor = typedUseColorModeValue(
    "brand.quaternary.light",
    "brand.quaternary.dark"
  );
  const color = typedUseColorToken(
    "brand.secondary.dark",
    "brand.secondary.light"
  );
  const { t } = useTranslation("signup");

  const getFileInfo = async (fileURI: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    return fileInfo;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileInfo = await getFileInfo(result.uri);
      if (fileInfo && fileInfo.size && fileInfo.size < 10000000) {
        const formData = new FormData();
        const filename =
          result.uri.split("/")[result.uri.split("/").length - 1];
        const type = `${result.type}/${
          result.uri.split(".")[result.uri.split(".").length - 1]
        }`;

        formData.append("file", {
          // @ts-ignore
          uri: result.uri,
          name: filename,
          type: type,
        });
        await mutateAsyncImage(formData);
      }
    }
  };

  return (
    <VStack space={4}>
      <Button onPress={pickImage}>画像選択</Button>
      <Avatar
        alignSelf="center"
        size="2xl"
        key={imageUrl}
        source={{
          uri: imageUrl,
        }}
      />
      <FormControl isInvalid={"name" in errors}>
        <FormControl.Label>{t("name")}</FormControl.Label>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              placeholder={t("name")}
              onChangeText={(val) => onChange(val)}
              value={value}
              variant="underlined"
              size="2xl"
            />
          )}
        />
        <FormControl.ErrorMessage>
          {errors.name?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={"email" in errors}>
        <FormControl.Label>{t("email")}</FormControl.Label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("invalidEmail"),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              placeholder={t("email")}
              onChangeText={(val) => onChange(val)}
              value={value}
              variant="underlined"
              size="2xl"
            />
          )}
        />
        <FormControl.ErrorMessage>
          {errors.email?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isInvalid={"password" in errors}>
        <FormControl.Label>{t("password")}</FormControl.Label>
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              placeholder={t("password")}
              onChangeText={(val) => onChange(val)}
              value={value}
              type={isVisibile ? "text" : "password"}
              variant="underlined"
              size="2xl"
              InputRightElement={
                <IconButton
                  onPress={() => setIsVisibile(!isVisibile)}
                  icon={
                    <MaterialIcons
                      name={isVisibile ? "visibility" : "visibility-off"}
                      size={24}
                      color={color}
                    />
                  }
                  borderRadius="full"
                  _pressed={{
                    bg: backgroundColor,
                  }}
                />
              }
            />
          )}
        />
        <FormControl.ErrorMessage>
          {errors.password?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        isLoading={isLoading}
        isLoadingText={t("registering")}
        borderRadius="full"
        size="lg"
        isDisabled={!isValid}
        onPress={addSeller}
        colorScheme={useColorModeValue("buttonLight", "buttonDark")}
      >
        {t("register")}
      </Button>
    </VStack>
  );
};
