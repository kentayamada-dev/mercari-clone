import { UserDetailTemplateProps } from "./types";
import {
  Box,
  Icon,
  HStack,
  ScrollView,
  Text,
  Image,
  Divider,
  Flex,
  VStack,
  Center,
} from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ItemsTable } from "../../organisms/itemsTable";
import { typedUseColorToken } from "../../../theme/modules";
import { RefreshControl, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";

export const UserDetailTemplate: React.VFC<UserDetailTemplateProps> = ({
  user,
  isUserFetching,
  refetchUser,
  itemNavigationHandler,
}) => {
  const [visibleRefreshing, setVisibleRefreshing] = React.useState(false);
  const backgroundColor = typedUseColorToken(
    "brand.quaternary.light",
    "brand.quaternary.dark"
  );
  const { width } = useWindowDimensions();
  const { t } = useTranslation("userDetail");
  const tintColor = typedUseColorToken(
    "brand.secondary.dark",
    "brand.secondary.light"
  );

  return (
    <Box flex={1}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={visibleRefreshing && isUserFetching}
            onRefresh={() => {
              setVisibleRefreshing(true);
              refetchUser();
            }}
            tintColor={`${tintColor}`}
          />
        }
      >
        <HStack space="5" alignItems="center" padding="3">
          {user?.image_url ? (
            <Box width="16" height="16" rounded="full" overflow="hidden">
              <Image
                source={{
                  uri: user?.image_url,
                }}
                alt="avater"
                width="full"
                height="full"
              />
            </Box>
          ) : (
            <Icon as={Ionicons} name="person-circle-outline" size="16" />
          )}
          <Text fontSize="xl" bold>
            {user?.name}
          </Text>
        </HStack>
        <Flex
          direction="row"
          justify="space-evenly"
          paddingTop="2"
          paddingBottom="2"
        >
          <Center width={width / 3.5}>
            <VStack>
              <Text fontSize="lg" alignSelf="center" bold>
                {user?.items.length}
              </Text>
              <Text fontSize="sm" alignSelf="center">
                {t("sales")}
              </Text>
            </VStack>
          </Center>
          <Divider orientation="vertical" />
          <Center width={width / 3.5}>
            <VStack>
              <Text fontSize="lg" alignSelf="center" bold>
                0
              </Text>
              <Text fontSize="sm" alignSelf="center">
                {t("followers")}
              </Text>
            </VStack>
          </Center>
          <Divider orientation="vertical" />
          <Center width={width / 3.5}>
            <VStack>
              <Text fontSize="lg" alignSelf="center" bold>
                0
              </Text>
              <Text fontSize="sm" alignSelf="center">
                {t("following")}
              </Text>
            </VStack>
          </Center>
        </Flex>
        <Box margin="3" backgroundColor={backgroundColor}>
          <Text padding={2} fontSize="md">
            {t("noBioYet")}
          </Text>
        </Box>
        <Center>
          <ItemsTable
            items={user?.items}
            itemNavigationHandler={itemNavigationHandler}
          />
        </Center>
      </ScrollView>
    </Box>
  );
};
