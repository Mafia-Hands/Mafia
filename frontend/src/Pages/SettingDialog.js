import React from 'react';
import GoBackBtn from '../Components/GoBackButton';
import Modal from '../Modal/Modal';
import styles from '../Styles/SettingDialog.module.css';


const SettingDialog = (onCancel) => {

    return(
        <Modal dismissOnClickOutside={true} onCancel={onCancel}>
            
            <div className={styles.modal}>
                <GoBackBtn />

                <div>
                    <b> Settings </b>
                </div>
                
            </div>



        </Modal>
    )
} 

export default SettingDialog;
