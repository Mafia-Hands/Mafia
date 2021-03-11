import React from 'react';
import { useHistory } from 'react-router';

const GoBackBtn = () => {

    const history = useHistory();

    const handleBackBtn = () => {
        history.goBack();
    }

    return (
        <button onClick={ handleBackBtn } > Go Back </button>
    )
}

export default GoBackBtn;