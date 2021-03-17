import { React, useContext } from 'react';
import TopBarSettings from '../Components/TopBarSettings';
import PlayerList from '../Components/PlayerList';
import LobbySettings from '../Components/LobbySettings';
import Chatbox from '../Components/Chatbox';
import styles from '../Styles/NewGameScreen.module.css';
import { GeneralContext } from '../App';
import socket from '../Socket';

const NewGameScreen = () => {
    const { state } = useContext(GeneralContext);
    const startGame = () => {
        socket.emit('start-game');
    };
    return (
        <div className={styles.container}>
            <TopBarSettings currentScreen="LOBBY" showSettings={true} />
            <div className={styles.gameSettingsContainer}>
                <PlayerList />
                <LobbySettings />
                <Chatbox messageList={['hi', 'sup', "these are dummy messages, chat isn't currently implemented"]} />
                <button
                    id="start-game"
                    className={styles.startGameButton}
                    disabled={!state.lobbyReady}
                    onClick={startGame}
                >
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default NewGameScreen;
