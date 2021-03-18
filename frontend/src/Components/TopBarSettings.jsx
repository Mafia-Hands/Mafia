import { React } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import styles from '../Styles/TopBarSettings.module.css';

/**
 * @param currentScreen true/false OPTIONAL prop that will current screen Header text if true
 * @param showSettings true/false OPTIONAL prop that will render settings button if true
 */
const TopBarSettings = ({ currentScreen, showSettings, showUp, setOpenInfo, showBack }) => (
    <div className={styles.container}>
        {showBack && (
            <Button variant="contained" className={styles.backButton} onClick={() => showUp(false)}>
                Go Back
            </Button>
        )}
        {currentScreen && <h2 className={styles.header}>{`${currentScreen}`}</h2>}
        {showSettings && (
            <Button
                variant="contained"
                className={styles.settingsButton}
                onClick={() => {
                    showUp(true);
                    setOpenInfo(false);
                }}
            >
                Settings
            </Button>
        )}
    </div>
);

export default TopBarSettings;

TopBarSettings.propTypes = {
    currentScreen: PropTypes.string,
    showSettings: PropTypes.bool,
    showUp: PropTypes.func,
    setOpenInfo: PropTypes.func,
};

TopBarSettings.defaultProps = {
    currentScreen: null,
    showSettings: null,
    showUp: null,
    setOpenInfo: null,
};
