import { GetItemById } from "../../../../types/generated";

export type ItemDetailTemplateProps = {
  item?: GetItemById;
  isItemLiked: boolean;
  numLikes?: number;
  addLike: () => void;
  removeLike: () => void;
};
