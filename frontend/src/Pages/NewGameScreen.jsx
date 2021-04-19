import { React, useState, useContext } from 'react';
import { Button, withStyles } from '@material-ui/core';
import TopBarSettings from '../Components/TopBarSettings';
import PlayerList from '../Components/PlayerList';
import LobbySettings from '../Components/LobbySettings';
import Chatbox from '../Components/Chatbox';
import styles from '../Styles/NewGameScreen.module.css';
import { GeneralContext } from '../Context';
import socket from '../Socket';

import RolesAndRules from '../Components/RolesAndRules';
import SettingDialog from './SettingDialog';
import ModalMUI from '../Components/ModalMUI';

const StyledButton = withStyles({
    root: {
        alignSelf: 'start',
        height: '100%',
        borderRadius: '10px',
        color: 'white',
        backgroundColor: '#f76c6c',
        '&:hover': {
            backgroundColor: '#f75252',
        },
    },
    label: {
        fontWeight: 'bolder',
        textTransform: 'capitalize',
        letterSpacing: '2px',
        fontSize: '1.5rem',
    },
})(Button);

const NewGameScreen = () => {
    const { state } = useContext(GeneralContext);
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const startGame = () => {
        socket.emit('start-game');
    };
    return (
        <div className={styles.newGameScreen}>
            <div className={styles.container}>
                <TopBarSettings
                    currentScreen={`LOBBY ID: ${state.code}`}
                    showSettings
                    showUp={setOpen}
                    setOpenInfo={setOpenInfo}
                />
                <div className={styles.bodyContainer}>
                    <div className={styles.leftContainer}>
                        <PlayerList className={styles.playerNames} />
                        <LobbySettings className={styles.lobbySettings} setOpen={setOpen} setOpenInfo={setOpenInfo} />
                    </div>
                    <div className={styles.rightContainer}>
                        <Chatbox
                            className={styles.chatbox}
                            messageList={messageList}
                            setMessageList={(message) => {
                                setMessageList((prevList) => [...prevList, message]);
                            }}
                        />
                        <StyledButton
                            className={styles.startButton}
                            variant="contained"
                            size="large"
                            id="start-game"
                            disabled={!state.lobbyReady}
                            onClick={startGame}
                        >
                            Start Game
                        </StyledButton>
                    </div>
                </div>
            </div>

            <ModalMUI open={open} setOpen={setOpen}>
                {openInfo ? (
                    <div>
                        <TopBarSettings
                            showBack
                            showUp={setOpen}
                            currentScreen="Roles and Rules"
                            showSettings={false}
                            setOpenInfo={setOpenInfo}
                        />
                        <RolesAndRules inLobby />
                    </div>
                ) : (
                    <div>
                        <TopBarSettings showBack showUp={setOpen} currentScreen="Settings" showSettings={false} />
                        <SettingDialog />
                    </div>
                )}
            </ModalMUI>
        </div>
    );
};

export default NewGameScreen;
