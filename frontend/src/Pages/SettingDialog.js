import React from 'react';
import GoBackBtn from '../Components/GoBackButton';
import styles from '../Styles/SettingDialog.module.css';
import Slider from '../Components/Slider';

const SettingDialog = (props) => {
    return (
        <div className={styles.modal}>
            <GoBackBtn goback={props.goback} />

            <div>
                <h2> Settings </h2>
            </div>

            <div>
                <b> Sound </b>
                <Slider />
            </div>

            <div>
                <b> Brightness </b>
                <Slider />
            </div>
        </div>
    );
};

export default SettingDialog;
