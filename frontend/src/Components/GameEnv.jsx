import { React } from 'react';
<<<<<<< HEAD
// import styles from '../Styles/GameEnv.module.css';

const GameEnv = () => (
    /* button will have onClick to create a new Lobby */
    <div>
        <p> This is the Game Environment </p>
    </div>
);
=======
import StatusBar from './StatusBar';
import Table from './Table';
//import styles from '../Styles/GameEnv.module.css';

const GameEnv = () => {
    return (
        <>
            <StatusBar />
            <Table />
        </>
    );
};
>>>>>>> continued working on state

export default GameEnv;
