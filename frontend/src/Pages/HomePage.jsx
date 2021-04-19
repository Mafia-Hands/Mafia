import React, { useContext, useState } from 'react';

import {
    withStyles,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
    IconButton,
    Slider,
} from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

import socket from '../Socket';
import { GeneralContext } from '../Context';
import styles from '../Styles/HomePage.module.css';
import logo from '../images/MafiaLogo.png';

const StyledIconButton = withStyles({
    root: {
        padding: '5px',
        color: '#c8d3d5',
        position: 'fixed',
        top: '15px',
        left: '15px',
    },
})(IconButton);

const CustomTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#3E5B7F',
        },
    },
})(TextField);

const CustomJoinButton = withStyles({
    root: {
        backgroundColor: '#f76c6c',
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
        borderTopRightRadius: '5px',
        borderBottomRightRadius: '5px',
        border: 'none',
        '&:hover': {
            backgroundColor: '#f75252',
        },
    },
    label: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        color: 'white',
        fontSize: '14px',
    },
})(Button);

const CustomCreateButton = withStyles({
    root: {
        backgroundColor: '#f76c6c',
        borderRadius: '5px',
        border: 'none',
        '&:hover': {
            backgroundColor: '#f75252',
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

const CustomStyledIconButton = withStyles({
    root: {
        paddingLeft: '95%',
    },
})(StyledIconButton);

// @param {code}  props.code represents the lobby code
export default function HomePage(props) {
    const { dispatch } = useContext(GeneralContext);
    const [nickname, setNickname] = useState('');
    const [code, setCode] = useState(props.code);
    const [joinDisabled, setjoinDisabled] = useState(true);
    const [joinLobbyDisabled, setjoinLobbyDisabled] = useState(true);
    const [tickNonempty, setTickNonempty] = useState(false);
    const [tickNoSpaces, setTickNoSpaces] = useState(true);
    const [tickLessThanTen, setTickLessThanTen] = useState(true);
    const [switchForm, setForm] = useState(false);

    const [openSetting, setOpenSetting] = useState(false);

    // Volume control logic
    const [bgmVolume, setBgmVolume] = useState(100);

    const handleBgmVolumeChange = (event, newValue) => {
        setBgmVolume(newValue);
        document.getElementById('bgm').volume = newValue / 100.0;
    };

    const createLobby = () => {
        dispatch({ type: 'create-lobby', nickname });
        socket.emit('create-lobby', { nickname });
    };

    const joinLobby = () => {
        dispatch({ type: 'join-lobby', nickname, code });
        socket.emit('join-lobby', { roomCode: code, nickname });
    };

    const validateNickname = (nickName) => {
        let validCheck = true;
        setNickname(nickName);
        if (nickName === '') {
            validCheck = false;
            setTickNonempty(false);
        } else {
            setTickNonempty(true);
        }
        if (nickName.includes(' ')) {
            validCheck = false;
            setTickNoSpaces(false);
        } else {
            setTickNoSpaces(true);
        }
        if (nickName.length > 10) {
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

    const validateCode = (lobbyCode) => {
        let validCheck = true;
        setCode(lobbyCode);
        if (lobbyCode === '') {
            validCheck = false;
        }
        if (validCheck && joinDisabled === false) {
            setjoinLobbyDisabled(false);
        } else {
            setjoinLobbyDisabled(true);
        }
    };

    return (
        <div className={styles.container}>
            <CustomStyledIconButton variant="contained" onClick={() => setOpenSetting(true)}>
                <SettingsIcon />
            </CustomStyledIconButton>
            <img src={logo} alt="" />
            <div className={styles.contents}>
                <div className={`${switchForm === true ? styles.hidden : styles.primary}`}>
                    <CustomTextField
                        className={styles.nameInputs}
                        id="nickname"
                        label="Enter Nickname"
                        autoComplete="off"
                        value={nickname}
                        onChange={(e) => validateNickname(e.target.value)}
                        InputLabelProps={{ style: { fontSize: '18px', paddingLeft: '2em' } }}
                        InputProps={{ disableUnderline: true, style: { fontSize: '26px', paddingLeft: '1em' } }}
                    />
                    <div className={styles.checkers}>
                        <span className={tickNonempty ? styles.validNickname : styles.invalidNickname}>
                            {tickNonempty ? (
                                <span className={styles.checkitems}>&#10004; Non-empty nickname</span>
                            ) : (
                                <span className={styles.checkitems}>&#10005; Non-empty nickname</span>
                            )}
                        </span>
                        <br />
                        <span className={tickNoSpaces ? styles.validNickname : styles.invalidNickname}>
                            {tickNoSpaces ? (
                                <span className={styles.checkitems}>&#10004; No spaces</span>
                            ) : (
                                <span className={styles.checkitems}>&#10005; No spaces</span>
                            )}
                        </span>
                        <br />
                        <span className={tickLessThanTen ? styles.validNickname : styles.invalidNickname}>
                            {tickLessThanTen ? (
                                <span>
                                    <span className={styles.checkitems}>&#10004; Less than 10 characters</span>
                                </span>
                            ) : (
                                <span className={styles.checkitems}>&#10005; Less than 10 characters</span>
                            )}
                        </span>
                    </div>
                    <CustomCreateButton
                        className={styles.createButton}
                        variant="outlined"
                        onClick={createLobby}
                        id="create-lobby"
                        disabled={joinDisabled}
                    >
                        Create new game
                    </CustomCreateButton>
                    <CustomCreateButton
                        className={styles.joinButton}
                        variant="outlined"
                        onClick={() => setForm(true)}
                        id="switch-form"
                        disabled={joinDisabled}
                    >
                        Join Game
                    </CustomCreateButton>
                </div>
                <div className={`${switchForm === false ? styles.hidden : styles.secondary}`}>
                    <div className={styles.header}>Enter an ID to start playing!</div>
                    <button className={styles.goBackButton} onClick={() => setForm(false)} type="button">
                        Go Back
                    </button>
                    <div className={styles.joinForm}>
                        <CustomTextField
                            className={styles.codeInputs}
                            id="room-code"
                            value={code}
                            label="Enter LobbyID"
                            autoComplete="off"
                            type="text"
                            onChange={(e) => validateCode(e.target.value)}
                            InputLabelProps={{ style: { fontSize: '18px', paddingLeft: '2em' } }}
                            InputProps={{ disableUnderline: true, style: { fontSize: '26px', paddingLeft: '1em' } }}
                        />
                        <CustomJoinButton
                            className={styles.joinLobbyButton}
                            variant="outlined"
                            onClick={joinLobby}
                            id="join-lobby"
                            disabled={joinLobbyDisabled}
                        >
                            Join
                        </CustomJoinButton>
                    </div>
                </div>
            </div>
            <Dialog
                open={openSetting}
                onClose={() => {
                    setOpenSetting(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Sound</DialogTitle>
                <DialogContent>
                    <Slider defaultValue={100} value={bgmVolume} onChange={handleBgmVolumeChange} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
