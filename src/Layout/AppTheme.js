import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { create } from "jss";

import Router from "../Router";
import theme from "./theme";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins] });

const AppTheme = props => (
  <MuiThemeProvider theme={theme}>
    <StylesProvider jss={jss}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Router />
    </StylesProvider>
  </MuiThemeProvider>
);

export default AppTheme;
