import { React, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@material-ui/icons/Help';
import { Button, IconButton } from '@material-ui/core';
import styles from '../Styles/TopBarGame.module.css';
import ModalMUI from '../Modal/ModalMUI';
import SettingDialog from '../Pages/SettingDialog';
import TopBarSettings from './TopBarSettings';
import { GeneralContext } from '../App';
import RolesAndRules from './RolesAndRules';

/**
 * @param userDetails [{userName: <string>, role: <string>}]
 * @param showTimer true/false OPTIONAL prop that will render Timer if true
 * @param showRole true/false OPTIONAL prop that will render Role if true
 */

const TopBarGame = ({ showTimer, showRole }) => {
    const { state } = useContext(GeneralContext);
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const userName = state.nickname;
    const role = state.role;
    return (
        <div className={styles.container}>
            <p className={styles.userName}>{`Name: ${userName}`}</p>
            {showRole && (
                <div className={styles.userRole}>
                    <span>{`Role: ${role}`}</span>
                    <IconButton
                        onClick={() => {
                            setOpen(true);
                            setOpenInfo(true);
                        }}
                    >
                        <HelpIcon />
                    </IconButton>
                </div>
            )}
            {showTimer && <div className={styles.timer}>Timer Placeholder</div>}
            <Button
                variant="contained"
                className={styles.settingsButton}
                onClick={() => {
                    setOpen(true);
                    setOpenInfo(false);
                }}
            >
                Settings
            </Button>

            <div>
                <ModalMUI open={open} setOpen={setOpen}>
                    {openInfo ? (
                        <div>
                            <TopBarSettings
                                showUp={setOpen}
                                currentScreen="ROLES AND RULES"
                                showSettings={false}
                                setOpenInfo={setOpenInfo}
                            />
                            <RolesAndRules userRole="Mafia" />
                        </div>
                    ) : (
                        <div>
                            <TopBarSettings showUp={setOpen} currentScreen="SETTINGS" showSettings={false} />
                            <SettingDialog />
                        </div>
                    )}
                </ModalMUI>
            </div>
        </div>
    );
};

export default TopBarGame;

TopBarGame.propTypes = {
    // TODO BUG
    showTimer: PropTypes.bool,
    showRole: PropTypes.bool,
};

TopBarGame.defaultProps = {
    // TODO BUG

    showTimer: false,
    showRole: false,
};
