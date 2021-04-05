import { React, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Input,
    List,
    ListItem,
    Typography,
} from '@material-ui/core';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:4001';

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
    action: {
        display: 'grid',
        backgroundColor: 'rgb(152, 193, 217,0.6)',
        gridTemplateColumns: '70% 1fr',
        padding: '0px',
    },
    input: {
        color: '#E3F1F1',
        paddingLeft: '8px',
    },
});

const StyledButton = withStyles({
    root: {
        backgroundColor: 'rgb(152, 193, 217,0.6)',
        borderRadius: '0px',
    },
    label: {
        textTransform: 'lowercase',
        color: '#E3F1F1',
    },
})(Button);

/**
 * @param messageList MANDATORY prop: a list of strings (previous chat messages)
 */
const Chatbox = ({ messageList }) => {
    const classes = useStyles();

    const [chatMessage, setChatMessage] = useState('');
    const [chatMessageList, setChatMessageList] = useState([]);
    const socket = socketIOClient(ENDPOINT);

    useEffect(() => {
        socket.on('message', (data) => {
            console.log(chatMessageList)
            setChatMessageList([...chatMessageList, data])
            console.log(data);
        });
    }, []);

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader className={classes.title} title="Chat" />
            <CardContent className={classes.content}>
                <List>
                    {chatMessageList.map((message, index) => (
                        // react/no-array-index-key: not safe to use index as the key
                        // probably need to have a message id etc in the future
                        <ListItem key={index}>
                            <Typography>{message}</Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions className={classes.action}>
                <Input
                    className={classes.input}
                    type="text"
                    placeholder="message..."
                    disableUnderline="true"
                    value={chatMessage}
                    onChange={(event) => {
                        setChatMessage(event.target.value);
                    }}
                />
                <StyledButton onClick={() => {
                    socket.emit('message', chatMessage)
                    setChatMessage('');
                }}>Send</StyledButton>
            </CardActions>
        </Card>
    );
};

export default Chatbox;
