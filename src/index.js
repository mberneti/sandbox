import React from "react";

import { Provider } from "react-redux";
import store from "./store/storeProvider";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

import AppTheme from "./Layout/AppTheme";

ReactDOM.render(
  <Provider store={store}>
    <AppTheme />
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
