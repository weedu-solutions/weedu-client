import { NativeBaseProvider } from "native-base";
import React from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";
import { MyRoutes } from "./routes";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <MyRoutes />
      </NativeBaseProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
