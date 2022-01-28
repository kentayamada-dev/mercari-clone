import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { HomeStackParamList } from "../../types";
import { SearchResultsTemplate } from "../../components/templates/searchResults";
import { useItems } from "../../hooks/items/useItems";
import { usePostQuery } from "../../hooks/savedQueries/mutation";
import { CustomAlert } from "../../components/molecules/customAlert";
import { useAuth } from "../../hooks/auth/useAuth";
import { getAlert } from "../../modules";
import { useToast } from "native-base";
import { useSavedQueries } from "../../hooks/savedQueries/useSavedQueries";
import { useQueryClient } from "react-query";
import { invalidateQueriesWrapper } from "../../hooks/common/query";
import { BASE_PATH } from "../../hooks/common/constants";

type Props = NativeStackScreenProps<HomeStackParamList, "SearchResults">;

export const SearchResults: React.VFC<Props> = ({
  route: {
    params: { query },
  },
  navigation: { navigate, goBack },
}) => {
  const { token } = useAuth();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = React.useState(query);
  const goBackNavigationHandler = React.useCallback(() => goBack(), []);
  const { savedQueries } = useSavedQueries(searchQuery);
  const queryClient = useQueryClient();
  const isQuerySaved = !!savedQueries?.pages[0]?.data?.length;

  const {
    isItemsRefetching,
    isNextItemsFetching,
    items,
    onFetchNextItems,
    onRefetchItems,
  } = useItems(searchQuery);

  const itemNavigationHandler = React.useCallback(
    (itemId: string, itemName: string) => {
      navigate("ItemDetailStackNavigator", {
        screen: "ItemDetail",
        params: { itemId: itemId, itemName: itemName },
      });
    },
    []
  );

  const { mutateAsync: mutateAsyncQuery } = usePostQuery({
    token,
    onSuccess: () =>
      getAlert(
        toast,
        <CustomAlert
          status="success"
          onPressCloseButton={() => toast.closeAll()}
          text="成功"
        />
      ),
    onError: () =>
      getAlert(
        toast,
        <CustomAlert
          status="error"
          onPressCloseButton={() => toast.closeAll()}
          text="失敗"
        />
      ),
  });

  const addQuery = React.useCallback(async () => {
    if (token) {
      await mutateAsyncQuery({
        query: searchQuery,
      });
      invalidateQueriesWrapper(queryClient, BASE_PATH.QUERIES);
      queryClient.invalidateQueries({
        queryKey: `${BASE_PATH.QUERIES}/${searchQuery}`,
      });
    } else {
      navigate("AuthStackNavigator", {
        screen: "Signup",
      });
    }
  }, []);

  return (
    <SearchResultsTemplate
      isQuerySaved={isQuerySaved}
      isItemsRefetching={isItemsRefetching}
      isNextItemsFetching={isNextItemsFetching}
      items={items}
      query={searchQuery}
      addQuery={addQuery}
      onRefetchItems={onRefetchItems}
      onFetchNextItems={onFetchNextItems}
      itemNavigationHandler={itemNavigationHandler}
      setQuery={setSearchQuery}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};
