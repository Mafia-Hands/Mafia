import { React } from 'react';
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
const Chatbox = ({ messageList }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader className={classes.title} title="Chat" />
            <CardContent className={classes.content}>
                <List>
                    {messageList.map((message, index) => (
                        // react/no-array-index-key: not safe to use index as the key
                        // probably need to have a message id etc in the future
                        <ListItem key={index}>
                            <Typography>{message}</Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions className={classes.action}>
                <Input className={classes.input} type="text" placeholder="message..." disableUnderline="true" />
                <StyledButton onClick={() => alert('Chat function not implemented yet')}>Send</StyledButton>
            </CardActions>
        </Card>
    );
};

export default Chatbox;
