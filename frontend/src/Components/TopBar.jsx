import { React, useState } from 'react';
import ModalMUI from '../Modal/ModalMUI';
import RoleAndRuleDialog from '../Pages/RoleAndRuleDialog';
import SettingDialog from '../Pages/SettingDialog';
import styles from '../Styles/TopBar.module.css';

const TopBar = ({ userName, role }) => {
    // open variable decide whether a modal is opened
    // openInfo variable decide the context in the opened modal
    // since there are only two dialog, having an openInfo variable is enough
    // adding more dialog will need more variables
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

    return (
        <div className={styles.container}>
            <p className={styles.userName}>{`Name: ${userName}`}</p>
            <p className={styles.userRole}>
                {`Role: ${role}`}
                <button
                    onClick={() => {
                        setOpen(true);
                        setOpenInfo(true);
                    }}
                >
                    <i className="fa fa-info"></i>
                </button>
            </p>
            <div className={styles.timer}>Timer Placeholder</div>

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

export default TopBar;
