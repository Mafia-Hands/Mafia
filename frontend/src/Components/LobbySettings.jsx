import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, CardHeader, List, ListItem, MenuItem, Select, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: "grid",
        gridGap: "24px",
        minHeight: "500px"
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
 * @param gameCode MANDATORY prop: string of game entry code
 */
const LobbySettings = ({gameCode}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="Outlined">
            <CardHeader title="Game Settings"></CardHeader>
            <CardContent>
                <List>
                    <ListItem>
                        <Typography variant="h5">Game Code: {gameCode}</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Mafia Number: </Typography>
                        <Select>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </ListItem>
                </List>
            </CardContent>
            <CardActions>
                <Button size="large" onClick={() => alert('Roles explanation screen goes here')}>
                    Roles
                </Button>
            </CardActions>
        </Card>
    )
}

export default LobbySettings