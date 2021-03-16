import { useReducer, useEffect } from 'react';
import socket from '../Socket';

const initialState = {
    screen: 'home',
    nickname: '',
    code: '',
    host: '',
    players: [],
    lobbyReady: false,
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
                players: action.players,
            };
        case 'set-role':
            return {
                ...state,
                role: action.role,
            };
        default:
            throw new Error(
                `Invalid General State reducer action: ${action.type}`
            );
    }
};

export default function useLobbyState() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const confirmLobby = ({ success, errMsg }) => {
        if (!success) {
            alert(errMsg);
        } else {
            dispatch({ type: 'change-screen', screen: 'lobby' });
        }
    };

    const gameStart = ({ role }) => {
        // TODO: ROLE should be eunum
        dispatch({ type: 'set-role', role: role.toLowerCase() });

        dispatch({ type: 'change-screen', screen: 'game' });
    };

    useEffect(() => {
        // Invoked only if player created lobby
        socket.on('lobby-code', ({ code }) => {
            dispatch({ type: 'change-screen', screen: 'lobby' });

            dispatch({ type: 'lobby-code', code });
        });

        socket.on('lobby-confirm', confirmLobby);
        socket.on('lobby-join', (res) => {
            dispatch({ type: 'change-screen', screen: 'lobby' });

            dispatch({ type: 'lobby-join', ...res });
        });
        socket.on('lobby-ready', () => dispatch({ type: 'lobby-ready' }));
        socket.on('game-start', gameStart);
    }, []);

    return [state, dispatch];
}
