import { React, useContext } from 'react';
import socket from '../Socket';
import { Button } from '@material-ui/core';
import Player from '../Components/Player';
import { GameContext } from './GamePage';
import { Grid } from '@material-ui/core';
import { animated, useSpring } from 'react-spring';
import styles from '../Styles/GameOver.module.css';

const GameOverPage = () => {
    const { state } = useContext(GameContext);

    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0.1 },
        delay: 500,
        reset: true,
    });

    const returnToLobby = () => {
        socket.emit('reset-lobby');
    };

    return (
        <div>
            <animated.div style={props}>
                <Grid container direction="row" alignItems="center" justifyItems="center">
                    <Grid item xs={0} sm={2}></Grid>
                    <Grid item xs={10} sm={8}>
                        <h1 style={{ textAlign: 'center' }}>{`${
                            state.winningRole.charAt(0).toUpperCase() + state.winningRole.slice(1)
                        } team wins!`}</h1>
                    </Grid>
                </Grid>
                <Grid container direction="column" alignItems="center" justifyItems="center">
                    <div className={styles.playerMap} style={{ textAlign: 'center' }}>
                        {state.winners.map((name) => {
                            return <Player playerName={name} />;
                        })}
                    </div>
                    <Button
                        className={styles.lobbyBtn}
                        variant="contained"
                        size="large"
                        id="reset-lobby"
                        onClick={returnToLobby}
                        style={{ fontSize: '10em', padding: '2em' }}
                    >
                        Return to Lobby
                    </Button>
                </Grid>
            </animated.div>
        </div>
    );
};

export default GameOverPage;
