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
import { GetItemById } from "../../types/generated";

type Props = NativeStackScreenProps<ItemDetailStackParamList, "ItemDetail">;

export const ItemDetail: React.VFC<Props> = ({
  navigation: { navigate },
  route: {
    params: { itemId },
  },
}) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { data: item, isLoading: isItemLoading } = useQueryItem(itemId);
  const { data: me } = useQueryMe(token);
  const likedItem = item?.liked_users.find((user) => user.id === me?.id);
  const numLikes = item?.liked_users.length;
  const closeModal = React.useCallback(() => setIsModalVisible(false), []);

  const { mutateAsync: mutatePostLike } = usePostLike({
    token,
    onSuccess: (data) => {
      if (item) {
        queryClient.setQueryData<GetItemById>(`${BASE_PATH.ITEMS}/${itemId}`, {
          ...item,
          liked_users: [...item.liked_users, { id: data.user_id }],
        });
      }
    },
  });

  const { mutateAsync: mutateDeleteLike } = useDeleteLike({
    itemId,
    token,
    onSuccess: (data) => {
      if (item) {
        queryClient.setQueryData<GetItemById>(`${BASE_PATH.ITEMS}/${itemId}`, {
          ...item,
          liked_users: item.liked_users.filter(
            (user) => user.id != data.user_id
          ),
        });
      }
    },
  });

  const { mutateAsync: mutatePostOrder } = usePostOrder({
    token,
    onSuccess: (data) => {
      if (item) {
        queryClient.setQueryData<GetItemById>(`${BASE_PATH.ITEMS}/${itemId}`, {
          ...item,
          order: {
            id: data.id,
          },
        });
      }
    },
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
  }, []);

  const removeLike = React.useCallback(async () => {
    if (!token) {
      navigate("AuthStackNavigator", {
        screen: "Signup",
      });
      return;
    }
    await mutateDeleteLike();
  }, []);

  const placeOrder = React.useCallback(async () => {
    if (!token) {
      navigate("AuthStackNavigator", {
        screen: "Signup",
      });
      return;
    }
    await mutatePostOrder({
      item_id: itemId,
    });
    setIsModalVisible(true);
    invalidateQueriesWrapper(queryClient, BASE_PATH.ITEMS);
  }, []);

  return (
    <ItemDetailTemplate
      isItemLoading={isItemLoading}
      isSold={!!item?.order}
      item={item}
      isItemLiked={!!likedItem}
      numLikes={numLikes}
      isModalVisible={isModalVisible}
      addLike={addLike}
      removeLike={removeLike}
      placeOrder={placeOrder}
      closeModal={closeModal}
    />
  );
};
