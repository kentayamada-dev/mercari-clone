import axios from "axios";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import { CONSTANTS } from "./constants";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      queryFn: async ({ queryKey: [url] }) => {
        const { data } = await axios.get(`${CONSTANTS.BASE_URL}${url}`);
        return data;
      },
    },
  },
});

export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
