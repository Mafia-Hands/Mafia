import React from 'react';
import { useHistory } from 'react-router';

const GoBackBtn = (props) => {
    // const history = useHistory();

    // const handleBackBtn = () => {
    //     history.goBack();
    // }

    return <button onClick={() => props.goback(false)}> Go Back </button>;
};

export default GoBackBtn;
