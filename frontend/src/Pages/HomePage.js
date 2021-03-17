import React, { useContext, useState } from 'react';
import socket from '../Socket';
import { GeneralContext } from '../App';
import { TextField, Button } from '@material-ui/core';
import styles from '../Styles/HomePage.module.css';

export default function HomePage() {
    const { dispatch } = useContext(GeneralContext);
    const [nickname, setNickname] = useState('');
    const [code, setCode] = useState('');

    const createLobby = () => {
        dispatch({ type: 'create-lobby', nickname });
        socket.emit('create-lobby', { nickname });
    };

    const joinLobby = () => {
        dispatch({ type: 'create-lobby', nickname, code });

        socket.emit('join-lobby', { roomCode: code, nickname });
    };

    return (
        <div>
            <div className={styles.container}>
                <h1>MAFIA</h1>
                <TextField
                    color="secondary"
                    id="nickname"
                    label="Enter Nickname"
                    variant="outlined"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                ></TextField>
                <TextField
                    color="secondary"
                    id="room-code"
                    value={code}
                    label="Enter LobbyID"
                    variant="outlined"
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                ></TextField>
                <Button variant="outlined" onClick={joinLobby} id="join-lobby">
                    Join Game
                </Button>
                Want to create a new lobby?
                <Button variant="outlined" onClick={createLobby} id="create-lobby">
                    Create Game
                </Button>
            </div>
        </div>
    );
}
