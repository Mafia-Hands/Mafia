import styles from '../Styles/Player.module.css';
import classNames from 'classnames';
import { GameContext } from '../Pages/GamePage';
import socket from '../Socket';
import { useContext } from 'react';

export default function Player({ playerId, playerName, style, childRef }) {
    const { state: gameState, dispatch } = useContext(GameContext);

    const isDead = !gameState.alivePlayers.includes(playerName);

    const isHoverable =
        !!gameState.votingState.type && gameState.votingState.votablePlayers.includes(playerName) && !isDead;
    const hasVoted = gameState.votingState.playersWhoVoted.includes(playerName);

    const isVoted = (gameState.votingState.vote === playerName);

    // forces the detctive to only be able to look at one other player per day
    const detectiveHasSuspected = (gameState.votingState.vote !== '')

    var mafiaString = ""
    for (const suspectedPlayer of gameState.checkedPlayers) {
        if (suspectedPlayer.nickname === playerName) {
            mafiaString = (suspectedPlayer.isMafia ? " (Mafia)" : " (Not Mafia)");
        }
    }

    // apply styles based on whether certain props is true
    const playerStyle = classNames({
        [styles.playerWrapper]: true,
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
                if (!((gameState.role === 'detective') && detectiveHasSuspected)) {
                    socket.emit(`${gameState.role}-vote`, {
                        votingFor: playerName,
                    });
                    dispatch( { type:'show-selected' , status: `Selected ${playerName} for ability`, votedPlayer: playerName } );
                    break;
                }
                break;
            case 'discussion':
                socket.emit(`day-vote`, { votingFor: playerName });
                dispatch( { type:'show-selected' , status: `Voted ${playerName} for trial`, votedPlayer: playerName } );
                break;
            case 'trial':
                socket.emit(`trial-vote`, { votingFor: playerName });
                dispatch( { type:'show-selected' , status: `Voted to kill ${playerName}`, votedPlayer: playerName } );
                break;
            default:
                throw new Error('Invalid voting type');
        }
    }

    return (
        <div className={playerStyle} style={style} ref={childRef} onClick={validateOnClick(onClick)}>
            <div className={styles.playerText}>
                <p>{playerName.concat(isDead ? " (DEAD)" : "")}</p>
                <p>{mafiaString}</p>
            </div>
        </div>
    );
}
