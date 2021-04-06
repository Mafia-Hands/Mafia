import { React, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Box,
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
import socket from '../Socket';

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
        overflow: 'auto',
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
const Chatbox = ({ messageList, setMessageList }) => {
    const classes = useStyles();

    const [chatMessage, setChatMessage] = useState('');
    // const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on('message', (data) => {
            setMessageList(data);
        });
    }, []);

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader className={classes.title} title="Chat" />
            <CardContent className={classes.content}>
                <List>
                    {messageList.map((message, index) => {
                        // const formattedMessage = message.split(': ', 1);
                        // console.log(message)
                        const i = message.indexOf(': ');
                        const splits = [message.slice(0, i), message.slice(i + 1)];
                        return (
                            // react/no-array-index-key: not safe to use index as the key
                            // probably need to have a message id etc in the future
                            <ListItem key={index}>
                                <Typography>
                                    <Box fontWeight="fontWeightBold">{splits[0]}</Box> {splits[1]}
                                </Typography>
                            </ListItem>
                        );
                    })}
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
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            socket.emit('message', chatMessage);
                            setChatMessage('');
                        }
                    }}
                />
                <StyledButton
                    onClick={() => {
                        socket.emit('message', chatMessage);
                        setChatMessage('');
                    }}
                >
                    Send
                </StyledButton>
            </CardActions>
        </Card>
    );
};

export default Chatbox;
