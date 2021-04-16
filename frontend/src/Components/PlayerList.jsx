import { React, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { GeneralContext } from '../Context';

const useStyles = makeStyles({
    root: {
        display: 'grid',
        gridGap: '0px',
        backgroundColor: '#7795a6',
        gridTemplateRows: '0.5fr 5fr',
        border: 'none',
        borderRadius: '10px',
    },
    title: {
        fontSize: '10px',
        fontFamily: 'Helvetica, sans-serif',
        backgroundColor: '#c8d3d5',
        color: '#2b282a',
        padding: '10px',
        paddingLeft: '16px',
    },
    content: {
        padding: '0px',
        color: '#2b282a',
        maxHeight: '100%',
        overflow: 'auto',
    },
});

const PlayerList = () => {
    // get the current lobby state
    const { state } = useContext(GeneralContext);
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader className={classes.title} title="Player List" />
            <CardContent className={classes.content}>
                <List>
                    {state.players.map((playerName, index) => (
                        // react/no-array-index-key: not safe to use index as the key
                        // probably need to have an id etc in the future
                        <ListItem key={index}>
                            <Typography>
                                Player {index + 1}: {playerName}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default PlayerList;
