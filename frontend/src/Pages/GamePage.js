import React, { useContext, useReducer, useEffect, useCallback } from 'react';
import { createContext } from 'react';
import CoreGamePage from './CoreGamePage';
import EntryScreen from './EntryScreen';
import GameOverPage from './GameOverPage';
import socket from '../Socket';
import { GeneralContext } from '../App';

const initialState = {
    screen: 'entry',
    dayPeriod: 'day', // night or day
    dayNumber: 1, // what day it is
    alivePlayers: [],
    status: '',
    winningRole: '',
    winners: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'init': {
            return {
                ...state,
                alivePlayers: [...action.alivePlayers],
                ...action.extraRoleState,
            };
        }
        case 'change-screen': {
            return {
                ...state,
                screen: action.screen,
            };
        }
        case 'start-night':
            return {
                ...state,
                dayPeriod: 'night',
                status: action.status,
            };
        case 'update-status':
            return {
                ...state,
                status: action.status,
            };
        case 'kill-player':
            return {
                ...state,
                alivePlayers: state.alivePlayers.filter(
                    (p) => p !== action.playerKilled
                ),
            };
        case 'increment-time':
            return {
                ...state,
                dayPeriod: state.dayPeriod === 'day' ? 'night' : 'day',
                dayNumber:
                    state.dayPeriod === 'day'
                        ? state.dayNumber
                        : state.dayNumber + 1,
            };
        case 'winner':
            return {
                ...state,
                winningRole: action.winningRole,
                winners: [...action.winners],
                screen: 'end',
            };
    }
};

const initialVotingState = {
    phase: '', // role or discussion or trial or undefined
    votablePlayers: [], // what other players can we vote for
    vote: '', // my current Vote
    playersWhoVoted: [], // other players who have voted
    killedPlayer: '', // the outcome of the vote
    timeToVote: '', // time to vote
};

const votingReducer = (state, action) => {
    switch (action.type) {
        case 'reset': {
            return { ...initialVotingState };
        }
        case 'role-vote': {
            return {
                ...state,
                votablePlayers: [...action.votablePlayers],
                phase: 'role',
                timeToVote: action.duration,
            };
        }
        case 'discussion-vote': {
            return {
                ...state,
                votablePlayers: [...action.votablePlayers],
                phase: 'discussion',
                timeToVote: action.duration,
            };
        }

        case 'trial-vote': {
            return {
                ...state,
                votablePlayers: [...action.votablePlayers],
                phase: 'trial',
            };
        }

        case 'update-vote-time': {
            return {
                ...state,
                timeToVote: action.timeToVote,
            };
        }
    }
};
// TODO move
export const GameContext = createContext();

export const VotingContext = createContext();

