import { React, useState } from 'react';
import styles from '../Styles/TopBarGame.module.css';
import ModalMUI from '../Modal/ModalMUI';
import RoleAndRuleDialog from '../Pages/RoleAndRuleDialog';
import SettingDialog from '../Pages/SettingDialog';

/**
 * @param userDetails [{userName: <string>, role: <string>}]
 * @param showTimer true/false OPTIONAL prop that will render Timer if true
 * @param showRole true/false OPTIONAL prop that will render Role if true
 */

const TopBarGame = ({ userDetails, showTimer, showRole }) => {
    const [userName, role] = userDetails;
    // open variable decide whether a modal is opened
    // openInfo variable decide the context in the opened modal
    // since there are only two dialog, having an openInfo variable is enough
    // adding more dialog will need more variables
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

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
                        <i className="fa fa-info"></i>
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

            <ModalMUI open={open} setOpen={setOpen}>
                {openInfo ? (
                    <RoleAndRuleDialog goback={setOpen} />
                ) : (
                    <SettingDialog goback={setOpen} />
                )}
            </ModalMUI>
        </div>
    );
};

export default TopBarGame;
