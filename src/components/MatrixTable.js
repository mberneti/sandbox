import React, { Component } from "react";

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Box,
  Button
} from "@material-ui/core";

import { withStyles, makeStyles } from "@material-ui/styles";

import classnames from "classnames";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    overflowX: "auto"
  },
  table: {
    color: "#000"
  },
  successText: {
    "& input": {
      color: "#8BC34A"
    }
  },
  inputStyle: {
    "& input": {
      width: "40px"
    }
  },
  RHSCol: {
    backgroundColor: "#696969"
  }
});

class App extends Component {
  state = {
    items: this.props.value || [],
    matrixSize: (this.props.value && this.props.value.length) || 3,
    tempMatrixSize: (this.props.value && this.props.value.length) || 3
  };

  textChange = (i, j) => e => {
    const { items } = this.state;

    items[i][j] = e.target.value;
    this.setState({ items });

    if (this.props.onChange)
      this.props.onChange(
        items.map(row => {
          return row.map(item => item * 1);
        })
      );
  };

  setTempMatrixSize = e => {
    if (e.target.value.indexOf("e") >= 0) return;
    this.setState({ tempMatrixSize: e.target.value });
  };

  setMatrixSize = e => {
    if (this.state.tempMatrixSize > 0 && this.state.tempMatrixSize < 6) {
      const items = [];

      for (let i = 0; i < this.state.tempMatrixSize; i++) {
        const innerArray = [];
        for (let j = 0; j < this.state.tempMatrixSize; j++) innerArray.push(0);
        innerArray.push(0);
        items.push(innerArray);
      }

      this.setState({ matrixSize: this.state.tempMatrixSize, items });

      this.props.onChange(
        items.map(row => {
          return row.map(item => item * 1);
        })
      );
    } else {
      this.setState({ tempMatrixSize: this.state.matrixSize });
    }
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.setMatrixSize();
    }
  };

  render() {
    const { classes } = this.props;
    const { tempMatrixSize, matrixSize } = this.state;

    const textClassName = classnames({
      [classes.successText]: tempMatrixSize === matrixSize
    });

    return (
      <Paper className={classes.root}>
        {!this.props.readOnly && (
          <Box
            p={2}
            pt={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              id="standard-basic"
              label="matrix size"
              value={this.state.tempMatrixSize}
              onChange={this.setTempMatrixSize}
              className={textClassName}
              type="number"
              helperText="n>0 and n<6"
              onKeyDown={this.handleKeyDown}
            />
            <Box>
              <Button variant="contained" onClick={this.setMatrixSize}>
                New
              </Button>
            </Box>
            <Box>
              <Button variant="outlined" onClick={() => this.props.onClick()}>
                Run
              </Button>
            </Box>
          </Box>
        )}
        <Table className={classes.table}>
          {/* <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {this.state.items.map((x, key) => (
                <TableCell key={key}>j{key + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead> */}
          <TableBody>
            {this.state.items.map((row, i) => {
              return (
                <TableRow key={`row-${i}`}>
                  {/* <TableCell>
                    <b>i{i + 1}</b>
                  </TableCell> */}
                  {row.map((innerItem, j) => (
                    <React.Fragment>
                      {(!this.props.readOnly || row.length - 1 > j) && (
                        <TableCell
                          key={j}
                          className={classnames({
                            [classes.RHSCol]: row.length - 1 === j
                          })}
                        >
                          <TextField
                            type="number"
                            className={classes.inputStyle}
                            id="standard-basic"
                            value={innerItem}
                            onChange={this.textChange(i, j)}
                          />
                        </TableCell>
                      )}
                    </React.Fragment>
                  ))}
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
