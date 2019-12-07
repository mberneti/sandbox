import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Collapse,
  Drawer
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

export default function App(props) {
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
            key={x.title}
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
    <Drawer open={props.drawer} onClose={props.onClose}>
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
          { path: "Heap-Sort", title: "Heap Sort" },
          { path: "Binomial-Heaps", title: "Binomial Heaps" }
        ])}

        <ListItem button onClick={handleClick("AdvancedOperatingSystem")}>
          <ListItemText primary="Advanced Operating System" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {getSubMenu("AdvancedOperatingSystem", [{ path: "os1", title: "os1" }])}

        <ListItem button onClick={handleClick("AdvancedCompiler")}>
          <ListItemText primary="Advanced Compiler" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {getSubMenu("AdvancedCompiler", [
          { path: "compiler1", title: "compiler1" }
        ])}
      </List>
    </Drawer>
  );
}
