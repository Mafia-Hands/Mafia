import { React, useState } from 'react';
import ModalMUI from '../Modal/ModalMUI';
import RoleAndRuleDialog from '../Pages/RoleAndRuleDialog';
import SettingDialog from '../Pages/SettingDialog';
import styles from '../Styles/TopBar.module.css';

const TopBar = ({ userName, role }) => {
    const [open, setOpen] = useState(false);

    // const [openInfo, setOpenInfo] = useState(false);

    // const [openSetting, setOpenSetting] = useState(false);

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        // <div>
        //     {showInfo ? (
        //         <RoleAndRuleDialog goback={setShowInfo} />
        //     ) : (
        //         <div className={styles.container}>
        //             <p className={styles.userName}>{`Name: ${userName}`}</p>
        //             <p className={styles.userRole}>
        //                 {`Role: ${role}`}
        //                 <button onClick={() => setShowInfo(true)}>
        //                     <i className="fa fa-info"></i>
        //                 </button>
        //             </p>
        //             <div className={styles.timer}>Timer Placeholder</div>
        //             <button
        //                 className={styles.settingsButton}
        //                 onClick={setShowSetting(true)}
        //             >
        //                 Settings
        //             </button>
        //         </div>
        //     )}
        // </div>

        // <ModalMUI info={openInfo} setInfo={setOpenInfo} setting={openSetting} setSetting={setOpenSetting}>
        <div>
            <button onClick={() => setOpen(true)}>
                {' '}
                <i className="fa fa-info"></i>{' '}
            </button>
            
            <ModalMUI open={open} setOpen={setOpen}>
                <RoleAndRuleDialog />
            </ModalMUI>
        </div>
    );
};

export default TopBar;
