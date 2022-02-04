import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Center,
  Icon,
  Pressable,
  ScrollView,
  Text,
  Image,
} from "native-base";
import React from "react";
import { typedUseColorToken } from "../../../theme/modules";
import { ItemsList } from "../../organisms/itemsList";
import { Item } from "../../organisms/itemsList/types";
import { MyPageTemplateProps } from "./types";

const items: Item[] = [
  {
    label: "いいね!・閲覧履歴",
    onPressHandler: () => null,
  },
  {
    label: "保存した検索条件",
    onPressHandler: () => null,
  },
  {
    label: "出品した商品",
    onPressHandler: () => null,
  },
  {
    label: "購入した商品",
    onPressHandler: () => null,
  },
  {
    label: "下書き一覧",
    onPressHandler: () => null,
  },
  {
    label: "持ち物一覧",
    onPressHandler: () => null,
  },
];

export const MyPageTemplate: React.VFC<MyPageTemplateProps> = ({
  signupNavigationHandler,
  avaterUrl,
  userName,
}) => {
  const backgroundColor = typedUseColorToken(
    "brand.quaternary.light",
    "brand.quaternary.dark"
  );
  const bgColor = typedUseColorToken(
    "brand.secondary.light",
    "brand.secondary.dark"
  );

  return (
    <Box flex={1}>
      <ScrollView>
        <Pressable onPress={signupNavigationHandler}>
          {({ isPressed }) => (
            <Center
              backgroundColor={isPressed ? backgroundColor : bgColor}
              padding="5"
              opacity="1"
            >
              {avaterUrl ? (
                <Box
                  width="20"
                  height="20"
                  rounded="full"
                  overflow="hidden"
                  alignSelf="center"
                >
                  <Image
                    source={{
                      uri: avaterUrl,
                    }}
                    alt="image"
                    width="full"
                    height="full"
                  />
                </Box>
              ) : (
                <Icon as={Ionicons} name="person-circle-outline" size="20" />
              )}
              <Text fontSize="xl" bold>
                {userName ? userName : "会員登録・ログインへ"}
              </Text>
            </Center>
          )}
        </Pressable>
        <Box height="10" width="full" backgroundColor={backgroundColor} />
        <ItemsList items={items} />
        <Box height="5" width="full" backgroundColor={backgroundColor} />
        <ItemsList items={items} label="サポート" />
      </ScrollView>
    </Box>
  );
};
