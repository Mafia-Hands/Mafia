import React from 'react';
import styles from '../Styles/SettingDialog.module.css';
import { Slider, Button } from '@material-ui/core';

const SettingDialog = () => {
    return (
        <div className={styles.container}>
            <div>
                <b> Sound </b>
                <Slider />
            </div>

            <div>
                <b> Brightness </b>
                <Slider />
            </div>

            {/* TODO: improve CSS and layout */}
            <div>
                <Button variant="contained" style={{ textAlign: 'center' }}>
                    Leave Game
                </Button>
            </div>
        </div>
    );
};

export default SettingDialog;
