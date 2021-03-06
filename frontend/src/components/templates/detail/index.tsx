import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { wait } from "../../../modules";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../theme/modules";
import { ItemDetailTemplateProps } from "./types";
import { Entypo } from "@expo/vector-icons";
import { ItemDetailLabel } from "../../molecules/itemDetailLabel";

export const ItemDetailTemplate: React.VFC<ItemDetailTemplateProps> = ({
  isModalVisible,
  isItemLoading,
  isSold,
  item,
  isItemLiked,
  numLikes,
  addLike,
  removeLike,
  placeOrder,
  closeModal,
  userDetailNavigationHandler,
}) => {
  const backgroundColor = typedUseColorToken(
    "brand.quaternary.light",
    "brand.quaternary.dark"
  );
  const textColor = typedUseColorToken(
    "brand.quaternary.dark",
    "brand.quaternary.light"
  );
  const iconColor = typedUseColorToken(
    "brand.primary.light",
    "brand.primary.dark"
  );
  const color = typedUseColorModeValue(
    "brand.primary.light",
    "brand.primary.dark"
  );
  const bgColor = typedUseColorModeValue(
    "brand.secondary.light",
    "brand.secondary.dark"
  );
  const colorToken = typedUseColorToken(
    "brand.secondary.light",
    "brand.secondary.light"
  );
  const modalBgColor = typedUseColorModeValue(
    "brand.quaternary.dark:alpha.80",
    "brand.quaternary.light:alpha.30"
  );
  const buttonColor = typedUseColorModeValue("buttonLight", "buttonDark");
  const { t } = useTranslation("itemDetail");
  const [isLoading, setIsLoading] = React.useState(false);
  const onPressHandler = async () => {
    if (!isLoading) {
      setIsLoading(true);
      if (isItemLiked) {
        removeLike();
      } else {
        addLike();
      }
      await wait(0.5);
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1}>
      <ScrollView>
        {isItemLoading ? (
          <Skeleton
            width="full"
            _android={{
              height: 400,
            }}
            _ios={{
              height: 500,
            }}
          />
        ) : (
          <Box position="relative" overflow="hidden">
            <Image
              _android={{
                size: 400,
              }}
              _ios={{
                size: 500,
              }}
              resizeMode="contain"
              source={{
                uri: item?.image_url,
              }}
              backgroundColor={backgroundColor}
              alt="image"
            />
            {isSold && (
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                width="40"
                height="24"
                bg={color}
                position="absolute"
                top="-30"
                left="-60"
                style={[
                  {
                    transform: [{ rotate: "-45deg" }],
                  },
                ]}
              >
                <Text
                  color="white"
                  fontWeight="bold"
                  margin="0.5"
                  fontSize="2xl"
                >
                  SOLD
                </Text>
              </Box>
            )}
          </Box>
        )}
        <VStack space="3" padding="5">
          {isItemLoading ? (
            <VStack space={1}>
              <Skeleton width="full" height="8" />
            </VStack>
          ) : (
            <Text fontSize="xl">{item?.name}</Text>
          )}
          {isItemLoading ? (
            <Skeleton width="30%" height="16" />
          ) : (
            <Text fontSize="4xl" color={color}>
              ??{item?.price}
            </Text>
          )}
          <HStack space="12">
            {isItemLoading ? (
              <Skeleton width="40" height="12" />
            ) : (
              <HStack alignItems="center" space="2">
                <Button
                  onPress={onPressHandler}
                  backgroundColor={backgroundColor}
                  width="32"
                  height="12"
                  borderRadius="full"
                  leftIcon={
                    <FontAwesome
                      name={isItemLiked ? "heart" : "heart-o"}
                      size={24}
                      color={isItemLiked ? iconColor : textColor}
                    />
                  }
                >
                  <Text>{t("like")}</Text>
                </Button>
                <Text fontSize="lg">{numLikes}</Text>
              </HStack>
            )}
            {isItemLoading ? (
              <Skeleton width="40" height="12" />
            ) : (
              <HStack alignItems="center" space="2">
                <Button
                  backgroundColor={backgroundColor}
                  width="32"
                  height="12"
                  borderRadius="full"
                  leftIcon={
                    <FontAwesome5
                      name="comment-alt"
                      size={24}
                      color={textColor}
                    />
                  }
                >
                  <Text>{t("comment")}</Text>
                </Button>
                <Text fontSize="lg">0</Text>
              </HStack>
            )}
          </HStack>
        </VStack>
        <ItemDetailLabel label="???????????????" />
        <Box padding="5">
          <Text fontSize="lg">{item?.description}</Text>
        </Box>
        <ItemDetailLabel label="?????????" />
        <Pressable
          _pressed={{
            opacity: 0.5,
          }}
          onPress={userDetailNavigationHandler}
        >
          <HStack padding="5" space={5} alignItems="center">
            <Box width="16" height="16">
              {isItemLoading ? (
                <Skeleton
                  width="full"
                  height="full"
                  borderRadius="full"
                  alignSelf="center"
                />
              ) : (
                <Avatar
                  size="full"
                  backgroundColor="transparent"
                  source={{
                    uri: item?.user.image_url,
                  }}
                >
                  avatar
                </Avatar>
              )}
            </Box>
            {isItemLoading ? (
              <Skeleton width="48" height="10" />
            ) : (
              <Text fontSize="2xl" bold>
                {item?.user.name}
              </Text>
            )}
          </HStack>
        </Pressable>
        <Box height="8" width="full" backgroundColor={backgroundColor} />
      </ScrollView>
      <HStack
        bgColor={bgColor}
        _android={{
          margin: 5,
        }}
        _ios={{
          margin: 8,
        }}
      >
        {isItemLoading ? (
          <Skeleton width="96" height="16" />
        ) : (
          <Button
            width="full"
            height="16"
            colorScheme={`${buttonColor}`}
            disabled={isSold}
            opacity={isSold ? "0.4" : "1"}
            onPress={placeOrder}
          >
            <Text fontSize="2xl" bold color="brand.secondary.light">
              {isSold ? t("sold") : t("buyNow")}
            </Text>
          </Button>
        )}
      </HStack>
      <Modal isOpen={isModalVisible} animationPreset="slide" safeAreaTop>
        <Box bg={modalBgColor} width="full" height="full">
          <Pressable
            justifyContent="center"
            alignItems="center"
            width="20"
            height="20"
            onPress={closeModal}
            _pressed={{
              opacity: "0.3",
            }}
          >
            <Entypo name="cross" size={80} color={colorToken} />
          </Pressable>
          <Center height="80%">
            <VStack space={4}>
              <Text fontSize="4xl" bold color={colorToken}>
                {t("purchaseCompleted")}
              </Text>
            </VStack>
          </Center>
        </Box>
      </Modal>
    </Box>
  );
};
