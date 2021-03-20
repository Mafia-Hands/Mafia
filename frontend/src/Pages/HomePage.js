import React, { useContext, useState } from 'react';
import socket from '../Socket';
import { GeneralContext } from '../App';
import { TextField, Button } from '@material-ui/core';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import styles from '../Styles/HomePage.module.css';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function HomePage() {
    const { dispatch } = useContext(GeneralContext);
    const [nickname, setNickname] = useState('');
    const [code, setCode] = useState('');
    const [joinDisabled, setjoinDisabled] = useState(true);
    const [tickNonempty, setTickNonempty] = useState(false);
    const [tickNoSpaces, setTickNoSpaces] = useState(true);
    const [tickLessThanTen, setTickLessThanTen] = useState(true);
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const createLobby = () => {
        dispatch({ type: 'create-lobby', nickname });
        socket.emit('create-lobby', { nickname });
    };

    const joinLobby = () => {
        dispatch({ type: 'join-lobby', nickname, code });

        socket.emit('join-lobby', { roomCode: code, nickname });
    };

    const validateNickname = (nickname) => {
        let validCheck = true;
        setNickname(nickname);
        if (nickname === '') {
            validCheck = false;
            setTickNonempty(false);
        } else {
            setTickNonempty(true);
        }
        if (nickname.includes(' ')) {
            validCheck = false;
            setTickNoSpaces(false);
        } else {
            setTickNoSpaces(true);
        }
        if (nickname.length > 10) {
            validCheck = false;
            setTickLessThanTen(false);
        } else {
            setTickLessThanTen(true);
        }
        if (validCheck) {
            setjoinDisabled(false);
        } else {
            setjoinDisabled(true);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <h1>MAFIA</h1>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={handleTooltipClose}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title={
                                <React.Fragment>
                                    <div className={styles.checkers}>
                                        <span className={tickNonempty? styles.validNickname : styles.invalidNickname}>
                                            {tickNonempty ? (
                                                <span>
                                                    <CheckRoundedIcon fontSize="small" />
                                                    <span className={styles.checkitems}> Non-empty nickname</span>{' '}
                                                </span>
                                            ) : (
                                                <span className={styles.checkitems}> Non-empty nickname</span>
                                            )}
                                        </span>
                                        <span className={tickNoSpaces? styles.validNickname : styles.invalidNickname}>
                                            {tickNoSpaces ? (
                                                <span>
                                                    <CheckRoundedIcon fontSize="small" />
                                                    <span className={styles.checkitems}> No spaces</span>{' '}
                                                </span>
                                            ) : (
                                                <span className={styles.checkitems}>No spaces</span>
                                            )}
                                        </span>
                                        <span className={tickLessThanTen? styles.validNickname : styles.invalidNickname}>
                                            {tickLessThanTen ? (
                                                <span>
                                                    <CheckRoundedIcon fontSize="small" />
                                                    <span className={styles.checkitems}>
                                                        Less than 10 characters
                                                    </span>{' '}
                                                </span>
                                            ) : (
                                                <span className={styles.checkitems}>Less than 10 characters</span>
                                            )}
                                        </span>
                                    </div>
                                </React.Fragment>
                            }
                            placement="right"
                            arrow
                        >
                            <TextField
                                color="secondary"
                                id="nickname"
                                label="Enter Nickname"
                                autoComplete="off"
                                variant="outlined"
                                value={nickname}
                                onChange={(e) => validateNickname(e.target.value)}
                                onClick={handleTooltipOpen}
                            ></TextField>
                        </Tooltip>
                    </div>
                </ClickAwayListener>
                <TextField
                    color="secondary"
                    id="room-code"
                    value={code}
                    label="Enter LobbyID"
                    autoComplete="off"
                    variant="outlined"
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                ></TextField>
                <Button variant="outlined" onClick={joinLobby} id="join-lobby" disabled={joinDisabled}>
                    Join Game
                </Button>
                Want to create a new lobby?
                <Button variant="outlined" onClick={createLobby} id="create-lobby" disabled={joinDisabled}>
                    Create Game
                </Button>
            </div>
        </div>
    );
}
