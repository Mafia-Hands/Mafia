import { React } from 'react';
import styles from '../Styles/Chatbox.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, CardHeader, Input, List, ListItem, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: "grid",
        gridGap: "0px",
    },
    body: {
        alignSelf: "end",
        textAlign: "center"
    },
    actions: {
        display: "flex",
        flexDirection:'column' 
    },
    pos: {
        marginBottom: 0
    }
});

/**
 * @param messageList MANDATORY prop: a list of strings (previous chat messages)
 */
const Chatbox = ({messageList}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="Outlined">
            <CardHeader title="Chat"></CardHeader>
            <CardContent>
                <List>
                    {messageList.map((messageList, index) =>
                        <ListItem key={index}>
                            <Typography>{messageList}</Typography>
                        </ListItem>
                    )}
                </List>
            </CardContent>
            <CardActions>
                <Input type="text" placeholder="Chat Here..."/>
                <Button onClick={() => alert('Chat function not implemented yet')}>
                    Send
                </Button>
            </CardActions>
        </Card>
    )
}

export default Chatbox