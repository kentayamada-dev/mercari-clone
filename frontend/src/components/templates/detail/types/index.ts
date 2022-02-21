import { GetItemById } from "../../../../types/generated";

export type ItemDetailTemplateProps = {
  isModalVisible: boolean;
  isItemLoading: boolean;
  isSold: boolean;
  item?: GetItemById;
  isItemLiked: boolean;
  numLikes?: number;
  addLike: () => void;
  removeLike: () => void;
  placeOrder: () => void;
  userDetailNavigationHandler: () => void;
  closeModal: () => void;
};
