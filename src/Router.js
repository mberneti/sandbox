import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Box } from "@material-ui/core";

import Menu from "./Layout/Menu";
import CustomAppBar from "./Layout/CustomAppBar";

import Home from "./views/Home";
import HeapSort from "./views/HeapSort";

export default function App() {
  const [drawer, setDrawerState] = React.useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  return (
    <Router basename="/">
      <Menu drawer={drawer} onClose={toggleDrawer(false)} />
      <CustomAppBar onClick={toggleDrawer(true)} />
      <Container>
        <Box pt={5}>
          <Switch>
            <Route path="/Heap-Sort">
              <HeapSort />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}
