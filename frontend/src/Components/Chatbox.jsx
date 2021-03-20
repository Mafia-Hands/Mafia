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
    content:{
        padding: '0px',
        color: '#E3F1F1',
    },
    action:{
        display: 'grid',
        backgroundColor: 'rgb(152, 193, 217,0.6)',
        gridTemplateColumns: '70% 1fr',
        padding:'0px',
    },
    input:{
        color: '#E3F1F1', 
        paddingLeft: '8px', 
        
    }
});

const StyledButton = withStyles({
root:{
    backgroundColor: 'rgb(152, 193, 217,0.6)',
    borderRadius:'0px',
},
label:{
    textTransform: 'lowercase',
    color: '#E3F1F1',
}
})(Button);

/**
 * @param messageList MANDATORY prop: a list of strings (previous chat messages)
 */
const Chatbox = ({ messageList }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader className={classes.title} title="Chat"></CardHeader>
            <CardContent className={classes.content}>
                <List>
                    {messageList.map((messageList, index) => (
                        <ListItem key={index}>
                            <Typography>{messageList}</Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions className={classes.action}>
                <Input className={classes.input} type="text" placeholder="message..." disableUnderline= 'true' />
                <StyledButton onClick={() => alert('Chat function not implemented yet')}>Send</StyledButton>
            </CardActions>
        </Card>
    );
};

export default Chatbox;
