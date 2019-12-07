import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Router from "./Router";
import theme from "./theme";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { create } from "jss";

import * as serviceWorker from "./serviceWorker";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins] });

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <StylesProvider jss={jss}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Router />
    </StylesProvider>
  </MuiThemeProvider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
