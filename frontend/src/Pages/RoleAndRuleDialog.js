import React from 'react';
import RoleTable from '../Components/RoleTable.js';
import RuleParagraph from '../Components/RuleParagraph';
import styles from '../Styles/RoleAndRuleDialog.module.css';
import Modal from '../Modal/Modal';

const RoleAndRuleDialog = (onCancel) => {

    return (

        <Modal dismissOnClickOutside={true} onCancel={onCancel} style={styles.gradient}> 
            {/* <div className={styles.gradient}> */}
            <div>
                <button > Go back </button>
            
                <div>
                    <b> Mafia Roles </b>
                </div>
                
                <RoleTable />
                <RuleParagraph />

            </div>
        </Modal>
    )
}

export default RoleAndRuleDialog;
