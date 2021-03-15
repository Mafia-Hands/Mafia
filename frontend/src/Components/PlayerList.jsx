import { React } from 'react';
import styles from '../Styles/PlayerList.module.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Card, CardContent, CardHeader} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minHeight: 600,
    display: "grid",
    gridGap: "24px",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection:'column' 
  }
});


/**
 * @param playerNames MANDATORY prop: a list of strings (player names)
 */
const PlayerList = ({playerNames}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title="Player List"></CardHeader>
      <CardContent>
        <List>
          {playerNames.map((playerName, index) =>
            <ListItem key={index}>
              {playerName}
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  )
}

export default PlayerList