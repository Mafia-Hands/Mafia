import { constructPlayersOnTrialStatus, nightTimeStatus } from '../GameUtils';
import { useContext, useReducer, useEffect } from 'react';
import { GeneralContext } from '../App';
import socket from '../Socket';

const initialState = {
    screen: 'entry',
    dayPeriod: 'Day', // night or day
    dayNumber: 1, // what day it is
    alivePlayers: [],
    status: '',
    winningRole: '',
    winners: [],
    phase: '',
    role: '',
    amIDead: false,
    checkedPlayers: [],
    votingState: {
        type: '', // role or discussion or trial or undefined
        votablePlayers: [], // what other players can we vote for
        vote: '', // my current Vote
        playersWhoVoted: [], // other players who have voted
        killedPlayer: '', // the outcome of the vote
        timeToVote: '', // time to vote
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'init': {
            return {
                ...state,
                alivePlayers: [...action.alivePlayers],
                role: action.role,
                ...(action.checkedPlayers && {
                    checkedPlayers: action.checkedPlayers,
                }),
            };
        }

        case 'night-start': {
            return {
                ...state,
                phase: 'night-start',
                status: action.status,
                dayPeriod: 'Night',
                screen: 'core',
                votingState: {
                    ...state.votingState,
                    type: 'role',
                    votablePlayers: [...action.votablePlayers],
                    timeToVote: action.timeToVote,
                },
            };
        }

        case 'show-selected': {
            return {
                ...state,
                status: action.status,
                votingState: { ...state.votingState, vote: action.votedPlayer },
            };
        }

        case 'abstain': {
            return {
                ...state,
                status: action.status,
                votingState: { ...state.votingState, vote: '' },
            };
        }

        case 'night-end': {
            return {
                ...state,
                phase: 'night-end',
                status: action.status,
                alivePlayers: state.alivePlayers.filter((p) => p !== action.playerKilled),
                votingState: {
                    ...initialState.votingState,
                },
            };
        }

        case 'day-start': {
            return {
                ...state,
                phase: 'day-start',
                dayPeriod: 'Day',
                dayNumber: state.dayNumber + 1,
                status: action.status,
                votingState: {
                    ...state.votingState,
                    timeToVote: action.timeToVote,
                    type: 'discussion',
                    votablePlayers: [...action.votablePlayers],
                },
            };
        }

        case 'discussion-end': {
            return {
                ...state,
                phase: 'discussion-end',
                status: action.status,
                votingState: {
                    ...initialState.votingState,
                    type: 'trial',
                    ...(action.votablePlayers.length && {
                        votablePlayers: action.votablePlayers,
                    }),
                },
            };
        }

        case 'trial-start': {
            return {
                ...state,
                phase: 'trial-start',
                status: action.status,
                votingState: {
                    ...state.votingState,
                    timeToVote: action.timeToVote,
                },
            };
        }
        case 'trial-end': {
            return {
                ...state,
                phase: 'trial-start',
                status: action.status,
                alivePlayers: state.alivePlayers.filter((p) => p !== action.playerKilled),
                votingState: {
                    ...initialState.votingState,
                },
            };
        }

        case 'game-over': {
            return {
                ...state,
                phase: 'game-over',
                screen: 'end',
                status: `${action.winningRole} wins!`,
                winningRole: action.winningRole,
                winners: [...action.winners],
            };
        }

        case 'vote-update': {
            return {
                ...state,
                votingState: {
                    ...state.votingState,
                    playersWhoVoted: action.playersWhoVoted,
                },
            };
        }

        case 'suspect-reveal': {
            return {
                ...state,
                checkedPlayers: [...state.checkedPlayers, action.checkedPlayer],
            };
        }

        case 'skip-trial': {
            return {
                ...state,
                status: action.status,
                votingState: {
                    ...initialState.votingState,
                },
            };
        }

        default:
            throw new Error(`Invalid Game State reducer action: ${action.type}`);
    }
};

