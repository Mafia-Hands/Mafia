import React, { useContext, useState } from 'react';

import socket from '../Socket';

import { GeneralContext } from '../App';

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
            HOME <br />
            Nickname <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <br />
            Code
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            <br />
            <button onClick={joinLobby}> Join </button>
            <button onClick={createLobby}> createLobby </button>
        </div>
    );
}
