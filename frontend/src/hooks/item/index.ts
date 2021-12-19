import { Item, ItemRead } from "../../types/generated";
import { useQueryWrapper } from "../modules";

export const useQueryItems = () => useQueryWrapper<ItemRead[]>("items");

export const useQueryItem = (itemId: string) =>
  useQueryWrapper<Item>("items", itemId);
