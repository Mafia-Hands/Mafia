import React from 'react';
import styles from '../Styles/RuleTable.module.css';

const RuleTable = () => {

    const tableHeader = ["Role Name", "Description"]

    const roles = [ { name: "Mafia", description: "At night, all Mafias can vote to kill one player" },
                    { name: "Medic", description: "At night, after Mafias killed one player, Medic can decide to save the killed player or not" },
                    { name: "Civilian", description: "Sleep all night, no power :(" }
                  ]

    return (
        <div>
            <table className={styles.roleTable}>
                <thead>
                    <tr >
                        {tableHeader.map( content => ( <th key={content}> {content} </th> ))}
                    </tr>
                </thead>

                <tbody>
                    {roles.map( role => (
                        <tr key={role.name}>
                            <td> {role.name}  </td>
                            <td> {role.description} </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>

    )
}

export default RuleTable;
