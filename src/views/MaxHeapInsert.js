import React, { useEffect } from "react";
import { Grid, Box, Typography, Paper } from "@material-ui/core";

import TreeViewer from "../components/TreeViewer";

import * as mathHelper from "../helpers/MathHelper";
import MaxHeapInsertHelper from "../helpers/MaxHeapInsertHelper";

export default () => {
  const [data, setData] = React.useState();
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress(data));
  }, [data]);

  useEffect(() => {
    componentDidMount();
  }, []);

  const handleKeyPress = data => e => {
    if (!data) return;
    if (e.keyCode === 39) {
      setActiveIndex(x => (x + 1 >= data.history.length ? x : x + 1));
    } else if (e.keyCode === 37) {
      setActiveIndex(x => (x - 1 < 0 ? x : x - 1));
    }
  };

  function componentDidMount() {
    var heap = new MaxHeapInsertHelper();

    var sampleArray = mathHelper.shuffle(10, 100); //[83, 26, 51, 54, 41, 88, 37, 0, 49, 57]; //shuffle();

    sampleArray.forEach(x => {
      heap.push(x);
    });

    var tree = heap.getTree();

    setData({
      nodes: sampleArray,
      root: tree.root,
      initRoot: tree.initRoot,
      history: [{ label: "init", root: tree.initRoot }, ...tree.history]
    });
  }

  return (
    <Grid container alignItems="center" justify="space-around">
      <Grid item xs={2} justify="center">
        <Typography variant="h3" display="inline">
          {activeIndex}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Box padding={1}>
            You can use your keyboard's (← or →) right and left arrow key to go
            forward or backward.
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        {data &&
          data.history
            .filter((x, idx) => idx === activeIndex)
            .map(x => (
              <TreeViewer
                logLabel={x.label}
                logNodes={x.logNode}
                root={x.root}
              />
            ))}
      </Grid>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Typography variant="h5" display="inline">
            [
          </Typography>
          {data &&
            data.nodes.map(x => (
              <Box display="inline" p={1}>
                <Typography variant="h5" display="inline">
                  {x}
                </Typography>
              </Box>
            ))}
          <Typography variant="h5" display="inline">
            ]
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
