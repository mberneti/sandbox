import React, { useState } from "react";

import { Grid, Box, Typography, Paper, Slider } from "@material-ui/core";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries as LineSeries
} from "react-vis";

import "react-vis/dist/style.css";

import stat from "../helpers/arr-stat";

function computeDft(input, step) {
  var inreal = input.map(x => x.y);

  var n = inreal.length;
  var outreal = new Array(n);
  var outimag = new Array(n);
  var inimag = new Array(n);
  inimag.fill(0);

  for (var k = 0; k < n; k++) {
    // For each output element
    var sumreal = 0;
    var sumimag = 0;
    for (var t = 0; t < n; t++) {
      // For each input element
      var angle = (2 * Math.PI * t * k) / n;
      sumreal += inreal[t] * Math.cos(angle) + inimag[t] * Math.sin(angle);
      sumimag += -inreal[t] * Math.sin(angle) + inimag[t] * Math.cos(angle);
    }
    outreal[k] = sumreal;
    outimag[k] = sumimag;
  }

  var result = outreal.map((x, key) => Math.hypot(outreal[key], outimag[key]));

  var output = outreal.map((x, key) => ({
    x: key * step,
    y: result[key]
  }));

  return output;
}

function generateValues(wave_type, config) {
  const { step, size, sinPeriodicityFactor, cosPeriodicityFactor } = config;
  var yvalues = [];

  for (var i = 0; i <= size; i += step) {
    var y = 0;
    if (wave_type === "sin") {
      y = Math.sin((sinPeriodicityFactor * i * Math.PI) / 180);
    } else if (wave_type === "cos") {
      y = Math.cos((cosPeriodicityFactor * i * Math.PI) / 180);
    } else if (wave_type === "total") {
      y =
        Math.cos((cosPeriodicityFactor * i * Math.PI) / 180) +
        Math.sin((sinPeriodicityFactor * i * Math.PI) / 180);
    }
    yvalues.push({ x: i, y });
  }
  return yvalues;
}

export default ({
  xDomain = [0, 750],
  yDomain = [-2, 2],
  xAxisOn0 = false,
  yAxisOn0 = true
}) => {
  const step = 5;
  const size = 720;

  const [sinPeriodicityFactor, setSinPeriodicityFactor] = useState(1);
  const [cosPeriodicityFactor, setCosPeriodicityFactor] = useState(10);

  const handleSinChange = (event, newValue) => {
    setSinPeriodicityFactor(newValue);
  };
  const handleCosChange = (event, newValue) => {
    setCosPeriodicityFactor(newValue);
  };

  const config = {
    step,
    size,
    sinPeriodicityFactor,
    cosPeriodicityFactor
  };

  const data = generateValues("sin", config).map(x => ({ ...x, size: "2" }));
  const data2 = generateValues("cos", config).map(x => ({ ...x, size: "2" }));
  const data3 = generateValues("total", config).map(x => ({ ...x, size: "2" }));

  const dataDft = computeDft(data, step).map(x => ({ ...x, size: "2" }));
  const data2Dft = computeDft(data2, step).map(x => ({ ...x, size: "2" }));
  const data3Dft = computeDft(data3, step).map(x => ({ ...x, size: "2" }));

  // ---------------------------------------------------------------------
  const maxDft = Math.max.apply(
    null,
    data3Dft.map(x => x.y)
  );
  const maxDftChartRange = stat.round_to_precision(maxDft + 10, 10);

  const yDomain2 = [0, maxDftChartRange];
  // ---------------------------------------------------------------------

  return (
    <Grid container justify="space-around" spacing={2}>
      <Grid item xs={6}>
        <Paper>
          <Box padding={2}>
            <Typography id="discrete-slider" gutterBottom>
              Sin({sinPeriodicityFactor}x)
            </Typography>
            <Slider
              onChange={handleSinChange}
              defaultValue={sinPeriodicityFactor}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={50}
            />
            <XYPlot width={500} height={200} {...{ xDomain, yDomain }}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis on0={xAxisOn0} />
              <YAxis on0={yAxisOn0} />
              <LineSeries
                data={data}
                colorType="literal"
                sizeType="literal"
                markStyle={{ fill: "#1cd8e3", strokeWidth: "0" }}
              />
            </XYPlot>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Box padding={2}>
            <Typography variant="h6" display="inline">
              FFT Magnitude
            </Typography>
            <XYPlot
              width={500}
              height={150}
              {...{ xDomain, yDomain: yDomain2 }}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis on0={xAxisOn0} />
              <YAxis on0={yAxisOn0} />
              <LineSeries
                data={dataDft}
                colorType="literal"
                sizeType="literal"
                markStyle={{ fill: "#1cd8e3", strokeWidth: "0" }}
              />
            </XYPlot>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Box padding={2}>
            <Typography id="discrete-slider2" gutterBottom>
              Cos({cosPeriodicityFactor}x)
            </Typography>
            <Slider
              onChange={handleCosChange}
              defaultValue={cosPeriodicityFactor}
              aria-labelledby="discrete-slider2"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={50}
            />
            <XYPlot width={500} height={200} {...{ xDomain, yDomain }}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis on0={xAxisOn0} />
              <YAxis on0={yAxisOn0} />
              <LineSeries
                data={data2}
                colorType="literal"
                sizeType="literal"
                markStyle={{ fill: "#1cd8e3", strokeWidth: "0" }}
              />
            </XYPlot>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Box padding={2}>
            <Typography variant="h6" display="inline">
              FFT Magnitude
            </Typography>
            <XYPlot
              width={500}
              height={150}
              {...{ xDomain, yDomain: yDomain2 }}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis on0={xAxisOn0} />
              <YAxis on0={yAxisOn0} />
              <LineSeries
                data={data2Dft}
                colorType="literal"
                sizeType="literal"
                markStyle={{ fill: "#1cd8e3", strokeWidth: "0" }}
              />
            </XYPlot>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <Paper>
          <Box padding={2}>
            <Typography variant="h6" display="inline">
              Sin({sinPeriodicityFactor}x) + Cos({cosPeriodicityFactor}x)
            </Typography>
            <XYPlot width={500} height={200} {...{ xDomain, yDomain }}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis on0={xAxisOn0} />
              <YAxis on0={yAxisOn0} />
              <LineSeries
                data={data3}
                colorType="literal"
                sizeType="literal"
                markStyle={{ fill: "#1cd8e3", strokeWidth: "0" }}
              />
            </XYPlot>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Box padding={2} mb={5}>
            <Typography variant="h6" display="inline">
              FFT Magnitude
            </Typography>
            <XYPlot
              width={500}
              height={150}
              {...{ xDomain, yDomain: yDomain2 }}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis on0={xAxisOn0} />
              <YAxis on0={yAxisOn0} />
              <LineSeries
                data={data3Dft}
                colorType="literal"
                sizeType="literal"
                markStyle={{ fill: "#1cd8e3", strokeWidth: "0" }}
              />
            </XYPlot>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
