import { React } from 'react';
import styles from '../Styles/GameOver.module.css';
import Player from './Player';
import StatusBar from './StatusBar';
import TopBarGame from './TopBarGame';

function GameOver({ players, groupName }) {
    return (
        <div className={styles.container}>
            <TopBarGame
                userDetails={['Reeve', 'Civilian']}
                showTimer={false}
                showRole={true}
            />

            <StatusBar text={`${groupName} Victory`} />

            <div className={styles.avatar}>
                <div>
                    {players.map((player, index) => {
                        if (player.role === groupName) {
                            return (
                                <Player key={index} playerName={player.name} />
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default GameOver;
