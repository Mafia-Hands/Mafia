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
        backgroundColor: '#3E5B7F',
        gridTemplateRows: '0.5fr 5fr',
        border: 'none',
        borderRadius: '10px',
    },
    title: {
        fontSize: '10px',
        fontFamily: 'Helvetica, sans-serif',
        backgroundColor: 'rgb(152, 193, 217,0.6)',
        color: '#E3F1F1',
        padding: '10px',
        paddingLeft: '16px',
    },
    content: {
        padding: '0px',
        color: '#E3F1F1',
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
