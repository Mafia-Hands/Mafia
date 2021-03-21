import styles from '../Styles/Player.module.css';
import classNames from 'classnames';
import { GameContext } from '../Pages/GamePage';
import socket from '../Socket';
import { useContext } from 'react';

export default function Player({ playerId, playerName, style, childRef }) {
    const { state: gameState } = useContext(GameContext);

    const isDead = !gameState.alivePlayers.includes(playerName);

    const isHoverable =
        !!gameState.votingState.type && gameState.votingState.votablePlayers.includes(playerName) && !isDead;
    const hasVoted = gameState.votingState.playersWhoVoted.includes(playerName);
    const isClicked = !!gameState.votingState.vote;

    // apply styles based on whether certain props is true
    const playerStyle = classNames({
        [styles.playerWrapper]: true,
        [styles.isHoverable]: isHoverable,
        [styles.hasVoted]: hasVoted,
        [styles.isClicked]: isClicked,
        [styles.isDead]: isDead,
    });

    // this only allows clicks if a player is actually hoverable.
    function validateOnClick(fn) {
        return (...args) => {
            if (!isDead && isHoverable && !isClicked) {
                fn(...args);
            }
        };
    }

    function onClick() {
        switch (gameState.votingState.type) {
            case 'role':
                socket.emit(`${gameState.role}-vote`, {
                    votingFor: playerName,
                });
                break;
            case 'discussion':
                socket.emit(`day-vote`, { votingFor: playerName });
                break;
            case 'trial':
                socket.emit(`trial-vote`, { votingFor: playerName });
                break;
            default:
                throw new Error('Invalid voting type');
        }
    }

    return (
        <div className={playerStyle} style={style} ref={childRef} onClick={validateOnClick(onClick)}>
            <div> {playerName} </div>
        </div>
    );
}
