import React from 'react';
import RoleTable from '../Components/RoleTable.js';
import RuleParagraph from '../Components/RuleParagraph';
import styles from '../Styles/RoleAndRuleDialog.module.css';

const RoleAndRuleDialog = () => {
    return (
        <div className={styles.modal}>
            <div>
                <b> Mafia Roles </b>
            </div>

            <RoleTable />
            <RuleParagraph />
        </div>
    );
};

export default RoleAndRuleDialog;
