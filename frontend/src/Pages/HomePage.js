import React, { useContext, useState } from 'react';
import socket from '../Socket';
import { GeneralContext } from '../App';
import { withStyles, TextField, Button } from '@material-ui/core';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import styles from '../Styles/HomePage.module.css';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const CustomTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#3E5B7F',
        },
    },
})(TextField);

const CustomJoinButton = withStyles({
    root: {
        backgroundColor: 'rgba(227, 241, 241)',
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
        borderTopRightRadius: '5px',
        borderBottomRightRadius: '5px',
        border: 'none',
        '&:hover': {
            backgroundColor: 'rgba(152, 193, 217)',
        },
    },
    label: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        color: 'rgba((62,91,127))',
    },
})(Button);

const CustomCreateButton = withStyles({
    root: {
        backgroundColor: 'rgba(238, 102, 68)',
        borderRadius: '5px',
        border: 'none',
        '&:hover': {
            backgroundColor: 'rgb(180, 63, 34)',
        },
    },
    label: {
        fontFamily: 'Helvetica, sans-serif',
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: '1px',
        textTransform: 'capitalize',
        fontSize: '1.2rem',
    },
})(Button);

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
        <div className={styles.container}>
            <div className={styles.contents}>
                <div className={styles.header}> Mafia </div>
                <ClickAwayListener onClickAway={handleTooltipClose} style={{ display: 'grid' }}>
                    <div style={{ display: 'grid' }}>
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
                                        <span className={tickNonempty ? styles.validNickname : styles.invalidNickname}>
                                            {tickNonempty ? (
                                                <span>
                                                    <CheckRoundedIcon fontSize="small" />
                                                    <span className={styles.checkitems}> Non-empty nickname</span>{' '}
                                                </span>
                                            ) : (
                                                <span className={styles.checkitems}> Non-empty nickname</span>
                                            )}
                                        </span>
                                        <span className={tickNoSpaces ? styles.validNickname : styles.invalidNickname}>
                                            {tickNoSpaces ? (
                                                <span>
                                                    <CheckRoundedIcon fontSize="small" />
                                                    <span className={styles.checkitems}> No spaces</span>{' '}
                                                </span>
                                            ) : (
                                                <span className={styles.checkitems}>No spaces</span>
                                            )}
                                        </span>
                                        <span
                                            className={tickLessThanTen ? styles.validNickname : styles.invalidNickname}
                                        >
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
                            <CustomTextField
                                className={styles.nameInputs}
                                id="nickname"
                                label="Enter Nickname"
                                autoComplete="off"
                                value={nickname}
                                onChange={(e) => validateNickname(e.target.value)}
                                onClick={handleTooltipOpen}
                                InputLabelProps={{ style: { fontSize: '20px', paddingLeft: '2em' } }}
                                InputProps={{ disableUnderline: true, style: { fontSize: '30px', paddingLeft: '1em' } }}
                            ></CustomTextField>
                        </Tooltip>
                    </div>
                </ClickAwayListener>
                <CustomTextField
                    className={styles.codeInputs}
                    id="room-code"
                    value={code}
                    label="Enter LobbyID"
                    autoComplete="off"
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    InputLabelProps={{ style: { fontSize: '20px', paddingLeft: '2em' } }}
                    InputProps={{ disableUnderline: true, style: { fontSize: '30px', paddingLeft: '1em' } }}
                ></CustomTextField>
                <CustomJoinButton
                    className={styles.joinButton}
                    variant="outlined"
                    onClick={joinLobby}
                    id="join-lobby"
                    disabled={joinDisabled}
                >
                    Join
                </CustomJoinButton>
                <CustomCreateButton
                    className={styles.createButton}
                    variant="outlined"
                    onClick={createLobby}
                    id="create-lobby"
                    disabled={joinDisabled}
                >
                    Create new game
                </CustomCreateButton>
            </div>
        </div>
    );
}
