import React, { useContext, useReducer, useEffect, useCallback } from 'react';
import { createContext } from 'react';
import CoreGamePage from './CoreGamePage';
import EntryScreen from './EntryScreen';
import GameOverPage from './GameOverPage';
import socket from '../Socket';
import { GeneralContext } from '../App';

import { nightTimeStatus, constructPlayersOnTrialStatus } from '../GameUtils';

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
            console.log(action);
            return {
                ...state,
                alivePlayers: [...action.alivePlayers],
                ...(action.checkedPlayers && {
                    checkedPlayers: action.checkedPlayers,
                }),
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
        case 'check-player': {
            return {
                ...state,
                checkedPlayers: [...state.checkedPlayers, action.checkedPlayer],
            };
        }
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

        case 'update-players-who-voted': {
            return {
                ...state,
                playersWhoVoted: action.playersWhoVoted,
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

    const { state: generalState } = useContext(GeneralContext);

    // const stateMachine = {
    //     state: undefined,
    //     start: () => (state = entry),
    //     next: () => (state = state.next()),

    //     entry: { next: () => 'startNight' },
    //     startNight: { next: () => 'dayStart' },
    //     dayStart: { next: () => 'discussionEnd' },
    //     discussionEnd: { next: () => 'trialStart' },
    //     trialStart: { next: () => 'trialEnd' },
    //     trialEnd: { next: () => 'startNight' },
    // };

    // if (!stateMachine.state) {
    //     // entering night for the first time
    //     stateMachine.start();
    // }
    const cycle = {
        startNight: (duration) => {
            const { role } = generalState;

            const status = nightTimeStatus[role];
            // console.log(status);

            console.log(gameState);

            const getVotablePlayers = {
                mafia: gameState.alivePlayers.filter(
                    (p) => p !== generalState.nickname
                ),
                // TODO fix detective
                detective: gameState.alivePlayers.filter(
                    (p) =>
                        p !== generalState.nickname &&
                        gameState.checkedPlayers &&
                        !gameState.checkedPlayers.some((c) => c.nickname === p)
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
                status: status,
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
                votablePlayers: gameState.alivePlayers.filter(
                    (p) => p !== generalState.nickname
                ),
            });
        },
        discussionEnd: (playersOnTrial) => {
            votingDispatch({
                type: 'reset',
            });

            const status = constructPlayersOnTrialStatus(playersOnTrial);

            dispatch({
                type: 'update-status',
                status,
            });

            if (!playersOnTrial.includes(generalState.nickname)) {
                votingDispatch({
                    type: 'trial-vote',
                    votablePlayers: playersOnTrial,
                });
            }
        },
        trialStart: (timeToVote) => {
            votingDispatch({
                type: 'update-vote-time',
                timeToVote,
            });

            if (!votingState.votablePlayers.length) {
                dispatch({
                    type: 'update-status',
                    status: 'You are on trial',
                });
                return;
            }

            dispatch({
                type: 'update-status',
                status: 'Please vote for someone',
            });
        },
        // TODO same as night end
        trialEnd: (playerKilled) => {
            dispatch({
                type: 'update-status',
                status: `${playerKilled} was hanged`,
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

    /**
     * This effect will run on first render to initialise the alive players.
     * We may need to lie about the dependency so that players dont just 'leave'
     */
    useEffect(() => {
        const { role } = generalState;
        console.log(role);
        const extraRoleState =
            role === 'detective' ? { checkedPlayers: [] } : {};
        console.log(extraRoleState);

        dispatch({
            type: 'init',
            alivePlayers: generalState.players,
            ...extraRoleState,
        });
    }, [generalState]);

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
        function onTrialEnd({ playerKilled }) {
            cycle.trialEnd(playerKilled);
        }
        function onGameOver({ winningRole, winners }) {
            cycle.gameOver(winningRole, winners);
        }

        function onVoteUpdate({ voteMap }) {
            votingDispatch({
                type: 'update-players-who-voted',
                playersWhoVoted: Object.keys(voteMap),
            });
        }

        function onSuspectReveal(checkedPlayer) {
            dispatch({
                type: 'check-player',
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
    }, [gameState.alivePlayers, votingState.votablePlayers, gameState]);

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
