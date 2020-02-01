import React, { useEffect } from "react";
import { Grid, Box, Typography, Paper, Button, Chip } from "@material-ui/core";

import MatrixTable from "../components/MatrixTable";

import LUDecompositionHelper from "../helpers/LUDecompositionHelper";

export default () => {
  const [userInput, setUserInput] = React.useState([
    [3, -7, -2, 2, -9],
    [-3, 5, 1, 0, 5],
    [6, -4, 0, -5, 7],
    [-9, 5, -5, 12, 11]
  ]);
  // [1, 2, 4, 3],
  // [3, 8, 14, 13],
  // [2, 6, 13, 4]

  const updateInputHandler = data => {
    setUserInput(data);
    setData(null);
  };

  const [data, setData] = React.useState();

  // componentDidMount -------------------------------------

  useEffect(() => {
    // componentDidMount();
  }, []);

  function componentDidMount() {
    var lu = new LUDecompositionHelper(userInput);
    setData(lu.getResult());
  }

  // --------------------------------------------------------

  const run = () => {
    var lu = new LUDecompositionHelper(userInput);
    setData(lu.getResult());
  };

  return (
    <Grid container justify="space-around" spacing={2}>
      <Grid item xs={4}>
        <Paper>
          <Box>
            <MatrixTable
              value={userInput}
              onChange={updateInputHandler}
              onClick={run}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper>
              <Box p={2} mt={1}>
                <Typography variant="h6">Lower Triangular</Typography>
                {data && (
                  <MatrixTable
                    key={userInput}
                    value={data.lowerTriangle}
                    readOnly
                  />
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <Box p={2} mt={1}>
                <Typography variant="h6">Upper Triangular</Typography>
                {data && (
                  <MatrixTable
                    key={userInput}
                    value={data.upperTriangle}
                    readOnly
                  />
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <Box p={2}>
            <Box pb={2}>
              <Typography variant="h6">Result</Typography>
            </Box>
            {data && (
              <div>
                <div display="block">
                  {data.yList.map((y, i) => (
                    <Chip
                      color="secondary"
                      size="medium"
                      label={`Y${i + 1} = ${y} `}
                      style={{
                        marginBottom: 8,
                        marginLeft: 8,
                        fontSize: "1.3em"
                      }}
                    />
                  ))}
                </div>
                <div display="block">
                  {data.xList.map((x, i) => (
                    <Chip
                      color="primary"
                      size="medium"
                      label={`X${i + 1} = ${x} `}
                      style={{
                        marginBottom: 8,
                        marginLeft: 8,
                        fontSize: "1.3em"
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
