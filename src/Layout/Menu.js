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
            to={"/" + id + "/" + x.path}
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
        <ListItem button onClick={handleClick("Advanced-Algorithms")}>
          <ListItemText primary="Advanced Algorithms" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {getSubMenu("Advanced-Algorithms", [
          { path: "LU-Decomposition", title: "LU Decomposition" },
          { path: "Max-Heap-Insert", title: "Max Heap Insert" },
          { path: "Max-Heap-Insert", title: "Max Heap Insert" },
          { path: "Max-Heapify", title: "Max Heapify" },
          { path: "Heap-Sort", title: "Heap Sort" },
          { path: "Binomial-Heaps", title: "Binomial Heaps" }
        ])}
        {/* { path: "Simplex", title: "Simplex" }, */}

        <ListItem button onClick={handleClick("Advanced-OperatingSystem")}>
          <ListItemText primary="Advanced Operating System" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {getSubMenu("Advanced-OperatingSystem", [
          { path: "FCFS", title: "FCFS" },
          { path: "Round-Robin", title: "Round-Robin" }
        ])}

        <ListItem button onClick={handleClick("Advanced-Compiler")}>
          <ListItemText primary="Advanced Compiler" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {getSubMenu("Advanced-Compiler", [
          { path: "compiler1", title: "compiler1" }
        ])}
      </List>
    </Drawer>
  );
}
