import styles from '../Styles/Player.module.css';
import classNames from 'classnames';
import { GeneralContext } from '../App';
import { GameContext } from '../Pages/GamePage';
import socket from '../Socket';
import { useContext } from 'react';

export default function Player({
    playerId,
    playerName,
    style,
    childRef,
    // isDead,
    // isHoverable,
    // hasVoted,
    // isClicked,
    // onClick,
}) {
    // TODO this is a lot of rerenders
    const { state: generalState } = useContext(GeneralContext);
    // const votingContext = useContext(VotingContext);

    // console.log(votingContext);
    const { state: gameState } = useContext(GameContext);
    // console.log(gameState);

    const isDead = !gameState.alivePlayers.includes(playerName);

    const isHoverable =
        !!gameState.votingState.type &&
        gameState.votingState.votablePlayers.includes(playerName) &&
        !isDead;
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
                socket.emit(`${generalState.role}-vote`, {
                    votingFor: playerName,
                });
                break;
            case 'discussion':
                socket.emit(`day-vote`, { votingFor: playerName });
                break;
            case 'trial':
                socket.emit(`trial-vote`, { votingFor: playerName });
                break;
        }
    }

    return (
        <div
            className={playerStyle}
            style={style}
            ref={childRef}
            onClick={validateOnClick(onClick)}
        >
            <div> {playerName} </div>
        </div>
    );
}
