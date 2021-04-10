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
});

const StyledButton = withStyles({
    root: {
        backgroundColor: '#a4b8c4',
    },
    label: {
        textTransform: 'capitalize',
        color: '#2b282a',
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
                        <Select style={{ color: '#2b282a' }} defaultValue={1} label="This is a label">
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
