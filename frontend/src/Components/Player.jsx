import styles from '../Styles/Player.module.css';
import classNames from 'classnames';

export default function Player({
    playerId,
    playerName,
    style,
    childRef,
    isDead,
    isHoverable,
    hasVoted,
    isClicked,
    onClick,
}) {
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
