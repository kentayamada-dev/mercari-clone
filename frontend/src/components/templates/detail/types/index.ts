import { GetItemById } from "../../../../types/generated";

export type ItemDetailTemplateProps = {
  isSold: boolean;
  item?: GetItemById;
  isItemLiked: boolean;
  numLikes?: number;
  addLike: () => void;
  removeLike: () => void;
  order: () => void;
};
