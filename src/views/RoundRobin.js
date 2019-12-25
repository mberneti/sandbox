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

import RoundRobinScheduler, {
  processState
} from "../helpers/RoundRobinScheduler";
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
    { arrivalTime: 10, burstTime: 2 }
  ]);

  const updateInputHandler = data => {
    setUserInput(data);
  };

  const [lastClickKeyCode, setLastClickKeyCode] = React.useState();
  const [data, setData] = React.useState();
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    if (!data) return;
    if (!lastClickKeyCode) return;
    if (lastClickKeyCode.keyCode === 39) {
      setActiveIndex(x => (x + 1 >= data.logs.length ? x : x + 1));
    } else if (lastClickKeyCode.keyCode === 37) {
      setActiveIndex(x => (x - 1 < 0 ? x : x - 1));
    }
    setLastClickKeyCode(null);
  }, [lastClickKeyCode]);

  useEffect(() => {
    setActiveIndex(0);
  }, [data]);

  useEffect(() => {
    var scheduler = new RoundRobinScheduler(userInput);

    setData({
      logs: scheduler.getLogs(),
      info: scheduler.getInfo()
    });
  }, [userInput]);

  useEffect(() => {
    componentDidMount();
  }, []);

  const handleKeyPress = e => {
    if (e.keyCode === 39 || e.keyCode === 37)
      setLastClickKeyCode({ keyCode: e.keyCode, date: new Date() });
  };

  function componentDidMount() {
    var scheduler = new RoundRobinScheduler(userInput);

    setData({
      logs: scheduler.getLogs(),
      info: scheduler.getInfo()
    });

    document.addEventListener("keydown", handleKeyPress);
  }

  const getLog = (index, prop) =>
    data && index < data.logs.length && data.logs[index][prop];

  const cpuProcess = getLog(activeIndex, "cpu");

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
          {getLog(activeIndex, "label")}
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
        <ProcessTable value={userInput} onChange={updateInputHandler} />
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6">
                  CPU ({getLog(activeIndex, "counter")})
                </Typography>
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
                  list={(getLog(activeIndex, "tasks") || []).filter(
                    x => x.state === processState.IsReady
                  )}
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
                  list={(getLog(activeIndex, "tasks") || []).filter(
                    x => x.state === processState.IsCompleted
                  )}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <Box p={2}>
            <Box pb={2}>
              <Typography variant="h6">Gantt Chart</Typography>
            </Box>
            <Grid container>
              {((data && data.logs) || [])
                .filter(
                  x =>
                    x.label === `Increase Counter` &&
                    x.counter <= getLog(activeIndex, "counter")
                )
                .map(x => (
                  <Grid item>
                    <Box
                      style={{
                        backgroundColor: x.cpu && x.cpu.color,
                        border: "1px solid gray"
                      }}
                      display="inline"
                      p={1.5}
                    >
                      {x.cpu && x.cpu.id}
                    </Box>
                    <Box mt={1.5} textAlign="right">
                      {x.counter}
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Box>
          {data && data.info && (
            <Box m={2} p={2}>
              <p>CPU utilization = {data.info.CPUUtilization}</p>
              <p>Throughput = {data.info.Throughput} processes per unit time</p>
              <p>Average Wait Time = {data.info.avarageWaitingTime}</p>
              <p>
                Average Turnaround Time = {data.info.avarageTurnAroundTimeTotal}
              </p>
              <p>Context Switch = {data.info.contextSwitch}</p>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
