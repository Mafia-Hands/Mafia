import { React, useState } from 'react';
import { useHistory } from 'react-router';
import RoleAndRuleDialog from '../Pages/RoleAndRuleDialog';
import SettingDialog from '../Pages/SettingDialog';
import styles from '../Styles/TopBar.module.css';

const TopBar = ({ userName, role }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [showSetting, setShowSetting] = useState(false);

    // const history = useHistory();

    // const handleInfoBtn = () => {
    //   history.push("/info");
    // }

    // const handleSettingBtn = () => {
    //   history.push("/setting");
    // }

    console.log(showInfo);

    return (
        <div>
            {showInfo ? (
                <RoleAndRuleDialog goback={setShowInfo} />
            ) :  (
                <div className={styles.container}>
                    <p className={styles.userName}>{`Name: ${userName}`}</p>
                    <p className={styles.userRole}>
                        {`Role: ${role}`}
                        <button onClick={() => setShowInfo(true)}>
                            <i className="fa fa-info"></i>
                        </button>
                    </p>
                    <div className={styles.timer}>Timer Placeholder</div>
                    <button
                        className={styles.settingsButton}
                        onClick={setShowSetting(true)}
                    >
                        Settings
                    </button>
                </div>
            )}
        </div>
    );
};

export default TopBar;
