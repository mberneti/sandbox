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
  table: {}
});

// this.state = {
//   items: [
//     // {
//     //   name: "foo",
//     //   arrivalTime: 1,
//     //   burstTime: 2
//     // },
//     // {
//     //   name: "bar",
//     //   arrivalTime: 1,
//     //   burstTime: 2
//     // },
//     // {
//     //   name: "baz",
//     //   arrivalTime: 1,
//     //   burstTime: 2
//     // }
//   ]
// };

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

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>A.T</TableCell>
              <TableCell>B.T</TableCell>
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
              return (
                <TableRow key={`row-${i}`}>
                  <TableCell>P{i + 1}</TableCell>
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
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={this.deleteItem(i)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
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
