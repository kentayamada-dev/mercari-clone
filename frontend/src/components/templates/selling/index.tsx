import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  Modal,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  typedUseColorModeValue,
  typedUseColorToken,
} from "../../../theme/modules";
import { SellingTemplateProps } from "./types";

export const SellingTemplate: React.VFC<SellingTemplateProps> = ({
  sellingDetailNavigationHandler,
  itemDetailNavigationHandler,
  openModal,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  React.useEffect(() => {
    setModalVisible(openModal);
  }, [openModal]);

  const buttonColor = typedUseColorModeValue("buttonLight", "buttonDark");
  const { t } = useTranslation("selling");
  const bgColor = typedUseColorModeValue(
    "brand.quaternary.dark:alpha.70",
    "brand.quaternary.light:alpha.30"
  );
  const color = typedUseColorToken(
    "brand.secondary.light",
    "brand.secondary.dark"
  );

  return (
    <Center flex={1}>
      <Button
        onPress={sellingDetailNavigationHandler}
        leftIcon={<Ionicons name="camera" size={24} color="white" />}
        colorScheme={`${buttonColor}`}
      >
        <Text bold color="brand.secondary.light">
          {t("upload")}
        </Text>
      </Button>
      <Modal isOpen={modalVisible} animationPreset="slide" safeAreaTop>
        <Box bg={bgColor} width="full" height="full">
          <Pressable
            justifyContent="center"
            alignItems="center"
            width="12"
            height="12"
            onPress={() => setModalVisible(false)}
            _pressed={{
              opacity: "0.3",
            }}
          >
            <Entypo name="cross" size={40} color={color} />
          </Pressable>
          <Center height="80%">
            <VStack space={4}>
              <Text fontSize="4xl" bold color={color}>
                出品が完了しました!
              </Text>
              <Button
                height="12"
                onPress={sellingDetailNavigationHandler}
                colorScheme={`${buttonColor}`}
              >
                <Text bold color="brand.secondary.light" fontSize="md">
                  続けて出品する
                </Text>
              </Button>
              <Button
                height="12"
                onPress={itemDetailNavigationHandler}
                colorScheme={`${buttonColor}`}
              >
                <Text bold color="brand.secondary.light" fontSize="md">
                  出品した商品を見る
                </Text>
              </Button>
            </VStack>
          </Center>
        </Box>
      </Modal>
    </Center>
  );
};
