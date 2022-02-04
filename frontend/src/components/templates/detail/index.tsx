import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  Image,
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

export const ItemDetailTemplate: React.VFC<ItemDetailTemplateProps> = ({
  item,
  isItemLiked,
  numLikes,
  addLike,
  removeLike,
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
        {item?.image_url ? (
          <Image
            _android={{
              size: 400,
            }}
            _ios={{
              size: 500,
            }}
            resizeMode="contain"
            source={{
              uri: item.image_url,
            }}
            backgroundColor={backgroundColor}
            alt="image"
          />
        ) : (
          <Skeleton
            width="full"
            _android={{
              height: 400,
            }}
            _ios={{
              height: 500,
            }}
          />
        )}
        <VStack space="3" padding="5">
          {item?.name ? (
            <Text fontSize="xl">{item.name}</Text>
          ) : (
            <VStack space={1}>
              <Skeleton width="full" height="20px" />
              <Skeleton width="50%" height="20px" />
            </VStack>
          )}
          {item?.price ? (
            <Text fontSize="4xl" color={color}>
              ¥{item.price}
            </Text>
          ) : (
            <Skeleton width="30%" height="40px" />
          )}
          <HStack space="12">
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
              <Text fontSize="lg">{numLikes}</Text>
            </HStack>
          </HStack>
        </VStack>
      </ScrollView>
      <HStack
        justifyContent="center"
        space="5"
        safeAreaBottom
        _android={{
          height: "20",
        }}
        _ios={{
          height: "32",
        }}
        bgColor={bgColor}
        alignItems="center"
      >
        <Button
          width="30%"
          _android={{
            height: "12",
          }}
          _ios={{
            height: "16",
          }}
          variant="outline"
          colorScheme={`${buttonColor}`}
        >
          <Text
            _android={{
              fontSize: "sm",
            }}
            _ios={{
              fontSize: "lg",
            }}
            bold
            color={iconColor}
          >
            あと払いする
          </Text>
        </Button>
        <Button
          width="50%"
          _android={{
            height: "12",
          }}
          _ios={{
            height: "16",
          }}
          colorScheme={`${buttonColor}`}
        >
          <Text
            _android={{
              fontSize: "lg",
            }}
            _ios={{
              fontSize: "2xl",
            }}
            bold
            color="brand.secondary.light"
          >
            {t("buyNow")}
          </Text>
        </Button>
      </HStack>
    </Box>
  );
};
