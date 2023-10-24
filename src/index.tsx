import { NativeBaseProvider } from "native-base";
import React from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";
import { MyRoutes } from "./routes";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <NativeBaseProvider theme={theme}>
      <MyRoutes />
    </NativeBaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