export default function GamePage() {
    const [gameState, dispatch] = useReducer(reducer, initialState);

    const [votingState, votingDispatch] = useReducer(
        votingReducer,
        initialVotingState
    );

    const { state: generalContext } = useContext(GeneralContext);

    const cycle = {
        startNight: (duration) => {
            const { role } = generalContext;

            const status = {
                mafia: 'Choose a player to kill',
                detective: 'Choose a player to suspect',
                medic: 'Choose a player to save',
                civilian: 'Time to sleep...',
            };

            const getVotablePlayers = {
                mafia: gameState.alivePlayers.filter(
                    (p) => p !== generalContext.nickname
                ),
                // TODO fix detective
                detective: gameState.alivePlayers.filter(
                    (p) =>
                        p !== generalContext.nickname &&
                        gameState.checkedPlayers &&
                        gameState.checkedPlayers.exists((c) => c.nickname !== p)
                ),
                medic: gameState.alivePlayers,
                civilian: [],
            };

            dispatch({
                type: 'increment-time',
            });

            // update the status
            dispatch({
                type: 'start-night',
                status: status[role],
            });

            // update the voting.
            votingDispatch({
                type: 'role-vote',
                votablePlayers: getVotablePlayers[role],
                duration,
            });
        },
        endNight: (playerKilled) => {
            dispatch({
                type: 'update-status',
                status: `${playerKilled} was killed in the night`,
            });
            dispatch({
                type: 'kill-player',
                playerKilled,
            });
            // TODO do i need to store playerKilled in voting state
            votingDispatch({
                type: 'reset',
            });
        },
        dayStart: (timeToVote) => {
            dispatch({
                type: 'increment-time',
            });

            dispatch({
                type: 'update-status',
                status: 'Please vote for someone',
            });
            votingDispatch({
                type: 'discussion-vote',
                timeToVote,
                votablePlayers: gameState.alivePlayers,
            });
        },
        discussionEnd: (playersOnTrial) => {
            const status = playersOnTrial.reduce((str, p, idx, arr) => {
                if (idx === arr.length - 1) {
                    str += ` and ${p} is on trial`;
                } else if (idx === 0) {
                    str += p;
                } else {
                    str += `, ${p}`;
                }
            });
            dispatch({
                type: 'update-status',
                status,
            });

            votingDispatch({
                type: 'reset',
            });

            votingDispatch({
                type: 'discussion-vote',
                votablePlayers: playersOnTrial,
            });
        },
        trialStart: (timeToVote) => {
            votingDispatch({
                type: 'update-vote-time',
                timeToVote,
            });

            dispatch({
                type: 'update-status',
                status: 'Please vote for someone',
            });
        },
        // TODO same as night end
        trialEnd: (playerKilled) => {
            dispatch({
                type: 'update-status',
                status: `${playerKilled} was killed in the night`,
            });
            dispatch({
                type: 'kill-player',
                playerKilled,
            });
            // TODO do i need to store playerKilled in voting state
            votingDispatch({
                type: 'reset',
            });
        },
        gameOver: (winningRole, winners) => {
            dispatch({
                type: 'winner',
                winningRole: winningRole.toLowerCase(),
                winners,
            });
        },
    };

    useEffect(() => {
        const { role } = generalContext.role;

        const extraRoleState =
            role === 'detective' ? { checkedPlayers: [] } : {};

        dispatch({
            type: 'init',
            alivePlayers: generalContext.players,
            ...extraRoleState,
        });
    }, []);

    useEffect(() => {
        function onNightStart({ timeToVote }) {
            cycle.startNight(timeToVote);
            dispatch({ type: 'change-screen', screen: 'core' });
        }

        function onNightEnd({ playerKilled }) {
            cycle.endNight(playerKilled);
        }

        function onDayStart({ timeToVote }) {
            cycle.dayStart(timeToVote);
        }

        function onDiscussionEnd({ playersOnTrial }) {
            cycle.discussionEnd(playersOnTrial);
        }

        function onTrialStart({ playersOnTrial }) {
            cycle.trialStart(playersOnTrial);
        }
        function onTrialEnd({ playersOnTrial }) {
            cycle.trialEnd(playersOnTrial);
        }
        function onGameOver({ winningRole, winners }) {
            cycle.gameOver(winningRole, winners);
        }

        socket.on('night-start', onNightStart);
        socket.on('night-end', onNightEnd);
        socket.on('day-start', onDayStart);
        socket.on('discussion-end', onDiscussionEnd);
        socket.on('trial-start', onTrialStart);
        socket.on('trial-end', onTrialEnd);
        socket.on('game-over', onGameOver);

        return () => {
            socket.removeListener('night-start', onNightStart);
            socket.removeListener('night-start', onNightEnd);
            socket.removeListener('day-start', onDayStart);
            socket.removeListener('discussion-end', onDiscussionEnd);
            socket.removeListener('trial-start', onTrialStart);
            socket.removeListener('trial-end', onTrialEnd);
            socket.removeListener('game-over', onGameOver);
        };
    }, [gameState.alivePlayers]);

    let component;

    switch (gameState.screen) {
        case 'entry':
            component = <EntryScreen />;
            break;
        case 'core':
            component = <CoreGamePage />;
            break;
        case 'end':
            component = <GameOverPage />;
            break;
    }
    return (
        <GameContext.Provider value={{ state: gameState, dispatch }}>
            <VotingContext.Provider
                value={{ state: votingState, dispatch: votingDispatch }}
            >
                {component}
            </VotingContext.Provider>
        </GameContext.Provider>
    );
}
