import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  LinearProgress,
  Chip,
  Avatar
} from "@material-ui/core";

import ProcessTable from "../components/ProcessTable";
import ProcessList from "../components/ProcessList";

import * as mathHelper from "../helpers/MathHelper";
import FCFSScheduler, { processState } from "../helpers/FCFSScheduler";
import { withStyles } from "@material-ui/styles";

export default () => {
  const BorderLinearProgress = withStyles({
    root: {
      height: 32
    }
  })(LinearProgress);

  const [userInput, setUserInput] = React.useState([
    { arrivalTime: 0, burstTime: 2 },
    { arrivalTime: 0, burstTime: 2 },
    { arrivalTime: 2, burstTime: 2 }
  ]);

  const updateInputHandler = data => {
    setUserInput(data);
  };

  const [data, setData] = React.useState();
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress(data));
  }, [data]);

  useEffect(() => {
    componentDidMount();
    alert("asd");
  }, [userInput]);

  useEffect(() => {
    componentDidMount();
  }, []);

  const handleKeyPress = data => e => {
    if (!data) return;
    if (e.keyCode === 39) {
      setActiveIndex(x => (x + 1 >= data.logs.length ? x : x + 1));
    } else if (e.keyCode === 37) {
      setActiveIndex(x => (x - 1 < 0 ? x : x - 1));
    }
  };

  function componentDidMount() {
    var scheduler = new FCFSScheduler(userInput);

    setData({
      logs: scheduler.getLogs()
    });
  }

  const cpuProcess = data && data.logs[activeIndex].cpu;
  let cpuWaitingTime = "";
  let cpuCompleted = 0;
  if (cpuProcess) {
    cpuWaitingTime = `Waiting Time: ${cpuProcess.waitingTime}`;
    cpuCompleted = (cpuProcess.executionDuration * 100) / cpuProcess.burstTime;
  }

  return (
    <Grid container justify="space-around" spacing={2}>
      <Grid item xs={4} justify="center">
        <Typography variant="h3" display="inline">
          {activeIndex}
        </Typography>
        <Typography variant="h5" display="inline">
          {data && data.logs[activeIndex].label}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Paper>
          <Box padding={1}>
            You can use your keyboard's (← or →) right and left arrow key to go
            forward or backward.
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <ProcessTable value={userInput} onChange={setUserInput} />
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6">CPU</Typography>
                {cpuProcess && (
                  <>
                    <Chip
                      color="primary"
                      size="medium"
                      avatar={<Avatar> {cpuProcess && cpuProcess.id}</Avatar>}
                      label={cpuWaitingTime}
                      style={{ marginBottom: 8, marginTop: 8 }}
                    />
                    <BorderLinearProgress
                      variant="determinate"
                      value={cpuCompleted}
                    />
                  </>
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6">Ready Queue</Typography>
                <ProcessList
                  list={
                    data &&
                    data.logs[activeIndex].tasks.filter(
                      x => x.state === processState.IsReady
                    )
                  }
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6">Completed</Typography>
                <ProcessList
                  isCompleted
                  list={
                    data &&
                    data.logs[activeIndex].tasks.filter(
                      x => x.state === processState.IsCompleted
                    )
                  }
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