export default function useGameState() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { state: generalState } = useContext(GeneralContext);

    /**
     * This effect will run on first render to initialise the alive players.
     * We may need to lie about the dependency so that players dont just 'leave'
     */
    useEffect(() => {
        const { role } = generalState;
        const extraRoleState = role === 'detective' ? { checkedPlayers: [] } : {};

        dispatch({
            type: 'init',
            alivePlayers: generalState.players,
            role: role,
            ...extraRoleState,
        });
    }, [generalState]);

    useEffect(() => {
        function onNightStart({ timeToVote }) {
            const amIDead = !state.alivePlayers.includes(generalState.nickname);
            if (amIDead) {
                dispatch({
                    type: 'night-start',
                    status: 'You are dead',
                    votablePlayers: [],
                    timeToVote,
                });
                return;
            }

            const { role } = generalState;

            const status = nightTimeStatus[role];

            const votablePlayers = {
                mafia: state.alivePlayers.filter((p) => p !== generalState.nickname),
                detective: state.alivePlayers.filter(
                    (p) =>
                        p !== generalState.nickname &&
                        state.checkedPlayers &&
                        !state.checkedPlayers.some((c) => c.nickname === p)
                ),
                medic: state.alivePlayers,
                civilian: [],
                jester: [], // TODO CHANGED
            }[role];

            dispatch({
                type: 'night-start',
                status,
                votablePlayers,
                timeToVote,
            });
        }

        function onNightEnd({ playerKilled, isGameOver }) {
            dispatch({
                type: 'night-end',
                status: playerKilled ? `${playerKilled} was killed in the night...` : `Nobody died in the night!`,
                playerKilled,
            });

            if (!isGameOver) {
                generalState.isHost && setTimeout(() => socket.emit('start-day'), 2000);
            }
        }

        function onDayStart({ timeToVote }) {
            const amIDead = !state.alivePlayers.includes(generalState.nickname);
            dispatch({
                type: 'day-start',
                status: amIDead ? 'You are dead' : 'Select someone to be on trial',
                votablePlayers: state.alivePlayers.filter((p) => p !== generalState.nickname),
                timeToVote,
            });
        }

        function onDiscussionEnd({ playerOnTrial }) {
            if (playerOnTrial === null) {
                dispatch({
                    type: 'skip-trial',
                    status: 'No one is on trial',
                });

                generalState.isHost && setTimeout(() => socket.emit('start-night'), 2000); // TODO CHANGED
                return;
            }

            dispatch({
                type: 'discussion-end',
                status: constructPlayersOnTrialStatus(playerOnTrial),
                votablePlayers: playerOnTrial !== generalState.nickname ? [playerOnTrial] : [],
            });

            generalState.isHost && setTimeout(() => socket.emit('start-trial'), 2000); // TODO CHANGED
        }

        function onTrialStart({ timeToVote }) {
            const amIDead = !state.alivePlayers.includes(generalState.nickname);
            dispatch({
                type: 'trial-start',
                status: amIDead
                    ? 'You are dead'
                    : state.votingState.votablePlayers.length
                    ? 'Vote for the player on trial to kill them'
                    : 'You are on trial',
                timeToVote,
            });
        }

        function onTrialEnd({ playerKilled, isGameOver }) {
            dispatch({
                type: 'trial-end',
                status:
                    playerKilled === 'abstain Vote' || !playerKilled
                        ? `Nobody was killed in the Trial!`
                        : `The town voted to kill ${playerKilled}!`,
                playerKilled,
            });
            if (!isGameOver) {
                generalState.isHost && setTimeout(() => socket.emit('start-night'), 2000); // TODO CHANGED
            }
        }

        function onGameOver({ winningRole, winners }) {
            console.log(winningRole + ' ' + winners);
            dispatch({
                type: 'game-over',
                winningRole: winningRole.toLowerCase(),
                winners,
            });
        }

        function onVoteUpdate({ voteMap }) {
            dispatch({
                type: 'vote-update',
                playersWhoVoted: Object.keys(voteMap),
            });
        }

        function onSuspectReveal(checkedPlayer) {
            dispatch({
                type: 'suspect-reveal',
                checkedPlayer,
            });
        }

        socket.on('night-start', onNightStart);
        socket.on('night-end', onNightEnd);
        socket.on('day-start', onDayStart);
        socket.on('discussion-end', onDiscussionEnd);
        socket.on('trial-start', onTrialStart);
        socket.on('trial-end', onTrialEnd);
        socket.on('game-over', onGameOver);

        socket.on('day-vote-update', onVoteUpdate);
        socket.on('trial-vote-update', onVoteUpdate);

        socket.on('suspect-reveal', onSuspectReveal);

        return () => {
            socket.removeListener('night-start', onNightStart);
            socket.removeListener('night-end', onNightEnd);
            socket.removeListener('day-start', onDayStart);
            socket.removeListener('discussion-end', onDiscussionEnd);
            socket.removeListener('trial-start', onTrialStart);
            socket.removeListener('trial-end', onTrialEnd);
            socket.removeListener('game-over', onGameOver);

            socket.removeListener('day-vote-update', onVoteUpdate);
            socket.removeListener('trial-vote-update', onVoteUpdate);

            socket.removeListener('suspect-reveal', onSuspectReveal);
        };
    }, [state, generalState]);

    return [state, dispatch];
}
