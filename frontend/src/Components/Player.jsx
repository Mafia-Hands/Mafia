import classNames from 'classnames';
import React, { useContext } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import styles from '../Styles/Player.module.css';
import { GameContext, GeneralContext } from '../Context';
import socket from '../Socket';
import avatarImage from '../images/AvatarAlive.png'
import avatarImageDead from '../images/AvatarDead.png'
import citizenImage from '../images/CitizenHat.svg';
import detectiveImage from '../images/DetectiveHat.svg';
import jesterImage from '../images/JesterHat.svg';
import mafiaImage from '../images/MafiaHat.svg';
import medicImage from '../images/MedicHat.svg';

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
    const isHoveredPlayerDead = !gameState.alivePlayers.includes(playerName);

    // check if players themselves are dead
    // if players themselves are dead, they cannot hover any player circles
    const isCurrentPlayerDead = !gameState.alivePlayers.includes(generalState.nickname);

    // the hoverable variable depends on the following conditions:
    // the game state [role or discussion or trial or undefined]
    // the players are votable
    // the players themselves are not dead
    // the hovered players are not dead
    const isHoverable =
        !!gameState.votingState.type &&
        gameState.votingState.votablePlayers.includes(playerName) &&
        !isHoveredPlayerDead &&
        !isCurrentPlayerDead;
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

    // apply styles based on whether certain props is true -> 1st was true before
    const playerStyle = classNames({
        [styles.isHoverable]: isHoverable,
        [styles.hasVoted]: hasVoted,
        [styles.isClicked]: isVoted,
        [styles.isDead]: isHoveredPlayerDead,
    });

    // apply player avatar hat depending on what role the player has
    const playerHat = classNames({
        [citizenImage]: (gameState.role === 'civilian'),
        [detectiveImage]: (gameState.role === 'detective'),
        [jesterImage]: (gameState.role === 'jester'),
        [mafiaImage]: (gameState.role === 'mafia'),
        [medicImage]: (gameState.role === 'medic'),
    })

    // this only allows clicks if a player is actually hoverable.
    function validateOnClick(fn) {
        return (...args) => {
            if (!isHoveredPlayerDead && isHoverable && !isVoted) {
                fn(...args);
            }
        };
    }

    // Reveal an icon at trial end to show how a given player voted.
    function revealVote() {
        // Check the previous vote map and see if the player associated with this name voted 'no confidence'
        if (gameState.prevVotingState.trialVoteMap[playerName] === "no Confidence"){
            return <ThumbDownIcon fontSize="large"/>
        // If the player is part of the 'playersWhoVoted' array, but didn't vote 'no confidence', they must have
        // voted to kill the player on trial
        } else if (gameState.prevVotingState.playersWhoVoted.includes(playerName)){
            return <ThumbUpIcon fontSize="large"/>
        } 
        // This case is where a given player did not vote, or was on trial. Currently shouldn't display anything
        return null
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
                    socket.emit('night-vote');
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
            {isHoveredPlayerDead ? <img src={avatarImageDead} alt="dead player avatar" className={styles.playerImg}/> : <img src={avatarImage} alt="player avatar" className={styles.playerImg}/>}
            <div className={styles.playerText}>
                <p>{playerName.concat(isHoveredPlayerDead ? ' (DEAD)' : '')}</p>
                <p>{isPlayer ? ' (YOU)' : ''}</p>
                <p>{mafiaString}</p>
                <div>{gameState.phase === 'trial-end' ? revealVote() : ''}</div>
            </div>
            {isPlayer ? <img src={playerHat} alt="" className={styles.hatImg}/> : null}
            {(mafiaString === ' (Mafia)') ? <img src={mafiaImage} alt="" className={styles.hatImg}/> : null}
        </div>
    );
}
