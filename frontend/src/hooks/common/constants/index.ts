export const BASE_PATH = {
  ITEMS: "items",
  SELLERS: "sellers",
  ME: "sellers/me/",
  QUERIES: "queries",
} as const;

export type QueryKeys = typeof BASE_PATH[keyof typeof BASE_PATH];
