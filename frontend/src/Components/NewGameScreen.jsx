import { React } from 'react';
import TopBarSettings from './TopBarSettings';
import PlayerList from './PlayerList';
import LobbySettings from './LobbySettings';
import Chatbox from './Chatbox';
import styles from '../Styles/NewGameScreen.module.css';

const NewGameScreen = () => {
    return (
        <div className={styles.container}>
            <TopBarSettings currentScreen="LOBBY" showSettings={true} />
            <div className={styles.gameSettingsContainer}>
                <PlayerList playerNames={['Alice', 'Bob', 'Carla', 'Dave', 'Errol', 'Fong']} />
                <LobbySettings gameCode="ABC123" />
                <Chatbox messageList={['hi', 'sup', "these are dummy messages, chat isn't currently implemented"]} />
                <button className={styles.startGameButton} onClick={() => alert('Game screen goes here')}>
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default NewGameScreen;
