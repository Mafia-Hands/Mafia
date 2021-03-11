import React from 'react';
import styles from '../Styles/GoBackButton.module.css';

const GoBackBtn = (props) => {
    //TODO: improve css
    return (
        <button className={styles.backBtn} onClick={() => props.goback(false)}>
            {' '}
            Go Back{' '}
        </button>
    );
};

export default GoBackBtn;
