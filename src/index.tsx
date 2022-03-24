import React from "react";
import ReactDOM from "react-dom";
import { MyRoutes } from "./Routes";
import { NativeBaseProvider } from "native-base";
import reportWebVitals from "./reportWebVitals";
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
