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
import { wait } from "../../../modules";
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
  const buttonColor = typedUseColorModeValue("buttonLight", "buttonDark");
  const { t } = useTranslation("selling");
  const bgColor = typedUseColorModeValue(
    "brand.quaternary.dark:alpha.70",
    "brand.quaternary.light:alpha.40"
  );
  const color = typedUseColorToken(
    "brand.secondary.light",
    "brand.secondary.light"
  );

  React.useEffect(() => {
    const setModal = async () => {
      if (openModal) await wait(0.3);
      setModalVisible(openModal);
    };
    setModal();
  }, [openModal]);

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
            width="20"
            height="20"
            onPress={() => setModalVisible(false)}
            _pressed={{
              opacity: "0.3",
            }}
          >
            <Entypo name="cross" size={80} color={color} />
          </Pressable>
          <Center height="80%">
            <VStack space={4}>
              <Text fontSize="4xl" bold color={color}>
                {t("uploaded")}
              </Text>
              <Button
                height="12"
                onPress={sellingDetailNavigationHandler}
                colorScheme={`${buttonColor}`}
              >
                <Text bold color="brand.secondary.light" fontSize="md">
                  {t("continueUploading")}
                </Text>
              </Button>
              <Button
                height="12"
                onPress={itemDetailNavigationHandler}
                colorScheme={`${buttonColor}`}
              >
                <Text bold color="brand.secondary.light" fontSize="md">
                  {t("seeUploadedItems")}
                </Text>
              </Button>
            </VStack>
          </Center>
        </Box>
      </Modal>
    </Center>
  );
};
