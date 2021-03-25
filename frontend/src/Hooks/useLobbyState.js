import { useReducer, useEffect } from 'react';
import socket from '../Socket';

const initialState = {
    screen: 'home', // or lobby or game
    nickname: '',
    code: '', // lobby code
    host: '', // the player who created the game
    players: [],
    lobbyReady: false, // lobby is ready when there are 6 players
    isHost: false,
    role: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'lobby-code':
            return { ...state, code: action.code };
        case 'create-lobby':
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
        case 'change-screen':
            return {
                ...state,
                screen: action.screen,
            };
        case 'lobby-join':
            return {
                ...state,
                host: action.host,
                players: action.playerNames,
            };
        case 'set-role':
            return {
                ...state,
                role: action.role,
            };
        default:
            throw new Error(`Invalid General State reducer action: ${action.type}`);
    }
};

export default function useLobbyState() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onConfirmLobby = ({ success, errMsg }) => {
        if (!success) {
            alert(errMsg); // eslint-disable-line no-alert
        } else {
            dispatch({ type: 'change-screen', screen: 'lobby' });
        }
    };

    useEffect(() => {
        const onGameStart = ({ role }) => {
            // TODO: ROLE should be enum
            dispatch({ type: 'set-role', role: role.toLowerCase() });

            dispatch({ type: 'change-screen', screen: 'game' });
            state.isHost && setTimeout(() => socket.emit('start-night'), 2000);
        };

        const onLobbyCode = ({ code }) => {
            dispatch({ type: 'change-screen', screen: 'lobby' });

            dispatch({ type: 'lobby-code', code });
        };

        const onlobbyJoin = (res) => {
            dispatch({ type: 'change-screen', screen: 'lobby' });
            dispatch({ type: 'lobby-join', ...res });
        };

        const onResetLobby = () => {
            dispatch({ type: 'change-screen', screen: 'lobby' });
        };

        const onLobbyReady = () => dispatch({ type: 'lobby-ready' });
        // Invoked only if player created lobby
        socket.on('lobby-code', onLobbyCode);

        socket.on('lobby-confirm', onConfirmLobby);
        socket.on('lobby-join', onlobbyJoin);
        socket.on('lobby-ready', onLobbyReady);
        socket.on('game-start', onGameStart);
        socket.on('reset-lobby-update', onResetLobby);

        return () => {
            socket.removeListener('lobby-code', onLobbyCode);

            socket.removeListener('lobby-confirm', onConfirmLobby);
            socket.removeListener('lobby-join', onlobbyJoin);
            socket.removeListener('lobby-ready', onLobbyReady);
            socket.removeListener('game-start', onGameStart);
            socket.removeListener('reset-lobby-update', onResetLobby);
        };
    }, [state]);

    return [state, dispatch];
}
