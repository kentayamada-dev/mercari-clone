import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useQueryClient } from "react-query";
import { ItemDetailTemplate } from "../../components/templates/detail";
import { useAuth } from "../../hooks/auth/useAuth";
import { BASE_PATH } from "../../hooks/common/constants";
import { invalidateQueriesWrapper } from "../../hooks/common/query";
import { useQueryItem } from "../../hooks/items/query";
import { useDeleteLike, usePostLike } from "../../hooks/likes/mutation";
import { usePostOrder } from "../../hooks/order/mutation";
import { useQueryMe } from "../../hooks/users/query";
import { ItemDetailStackParamList } from "../../types";

type Props = NativeStackScreenProps<ItemDetailStackParamList, "ItemDetail">;

export const ItemDetail: React.VFC<Props> = ({
  navigation: { navigate },
  route: {
    params: { itemId },
  },
}) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { data: item } = useQueryItem(itemId);
  const { data: me } = useQueryMe(token);
  const likedItem = item?.liked_users.find((user) => user.id === me?.id);
  const numLikes = item?.liked_users.length;
  const { mutateAsync: mutatePostLike } = usePostLike({ token });
  const { mutateAsync: mutateDeleteLike } = useDeleteLike({
    itemId,
    token,
  });
  const { mutateAsync: mutatePostOrder } = usePostOrder({
    token,
  });

  const addLike = React.useCallback(async () => {
    if (!token) {
      navigate("AuthStackNavigator", {
        screen: "Signup",
      });
      return;
    }
    await mutatePostLike({
      item_id: itemId,
    });
    queryClient.invalidateQueries({
      queryKey: `${BASE_PATH.ITEMS}/${itemId}`,
    });
  }, []);

  const removeLike = React.useCallback(async () => {
    if (!token) {
      navigate("AuthStackNavigator", {
        screen: "Signup",
      });
      return;
    }
    await mutateDeleteLike();
    queryClient.invalidateQueries({
      queryKey: `${BASE_PATH.ITEMS}/${itemId}`,
    });
  }, []);

  const order = React.useCallback(async () => {
    if (!token) {
      navigate("AuthStackNavigator", {
        screen: "Signup",
      });
      return;
    }
    await mutatePostOrder({
      item_id: itemId,
    });
    queryClient.invalidateQueries({
      queryKey: `${BASE_PATH.ITEMS}/${itemId}`,
    });
    invalidateQueriesWrapper(queryClient, BASE_PATH.ITEMS);
  }, []);

  return (
    <ItemDetailTemplate
      isSold={!!item?.order}
      item={item}
      isItemLiked={!!likedItem}
      numLikes={numLikes}
      addLike={addLike}
      removeLike={removeLike}
      order={order}
    />
  );
};
