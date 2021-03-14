import styles from '../Styles/Player.module.css';
import classNames from 'classnames';
import { GeneralContext } from '../App';
import { GameContext, VotingContext } from '../Pages/GamePage';
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
    const { state: votingState } = useContext(VotingContext);

    // console.log(votingContext);
    const { state: gameState } = useContext(GameContext);
    // console.log(gameState);

    const isHoverable =
        !!votingState.phase && votingState.votablePlayers.includes(playerName);
    const hasVoted = votingState.playersWhoVoted.includes(playerName);
    const isClicked = !!votingState.vote;
    const isDead = !gameState.alivePlayers.includes(playerName);

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
        switch (votingState.phase) {
            case 'role':
                socket.emit(`${generalState.role}-vote`, {
                    votingFor: playerName,
                });
            case 'discussion':
                socket.emit(`day-vote`, { votingFor: playerName });
            case 'trial':
                socket.emit(`trial-vote`, { votingFor: playerName });
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
