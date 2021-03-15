import { React } from 'react';
import styles from '../Styles/TopBarSettings.module.css';
import { Button } from '@material-ui/core';

/**
 * @param currentScreen true/false OPTIONAL prop that will current screen Header text if true
 * @param showSettings true/false OPTIONAL prop that will render settings button if true
 */
const TopBarSettings = ({
    currentScreen,
    showSettings,
    showUp,
    setOpenInfo,
}) => {
    return (
        <div className={styles.container}>
            {showUp && (
                <Button
                    variant="contained"
                    className={styles.backButton}
                    onClick={() => showUp(false)}
                >
                    Go Back
                </Button>
            )}
            {currentScreen && (
                <h2 className={styles.header}>{`${currentScreen}`}</h2>
            )}
            {showSettings && (
                <Button
                    variant="contained"
                    className={styles.settingsButton}
                    onClick={() => setOpenInfo(false)}
                >
                    Settings
                </Button>
            )}
        </div>
    );
};

export default TopBarSettings;
