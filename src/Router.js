import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Box, Breadcrumbs, Typography } from "@material-ui/core";

import Menu from "./Layout/Menu";
import CustomAppBar from "./Layout/CustomAppBar";

import Home from "./views/Home";
import HeapSort from "./views/HeapSort";
import MaxHeapInsert from "views/MaxHeapInsert";
import MaxHeapify from "views/MaxHeapify";
import FCFS from "views/FCFS";

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

  function getBreadcrumbs(props) {
    let routeNames = props.match.url
      .substring(1)
      .replace(/-/g, " ")
      .split("/");

    return (
      <Breadcrumbs aria-label="breadcrumb">
        {routeNames.map(x => (
          <Typography key={x} variant={6}>
            {x}
          </Typography>
        ))}
      </Breadcrumbs>
    );
  }

  return (
    <Router basename="/">
      <Menu drawer={drawer} onClose={toggleDrawer(false)} />
      <CustomAppBar onClick={toggleDrawer(true)} />
      <Box pt={2} pl={2}>
        {<Route path="*" component={getBreadcrumbs} />}
      </Box>
      <Container>
        <Box pt={1}>
          <Switch>
            <Route path="/Advanced-OperatingSystem/FCFS">
              <FCFS />
            </Route>
            <Route path="/Advanced-Algorithms/Max-Heap-Insert">
              <MaxHeapInsert />
            </Route>
            <Route path="/Advanced-Algorithms/Max-Heapify">
              <MaxHeapify />
            </Route>
            <Route path="/Advanced-Algorithms/Heap-Sort">
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
