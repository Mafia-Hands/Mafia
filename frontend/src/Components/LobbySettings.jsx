import { React, useContext } from 'react';
import { GeneralContext } from '../App';
import { makeStyles } from '@material-ui/core/styles';
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
        gridGap: '24px',
        backgroundColor: 'pink',
        justifyItems: 'center',
    },
});

const LobbySettings = ({ setOpen, setOpenInfo }) => {
    const { state } = useContext(GeneralContext);
    const classes = useStyles();

    return (
        <div style={{ display: 'grid' }}>
            <Card className={classes.root} variant="Outlined">
                <CardHeader title="Game Settings"></CardHeader>
                <CardContent>
                    <List>
                        <ListItem>
                            <Typography variant="h5">Game Code: {state.code}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography style={{ marginRight: '20px' }}>Number of Mafia: </Typography>
                            <Select defaultValue={1} label="This is a label">
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </ListItem>
                    </List>
                </CardContent>
                <CardActions>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={() => {
                            setOpen(true);
                            setOpenInfo(true);
                        }}
                    >
                        Roles
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default LobbySettings;
