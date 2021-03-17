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
        dispatch({ type: 'join-lobby', nickname, code });

        socket.emit('join-lobby', { roomCode: code, nickname });
    };

    return (
        <div>
            HOME <br />
            Nickname <input id="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <br />
            Code
            <input id="room-code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            <br />
            <button id="join-lobby" onClick={joinLobby}>
                {' '}
                Join{' '}
            </button>
            <button id="create-lobby" onClick={createLobby}>
                {' '}
                createLobby{' '}
            </button>
        </div>
    );
}
