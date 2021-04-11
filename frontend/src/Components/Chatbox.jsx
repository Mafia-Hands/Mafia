import { React, useEffect, useState, useRef } from 'react';
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
        backgroundColor: '#7795a6',
        gridTemplateRows: '0.5fr 5fr',
        border: 'none',
        borderRadius: '10px',
        height: '100%',
        overflow: 'auto',
        maxHeight: '100vh'
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
        overflow: 'auto',
    },
    action: {
        display: 'grid',
        backgroundColor: '#c6ccd6',
        gridTemplateColumns: '70% 1fr',
        padding: '0px',
    },
    input: {
        color: '#2b282a',
        paddingLeft: '8px',
    },
});

const StyledButton = withStyles({
    root: {
        backgroundColor: '#a4b8c4',
        borderRadius: '0px',
    },
    label: {
        textTransform: 'lowercase',
        color: '#2b282a',
    },
})(Button);

/**
 * @param messageList MANDATORY prop: a list of strings (previous chat messages)
 */
const Chatbox = ({ messageList, setMessageList }) => {
    const classes = useStyles();

    // used to scroll to the bottom of the chat
    const scrollRef = useRef(null);
    const [chatMessage, setChatMessage] = useState('');

    useEffect(() => {
        socket.on('message', (data) => {
            setMessageList(data);
        });
    }, []);

    // always scroll to bottom of text chat when there are new messages
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behaviour: "smooth" });
      }
    }, [messageList]);

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
                    <ListItem ref={scrollRef} />
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
                        if (e.key === 'Enter' && chatMessage) {
                            socket.emit('message', chatMessage);
                            setChatMessage('');
                        }
                    }}
                />
                <StyledButton
                    onClick={() => {
                        if (chatMessage) {
                            socket.emit('message', chatMessage);
                            setChatMessage('');
                        }
                    }}
                >
                    Send
                </StyledButton>
            </CardActions>
        </Card>
    );
};

export default Chatbox;
