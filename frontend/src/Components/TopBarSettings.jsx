import { React } from 'react';
import styles from '../Styles/TopBarSettings.module.css';

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
            <button className={styles.backButton} onClick={() => showUp(false)}>
                Go Back
            </button>
            {currentScreen && (
                <h2 className={styles.header}>{`${currentScreen}`}</h2>
            )}
            {showSettings && (
                <button
                    className={styles.settingsButton}
                    onClick={() => setOpenInfo(false)}
                >
                    Settings
                </button>
            )}
        </div>
    );
};

export default TopBarSettings;
