import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Form1 from "./views/Form1";
import Home from "./views/Home";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Collapse,
  Grid,
  Container,
  Typography
} from "@material-ui/core";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState("");

  const handleClick = id => () => {
    if (open === id) id = "";
    setOpen(id);
  };

  const getSubMenu = (id, list) => (
    <Collapse in={open === id} timeout="auto" unmountOnExit>
      <List>
        {list.map(x => (
          <ListItem
            button
            component={Link}
            to={x.path}
            className={classes.nested}
          >
            <ListItemText primary={x.title} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );

  return (
    <Router>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h1">MBerneti Sandbox</Typography>
          </Grid>
          <Grid item md={3}>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Topics
                </ListSubheader>
              }
              className={classes.root}
            >
              <ListItem button onClick={handleClick("AdvancedAlgorithms")}>
                <ListItemText primary="Advanced Algorithms" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {getSubMenu("AdvancedAlgorithms", [
                { path: "/Binomial-Heaps", title: "Binomial Heaps" }
              ])}

              <ListItem button onClick={handleClick("AdvancedOperatingSystem")}>
                <ListItemText primary="Advanced Operating System" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {getSubMenu("AdvancedOperatingSystem", [
                { path: "/os1", title: "os1" }
              ])}

              <ListItem button onClick={handleClick("AdvancedCompiler")}>
                <ListItemText primary="Advanced Compiler" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {getSubMenu("AdvancedCompiler", [
                { path: "/compiler1", title: "compiler1" }
              ])}
            </List>
          </Grid>
          <Grid item md={9}>
            <Switch>
              <Route path="/about">
                <Form1 />
              </Route>
              <Route path="/users">
                <h1> users</h1>
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}
