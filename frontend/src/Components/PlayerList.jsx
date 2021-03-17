import { React, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { GeneralContext } from '../App';

const useStyles = makeStyles({
    root: {
        display: 'grid',
        gridGap: '0px',
        paddingBottom: '0px',
    },
    title: {
        fontSize: 14,
    },
});

const PlayerList = () => {
    const { state } = useContext(GeneralContext);
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader title="Player List"></CardHeader>
            <CardContent className={classes.content}>
                <List>
                    {state.players.map((playerName, index) => (
                        <ListItem key={index}>
                            <Typography>{playerName}</Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default PlayerList;
