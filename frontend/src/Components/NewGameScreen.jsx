import { React } from 'react';
import TopBarSettings from './TopBarSettings'
import PlayerList from './PlayerList'
import LobbySettings from './LobbySettings'
import Chatbox from './Chatbox'
import styles from '../Styles/NewGameScreen.module.css';
import { Button} from '@material-ui/core';

const NewGameScreen = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <TopBarSettings currentScreen="LOBBY" showSettings={true} />
            </div>
            <div className={styles.playerNames}>
                <PlayerList playerNames={["Alice","Bob","Carla","Dave","Errol","Fong"]}/>
            </div>
            <div className={styles.chatbox}>
                <Chatbox messageList={["hi","sup","these are dummy messages, chat isn't currently implemented"]}/>
            </div>
            <div className={styles.lobbySettings}>
                <LobbySettings gameCode="ABC123"/>
            </div>
            <div className={styles.startButton}>
                <Button variant="contained" color="primary" size="large" onClick={() => alert('Game screen goes here')}>
                    Start Game
                </Button>
            </div>
        </div>
    )
}

export default NewGameScreen