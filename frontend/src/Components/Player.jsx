import classNames from 'classnames';
import React, { useContext } from 'react';
import styles from '../Styles/Player.module.css';
import { GameContext, GeneralContext } from '../Context';
import socket from '../Socket';

/**
 * The player component represents a specific player on the table.
 * Styling is applied conditionally based on the state of the player e.g. dead, voted, is them self etc.
 * @param { playerName, style, childRef } playerName is nickname of player, style is
 * additional custom styling, childRef is used by table component to get height/width info of player
 * @returns component representing player.
 */
export default function Player({ playerName, style, childRef }) {
    // get the current lobby state
    const { state: generalState } = useContext(GeneralContext);

    // get the current game state
    const { state: gameState, dispatch } = useContext(GameContext);

    // check if each player component being rendered by the table is dead
    // if the player is dead, other players cannot hover the dead player circle
    const isDead = !gameState.alivePlayers.includes(playerName);

    // check if players themselves are dead
    // if players themselves are dead, they cannot hover any player circles
    const amIDead = !gameState.alivePlayers.includes(generalState.nickname);

    // the hoverable variable depends on the following conditions:
    // the game state [role or discussion or trial or undefined]
    // the players are votable
    // the players themselves are not dead
    // the hovered players are not dead
    const isHoverable =
        !!gameState.votingState.type &&
        gameState.votingState.votablePlayers.includes(playerName) &&
        !isDead &&
        !amIDead;
    const hasVoted = gameState.votingState.playersWhoVoted.includes(playerName);
    const isVoted = gameState.votingState.vote === playerName;
    const isPlayer = generalState.nickname === playerName;

    // forces the detective to only be able to look at one other player per day
    const detectiveHasSuspected = gameState.votingState.vote !== '';

    let mafiaString = '';
    for (const suspectedPlayer of gameState.checkedPlayers) {
        if (suspectedPlayer.nickname === playerName) {
            mafiaString = suspectedPlayer.isMafia ? ' (Mafia)' : ' (Not Mafia)';
        }
    }

    // apply styles based on whether certain props is true
    const playerStyle = classNames({
        [styles.playerWrapper]: true,
        [styles.player]: isPlayer,
        [styles.isHoverable]: isHoverable,
        [styles.hasVoted]: hasVoted,
        [styles.isClicked]: isVoted,
        [styles.isDead]: isDead,
    });

    // this only allows clicks if a player is actually hoverable.
    function validateOnClick(fn) {
        return (...args) => {
            if (!isDead && isHoverable && !isVoted) {
                fn(...args);
            }
        };
    }

    function onClick() {
        switch (gameState.votingState.type) {
            case 'role':
                if (!(gameState.role === 'detective' && detectiveHasSuspected)) {
                    socket.emit(`${gameState.role}-vote`, {
                        votingFor: playerName,
                    });
                    dispatch({
                        type: 'show-selected',
                        status: `Selected ${playerName} for ability`,
                        votedPlayer: playerName,
                    });
                    break;
                }
                break;
            case 'discussion':
                socket.emit(`day-vote`, { votingFor: playerName });
                dispatch({ type: 'show-selected', status: `Voted ${playerName} for trial`, votedPlayer: playerName });
                break;
            case 'trial':
                socket.emit(`trial-vote`, { votingFor: playerName });
                dispatch({ type: 'show-selected', status: `Voted to kill ${playerName}`, votedPlayer: playerName });
                break;
            default:
                throw new Error('Invalid voting type');
        }
    }

    return (
        <div className={playerStyle} style={style} ref={childRef} onClick={validateOnClick(onClick)}>
            <div className={styles.playerText}>
                <p>{playerName.concat(isDead ? ' (DEAD)' : '')}</p>
                <p>{mafiaString}</p>
            </div>
        </div>
    );
}
