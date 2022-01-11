import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Pressable,
  Skeleton,
  Text,
  useColorModeValue,
  VStack,
} from "native-base";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { uploadImageHandler } from "../../../modules";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../theme/modules";
import { SellingDetailTemplateProps } from "./types";

export const SellingDetailTemplate: React.VFC<SellingDetailTemplateProps> = ({
  imageUrl,
  uploadImage,
  isLoadingImage,
  errors,
  control,
  isLoading,
  addItem,
}) => {
  const backgroundColor = typedUseColorToken(
    "brand.quaternary.light",
    "brand.quaternary.dark"
  );
  const bgColor = typedUseColorModeValue(
    "brand.secondary.light",
    "brand.secondary.dark"
  );
  const linkColor = typedUseColorToken(
    "brand.tertiary.light",
    "brand.tertiary.dark"
  );
  const isNameInvalid = "name" in errors;
  const isDescriptionInvalid = "description" in errors;
  const isPriceInvalid = "price" in errors;
  const warningColor = typedUseColorModeValue(
    "brand.primary.light",
    "brand.primary.dark"
  );
  const { t } = useTranslation(["sellingDetail", "selling"]);

  return (
    <Box flex={1} bgColor={backgroundColor}>
      <VStack space={4} padding="5">
        <>
          <Text bold>商品画像</Text>
          <Pressable
            width="40"
            height="40"
            overflow="hidden"
            alignSelf="center"
            key={imageUrl}
            onPress={async () => await uploadImageHandler(uploadImage)}
            _pressed={{
              opacity: 0.5,
            }}
          >
            <>
              {isLoadingImage ? (
                <Skeleton width="full" height="full" />
              ) : (
                <>
                  {imageUrl ? (
                    <Image
                      source={{
                        uri: imageUrl,
                      }}
                      alt="image"
                      width="full"
                      height="full"
                    />
                  ) : (
                    <Avatar
                      bg={bgColor}
                      width="full"
                      height="full"
                      borderRadius="none"
                    >
                      <Ionicons name="camera" size={100} color={linkColor} />
                    </Avatar>
                  )}
                </>
              )}
            </>
          </Pressable>
        </>
        <FormControl isInvalid={isNameInvalid}>
          <Text bold>{t("sellingDetail:title")}</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: t("sellingDetail:titleRequired") }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
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
        <FormControl isInvalid={isDescriptionInvalid}>
          <Text bold>{t("sellingDetail:description")}</Text>
          <Controller
            control={control}
            name="description"
            rules={{ required: t("sellingDetail:descriptionRequired") }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={(val) => onChange(val)}
                value={value}
                variant="underlined"
                size="2xl"
                _focus={{
                  borderColor: isDescriptionInvalid ? warningColor : linkColor,
                }}
              />
            )}
          />
          <FormControl.ErrorMessage>
            <Text color={warningColor}>{errors.description?.message}</Text>
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={isPriceInvalid}>
          <Text bold>{t("sellingDetail:price")}</Text>
          <Controller
            control={control}
            name="price"
            rules={{
              min: 300,
              max: 9999999,
              required: true,
              pattern: /^[0-9]*$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                keyboardType="number-pad"
                type="number"
                onBlur={onBlur}
                onChangeText={(val) => onChange(val)}
                value={value}
                variant="underlined"
                size="2xl"
                _focus={{
                  borderColor: isPriceInvalid ? warningColor : linkColor,
                }}
              />
            )}
          />
          <FormControl.ErrorMessage>
            <Text color={warningColor}>
              {errors.price?.type === "pattern"
                ? t("sellingDetail:invalidPriceFormat")
                : errors.price?.type === "min" || errors.price?.type === "max"
                ? t("sellingDetail:priceRange")
                : t("sellingDetail:priceRequired")}
            </Text>
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          isLoading={isLoading}
          isDisabled={isLoadingImage}
          isLoadingText={t("sellingDetail:uploading")}
          borderRadius="full"
          size="lg"
          onPress={addItem}
          colorScheme={useColorModeValue("buttonLight", "buttonDark")}
        >
          {t("selling:upload")}
        </Button>
      </VStack>
    </Box>
  );
};
