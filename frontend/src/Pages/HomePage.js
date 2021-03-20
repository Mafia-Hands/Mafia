import React, { useContext, useState } from 'react';
import socket from '../Socket';
import { GeneralContext } from '../App';
import { withStyles, TextField, Button } from '@material-ui/core';
import styles from '../Styles/HomePage.module.css';


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
        textTransform:'capitalize',
        fontSize: '1.2rem'
      },
})(Button);

export default function HomePage() {
    const { dispatch } = useContext(GeneralContext);
    const [nickname, setNickname] = useState('');
    const [code, setCode] = useState('');

    const createLobby = () => {
        dispatch({ type: 'create-lobby', nickname });
        socket.emit('create-lobby', { nickname });
    };

    const joinLobby = () => {
        dispatch({ type: 'join-lobby', nickname, code });

        socket.emit('join-lobby', { roomCode: code, nickname });
    };

    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <div className={styles.header}> Mafia </div>
                <CustomTextField
                    className={styles.nameInputs}
                    id="nickname"
                    label="Enter Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    InputProps={{ disableUnderline: true }}
                ></CustomTextField>
                <CustomTextField
                    className={styles.codeInputs}
                    id="room-code"
                    value={code}
                    label="Enter LobbyID"
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    InputProps={{ disableUnderline: true }}
                ></CustomTextField>
                <CustomJoinButton className={styles.joinButton} variant="outlined" onClick={joinLobby} id="join-lobby" >
                    Join
                </CustomJoinButton>
                <CustomCreateButton className={styles.createButton} variant="outlined" onClick={createLobby} id="create-lobby">
                    Create new game
                </CustomCreateButton>
            </div>
        </div>
    );
}
