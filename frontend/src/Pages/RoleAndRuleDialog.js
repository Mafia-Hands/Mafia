import React from 'react';
import RoleTable from '../Components/RoleTable.js';
import RuleParagraph from '../Components/RuleParagraph';
import styles from '../Styles/RoleAndRuleDialog.module.css';
import Modal from '../Modal/Modal';
import GoBackBtn from '../Components/GoBackButton.js';


const RoleAndRuleDialog = () => {

    return (

        <Modal dismissOnClickOutside={true} style={styles.gradient}> 
            <div className={styles.modal}>
                <GoBackBtn />
            
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
