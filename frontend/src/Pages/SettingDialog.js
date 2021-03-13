import React from 'react';
import styles from '../Styles/SettingDialog.module.css';
import Slider from '../Components/Slider';
import { Button } from '@material-ui/core';

const SettingDialog = () => {
    return (
        <div className={styles.modal}>
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
                <Button variant="contained"> Leave Game </Button>
            </div>
        </div>
    );
};

export default SettingDialog;
