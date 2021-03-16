import React from 'react';
import { Slider, Button } from '@material-ui/core';
import styles from '../Styles/SettingDialog.module.css';

const SettingDialog = () => (
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

export default SettingDialog;
