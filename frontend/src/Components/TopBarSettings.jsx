import { React } from 'react';
import PropTypes from 'prop-types';
import { IconButton, withStyles } from '@material-ui/core';
import styles from '../Styles/TopBarSettings.module.css';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
/**
 * @param currentScreen true/false OPTIONAL prop that will current screen Header text if true
 * @param showSettings true/false OPTIONAL prop that will render settings button if true
 */

const StyledIconButton = withStyles({
    root: {
        padding: '5px',
        color: '#293241',
    },
})(IconButton);

const TopBarSettings = ({ currentScreen, showSettings, showUp, setOpenInfo, showBack }) => (
    <div className={styles.container}>
        {showBack && (
            <StyledIconButton
                variant="contained"
                className={`${styles.backButton} ${!currentScreen.includes('Lobby') && styles.rolesAndRules}`}
                onClick={() => showUp(false)}
            >
                <KeyboardBackspaceIcon />
            </StyledIconButton>
        )}
        {currentScreen && <h2 id="room-code" className={styles.header}>{`${currentScreen}`}</h2>}
        {showSettings && (
            <StyledIconButton
                variant="contained"
                className={styles.settingsButton}
                onClick={() => {
                    showUp(true);
                    setOpenInfo(false);
                }}
            >
                <SettingsIcon />
            </StyledIconButton>
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
