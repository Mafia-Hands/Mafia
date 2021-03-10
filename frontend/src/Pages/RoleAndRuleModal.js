import React from 'react';
import RoleTable from '../Components/RoleTable.js';
import RuleParagraph from '../Components/RuleParagraph';
import styles from '../Styles/RoleAndRuleModal.module.css';
//import Header from '../Components/Header';

const RoleAndRuleModal = () => {

    return (
        <div className={styles.gradient}>

            {/* <Header /> */}
            <button > Go back </button>
           
            <div>
                <b> Mafia Roles </b>
            </div>
            

            <RoleTable />
            <RuleParagraph />

        </div>
    
    )
}

export default RoleAndRuleModal;
