import React, { useEffect } from "react";
import { Group } from "@vx/group";
import { Tree } from "@vx/hierarchy";
import { LinkVertical } from "@vx/shape";
import { LinearGradient } from "@vx/gradient";

import BinaryHeap from "../helpers/BinaryHeap";
import { Grid, Box, Typography, Paper } from "@material-ui/core";
import TreeViewer from "components/TreeViewer";

const peach = "#fd9b93";
const pink = "#fe6e9e";
const blue = "#03c0dc";
const green = "#26deb0";
const lightpurple = "#3da4ab";
const white = "#ffffff";
const bg = "#4a4e4d";

const swapColor = "#fe8a71";
const compareColor = "#f6cd61";

function Node({ node, isSwapNode, isCompareNode }) {
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  let statusColor = null;
  if (isSwapNode === true) {
    statusColor = swapColor;
  } else if (isCompareNode === true) {
    statusColor = compareColor;
  }

  if (isRoot) return <RootNode statusColor={statusColor} node={node} />;
  if (isParent) return <ParentNode statusColor={statusColor} node={node} />;
  //leafs
  return (
    <Group top={node.y} left={node.x}>
      <circle
        r={30}
        fill={bg}
        stroke={statusColor || green}
        strokeWidth={1}
        strokeDasharray={"2,2"}
        strokeOpacity={0.6}
        rx={10}
        onClick={() => {
          alert(`clicked: ${JSON.stringify(node.data.name)}`);
        }}
      />
      <text
        dy={".33em"}
        fontSize={24}
        fontFamily="Open Sans"
        textAnchor={"middle"}
        fill={green}
        style={{ pointerEvents: "none" }}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function RootNode({ node, statusColor }) {
  return (
    <Group
      top={node.y}
      left={node.x}
      onClick={() => {
        alert(`clicked: ${JSON.stringify(node.data.name)}`);
      }}
    >
      <circle r={30} fill={bg} stroke={statusColor || white} />
      <text
        dy={".33em"}
        fontSize={24}
        fontWeight={500}
        fontFamily="Open Sans"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={white}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

function ParentNode({ node, statusColor }) {
  return (
    <Group top={node.y} left={node.x}>
      <circle
        r={30}
        fill={bg}
        stroke={statusColor || blue}
        strokeWidth={1}
        onClick={() => {
          alert(`clicked: ${JSON.stringify(node.data.name)}`);
        }}
      />
      <text
        dy={".33em"}
        fontSize={24}
        fontFamily="Open Sans"
        textAnchor={"middle"}
        style={{ pointerEvents: "none" }}
        fill={white}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

export default () => {
  let width = 600;
  let height = 500;
  let margin = {
    top: 40,
    left: 16,
    right: 16,
    bottom: 40
  };

  const [data, setData] = React.useState();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const xMax = height - margin.top - margin.bottom;
  const yMax = width - margin.left - margin.right;

  function test() {
    var heap = new BinaryHeap();
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function shuffle() {
      let array = [];
      for (let i = 0; i < 10; i++) array.push(getRandomInt(100));

      return array.sort(() => Math.random() - 0.5);
    }

    var sampleArray = shuffle(); //[83, 26, 51, 54, 41, 88, 37, 0, 49, 57]; //shuffle();

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

  const handleKeyPress = data => e => {
    if (!data) return;

    if (e.keyCode === 39) {
      setActiveIndex(x => (x + 1 >= data.history.length ? x : x + 1));
    } else if (e.keyCode === 37) {
      setActiveIndex(x => (x - 1 < 0 ? x : x - 1));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress(data));
  }, [data]);

  useEffect(() => {
    test("mounted");
  }, []);

  return (
    <Grid container alignItems="center" justify="space-around">
      <Grid item xs={6}>
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
            .map(x => <TreeViewer />)}
      </Grid>
      <Grid item xs={6}>
        <svg width={width} height={height}>
          <LinearGradient id="lg" from={peach} to={pink} />
          <rect width={width} height={height} rx={14} fill={bg} />
          <Group top={30} left={30}>
            <text
              dy={".33em"}
              fontSize={18}
              fontFamily="Open Sans"
              textAnchor={"left"}
              style={{ pointerEvents: "none" }}
              fill={white}
            >
              Output
            </text>
          </Group>
          {data &&
            data.history
              .filter((log, idx) => idx === activeIndex && log.output)
              .map(log => (
                <Tree root={log.output} size={[yMax, xMax]}>
                  {tree => {
                    return (
                      <Group top={margin.top} left={margin.left}>
                        {tree.links().map((link, i) => {
                          return (
                            <LinkVertical
                              key={`link-${i}`}
                              data={link}
                              stroke={lightpurple}
                              strokeWidth="1"
                              fill="none"
                            />
                          );
                        })}
                        {tree.descendants().map((node, i) => {
                          return <Node key={`node-${i}`} node={node} />;
                        })}
                      </Group>
                    );
                  }}
                </Tree>
              ))}
        </svg>
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
