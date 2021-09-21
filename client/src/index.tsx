import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App, { AppWrapper } from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./common/storeProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RootStore } from "./store/root";
import { ChakraProvider } from "@chakra-ui/react";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./components/pages/Login";
import { useStore } from "./common/useStore";

const initialRootStore = new RootStore();

ReactDOM.render(
  <StoreProvider value={initialRootStore}>
    <BrowserRouter>
      <ChakraProvider>
        <React.StrictMode>
          <AppWrapper />
        </React.StrictMode>
      </ChakraProvider>
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
