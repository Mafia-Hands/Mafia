import React from 'react';
import styles from '../Styles/SettingDialog.module.css';
import Slider from '../Components/Slider';

const SettingDialog = () => (
    <div className={styles.modal}>
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

        {/* TODO: improve CSS and layout */}
        <div className={styles.leaveBtn}>
            <button> Leave Game </button>
        </div>
    </div>
);

export default SettingDialog;
