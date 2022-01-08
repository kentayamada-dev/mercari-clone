import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  useColorModeValue,
  VStack,
  Image,
  Pressable,
  Skeleton,
  Box,
  HStack,
  Text,
  Link,
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
  imageUrl,
  isLoadingImage,
  addSeller,
  mutateAsyncImage,
  signinNavigationHandler,
}) => {
  const [isVisibile, setIsVisibile] = React.useState(false);
  const { t } = useTranslation("signup");
  const backgroundColor = typedUseColorModeValue(
    "brand.quaternary.light",
    "brand.quaternary.dark"
  );
  const color = typedUseColorToken(
    "brand.secondary.dark",
    "brand.secondary.light"
  );
  const linkColor = typedUseColorModeValue(
    "brand.tertiary.light",
    "brand.tertiary.dark"
  );

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
      if (fileInfo) {
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
    <Box flex={1} padding="5">
      <VStack flex={1} space={4}>
        <Pressable
          key={imageUrl}
          onPress={pickImage}
          _pressed={{
            opacity: 0.5,
          }}
        >
          {isLoadingImage ? (
            <Skeleton
              width="40"
              height="40"
              borderRadius="full"
              alignSelf="center"
            />
          ) : (
            <Box
              width="40"
              height="40"
              rounded="full"
              overflow="hidden"
              alignSelf="center"
            >
              <Image
                source={{
                  uri: imageUrl,
                }}
                alt="商品画像"
                width="full"
                height="full"
              />
            </Box>
          )}
        </Pressable>
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
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="emailAddress"
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
                autoCompleteType="password"
                secureTextEntry={isVisibile ? false : true}
                textContentType="newPassword"
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
      <HStack
        height="16"
        bgColor={backgroundColor}
        justifyContent="center"
        alignItems="center"
        space="xl"
      >
        <Text fontSize="md">{t("alreadyHaveAccount")}</Text>
        <Link
          onPress={signinNavigationHandler}
          _text={{
            color: linkColor,
            fontSize: "md",
          }}
        >
          {t("login")}
        </Link>
      </HStack>
    </Box>
  );
};
