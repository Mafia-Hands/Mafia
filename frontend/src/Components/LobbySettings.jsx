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
        backgroundColor: '#7796A6',
        gridTemplateRows: '0.5fr 5fr',
        border: 'none',
        borderRadius: '10px',
    },
    title: {
        fontSize: '10px',
        fontFamily: 'Helvetica, sans-serif',
        backgroundColor: '#C8D3D5',
        color: 'black',
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
        backgroundColor: '#C2CCD6',
    },
    label: {
        textTransform: 'capitalize',
        color: 'black',
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
                        <Typography style={{ marginRight: '20px', color: 'black' }}>Number of Mafias: </Typography>
                        <Select defaultValue={1} label="This is a label">
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </ListItem>
                    <ListItem>
                        <Typography style={{ marginRight: '20px', color: 'black'  }}>Number of Medics: </Typography>
                        <Select defaultValue={1} label="This is a label">
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </ListItem>
                    <ListItem>
                        <Typography style={{ marginRight: '20px', color: 'black'  }}>Number of Jesters: </Typography>
                        <Select defaultValue={1} label="This is a label">
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
