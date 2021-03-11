import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/GoBackButton.module.css'

import { useHistory } from 'react-router';

const GoBackBtn = () => {

    const history = useHistory();

    const handleBackBtn = () => {
        history.goBack();
    }

    return (
        // <Link exact to="/"> <button onClick={ () => handleBackBtn } > Go Back </button> </Link>
        <button onClick={ handleBackBtn } > Go Back </button>
    )
}

export default GoBackBtn;