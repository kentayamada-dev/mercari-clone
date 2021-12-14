import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Spinner } from "native-base";
import React from "react";
import { HomeTemplate } from "../../components/templates/home";
import { useGetItemsQuery } from "../../services/itemsApi";
import { HomeStackParamList } from "../../types";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export const Home: React.VFC<Props> = ({ navigation }) => {
  const { data: items, isFetching, refetch } = useGetItemsQuery();
  const itemNavigationHandler = React.useCallback((itemId: string) => {
    navigation.navigate("Detail", { itemId: itemId });
  }, []);
  const todoNavigationHandler = React.useCallback(() => {
    navigation.navigate("Todo", { userId: "userId" });
  }, []);

  if (!items) return <Spinner accessibilityLabel="読込中" />;

  return (
    <HomeTemplate
      refetchItems={refetch}
      isItemsFetching={isFetching}
      items={items}
      itemNavigationHandler={itemNavigationHandler}
      todoNavigationHandler={todoNavigationHandler}
    />
  );
};
