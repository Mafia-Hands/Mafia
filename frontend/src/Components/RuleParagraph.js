import styles from '../Styles/RuleParagraph.module.css';

import React from 'react';

const RuleParagraph = () => {
    // TODO: formalize/polish the role and rule description
    return (
        <div className={styles.gradient}>
            <b> Mafia Rules </b>
            <ul>
                <li>
                    {' '}
                    Start: Everyone is assigned a role, don't tell anyone else
                    your role!
                </li>
                <li>
                    {' '}
                    In Night, Mafias wake up first, and vote silently to kill
                    someone{' '}
                </li>
                <li>
                    {' '}
                    Then, Medic wakes up and will be told who is killed, decide
                    to save him or not{' '}
                </li>
                <li>
                    {' '}
                    Night over, Day up, everyone will be told who has been
                    killed if that is the case{' '}
                </li>
                <li> Have a discussion, vote the Mafias among you! </li>
                <li>
                    {' '}
                    This process keeps running until one of the win conditions
                    reaches{' '}
                </li>
            </ul>
            <label> @Author: University of Auckalnd SOFTENG701 Group 4 </label>
        </div>
    );
};

export default RuleParagraph;
