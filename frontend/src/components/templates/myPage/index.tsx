import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Center,
  Icon,
  Pressable,
  ScrollView,
  Text,
  Avatar,
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
        <Pressable
          onPress={signupNavigationHandler}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Center backgroundColor={bgColor} padding="5">
            <Box width="24" height="24">
              {avaterUrl ? (
                <Avatar
                  width="full"
                  height="full"
                  backgroundColor="transparent"
                  source={{
                    uri: avaterUrl,
                  }}
                >
                  avatar
                </Avatar>
              ) : (
                <Icon as={Ionicons} name="person-circle-outline" size="24" />
              )}
            </Box>
            <Text fontSize="xl" bold>
              {userName ? userName : "会員登録・ログインへ"}
            </Text>
          </Center>
        </Pressable>
        <Box height="10" width="full" backgroundColor={backgroundColor} />
        <ItemsList items={items} />
        <Box height="5" width="full" backgroundColor={backgroundColor} />
        <ItemsList items={items} label="サポート" />
      </ScrollView>
    </Box>
  );
};
