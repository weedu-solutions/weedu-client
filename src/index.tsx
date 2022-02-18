import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NativeBaseProvider } from "native-base";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <NativeBaseProvider theme={theme}>
      <App />
    </NativeBaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
