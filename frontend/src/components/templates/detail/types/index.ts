import { GetItemById } from "../../../../types/generated";

export type ItemDetailTemplateProps = {
  isModalVisible: boolean;
  isSold: boolean;
  item?: GetItemById;
  isItemLiked: boolean;
  numLikes?: number;
  addLike: () => void;
  removeLike: () => void;
  order: () => void;
  closeModal: () => void;
};
