import { React, useState, useContext } from 'react';
import TopBarSettings from '../Components/TopBarSettings';
import PlayerList from '../Components/PlayerList';
import LobbySettings from '../Components/LobbySettings';
import Chatbox from '../Components/Chatbox';
import styles from '../Styles/NewGameScreen.module.css';
import { GeneralContext } from '../App';
import socket from '../Socket';
import { Button } from '@material-ui/core';
import ModalMUI from '../Modal/ModalMUI';
import RolesAndRules from '../Components/RolesAndRules';
import SettingDialog from '../Pages/SettingDialog';

const NewGameScreen = () => {
    const { state } = useContext(GeneralContext);
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const startGame = () => {
        socket.emit('start-game');
    };
    return (
        <div>
            <TopBarSettings currentScreen="LOBBY" showSettings={true} showUp={setOpen} setOpenInfo={setOpenInfo} />
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <PlayerList className={styles.playerNames} />
                    <Chatbox
                        className={styles.chatbox}
                        messageList={['hi', 'sup', "these are dummy messages, chat isn't currently implemented"]}
                    />
                </div>
                <div className={styles.rightContainer}>
                    <LobbySettings className={styles.lobbySettings} setOpen={setOpen} setOpenInfo={setOpenInfo} />
                    <Button
                        className={styles.startButton}
                        variant="contained"
                        color="primary"
                        size="large"
                        id="start-game"
                        disabled={!state.lobbyReady}
                        onClick={startGame}
                    >
                        Start Game
                    </Button>
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <ModalMUI open={open} setOpen={setOpen}>
                    {openInfo ? (
                        <div>
                            <TopBarSettings
                                showBack={true}
                                showUp={setOpen}
                                currentScreen="ROLES AND RULES"
                                showSettings={false}
                                setOpenInfo={setOpenInfo}
                            />
                            <RolesAndRules userRole="Mafia" />
                        </div>
                    ) : (
                        <div>
                            <TopBarSettings
                                showBack={true}
                                showUp={setOpen}
                                currentScreen="SETTINGS"
                                showSettings={false}
                            />
                            <SettingDialog />
                        </div>
                    )}
                </ModalMUI>
            </div>
        </div>
    );
};

export default NewGameScreen;
