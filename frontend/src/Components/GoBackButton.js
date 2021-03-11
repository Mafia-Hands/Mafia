import React from 'react';

const GoBackBtn = (props) => {
    return <button onClick={() => props.goback(false)}> Go Back </button>;
};

export default GoBackBtn;
