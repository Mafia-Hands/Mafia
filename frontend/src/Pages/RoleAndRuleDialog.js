import React from 'react';
import RoleTable from '../Components/RoleTable.js';
import RuleParagraph from '../Components/RuleParagraph';
import styles from '../Styles/RoleAndRuleDialog.module.css';
import GoBackBtn from '../Components/GoBackButton.js';

const RoleAndRuleDialog = (props) => {
    return (
        <div className={styles.modal}>
            <GoBackBtn goback={props.goback} />

            <div>
                <b> Mafia Roles </b>
            </div>

            <RoleTable />
            <RuleParagraph />
        </div>
    );
};

export default RoleAndRuleDialog;
