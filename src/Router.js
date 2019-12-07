import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Form1 from "./views/Form1";
import Home from "./views/Home";
import HeapSort from "./views/HeapSort";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Link,
  Box
} from "@material-ui/core";
import Menu from "./Menu";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function App() {
  const classes = useStyles();

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
    <Router>
      <Menu drawer={drawer} onClose={toggleDrawer(false)} />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Berneti Projects
          </Typography>
          <Button
            commponent={Link}
            target="_blank"
            href="https://github.com/mberneti/sandbox"
            color="inherit"
          >
            Open On Github
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box pt={5}>
          <Switch>
            <Route path="/Heap-Sort">
              <HeapSort />
            </Route>
            <Route path="/">
              <HeapSort />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}
