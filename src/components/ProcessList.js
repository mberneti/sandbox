import React from "react";
import {
  LinearProgress,
  ListItem,
  ListItemText,
  List,
  Divider,
  Chip,
  Avatar
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const ItemBorderLinearProgress = withStyles({
  root: {
    height: 16
  }
})(LinearProgress);

const getLabel = (x, isCompletedList) =>
  isCompletedList
    ? `W.T : ${x.waitingTime}  T.A.T : ${x.waitingTime + x.burstTime}`
    : `W.T : ${x.waitingTime}`;

export default props => {
  //leafs
  return (
    <List dense={true}>
      {(props.list || []).map((x, i) => (
        <React.Fragment>
          <Chip
            avatar={<Avatar>{x.id}</Avatar>}
            label={getLabel(x, props.isCompleted)}
            style={{
              marginBottom: 8,
              marginTop: 8,
              height: 32,
              fontSize: "1.5em"
            }}
          />
          {!props.isCompleted && (
            <ItemBorderLinearProgress
              variant="determinate"
              value={(x.executionDuration * 100) / x.burstTime}
            />
          )}
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};
