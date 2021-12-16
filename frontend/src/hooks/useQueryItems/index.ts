import { ItemRead } from "../../types/generated";
import { useQueryWrapper } from "../modules";

export const useQueryItems = () => useQueryWrapper<ItemRead[]>("items");
