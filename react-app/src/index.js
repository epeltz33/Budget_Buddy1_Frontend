import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = configureStore();

createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</React.StrictMode>
);
