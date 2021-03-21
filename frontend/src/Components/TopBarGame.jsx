import { React, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@material-ui/icons/Help';
import { withStyles, IconButton } from '@material-ui/core';
import styles from '../Styles/TopBarGame.module.css';
import ModalMUI from '../Modal/ModalMUI';
import SettingDialog from '../Pages/SettingDialog';
import TopBarSettings from './TopBarSettings';
import { GeneralContext } from '../App';
import RolesAndRules from './RolesAndRules';
import SettingsIcon from '@material-ui/icons/Settings';
import Timer from './Timer';
import { GameContext } from '../Pages/GamePage';

/**
 * @param userDetails [{userName: <string>, role: <string>}]
 * @param showTimer true/false OPTIONAL prop that will render Timer if true
 * @param showRole true/false OPTIONAL prop that will render Role if true
 */

const StyledIconButton = withStyles({
    root: {
        padding: '5px',
        color: 'white',
    },
})(IconButton);

const TopBarGame = ({ showTimer, showRole }) => {
    const { state } = useContext(GeneralContext);
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const userName = state.nickname;
    const role = state.role;
    const { state: gameState } = useContext(GameContext);

    return (
        <div className={styles.container}>
            <p className={styles.userName}>{`Name: ${userName}`}</p>
            {showRole && (
                <div className={styles.userRole}>
                    <span>{`Role: ${role}`}</span>
                    <StyledIconButton
                        onClick={() => {
                            setOpen(true);
                            setOpenInfo(true);
                        }}
                    >
                        <HelpIcon />
                    </StyledIconButton>
                </div>
            )}
            {showTimer && (
                <div className={styles.timer}>
                    <Timer userPreferTime={gameState.votingState.timeToVote} />
                </div>
            )}
            <StyledIconButton
                variant="contained"
                className={styles.settingsButton}
                onClick={() => {
                    setOpen(true);
                    setOpenInfo(false);
                }}
            >
                <SettingsIcon />
            </StyledIconButton>

            <div>
                <ModalMUI open={open} setOpen={setOpen}>
                    {openInfo ? (
                        <div>
                            <TopBarSettings
                                showBack={true}
                                showUp={setOpen}
                                currentScreen="ROLES AND RULES"
                                showSettings={false}
                                setOpenInfo={setOpenInfo}
                            />
                            <RolesAndRules userRole="Mafia" />
                        </div>
                    ) : (
                        <div>
                            <TopBarSettings
                                showBack={true}
                                showUp={setOpen}
                                currentScreen="SETTINGS"
                                showSettings={false}
                            />
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
