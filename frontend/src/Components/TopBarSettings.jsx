import { React } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, withStyles } from '@material-ui/core';
import styles from '../Styles/TopBarSettings.module.css';
import SettingsIcon from '@material-ui/icons/Settings';

/**
 * @param currentScreen true/false OPTIONAL prop that will current screen Header text if true
 * @param showSettings true/false OPTIONAL prop that will render settings button if true
 */

 const StyledIconButton = withStyles({
    root:{
        padding:'5px',
    },
    })(IconButton);

const TopBarSettings = ({ currentScreen, showSettings, showUp, setOpenInfo, showBack }) => (
    <div className={styles.container}>
        {showBack && (
            <Button variant="contained" className={styles.backButton} onClick={() => showUp(false)}>
                Go Back
            </Button>
        )}
        {currentScreen && <h2 className={styles.header}>{`${currentScreen}`}</h2>}
        {showSettings && (
            
            <StyledIconButton
                variant="contained"
                className={styles.settingsButton}
                onClick={() => {
                    showUp(true);
                    setOpenInfo(false);
                }}
            ><SettingsIcon style={{color:'#293241'}}/>
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
