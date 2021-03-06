export const BASE_PATH = {
  ITEMS: "items",
  USERS: "users",
  ME: "users/me/",
  QUERIES: "queries",
  LIKES: "likes",
  ORDERS: "orders",
} as const;

export type QueryKeys = typeof BASE_PATH[keyof typeof BASE_PATH];
