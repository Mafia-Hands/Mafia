import styles from "../Styles/Player.module.css";

export default function Player({ playerId, playerName, style, childRef }) {
    return (
        <div className={styles.playerWrapper} style={style} ref={childRef}>
            <div> {playerName} </div>
        </div>
    );
}
