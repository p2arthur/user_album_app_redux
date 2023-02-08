import "./assets/index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import { store } from "./store";
import "./assets/index.css";

const rootElement = document.querySelector("#root");

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
