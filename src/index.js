import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { FavoritesContextProvider } from "./store/favorites-context";
import { UserContextProvider } from "./store/user-context";

ReactDOM.render(
  <ConfigProvider>
    <UserContextProvider>
      <FavoritesContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoritesContextProvider>
    </UserContextProvider>
  </ConfigProvider>,
  document.getElementById("root")
);
