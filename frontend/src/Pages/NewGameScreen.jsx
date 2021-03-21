import { React, useState, useContext } from 'react';
import TopBarSettings from '../Components/TopBarSettings';
import PlayerList from '../Components/PlayerList';
import LobbySettings from '../Components/LobbySettings';
import Chatbox from '../Components/Chatbox';
import styles from '../Styles/NewGameScreen.module.css';
import { GeneralContext } from '../App';
import socket from '../Socket';
import { Button, withStyles } from '@material-ui/core';
import RolesAndRules from '../Components/RolesAndRules';
import SettingDialog from '../Pages/SettingDialog';
import ModalMUI from '../Modal/ModalMUI';

const StyledButton = withStyles({
    root: {
        alignSelf: 'start',
        height: '100%',
        borderRadius: '10px',
        backgroundColor: '#EE6644',
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
    const startGame = () => {
        socket.emit('start-game');
    };
    return (
        <div>
            <TopBarSettings
                currentScreen={`LOBBY ID: ${state.code}`}
                showSettings={true}
                showUp={setOpen}
                setOpenInfo={setOpenInfo}
            />
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <PlayerList className={styles.playerNames} />
                    <LobbySettings className={styles.lobbySettings} setOpen={setOpen} setOpenInfo={setOpenInfo} />
                </div>
                <div className={styles.rightContainer}>
                    <Chatbox className={styles.chatbox} messageList={['hi', 'sup', 'Hi SOFTENG 701 :)']} />

                    <StyledButton
                        className={styles.startButton}
                        variant="contained"
                        color="primary"
                        size="large"
                        id="start-game"
                        disabled={!state.lobbyReady}
                        onClick={startGame}
                    >
                        Start Game
                    </StyledButton>
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <ModalMUI open={open} setOpen={setOpen}>
                    {openInfo ? (
                        <div>
                            <TopBarSettings
                                showBack={true}
                                showUp={setOpen}
                                currentScreen="Roles and Rules"
                                showSettings={false}
                                setOpenInfo={setOpenInfo}
                            />
                            <RolesAndRules inLobby />
                        </div>
                    ) : (
                        <div>
                            <TopBarSettings
                                showBack={true}
                                showUp={setOpen}
                                currentScreen="Settings"
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
