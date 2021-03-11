import React from 'react';
import GoBackBtn from '../Components/GoBackButton';
import Modal from '../Modal/Modal';
import styles from '../Styles/SettingDialog.module.css';
import Slider from '../Components/Slider';

const SettingDialog = (props) => {
    return (
        <Modal dismissOnClickOutside={true} onCancel={props.goback}>
            <div className={styles.modal}>
                <GoBackBtn goback={props.goback} />

                <div>
                    <b> Settings </b>
                </div>

                <div>
                    <b> Sound </b>
                    <Slider />
                </div>
            </div>
        </Modal>
    );
};

export default SettingDialog;
