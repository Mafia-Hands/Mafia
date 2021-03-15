import { React } from 'react';
import TopBarSettings from './TopBarSettings'
import PlayerList from './PlayerList'
import LobbySettings from './LobbySettings'
import Chatbox from './Chatbox'
import styles from '../Styles/NewGameScreen.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const NewGameScreen = () => {
    const classes = useStyles();

    return (
        <Grid>
            <TopBarSettings currentScreen="LOBBY" showSettings={true} />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <Chatbox messageList={["hi","sup","these are dummy messages, chat isn't currently implemented"]}/>
                </Grid>
                <Grid item xs={3}>
                    <PlayerList playerNames={["Alice","Bob","Carla","Dave","Errol","Fong"]}/>
                </Grid>
                <Grid item xs={3}>
                    <LobbySettings gameCode="ABC123"/>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={() => alert('Game screen goes here')}>
                        Start Game
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NewGameScreen