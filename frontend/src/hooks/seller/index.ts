import { Seller } from "../../types/generated";
import { useQueryWrapper } from "../modules/query";

export const useQueryMe = (token: string) =>
  useQueryWrapper<Seller>("sellers/me/", undefined, token);
