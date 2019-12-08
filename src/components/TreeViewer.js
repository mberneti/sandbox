import React from "react";
import { Group } from "@vx/group";
import { Tree } from "@vx/hierarchy";
import { LinkVertical } from "@vx/shape";
import { LinearGradient } from "@vx/gradient";
import { hierarchy } from "d3-hierarchy";

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

export default props => {
  let width = props.width || 600;
  let height = props.width || 500;
  let margin = {
    top: props.mt || 40,
    left: props.ml || 16,
    right: props.mr || 16,
    bottom: props.mb || 40
  };

  const xMax = height - margin.top - margin.bottom;
  const yMax = width - margin.left - margin.right;

  const treeRoot = props.root || [];
  const hierarchyRoot = hierarchy(treeRoot);
  const logLabel = props.logLabel;
  const logNodes = props.logNodes;

  const isNodeLogged = (label, index) => {
    return logLabel === label && logNodes.includes(index);
  };

  return (
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
          {logLabel}
        </text>
      </Group>
      <Tree root={hierarchyRoot} size={[yMax, xMax]}>
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
              {tree
                .descendants()
                .filter(node => node.data.name || node.data.name === 0)
                .map((node, i) => {
                  return (
                    <Node
                      key={`node-${i}`}
                      node={node}
                      isSwapNode={isNodeLogged("swap", i)}
                      isCompareNode={isNodeLogged("compare", i)}
                    />
                  );
                })}
            </Group>
          );
        }}
      </Tree>
    </svg>
  );
};
