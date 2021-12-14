import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";
import { CONSTANTS } from "../../constants";
import { Item } from "../../generated/Api";

const baseUrl =
  Platform.OS === "android" && CONSTANTS.NODE_ENV === "development"
    ? CONSTANTS.API_URL.replace("localhost", "10.0.2.2")
    : CONSTANTS.API_URL;

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getItems: build.query<Item[], void>({
      query: () => "items",
    }),
  }),
});

export const { useGetItemsQuery } = itemsApi;
