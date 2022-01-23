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
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../theme/modules";
import { SignupTemplateProps } from "./types";
import { getRandomString, uploadImageHandler } from "../../../modules";
import { SellerCreate } from "../../../types/generated";

export const SignupTemplate: React.VFC<SignupTemplateProps> =
  React.memo<SignupTemplateProps>(
    ({
      isLoading,
      isLoadingImage,
      imageUrl,
      addSeller,
      uploadImage,
      signinNavigationHandler,
    }) => {
      const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isValid },
      } = useForm<SellerCreate>({
        mode: "onChange",
        defaultValues: {
          image_url: `https://avatars.dicebear.com/api/identicon/${getRandomString()}.png`,
          name: undefined,
          email: undefined,
          password: undefined,
        },
      });
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
      const warningColor = typedUseColorModeValue(
        "brand.primary.light",
        "brand.primary.dark"
      );
      const isEmailInvalid = "email" in errors;
      const isNameInvalid = "name" in errors;
      const isPasswordInvalid = "password" in errors;
      const avatarUri = getValues("image_url");

      React.useEffect(() => {
        if (imageUrl) setValue("image_url", imageUrl);
      }, [imageUrl]);

      return (
        <Box flex={1} padding="5">
          <VStack flex={1} space={4}>
            <Pressable
              key={avatarUri}
              onPress={async () => await uploadImageHandler(uploadImage)}
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
                      uri: avatarUri,
                    }}
                    alt="image"
                    width="full"
                    height="full"
                  />
                </Box>
              )}
            </Pressable>
            <FormControl isInvalid={isNameInvalid}>
              <FormControl.Label>{t("name")}</FormControl.Label>
              <Controller
                control={control}
                name="name"
                rules={{ required: t("nameRequired") }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    placeholder={t("name")}
                    onChangeText={(val) => onChange(val)}
                    value={value}
                    variant="underlined"
                    size="2xl"
                    _focus={{
                      borderColor: isNameInvalid ? warningColor : linkColor,
                    }}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                <Text color={warningColor}>{errors.name?.message}</Text>
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={isEmailInvalid}>
              <FormControl.Label>{t("email")}</FormControl.Label>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: t("emailRequired"),
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
                    _focus={{
                      borderColor: isEmailInvalid ? warningColor : linkColor,
                    }}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                <Text color={warningColor}>{errors.email?.message}</Text>
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={isPasswordInvalid}>
              <FormControl.Label>{t("password")}</FormControl.Label>
              <Controller
                control={control}
                name="password"
                rules={{ required: t("passwordRequired") }}
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
                    _focus={{
                      borderColor: isPasswordInvalid ? warningColor : linkColor,
                    }}
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
                <Text color={warningColor}>{errors.password?.message}</Text>
              </FormControl.ErrorMessage>
            </FormControl>
            <Button
              isLoading={isLoading}
              isLoadingText={t("registering")}
              borderRadius="full"
              size="lg"
              isDisabled={!isValid || isLoadingImage}
              onPress={handleSubmit(addSeller)}
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
    }
  );
