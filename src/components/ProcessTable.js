import React, { Component } from "react";
// import Table, {
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow
// } from "material-ui/Table";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Fab
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    overflowX: "auto"
  },
  table: {
    color: "#000"
  }
});

class App extends Component {
  state = {
    items: this.props.value || []
  };

  deleteItem = i => () => {
    const { items } = this.state;
    items.splice(i, 1);
    console.log(items);
    this.setState({ items });
    if (this.props.onChange)
      this.props.onChange(
        items
          .filter(x => x.arrivalTime !== "" && x.burstTime !== "")
          .map(x => {
            x.arrivalTime = x.arrivalTime * 1;
            x.burstTime = x.burstTime * 1;
            return x;
          })
      );
  };

  addItem = () => {
    const { items } = this.state;
    items.push({ arrivalTime: "", burstTime: "" });
    this.setState({ items });
    if (this.props.onChange)
      this.props.onChange(
        items
          .filter(x => x.arrivalTime !== "" && x.burstTime !== "")
          .map(x => {
            x.arrivalTime = x.arrivalTime * 1;
            x.burstTime = x.burstTime * 1;
            return x;
          })
      );
  };

  textChange = (i, id) => e => {
    const { items } = this.state;
    items[i][id] = e.target.value;
    this.setState({ items });
    if (this.props.onChange)
      this.props.onChange(
        items
          .filter(x => x.arrivalTime !== "" && x.burstTime !== "")
          .map(x => {
            x.arrivalTime = x.arrivalTime * 1;
            x.burstTime = x.burstTime * 1;
            return x;
          })
      );
  };
  randomHSL = () => {
    return `hsla(${~~(360 * Math.random())},55%,55%,0.8)`;
  };
  randomHSLDark = () => {
    const h = Math.floor(Math.random() * 360),
      s = Math.floor(Math.random() * 100) + "%",
      l = Math.floor(Math.random() * 60) + "%"; // max value of l is 100, but I set to 60 cause I want to generate dark colors
    // (use for background with white/light font color)
    return `hsl(${h},${s},${l})`;
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Burst Time</TableCell>
              <TableCell>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  className={classes.margin}
                  onClick={this.addItem}
                >
                  <AddIcon />
                </Fab>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.items.map((item, i) => {
              if (!item.color) {
                item.color = this.randomHSL();
                item.color = this.randomHSL();
                item.color = this.randomHSL();
              }
              return (
                <TableRow
                  key={`row-${i}`}
                  style={{ backgroundColor: item.color }}
                >
                  <TableCell>
                    <b>P{i + 1}</b>
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-basic"
                      value={item.arrivalTime}
                      onChange={this.textChange(i, "arrivalTime")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-basic"
                      value={item.burstTime}
                      onChange={this.textChange(i, "burstTime")}
                    />
                  </TableCell>
                  <TableCell>
                    <Fab
                      size="small"
                      color="secondary"
                      onClick={this.deleteItem(i)}
                      aria-label="add"
                      className={classes.margin}
                    >
                      <DeleteIcon fontSize="small" />
                    </Fab>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
const StyledApp = withStyles(styles)(App);

export default StyledApp;
