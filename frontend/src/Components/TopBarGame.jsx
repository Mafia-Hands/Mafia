import { React, useState } from 'react';
import styles from '../Styles/TopBarGame.module.css';
import ModalMUI from '../Modal/ModalMUI';
import RoleAndRuleDialog from '../Pages/RoleAndRuleDialog';
import SettingDialog from '../Pages/SettingDialog';
import TopBarSettings from './TopBarSettings';

/**
 * @param userDetails [{userName: <string>, role: <string>}]
 * @param showTimer true/false OPTIONAL prop that will render Timer if true
 * @param showRole true/false OPTIONAL prop that will render Role if true
 */

const TopBarGame = ({ userDetails, showTimer, showRole }) => {
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [userName, role] = userDetails;
    return (
        <div className={styles.container}>
            <p className={styles.userName}>{`Name: ${userName}`}</p>
            {showRole && (
                <div className={styles.userRole}>
                    <span>{`Role: ${role}   `}</span>
                    <button
                        onClick={() => {
                            setOpen(true);
                            setOpenInfo(true);
                        }}
                    >
                        {' '}
                        <i className="fa fa-info"></i>{' '}
                    </button>
                </div>
            )}
            {showTimer && <div className={styles.timer}>Timer Placeholder</div>}
            <button
                className={styles.settingsButton}
                onClick={() => {
                    setOpen(true);
                    setOpenInfo(false);
                }}
            >
                Settings
            </button>

            <div>
                <ModalMUI open={open} setOpen={setOpen}>
                    {openInfo ? (
                        <div>
                            <TopBarSettings
                                showUp={setOpen}
                                currentScreen="LOBBY"
                                showSettings={true}
                                setOpenInfo={setOpenInfo}
                            />
                            <RoleAndRuleDialog />
                        </div>
                    ) : (
                        <div>
                            <TopBarSettings
                                showUp={setOpen}
                                currentScreen="LOBBY"
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
