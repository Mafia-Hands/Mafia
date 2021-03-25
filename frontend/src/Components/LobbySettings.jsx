import { React } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    List,
    ListItem,
    MenuItem,
    Select,
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
    content: {
        padding: '0px',
        color: '#E3F1F1',
    },
});

const StyledButton = withStyles({
    root: {
        backgroundColor: 'rgb(152, 193, 217,0.6)',
    },
    label: {
        textTransform: 'capitalize',
        color: '#E3F1F1',
    },
})(Button);

// this component will be used in the NewGameScreen.jsx
// @param {setOpen, setOpenInfo} used to open the role and rules modal
const LobbySettings = ({ setOpen, setOpenInfo }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="Outlined">
            <CardHeader className={classes.title} title="Game Settings" />
            <CardContent className={classes.content}>
                <List>
                    <ListItem>
                        <Typography style={{ marginRight: '20px' }}>Number of Mafia: </Typography>
                        <Select style={{ color: '#E3F1F1' }} defaultValue={1} label="This is a label">
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </ListItem>
                </List>
            </CardContent>
            <CardActions>
                <StyledButton
                    size="large"
                    variant="contained"
                    onClick={() => {
                        setOpen(true);
                        setOpenInfo(true);
                    }}
                >
                    Roles
                </StyledButton>
            </CardActions>
        </Card>
    );
};

export default LobbySettings;
