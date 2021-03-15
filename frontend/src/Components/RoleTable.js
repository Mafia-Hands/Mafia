import React from 'react';
import styles from '../Styles/RuleTable.module.css';

const RuleTable = () => {
    const tableHeader = ['Role Name', 'Description', 'Win Condition'];

    // later for multi-mode version, maybe can fetch the data by the backend
    // eg: if the user choose to play one-night ultimate mode, this will be tanner, mason, etc
    // or just leave it static
    // TODO: formalize/polish the role and rule description
    const roles = [
        {
            name: 'Mafia',
            description: 'At night, all Mafias can vote to kill one player',
            winCondition: 'number of Civilians <= number of Mafias',
        },
        {
            name: 'Medic',
            description:
                'At night, after Mafias killed one player, Medic can decide to save the killed player or not',
            winCondition: 'All Mafias are killed',
        },
        {
            name: 'Civilian',
            description: 'Sleep all night, no power :(',
            winCondition: 'All Mafias are killed',
        },
    ];

    return (
        <div className={styles.gradient}>
            <table className={styles.roleTable}>
                <thead>
                    <tr>
                        {tableHeader.map((content) => (
                            <th key={content}> {content} </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {roles.map((role) => (
                        <tr key={role.name}>
                            <td> {role.name} </td>
                            <td> {role.description} </td>
                            <td> {role.winCondition} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RuleTable;
