// this class would hold state relating to the lobby.
// it would use the socket

import socket from './Socket';

const initialState = {
    screen: '',
    nickname: '',
    code: '',
    host: '',
    players: '',
    lobbyReady: false,
    isHost: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'set-code':
            return { ...state, code: action.code };
        case 'add-host':
            return {
                ...state,
                nickname: action.nickname,
                host: action.nickname,
                isHost: true,
                players: [...state.players, action.nickname],
            };
        case 'join-lobby':
            return {
                ...state,
                nickname: action.nickname,
                code: action.code,
            };
        case 'lobby-ready':
            return {
                ...state,
                lobbyReady: true,
            };
    }
};

// class LobbyState {
//     constructor() {
//         this.init();

//         socket.on('lobby-create', onLobbyCreate);
//         socket.on('lobby-join', onLobbyJoin);
//         socket.on('lobby-ready', onLobbyConfirm);
//     }

//     init() {
//         this.code = '';
//         this.host = '';
//         this.players = [];
//         this.lobbyReady = false;
//     }

//     setCode(code) {
//         this.code = code;
//     }

//     addHost(nickname) {
//         this.host = host;
//         this.players.push(nickname);
//     }

//     onLobbyCreate({ code }) {
//         this.code = code;
//     }

//     onLobbyJoin({ players, host }) {
//         this.host = host;
//         this.players = players;
//     }

//     onLobbyReady() {
//         this.lobbyReady = true;
//     }
// }
